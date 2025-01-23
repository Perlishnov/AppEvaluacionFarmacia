using AutoMapper;
using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectorController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;
        private readonly IMapper _mapper;

        public InspectorController(FarmaciaDesarrolloWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/inspectors/inspections/{id}
        [HttpGet("inspections")]
        public async Task<ActionResult<IEnumerable<InspectionDTO>>> GetAssignedInspections([FromQuery] int inspectorId)
        {
            var parameters = new[] { new SqlParameter("@InspectorId", inspectorId) };
            var inspections = await _context.InspectionGetDto
                .FromSqlRaw("EXEC sp_GetAssignedInspections @InspectorId", parameters)
                .ToListAsync();

            if (!inspections.Any())
            {
                return NotFound($"No se encontraron inspecciones asignadas para el inspector con ID {inspectorId}.");
            }

            return Ok(inspections);
        }

        //Actualiza el estado de una inspeccion
        // PUT: api/inspectors/inspections/{id}
        [HttpPut("inspections/{id}/status/{statusId}")]
        public async Task<IActionResult> UpdateInspectionStatus(int id, int statusId)
        {
            var parameters = new[]
            {
                new SqlParameter("@InspectionId", id),
                new SqlParameter("@StatusId", statusId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateInspectionStatus @InspectionId, @StatusId", parameters);
            return NoContent();
        }

    }
}
