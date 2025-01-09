using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class License
{
    public int LicenseId { get; set; }

    public string NameLic { get; set; } = null!;

    public string TypeLic { get; set; } = null!;

    public string DescriptionLic { get; set; } = null!;

    public DateTime IssueDate { get; set; }

    public DateTime ExpirationDate { get; set; }

    public string StatusLic { get; set; } = null!;

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
