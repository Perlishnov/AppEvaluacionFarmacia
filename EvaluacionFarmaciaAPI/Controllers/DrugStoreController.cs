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
        public async Task<ActionResult<IEnumerable<DrugStoreDTO>>> GetDrugStores()
        {
            var drugStores = await _context.DrugStores.ToListAsync();

            // Mapear a DTO
            var drugStoreDtos = _mapper.Map<IEnumerable<DrugStoreDTO>>(drugStores);

            return Ok(drugStoreDtos);
        }

        // GET: api/DrugStore/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DrugStoreDTO>> GetDrugStore(int id)
        {
            var drugStore = await _context.DrugStores
                .Where(ds => ds.DrugStoreId == id)
                .FirstOrDefaultAsync();

            if (drugStore == null)
            {
                return NotFound();
            }

            // Mapear a DTO
            var drugStoreDto = _mapper.Map<DrugStoreDTO>(drugStore);

            return Ok(drugStoreDto);
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


        // PUT: api/DrugStore/5
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


        //DELETE: api/DrugStore/5
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
