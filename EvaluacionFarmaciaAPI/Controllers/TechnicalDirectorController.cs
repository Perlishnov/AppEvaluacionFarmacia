using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluacionFarmaciaAPI.Models;
using EvaluacionFarmaciaAPI.DTOs;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TechnicalDirectorsController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;
        private readonly IMapper _mapper;

        public TechnicalDirectorsController(FarmaciaDesarrolloWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/TechnicalDirectors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechnicalDirectorDTO>>> GetTechnicalDirectors()
        {
            var technicalDirectors = await _context.TechnicalDirectors.ToListAsync();

            // Mapear a DTO
            var technicalDirectorDtos = _mapper.Map<IEnumerable<TechnicalDirectorDTO>>(technicalDirectors);

            return Ok(technicalDirectorDtos);
        }

        // GET: api/TechnicalDirectors/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TechnicalDirectorDTO>> GetTechnicalDirector(int id)
        {
            var technicalDirector = await _context.TechnicalDirectors
                .FirstOrDefaultAsync(td => td.DirectorId == id);

            if (technicalDirector == null)
            {
                return NotFound($"TechnicalDirector with ID {id} not found.");
            }

            // Mapear a DTO
            var technicalDirectorDto = _mapper.Map<TechnicalDirectorDTO>(technicalDirector);

            return Ok(technicalDirectorDto);
        }

        // POST: api/TechnicalDirectors
        [HttpPost]
        public async Task<ActionResult> PostTechnicalDirector([FromBody] TechnicalDirectorDTO technicalDirectorDto)
        {
            if (technicalDirectorDto == null)
            {
                return BadRequest("TechnicalDirector data is required.");
            }

            // Mapear DTO al modelo
            var technicalDirector = _mapper.Map<TechnicalDirector>(technicalDirectorDto);

            _context.TechnicalDirectors.Add(technicalDirector);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error saving the TechnicalDirector: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetTechnicalDirector), new { id = technicalDirector.DirectorId }, technicalDirectorDto);
        }

        // PUT: api/TechnicalDirectors/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> PutTechnicalDirector(int id, [FromBody] TechnicalDirectorDTO technicalDirectorDto)
        {
            if (technicalDirectorDto == null)
            {
                return BadRequest("TechnicalDirector data is required.");
            }

            // Buscar el TechnicalDirector existente en la base de datos
            var existingTechnicalDirector = await _context.TechnicalDirectors.FindAsync(id);
            if (existingTechnicalDirector == null)
            {
                return NotFound($"TechnicalDirector with ID {id} not found.");
            }

            // Mapear los datos del DTO al modelo existente
            _mapper.Map(technicalDirectorDto, existingTechnicalDirector);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error updating the TechnicalDirector: {ex.Message}");
            }

            return NoContent(); // 204 No Content
        }

        // DELETE: api/TechnicalDirectors/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTechnicalDirector(int id)
        {
            // Buscar el TechnicalDirector existente
            var technicalDirector = await _context.TechnicalDirectors.FindAsync(id);
            if (technicalDirector == null)
            {
                return NotFound($"TechnicalDirector with ID {id} not found.");
            }

            // Eliminar el TechnicalDirector
            _context.TechnicalDirectors.Remove(technicalDirector);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error deleting the TechnicalDirector: {ex.Message}");
            }

            return NoContent(); // 204 No Content
        }
    }
}
