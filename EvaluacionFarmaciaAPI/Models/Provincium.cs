using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.DTOs;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Provincium
{
    public int ProvinciaId { get; set; }

    public string NameProv { get; set; } = null!;

    public virtual ICollection<Municipio> Municipios { get; set; } = new List<Municipio>();

    public static Provincium FromDTO (ProvinciaDTO provinciaDTO)
    {
        return new Provincium
        {
            ProvinciaId = provinciaDTO.ProvinciaId,
            NameProv = provinciaDTO.NameProv
        };
    }
}
