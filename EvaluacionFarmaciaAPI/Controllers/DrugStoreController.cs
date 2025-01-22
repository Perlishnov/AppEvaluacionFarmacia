using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.Data.SqlClient;
using EvaluacionFarmaciaAPI.DTOs;
using AutoMapper;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrugStoresController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;
        private readonly IMapper _mapper;

        public DrugStoresController(FarmaciaDesarrolloWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/DrugStores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DrugStoreDetailsDto>>> GetDrugStores()
        {
            // Ejecuta sp_GetDrugStores
            var drugStores = await _context.DrugStoreDetailsDto
                .FromSqlInterpolated($"EXEC sp_GetDrugStores")
                .ToListAsync();

            if (!drugStores.Any())
            {
                return NotFound(new { Message = "No se encontraron farmacias." });
            }

            return Ok(drugStores);
        }

        // GET: api/DrugStores/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DrugStoreDetailsDto>> GetDrugStore(int id)
        {
            // Ejecutar consulta con JOIN para obtener un solo DrugStoreDetailsDto
            var drugStore = await _context.DrugStoreDetailsDto
                .FromSqlInterpolated($"EXEC sp_GetDrugstoreById @DrugStoreId = {id}")
                .FirstOrDefaultAsync();

            if (drugStore == null)
            {
                return NotFound(new { Message = $"No se encontró la farmacia con ID {id}." });
            }

            return Ok(drugStore);
        }

        // Endpoint para obtener el total de farmacias
        //GET: api/DrugStores/total
        [HttpGet("total")]
        public async Task<IActionResult> GetTotalDrugStores()
        {
            // Obtiene el total de farmacias
            int total = await _context.DrugStores.CountAsync();
            return Ok(total);
        }

        // Obtener farmacias por OwnerId
        //GET: api/DrugStores/by-owner/{ownerId}
        [HttpGet("details/by-owner/{ownerId}")]
        public async Task<IActionResult> GetDrugStoresWithDetailsByOwnerId(int ownerId)
        {
            try
            {
                var drugStores = await _context.DrugStoreDetailsDto
                    .FromSqlInterpolated($"EXEC sp_GetDrugStoresByOwnerId @OwnerId = {ownerId}")
                    .ToListAsync();

                if (!drugStores.Any())
                {
                    return NotFound(new { Message = "No se encontraron farmacias para el propietario especificado." });
                }

                return Ok(drugStores);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { Message = "Error interno del servidor." });
            }
        }


        // POST: api/DrugStores
        [HttpPost]
        public async Task<ActionResult> PostDrugStore([FromBody] DrugStoreDTO drugStoreDto)
        {
            if (drugStoreDto == null)
            {
                return BadRequest("DrugStore data is required.");
            }

            // Mapear DTO al modelo
            var drugStore = _mapper.Map<DrugStore>(drugStoreDto);

            _context.DrugStores.Add(drugStore);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al guardar la farmacia: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetDrugStore), new { id = drugStore.DrugStoreId }, drugStore);
        }


        // PUT: api/DrugStores/5
        [HttpPut("{id}")]
        public async Task<ActionResult> PutDrugStore(int id, [FromBody] DrugStoreDTO drugStoreDto)
        {
            if (drugStoreDto == null)
            {
                return BadRequest("DrugStore data is required.");
            }

            // Buscar el DrugStore existente en la base de datos
            var existingDrugStore = await _context.DrugStores.FindAsync(id);
            if (existingDrugStore == null)
            {
                return NotFound($"DrugStore with ID {id} not found.");
            }

            // Mapear los datos del DTO al modelo existente
            _mapper.Map(drugStoreDto, existingDrugStore);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error updating the DrugStore: {ex.Message}");
            }

            return NoContent(); // 204 No Content
        }


        //DELETE: api/DrugStores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDrugStore(int id)
        {
            // Buscar el DrugStore existente
            var drugStore = await _context.DrugStores.FindAsync(id);
            if (drugStore == null)
            {
                return NotFound($"DrugStore with ID {id} not found.");
            }

            // Eliminar el DrugStore
            _context.DrugStores.Remove(drugStore);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error deleting the DrugStore: {ex.Message}");
            }

            return NoContent(); // 204 No Content
        }


        
    }
}
