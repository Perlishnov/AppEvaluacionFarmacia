using AutoMapper;
using EvaluacionFarmaciaAPI;
using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly FarmaciaDesarrolloWebContext _context;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public AuthController(FarmaciaDesarrolloWebContext context, IConfiguration configuration, IMapper mapper)
    {
        _context = context;
        _configuration = configuration;
        _mapper = mapper;
    }

    // POST: /auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
    {
        var user = await _context.UserAccounts
            .FirstOrDefaultAsync(u => u.EmailUser == loginDto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordUser))
        {
            return Unauthorized(new { message = "Credenciales invalidas" });
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    //Registra el usuario con un formulario y usa BCrypt para enviar un password hasheado a la base de datos
    // POST: /auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserAccountDTO userAccountDTO)
    {
        if (await _context.UserAccounts.AnyAsync(u => u.EmailUser == userAccountDTO.EmailUser))
        {
            return BadRequest(new { message = "Email ya ha sido registrado" });
        }

        // Mapea el DTO a la entidad
        var newUser = _mapper.Map<UserAccount>(userAccountDTO);
        /* var newUser  = new UserAccount
        {
            DocumentUser = userAccountDTO.DocumentUser,
            NameUser = userAccountDTO.NameUser,
            LastNameUser = userAccountDTO.LastNameUser,
            EmailUser = userAccountDTO.EmailUser,
            PasswordUser = userAccountDTO.PasswordUser,
            DocumentTypeId = userAccountDTO.DocumentTypeId,
            PersonTypeId = userAccountDTO.PersonTypeId
        }; */

        //Registra el nuevo usuario en UserAccount
        _context.UserAccounts.Add(newUser);
        await _context.SaveChangesAsync();


        if (await _context.Owners.AnyAsync(u => u.DocumentOwner == userAccountDTO.DocumentUser)){
            return StatusCode(201, new { message = "El usuario se ha registrado correctamente y ya existía como propietario" });
        }
        else{
            //Registra el nuevo usuario en owner
            var newOwner = new Owner
            {
                DocumentTypeId = userAccountDTO.DocumentTypeId,
                DocumentOwner = userAccountDTO.DocumentUser,
                NameOwner = userAccountDTO.NameUser,
                LastNameOwner = userAccountDTO.LastNameUser,
                EmailOwner = userAccountDTO.EmailUser,
                PhoneOwner = "8095679076"
            };
            _context.Owners.Add(newOwner);
            await _context.SaveChangesAsync();
        }

        return StatusCode(201, new { message = "El usuario se ha registrado correctamente" });
    }

    // POST: /auth/refresh
    [HttpPost("refresh")]
    public IActionResult Refresh([FromBody] AuthResponseDTO authResponseDTO)
    {
        var principal = GetPrincipalFromExpiredToken(authResponseDTO.token);
        if (principal == null)
        {
            return Unauthorized(new { message = "Invalid token" });
        }

        var newJwtToken = GenerateJwtTokenFromClaims(principal.Claims);
        return Ok(new { token = newJwtToken });
    }

    // Utility Methods
    private string GenerateJwtToken(UserAccount user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.EmailUser),
            new Claim("userId", user.UserId.ToString()),
            new Claim("personType", user.PersonTypeId.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        return GenerateJwtTokenFromClaims(claims);
    }

    private string GenerateJwtTokenFromClaims(IEnumerable<Claim> claims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidAudience = _configuration["Jwt:Audience"],
            ValidateLifetime = false // Allow expired tokens
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            if (securityToken is JwtSecurityToken jwtSecurityToken &&
                jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                return principal;
            }
        }
        catch
        {
            return null;
        }

        return null;
    }
    
} 
