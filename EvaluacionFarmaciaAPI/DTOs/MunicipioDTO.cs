using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class MunicipioDTO
    {
        public int MunicipioId { get; set; }
        public string NameMun { get; set; }
        public int ProvinciaId { get; set; }

        public static MunicipioDTO FromModel (Municipio municipio)
        {
            return new MunicipioDTO
            {
                MunicipioId = municipio.MunicipioId,
                NameMun = municipio.NameMun,
                ProvinciaId = municipio.ProvinciaId,
            };
        }
    }
}