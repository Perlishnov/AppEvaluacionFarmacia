using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class GeographicLocation
{
    public int LocationId { get; set; }

    public decimal Longitude { get; set; }

    public decimal Altitude { get; set; }

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
