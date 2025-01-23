using Microsoft.AspNetCore.Mvc;
using EvaluacionFarmaciaAPI.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Security.Claims;

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
        // POST: /requests
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
        // GET: /request
        [HttpGet]
        public async Task<IActionResult> GetAllRequests()
        {
            var requests = await _context.Requests.ToListAsync();
            return Ok(requests);
        }

        // Listar todas las solicitudes con detalles (solo administradores).
        // GET: /requests/details
        [HttpGet("details")]
        public async Task<IActionResult> GetAllDetailedRequests()
        {
            var requests = await _context.Requests
                .Select(r => new
                {
                    r.RequestId,
                    UserName = _context.UserAccounts
                        .Where(u => u.UserId == r.UserId)
                        .Select(u => u.NameUser + " " + u.LastNameUser)
                        .FirstOrDefault(),
                    DrugStoreName = _context.DrugStores
                        .Where(ds => ds.DrugStoreId == r.DrugStoreId)
                        .Select(ds => ds.NameDs)
                        .FirstOrDefault(),
                    RequestTypeName = _context.RequestTypes
                        .Where(rt => rt.RequestTypeId == r.RequestTypeId)
                        .Select(rt => rt.TypeReq)
                        .FirstOrDefault(),
                    StatusName = _context.StatusRequests
                        .Where(s => s.StatusReqId == r.StatusReqId)
                        .Select(s => s.StatusReq)
                        .FirstOrDefault(),
                    r.SendDate,
                    r.Details
                })
                .ToListAsync();

            if (!requests.Any())
                return NotFound("No se encontraron solicitudes.");

            return Ok(requests);
        }

        /// Obtener solicitudes específicas de un usuario.
        // GET: /requests/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRequestsByUser(int userId)
        {
            var requests = await _context.Requests.Where(r => r.UserId == userId).ToListAsync();

            if (!requests.Any())
                return NotFound($"No se encontraron solicitudes para el usuario con ID {userId}.");

            return Ok(requests);
        }

        /// Obtener detalles de una solicitud específica.
        // GET: /requests/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestById(int id)
        {
            var request = await _context.Requests.FindAsync(id);

            if (request == null)
                return NotFound($"No se encontró la solicitud con ID {id}.");

            return Ok(request);
        }

        /// Actualizar el estado de una solicitud.
        // PUT: /requests/{id}/status
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


        // Crear solicitud de apertura de farmacia
        [HttpPost("pharmacy-opening")]
        public async Task<IActionResult> CreateOpeningRequest([FromBody] PharmacyOpeningRequestDto request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("No se pudo identificar al usuario.");

            var parameters = new[]
            {
                new SqlParameter("@OperationType", "Apertura"),
                new SqlParameter("@OwnerName", request.OwnerName ?? (object)DBNull.Value),
                new SqlParameter("@OwnerDocument", request.OwnerDocument ?? (object)DBNull.Value),
                new SqlParameter("@OwnerEmail", request.OwnerEmail ?? (object)DBNull.Value),
                new SqlParameter("@OwnerPhone", request.OwnerPhone ?? (object)DBNull.Value),
                new SqlParameter("@DirectorName", request.DirectorName ?? (object)DBNull.Value),
                new SqlParameter("@DirectorLastName", request.DirectorLastName ?? (object)DBNull.Value),
                new SqlParameter("@DirectorDocument", request.DirectorDocument ?? (object)DBNull.Value),
                new SqlParameter("@DirectorEmail", request.DirectorEmail ?? (object)DBNull.Value),
                new SqlParameter("@DirectorPhone", request.DirectorPhone ?? (object)DBNull.Value),
                new SqlParameter("@DirectorProfession", request.DirectorProfession ?? (object)DBNull.Value),
                new SqlParameter("@DirectorExequatur", request.DirectorExequatur ?? (object)DBNull.Value),
                new SqlParameter("@IssueDate", request.IssueDate),
                new SqlParameter("@PharmacyTypeID", request.PharmacyTypeID),
                new SqlParameter("@NewPharmacyName", request.NewPharmacyName ?? (object)DBNull.Value),
                new SqlParameter("@PharmacyAddress", request.PharmacyAddress ?? (object)DBNull.Value),
                new SqlParameter("@MunicipioID", request.MunicipioID),
                new SqlParameter("@UserID", userId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_HandlePharmacyRequests @OperationType, @OwnerName, @OwnerDocument, @OwnerEmail, @OwnerPhone, @DirectorName, @DirectorLastName, @DirectorDocument, @DirectorEmail, @DirectorPhone, @DirectorProfession, @DirectorExequatur, @IssueDate, @PharmacyTypeID, @NewPharmacyName, @PharmacyAddress, @MunicipioID, @UserID", parameters);

            return Ok("Solicitud de apertura de farmacia creada con éxito.");
        }

        // Crear solicitud de renovación de licencia
        [HttpPost("license-renewal")]
        public async Task<IActionResult> CreateRenewalRequest([FromBody] PharmacyRenewalRequestDto request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("No se pudo identificar al usuario.");

            var parameters = new[]
            {
                new SqlParameter("@OperationType", "Renovación de Registro"),
                new SqlParameter("@DrugStoreID", request.DrugStoreID),
                new SqlParameter("@PharmacyAddress", request.PharmacyAddress ?? (object)DBNull.Value),
                new SqlParameter("@MunicipioID", request.MunicipioID),
                new SqlParameter("@PharmacyTypeID", request.PharmacyTypeID),
                new SqlParameter("@NewPharmacyName", request.CurrentPharmacyName ?? (object)DBNull.Value),
                new SqlParameter("@UserID", userId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_HandlePharmacyRequests @OperationType, @DrugStoreID, @PharmacyAddress, @MunicipioID, @PharmacyTypeID, @NewPharmacyName, @UserID", parameters);

            return Ok("Solicitud de renovación de licencia creada con éxito.");
        }

    
        [HttpPost("technical-director-change")]
        public async Task<IActionResult> CreateTechnicalDirectorChangeRequest([FromBody] TechnicalDirectorChangeRequestDto request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("No se pudo identificar al usuario.");

            var parameters = new[]
            {
                new SqlParameter("@OperationType", "Cambio de Director Técnico"),
                new SqlParameter("@DrugStoreID", request.DrugStoreID),
                new SqlParameter("@DirectorName", request.NewDirectorName ?? (object)DBNull.Value),
                new SqlParameter("@DirectorLastName", request.NewDirectorLastName ?? (object)DBNull.Value),
                new SqlParameter("@DirectorDocument", request.NewDirectorDocument ?? (object)DBNull.Value),
                new SqlParameter("@DirectorEmail", request.NewDirectorEmail ?? (object)DBNull.Value),
                new SqlParameter("@DirectorPhone", request.NewDirectorPhone ?? (object)DBNull.Value),
                new SqlParameter("@DirectorProfession", request.NewDirectorProfession ?? (object)DBNull.Value),
                new SqlParameter("@DirectorExequatur", request.NewDirectorExequatur ?? (object)DBNull.Value),
                new SqlParameter("@IssueDate", request.IssueDate),
                new SqlParameter("@UserID", userId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_HandlePharmacyRequests @OperationType, @DrugStoreID, @DirectorName, @DirectorLastName, @DirectorDocument, @DirectorEmail, @DirectorPhone, @DirectorProfession, @DirectorExequatur, @IssueDate, @UserID", parameters);

            return Ok("Solicitud de cambio de director técnico creada con éxito.");
        }

        

    }

        
    public class PharmacyOpeningRequestDto
    {
        public string? OwnerName { get; set; }
        public string? OwnerDocument { get; set; }
        public string? OwnerEmail { get; set; }
        public string? OwnerPhone { get; set; }
        public string? DirectorName { get; set; }
        public string? DirectorLastName { get; set; }
        public string? DirectorDocument { get; set; }
        public string? DirectorEmail { get; set; }
        public string? DirectorPhone { get; set; }
        public string? DirectorProfession { get; set; }
        public string? DirectorExequatur { get; set; }
        public DateTime IssueDate { get; set; }
        public int PharmacyTypeID { get; set; }
        public string? NewPharmacyName { get; set; }
        public string? PharmacyAddress { get; set; }
        public int MunicipioID { get; set; }
    }

    public class PharmacyRenewalRequestDto
    {
        public int DrugStoreID { get; set; }
        public string? PharmacyAddress { get; set; }
        public int MunicipioID { get; set; }
        public int PharmacyTypeID { get; set; }
        public string? CurrentPharmacyName { get; set; }
    }

    public class TechnicalDirectorChangeRequestDto
    {
        public int DrugStoreID { get; set; }
        public string? NewDirectorName { get; set; }
        public string? NewDirectorLastName { get; set; }
        public string? NewDirectorDocument { get; set; }
        public string? NewDirectorEmail { get; set; }
        public string? NewDirectorPhone { get; set; }
        public string? NewDirectorProfession { get; set; }
        public string? NewDirectorExequatur { get; set; }
        public DateTime IssueDate { get; set; }
    }

    public class PharmacyNameChangeRequestDto
    {
        public int DrugStoreID { get; set; }
        public string? NewPharmacyName { get; set; }
    }

    public class OwnerChangeRequestDto
    {
        public int DrugStoreID { get; set; }
        public string? NewOwnerName { get; set; }
        public string? NewOwnerDocument { get; set; }
        public string? NewOwnerEmail { get; set; }
        public string? NewOwnerPhone { get; set; }
    }

    public class AddressChangeRequestDto
    {
        public int DrugStoreID { get; set; }
        public string? NewAddress { get; set; }
        public int NewMunicipioID { get; set; }
    }
}

