using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class TechnicalDirector
{
    public int DirectorId { get; set; }

    public string Cedula { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Profession { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Exequatur { get; set; } = null!;

    public DateTime IssueDate { get; set; }

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
