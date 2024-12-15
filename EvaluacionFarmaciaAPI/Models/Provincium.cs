using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Provincium
{
    public int ProvinciaId { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Municipio> Municipios { get; set; } = new List<Municipio>();
}
