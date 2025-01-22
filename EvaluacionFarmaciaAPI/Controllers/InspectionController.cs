using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
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
        var inspection = await _context.Inspections.FindAsync(id);

        if (inspection == null)
        {
            return NotFound();
        }

        var results = new EvaluacionFarmaciaAPI.Models.Result
        {
            InspectionId = id,
            Observations = resultsDTO.Observations,
            DescriptionsResults = resultsDTO.DescriptionsResults
        };

        _context.Results.Add(results);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInspectionById), new { id = id }, results);
    }
}
