using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class ProvinciaDTO
    {
        public int ProvinciaId { get; set; }
        public string NameProv {get; set; }

        static public ProvinciaDTO FromModel (Provincium provincium) => new ProvinciaDTO
        {
            ProvinciaId = provincium.ProvinciaId,
            NameProv = provincium.NameProv
        };
    }
}