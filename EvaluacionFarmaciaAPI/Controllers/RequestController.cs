using Microsoft.AspNetCore.Mvc;
using EvaluacionFarmaciaAPI.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;

        public RequestController(FarmaciaDesarrolloWebContext context)
        {
            _context = context;
        }

        // Crear una nueva solicitud.
        // POST: /inspections
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] Request request)
        {
            if (request == null)
                return BadRequest("Datos de la solicitud no válidos.");

            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRequestById), new { id = request.RequestId }, request);
        }


        // Listar todas las solicitudes (solo administradores).
        // GET: /inspections
        [HttpGet]
        public async Task<IActionResult> GetAllRequests()
        {
            var requests = await _context.Requests.ToListAsync();
            return Ok(requests);
        }

        /// Obtener solicitudes específicas de un usuario.
        // GET: /inspections/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRequestsByUser(int userId)
        {
            var requests = await _context.Requests.Where(r => r.UserId == userId).ToListAsync();

            if (!requests.Any())
                return NotFound($"No se encontraron solicitudes para el usuario con ID {userId}.");

            return Ok(requests);
        }

        /// Obtener detalles de una solicitud específica.
        // GET: /inspections/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestById(int id)
        {
            var request = await _context.Requests.FindAsync(id);

            if (request == null)
                return NotFound($"No se encontró la solicitud con ID {id}.");

            return Ok(request);
        }

        /// Actualizar el estado de una solicitud.
        // PUT: /inspections/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] int statusReqID)
        {
            var request = await _context.Requests.FindAsync(id);

            if (request == null)
                return NotFound($"No se encontró la solicitud con ID {id}.");

            request.StatusReqId = statusReqID;
            _context.Requests.Update(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
