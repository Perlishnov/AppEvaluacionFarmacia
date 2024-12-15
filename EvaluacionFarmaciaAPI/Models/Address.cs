using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Address
{
    public int AddressId { get; set; }

    public string Street { get; set; } = null!;

    public int ProvinciaId { get; set; }

    public int MunicipioId { get; set; }

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();

    public virtual Municipio Municipio { get; set; } = null!;

    public virtual Provincium Provincia { get; set; } = null!;
}
