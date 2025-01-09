using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Municipio
{
    public int MunicipioId { get; set; }

    public string NameMun { get; set; } = null!;

    public int ProvinciaId { get; set; }

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();

    public virtual Provincium Provincia { get; set; } = null!;
}
