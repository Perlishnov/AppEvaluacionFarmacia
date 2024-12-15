using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class UserInspection
{
    public int UserId { get; set; }

    public int InspectionId { get; set; }

    public DateTime ScheduledDate { get; set; }

    public bool Confirmed { get; set; }

    public virtual Inspection Inspection { get; set; } = null!;

    public virtual UserAccount User { get; set; } = null!;
}
