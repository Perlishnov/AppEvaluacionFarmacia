/* using AutoMapper;
using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class InspectionController : ControllerBase
{
    private readonly FarmaciaDesarrolloWebContext _context;
    private readonly IMapper _mapper;

    public InspectionController(FarmaciaDesarrolloWebContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // POST: /inspections
    [HttpPost]
    public async Task<ActionResult> ScheduleInspection([FromBody] InspectionDTO inspectionDtoInspectionDTO)
    {
        var inspection = _mapper.Map<Inspection>(inspectionDtoInspectionDTO);

        _context.Inspections.Add(inspection);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInspectionById), new { id = inspection.InspectionId }, inspectionDtoInspectionDTO);
    }

    // GET: /inspections
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InspectionDTO>>> GetAllInspections([FromQuery] string status = null, [FromQuery] DateTime? date = null)
    {
        var inspectionsQuery = _context.Inspections
            .Include(i => i.DrugStore)
            .Include(i => i.StatusInspection)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status))
        {
            inspectionsQuery = inspectionsQuery.Where(i => i.StatusInspection.StatusInsp == status);
        }

        if (date.HasValue)
        {
            inspectionsQuery = inspectionsQuery.Where(i => i.ScheduledDate.Date == date.Value.Date);
        }

        var inspections = await inspectionsQuery.ToListAsync();
        return Ok(_mapper.Map<IEnumerable<InspectionDTO>>(inspections));
    }

    // GET: /inspections/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<InspectionDTO>> GetInspectionById(int id)
    {
        var inspection = await _context.Inspections
            .Include(i => i.DrugStore)
            .Include(i => i.StatusInspection)
            .FirstOrDefaultAsync(i => i.InspectionID == id);

        if (inspection == null)
        {
            return NotFound();
        }

        return Ok(_mapper.Map<InspectionDTO>(inspection));
    }

    // PUT: /inspections/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInspectionStatus(int id, [FromBody] UpdateInspectionStatusDTO updateStatusDto)
    {
        var inspection = await _context.Inspections.FindAsync(id);

        if (inspection == null)
        {
            return NotFound();
        }

        // Llamar a un Stored Procedure para actualizar el estado de la inspección
        await _context.Database.ExecuteSqlInterpolatedAsync(
            $"EXEC sp_UpdateInspectionStatus {id}, {updateStatusDto.StatusID}");

        return NoContent();
    }

    // POST: /inspections/{id}/results
    [HttpPost("{id}/results")]
    public async Task<IActionResult> RegisterInspectionResults(int id, [FromBody] InspectionResultsDTO resultsDto)
    {
        var inspection = await _context.Inspections.FindAsync(id);

        if (inspection == null)
        {
            return NotFound();
        }

        // Llamar a un Stored Procedure para registrar los resultados
        await _context.Database.ExecuteSqlInterpolatedAsync(
            $"EXEC sp_RegisterInspectionResults {id}, {resultsDto.Observations}, {resultsDto.Descriptions}");

        return Ok();
    }
}
 */