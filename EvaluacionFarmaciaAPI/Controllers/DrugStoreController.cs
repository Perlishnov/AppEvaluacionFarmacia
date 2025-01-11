using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluacionFarmaciaAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using EvaluacionFarmaciaAPI.DTOs;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrugStoresController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;

        public DrugStoresController(FarmaciaDesarrolloWebContext context)
        {
            _context = context;
        }

        // GET: api/DrugStores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DrugStore>>> GetDrugStores()
        {
            return await _context.DrugStores.ToListAsync();
        }

        //GET: api/DrugStores/sp
        [HttpGet("sp")]
        public async Task<ActionResult<IEnumerable<DrugStore>>> GetDrugStoresSP()
        {
            var drugStores = await _context.DrugStores
                .FromSqlRaw("EXEC sp_GetDrugStores")
                .ToListAsync();

            return Ok(drugStores);
        }

        // GET: api/DrugStore/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DrugStore>> GetDrugStore(int id)
        {
            // Buscar el DrugStore por ID
            var drugStore = await _context.DrugStores
                .Where(ds => ds.DrugStoreId == id)
                .FirstOrDefaultAsync();

            if (drugStore == null)
            {
                // Si no se encuentra el DrugStore, devolver 404 Not Found
                return NotFound();
            }

            // Si se encuentra, devolver el DrugStore
            return Ok(drugStore);
        }

        // POST: api/DrugStore
        [HttpPost]
        public async Task<ActionResult<DrugStore>> PostDrugStore([FromBody] DrugStore newDrugStore)
        {
            if (newDrugStore == null)
            {
                return BadRequest("DrugStore data is required.");
            }

            // Agregar el nuevo DrugStore al contexto
            _context.DrugStores.Add(newDrugStore);

            try
            {
                // Guardar los cambios en la base de datos
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Error al insertar el DrugStore.");
            }

            // Devolver una respuesta 201 (creado) con la información del nuevo DrugStore
            return CreatedAtAction(nameof(GetDrugStores), new { id = newDrugStore.DrugStoreId }, newDrugStore);
        }


        // POST: api/DrugStore
        [HttpPost("sp")]
        public async Task<ActionResult> PostDrugStoreSP([FromBody] DrugStore newDrugStore)
        {
            if (newDrugStore == null)
            {
                return BadRequest("DrugStore data is required.");
            }

            try
            {
                // Ejecutar el stored procedure
                var parameters = new[]
                {
                    new SqlParameter("@DocumentDS", newDrugStore.DocumentDs),
                    new SqlParameter("@NameDS", newDrugStore.NameDs),
                    new SqlParameter("@PhoneDS", newDrugStore.PhoneDs),
                    new SqlParameter("@Address", newDrugStore.Address),
                    new SqlParameter("@ShortName", newDrugStore.ShortName),
                    new SqlParameter("@Altitude", newDrugStore.Altitude),
                    new SqlParameter("@Longitude", newDrugStore.Longitude),
                    new SqlParameter("@RegistrationDate", newDrugStore.RegistrationDate),
                    new SqlParameter("@DrugStoreTypeID", newDrugStore.DrugStoreTypeId),
                    new SqlParameter("@DocumentTypeID", newDrugStore.DocumentTypeId),
                    new SqlParameter("@MunicipioID", newDrugStore.MunicipioId),
                    new SqlParameter("@LicenseID", newDrugStore.LicenseId),
                    new SqlParameter("@DirectorID", newDrugStore.DirectorId),
                    new SqlParameter("@OwnerID", newDrugStore.OwnerId)
                };

                // Llamar al stored procedure
                await _context.Database.ExecuteSqlRawAsync("EXEC sp_InsertDrugStore @DocumentDS, @NameDS, @PhoneDS, @Address, @ShortName, @Altitude, @Longitude, @RegistrationDate, @DrugStoreTypeID, @DocumentTypeID, @MunicipioID, @LicenseID, @DirectorID, @OwnerID", parameters);

                return StatusCode(201); // HTTP 201 Created
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        
    }
}
