using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluacionFarmaciaAPI.Models;
using EvaluacionFarmaciaAPI.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;

        public AdminController(FarmaciaDesarrolloWebContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lista de todos los inspectores
        /// </summary>
        /// <returns>Lista de usuarios que son inspectores</returns>
        // GET: Admin/inspector
        [HttpGet("inspector")]
        public async Task<ActionResult<IEnumerable<UserInspectorDto>>> GetAllInspectors()
        {
            var allInspectors = await _context.UserAccounts
                .Where(u => u.PersonType.TypePerson == "Inspector")
                .Select(u => new UserInspectorDto
                {
                    UserId = u.UserId,
                    NameUser = u.NameUser,
                    LastNameUser = u.LastNameUser,
                    DocumentUser = u.DocumentUser,
                    EmailUser = u.EmailUser
                })
                .ToListAsync();

            return Ok(allInspectors);
        }

        /// <summary>
        /// Lista de inspectores disponibles
        /// </summary>
        /// <returns>Lista de usuarios que pueden ser asignados una inspeccion especifica</returns>
        // GET: Admin/inspector/available
        [HttpGet("inspector/available")]
        public async Task<ActionResult<IEnumerable<UserInspectorDto>>> GetAvailableInspectors(int inspectionId)
        {
            // Encuentra la inspección
            var inspection = await _context.Inspections
                .FirstOrDefaultAsync(i => i.InspectionId == inspectionId);

            if (inspection == null)
                return NotFound("Inspección no encontrada.");

            // Get de los inspectores disponibles
            var availableInspectors = await _context.UserAccounts
                .Where(u => u.PersonType.TypePerson == "Inspector")
                .Where(u => !u.UserInspections.Any(ui => ui.ScheduledDate.Date == inspection.ScheduledDate.Date))
                .Select(u => new UserInspectorDto
                {
                    UserId = u.UserId,
                    NameUser = u.NameUser,
                    LastNameUser = u.LastNameUser,
                    DocumentUser = u.DocumentUser,
                    EmailUser = u.EmailUser
                })
                .ToListAsync();

            return Ok(availableInspectors);
        }

        /// <summary>
        /// Asignar inspeccion a un inspector
        /// </summary>
        /// <param name="assignmentDto">Detalles de la asignacion de la inspeccion</param>
        /// <returns>Resultado de la asignacion de la inspeccion</returns>
        // POST: Admin/assign-inspection
        [HttpPost("assign-inspection")]
        public async Task<IActionResult> AssignInspection([FromBody] InspectionAssignmentDto assignmentDto)
        {
            // Valida que la inspeccion existe
            var inspection = await _context.Inspections
                .FirstOrDefaultAsync(i => i.InspectionId == assignmentDto.InspectionId);
            
            if (inspection == null)
                return NotFound("Inspeccion no encontrada.");

            // Revisa si el inspector ya tiene una inspeccion ese dia
            var hasConflictingInspection = await _context.UserInspections
                .AnyAsync(ui => 
                    ui.UserId == assignmentDto.UserId && 
                    ui.ScheduledDate.Date == inspection.ScheduledDate.Date);

            if (hasConflictingInspection)
                return BadRequest("El inspector ya tiene una inspeccion este dia");

            // Crea el objeto a asignar
            var userInspection = new UserInspection
            {
                UserId = assignmentDto.UserId,
                InspectionId = assignmentDto.InspectionId,
                ScheduledDate = inspection.ScheduledDate
            };

            _context.UserInspections.Add(userInspection);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Inspeccion asignada con éxito" });
        }

        /// <summary>
        /// Reasignar una inspeccion a otro inspector
        /// </summary>
        /// <param name="id">Inspection ID</param>
        /// <param name="reassignmentDto">Detalles del nuevo inspector</param>
        /// <returns>Resultado de la reasignación</returns>
        // PUT: Admin/reassign-inspection/{id}
        [HttpPut("reassign-inspection/{id}")]
        public async Task<IActionResult> ReassignInspection(
            int id, 
            [FromBody] InspectionReassignmentDto reassignmentDto)
        {
            var existingUserInspection = await _context.UserInspections
                .FirstOrDefaultAsync(ui => ui.InspectionId == id);

            if (existingUserInspection == null)
                return NotFound("La asignación de inspección no ha sido encontrada");

            // Actualiza a nuevo inspector
            existingUserInspection.UserId = reassignmentDto.NewUserId;
            existingUserInspection.ScheduledDate = DateTime.Now;

            _context.UserInspections.Update(existingUserInspection);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Inspection successfully reassigned" });
        }
    }

    // DTOs para el AdminController (no voy a crearlos como archivos si solo se usan aqui)
    public class UserInspectorDto
    {
        public int UserId { get; set; }
        public required string NameUser { get; set; }
        public required string LastNameUser { get; set; }
        public required string DocumentUser {get; set; }
        public required string EmailUser { get; set; }
    }

    public class InspectionAssignmentDto
    {
        public int InspectionId { get; set; }
        public int UserId { get; set; }
    }

    public class InspectionReassignmentDto
    {
        public int NewUserId { get; set; }
    }
}