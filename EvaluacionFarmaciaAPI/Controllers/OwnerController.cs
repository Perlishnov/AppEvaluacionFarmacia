using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluacionFarmaciaAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using EvaluacionFarmaciaAPI.DTOs;
using AutoMapper;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;
        private readonly IMapper _mapper;

        public OwnersController(FarmaciaDesarrolloWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Owners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnerDTO>>> GetOwners()
        {
            var owners = await _context.Owners.ToListAsync();

            // Mapear a DTO
            var ownerDtos = _mapper.Map<IEnumerable<OwnerDTO>>(owners);

            return Ok(ownerDtos);
        }

        // GET: api/Owners/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OwnerDTO>> GetOwner(int id)
        {
            var owner = await _context.Owners.Where(o => o.OwnerId == id).FirstOrDefaultAsync();

            if (owner == null)
            {
                return NotFound($"Owner with ID {id} not found.");
            }

            // Mapear a DTO
            var ownerDto = _mapper.Map<OwnerDTO>(owner);

            return Ok(ownerDto);
        }

        // POST: api/Owners
        [HttpPost]
        public async Task<ActionResult> PostOwner([FromBody] OwnerDTO ownerDto)
        {
            if (ownerDto == null)
            {
                return BadRequest("Owner data is required.");
            }

            // Mapear DTO al modelo
            var owner = _mapper.Map<Owner>(ownerDto);

            _context.Owners.Add(owner);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error saving the Owner: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetOwner), new { id = owner.OwnerId }, owner);
        }

        // PUT: api/Owners/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> PutOwner(int id, [FromBody] OwnerDTO ownerDto)
        {
            if (ownerDto == null)
            {
                return BadRequest("Owner data is required.");
            }

            // Buscar el Owner existente en la base de datos
            var existingOwner = await _context.Owners.FindAsync(id);
            if (existingOwner == null)
            {
                return NotFound($"Owner with ID {id} not found.");
            }

            // Mapear los datos del DTO al modelo existente
            _mapper.Map(ownerDto, existingOwner);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error updating the Owner: {ex.Message}");
            }

            return NoContent(); // 204 No Content
        }

        // DELETE: api/Owners/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOwner(int id)
        {
            // Buscar el Owner existente
            var owner = await _context.Owners.FindAsync(id);
            if (owner == null)
            {
                return NotFound($"Owner with ID {id} not found.");
            }

            // Eliminar el Owner
            _context.Owners.Remove(owner);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error deleting the Owner: {ex.Message}");
            }

            return NoContent(); // 204 No Content
        }
    }
}
