using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class DrugStoreType
{
    public int DrugStoreTypeId { get; set; }

    public string TypeDrugstore { get; set; } = null!;

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
