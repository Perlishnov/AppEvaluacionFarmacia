using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class InspectionController : ControllerBase
{
    private readonly FarmaciaDesarrolloWebContext _context;

    public InspectionController(FarmaciaDesarrolloWebContext context)
    {
        _context = context;
    }

    // POST: /inspections
    [HttpPost]
    public async Task<ActionResult<Inspection>> ScheduleInspection([FromBody] InspectionDTO inspectionDTO)
    {
        var inspection = new Inspection
        {
            ScheduledDate = inspectionDTO.ScheduledDate,
            ModifiedDate = DateTime.Now,
            StatusInspId = inspectionDTO.StatusInspId,
            DrugStoreId = inspectionDTO.DrugStoreId
        };

        _context.Inspections.Add(inspection);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInspectionById), new { id = inspection.InspectionId }, inspection);
    }

    // GET: /inspections
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InspectionDTO>>> GetInspections([FromQuery] int? statusInspID, [FromQuery] DateTime? date)
    {
        var query = _context.Inspections.AsQueryable();

        if (statusInspID.HasValue)
        {
            query = query.Where(i => i.StatusInspId == statusInspID);
        }

        if (date.HasValue)
        {
            query = query.Where(i => i.ScheduledDate.Date == date.Value.Date);
        }

        var inspections = await query.ToListAsync();
        var inspectionDTOs = inspections.Select(InspectionDTO.FromModel);

        return Ok(inspectionDTOs);
    }

    // GET: api/inspections/details
        [HttpGet("details")]
        public async Task<ActionResult<IEnumerable<InspectionDTO>>> GetAssignedInspections()
        {
            var inspections = await _context.InspectionGetDto
                .FromSqlRaw("EXEC sp_GetInspections")
                .ToListAsync();

            if (!inspections.Any())
            {
                return NotFound("No se encontraron inspecciones");
            }

            return Ok(inspections);
        }

    // GET: /inspections/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<InspectionDTO>> GetInspectionById(int id)
    {
        var inspection = await _context.Inspections.FindAsync(id);

        if (inspection == null)
        {
            return NotFound();
        }

        return Ok(InspectionDTO.FromModel(inspection));
    }

    // GET: api/inspections/details
    [HttpGet("{id}/details")]
    public async Task<ActionResult<IEnumerable<InspectionDTO>>> GetInspectionDetailedById(int id)
    {
        //var parameters = new[] { new SqlParameter("@InspectionId", id) };
        var inspections = await _context.InspectionGetDto
            .FromSqlInterpolated($"EXEC sp_GetInspectionById @InspectionId = {id}")
            .ToListAsync();

        if (!inspections.Any())
        {
            return NotFound($"No se encontraron inspecciones con el id {id}");
        }

        return Ok(inspections);
    }


    // Obtener inspecciones pendientes (estado "En Espera").
    // GET: /inspections/pending
    [HttpGet("pending")]
    public async Task<IActionResult> GetPendingInspections()
    {
        var pendingInspections = await _context.Inspections
            .Where(i => i.StatusInspId == 3)
            .ToListAsync();

        if (!pendingInspections.Any())
            return NotFound("No se encontraron inspecciones pendientes.");

        return Ok(pendingInspections);
    }

    // PUT: /inspections/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInspectionStatus(int id, [FromBody] UpdateStatusDTO statusDTO)
    {
        var inspection = await _context.Inspections.FindAsync(id);

        if (inspection == null)
        {
            return NotFound();
        }

        inspection.StatusInspId = statusDTO.StatusInspID;
        inspection.ModifiedDate = DateTime.Now;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: /inspections/{id}/results
    [HttpPost("{id}/results")]
    public async Task<ActionResult<EvaluacionFarmaciaAPI.Models.Result>> AddInspectionResults(int id, [FromBody] ResultsDTO resultsDTO)
    {
        // Verificar si la inspección existe
        var inspection = await _context.Inspections.FindAsync(id);

        if (inspection == null)
        {
            return NotFound("La inspección no existe.");
        }

        // Verificar si ya existen resultados para esta inspección
        var existingResult = await _context.Results
            .FirstOrDefaultAsync(r => r.InspectionId == id);

        if (existingResult != null)
        {
            return BadRequest("Ya existen resultados asociados a esta inspección.");
        }

        // Crear los resultados
        var results = new EvaluacionFarmaciaAPI.Models.Result
        {
            InspectionId = id,
            Observations = resultsDTO.Observations,
            DescriptionsResults = resultsDTO.DescriptionsResults
        };

        // Agregar y guardar cambios
        _context.Results.Add(results);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInspectionById), new { id = id }, results);
    }

}
