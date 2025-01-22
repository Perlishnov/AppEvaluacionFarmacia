using AutoMapper;
using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicenseController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;
        private readonly IMapper _mapper;

        public LicenseController(FarmaciaDesarrolloWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/licenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LicenseDTO>>> GetLicenses()
        {
            var licenses = await _context.Licenses.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<LicenseDTO>>(licenses));
        }

        // GET: api/licenses/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LicenseDTO>> GetLicense(int id)
        {
            var license = await _context.Licenses.FindAsync(id);

            if (license == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<LicenseDTO>(license));
        }

        // POST: api/licenses
        [HttpPost]
        public async Task<ActionResult<LicenseDTO>> CreateLicense([FromBody] LicenseDTO licenseDTO)
        {
            var license = _mapper.Map<License>(licenseDTO);

            _context.Licenses.Add(license);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLicense), new { id = license.LicenseId }, licenseDTO);
        }

        // PUT: api/licenses/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLicense(int id, [FromBody] LicenseDTO licenseDTO)
        {
            var existingLicense = await _context.Licenses.FindAsync(id);
            if (existingLicense == null)
            {
                return NotFound();
            }

            _mapper.Map(licenseDTO, existingLicense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/licenses/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLicense(int id)
        {
            var license = await _context.Licenses.FindAsync(id);
            if (license == null)
            {
                return NotFound();
            }

            _context.Licenses.Remove(license);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/licenses/total
        [HttpGet("total")]
        public async Task<ActionResult<int>> GetTotalLicenses()
        {
            var totalLicenses = await _context.Licenses.CountAsync();
            return Ok(totalLicenses);
        }
    }
}
