using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluacionFarmaciaAPI.Models;
using EvaluacionFarmaciaAPI.DTOs;
using AutoMapper;

namespace EvaluacionFarmaciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly FarmaciaDesarrolloWebContext _context;
        private readonly IMapper _mapper;

        public FilterController(FarmaciaDesarrolloWebContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Filter/provincias
        [HttpGet("provincias")]
        public async Task<ActionResult<IEnumerable<ProvinciaDTO>>> GetProvincias()
        {
            var provincias = await _context.Provincia.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProvinciaDTO>>(provincias));
        }

        // GET: api/Filter/municipios/{provinciaId}
        [HttpGet("municipios/{provinciaId}")]
        public async Task<ActionResult<IEnumerable<MunicipioDTO>>> GetMunicipiosByProvincia(int provinciaId)
        {
            var municipios = await _context.Municipios
                .Where(m => m.ProvinciaId == provinciaId)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<MunicipioDTO>>(municipios));
        }

        // GET: api/Filter/documentType
        [HttpGet("documentType")]
        public async Task<ActionResult<IEnumerable<DocumentTypeDTO>>> GetDocumentTypes()
        {
            var documentTypes = await _context.DocumentTypes.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DocumentTypeDTO>>(documentTypes));
        }

        // GET: api/Filter/personType
        [HttpGet("personType")]
        public async Task<ActionResult<IEnumerable<PersonTypeDTO>>> GetPersonTypes()
        {
            var personTypes = await _context.PersonTypes.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PersonTypeDTO>>(personTypes));
        }

        // GET: api/Filter/requestType
        [HttpGet("requestType")]
        public async Task<ActionResult<IEnumerable<RequestTypeDTO>>> GetRequestTypes()
        {
            var requestTypes = await _context.RequestTypes.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<RequestTypeDTO>>(requestTypes));
        }

        // GET: api/Filter/drugStoreType
        [HttpGet("drugStoreType")]
        public async Task<ActionResult<IEnumerable<DrugStoreTypeDTO>>> GetDrugStoreTypes()
        {
            var drugStoreTypes = await _context.DrugStoreTypes.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<DrugStoreTypeDTO>>(drugStoreTypes));
        }
    }
}
 //No funciona
 