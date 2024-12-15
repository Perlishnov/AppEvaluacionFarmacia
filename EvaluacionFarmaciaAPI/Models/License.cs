using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class License
{
    public int LicenseId { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public DateTime IssueDate { get; set; }

    public DateTime ExpirationDate { get; set; }

    public string State { get; set; } = null!;

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
