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
            var inspections = await _context.Inspections
                .FromSqlRaw("EXEC sp_GetAssignedInspections @InspectorId", parameters)
                .ToListAsync();

            if (!inspections.Any())
            {
                return NotFound($"No se encontraron inspecciones asignadas para el inspector con ID {inspectorId}.");
            }
            //Mapeo no funciona porque c# es case sensitive y tenemos StatuSInspection en db
            var inspectionDtos = _mapper.Map<IEnumerable<InspectionDTO>>(inspections);
            return Ok(inspectionDtos);
        }

        //Actualiza el estado de una inspeccion
        // PUT: api/inspectors/inspections/{id}
        [HttpPut("inspections")]
        public async Task<IActionResult> UpdateInspectionStatus(int id, [FromBody] int statusId)
        {
            var parameters = new[]
            {
                new SqlParameter("@InspectionId", id),
                new SqlParameter("@StatusId", statusId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC UpdateInspectionStatus @InspectionId, @StatusId", parameters);
            return NoContent();
        }

    }
}
