using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class StatusInspection
{
    public int StatusInspId { get; set; }

    public string? StatusInsp { get; set; }

    public virtual ICollection<Inspection> Inspections { get; set; } = new List<Inspection>();
}
