using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class StatusRequest
{
    public int StatusReqId { get; set; }

    public string StatusReq { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
