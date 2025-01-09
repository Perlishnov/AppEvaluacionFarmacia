using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class TechnicalDirector
{
    public int DirectorId { get; set; }

    public int DocumentTypeId { get; set; }

    public string DocumentTd { get; set; } = null!;

    public string NameTd { get; set; } = null!;

    public string LastNameTd { get; set; } = null!;

    public string Profession { get; set; } = null!;

    public string EmailTd { get; set; } = null!;

    public string PhoneTd { get; set; } = null!;

    public string? Exequatur { get; set; }

    public DateTime? IssueDate { get; set; }

    public virtual DocumentType DocumentType { get; set; } = null!;

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
