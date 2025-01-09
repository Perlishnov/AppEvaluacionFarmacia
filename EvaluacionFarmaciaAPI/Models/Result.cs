using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Result
{
    public int ResultsId { get; set; }

    public int InspectionId { get; set; }

    public string? Observations { get; set; }

    public string DescriptionsResults { get; set; } = null!;

    public virtual Inspection Inspection { get; set; } = null!;
}
