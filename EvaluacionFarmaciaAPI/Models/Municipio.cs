using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Municipio
{
    public int MunicipioId { get; set; }

    public string Nombre { get; set; } = null!;

    public int ProvinciaId { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual Provincium Provincia { get; set; } = null!;
}
