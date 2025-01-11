using Microsoft.AspNetCore.Mvc;
using EvaluacionFarmaciaAPI.Models;
using EvaluacionFarmaciaAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;

        public UserAccountsController(FarmaciaDesarrolloWebContext context)
        {
            _context = context;
        }

        // GET: api/UserAccounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAccountDTO>>> GetUserAccounts()
        {
            var userAccounts = await _context.UserAccounts.ToListAsync();
            var userAccountDTOs = userAccounts.Select(ua => UserAccountDTO.FromModel(ua)).ToList();
            return Ok(userAccountDTOs);
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

            return UserAccountDTO.FromModel(userAccount);
        }

        // PUT: api/UserAccounts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(int id, UserAccountDTO userAccountDTO)
        {
            if (id != userAccountDTO.UserId)
            {
                return BadRequest();
            }

            var userAccount = await _context.UserAccounts.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }

            userAccount.DocumentUser = userAccountDTO.DocumentUser;
            userAccount.NameUser = userAccountDTO.NameUser;
            userAccount.LastNameUser = userAccountDTO.LastNameUser;
            userAccount.EmailUser = userAccountDTO.EmailUser;
            userAccount.PasswordUser = userAccountDTO.PasswordUser;
            userAccount.DocumentTypeId = userAccountDTO.DocumentTypeId;
            userAccount.PersonTypeId = userAccountDTO.PersonTypeId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccountExists(id))
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

        // POST: api/UserAccounts
        [HttpPost]
        public async Task<ActionResult<UserAccountDTO>> PostUserAccount(UserAccountDTO userAccountDTO)
        {
            var userAccount = new UserAccount
            {
                DocumentUser = userAccountDTO.DocumentUser,
                NameUser = userAccountDTO.NameUser,
                LastNameUser = userAccountDTO.LastNameUser,
                EmailUser = userAccountDTO.EmailUser,
                PasswordUser = userAccountDTO.PasswordUser,
                DocumentTypeId = userAccountDTO.DocumentTypeId,
                PersonTypeId = userAccountDTO.PersonTypeId
            };

            _context.UserAccounts.Add(userAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserAccount), new { id = userAccount.UserId }, UserAccountDTO.FromModel(userAccount));
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

        private bool UserAccountExists(int id)
        {
            return _context.UserAccounts.Any(e => e.UserId == id);
        }
    }
}
