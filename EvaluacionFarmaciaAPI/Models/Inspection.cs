using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Inspection
{
    public int InspectionId { get; set; }

    public DateTime ScheduledDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public int StatusInsp { get; set; }

    public int DrugStoreId { get; set; }

    public virtual DrugStore DrugStore { get; set; } = null!;

    public virtual ICollection<Result> Results { get; set; } = new List<Result>();

    public virtual StatusInspection StatusInspNavigation { get; set; } = null!;

    public virtual ICollection<UserInspection> UserInspections { get; set; } = new List<UserInspection>();
}
