using AutoMapper;
using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UserAccountsController : ControllerBase
{
    private readonly FarmaciaDesarrolloWebContext _context;
    private readonly IMapper _mapper;

    public UserAccountsController(FarmaciaDesarrolloWebContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/UserAccounts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserAccountDTO>>> GetUserAccounts()
    {
        var userAccounts = await _context.UserAccounts.ToListAsync();
        var userAccountDtos = _mapper.Map<IEnumerable<UserAccountDTO>>(userAccounts);
        return Ok(userAccountDtos);
    }

    // GET: api/UserAccounts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserAccountDTO>> GetUserAccount(int id)
    {
        var userAccount = await _context.UserAccounts.FindAsync(id);

        if (userAccount == null)
        {
            return NotFound();
        }

        var userAccountDto = _mapper.Map<UserAccountDTO>(userAccount);
        return Ok(userAccountDto);
    }

    // POST: api/UserAccounts
    [HttpPost]
    public async Task<ActionResult<UserAccountDTO>> PostUserAccount(UserAccountDTO userAccountDto)
    {
        var userAccount = _mapper.Map<UserAccount>(userAccountDto);

        _context.UserAccounts.Add(userAccount);
        await _context.SaveChangesAsync();

        userAccountDto.UserId = userAccount.UserId; // Asignar el ID generado al DTO
        return CreatedAtAction(nameof(GetUserAccount), new { id = userAccount.UserId }, userAccountDto);
    }

    // PUT: api/UserAccounts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUserAccount(int id, UserAccountDTO userAccountDto)
    {
        if (id != userAccountDto.UserId)
        {
            return BadRequest("El ID en la URL no coincide con el ID del cuerpo de la solicitud.");
        }

        var userAccount = await _context.UserAccounts.FindAsync(id);
        if (userAccount == null)
        {
            return NotFound();
        }

        // Actualizar el modelo usando el DTO
        _mapper.Map(userAccountDto, userAccount);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.UserAccounts.Any(e => e.UserId == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/UserAccounts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAccount(int id)
    {
        var userAccount = await _context.UserAccounts.FindAsync(id);
        if (userAccount == null)
        {
            return NotFound();
        }

        _context.UserAccounts.Remove(userAccount);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
