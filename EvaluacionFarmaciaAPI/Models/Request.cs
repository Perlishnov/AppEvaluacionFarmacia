using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Request
{
    public int RequestId { get; set; }

    public DateTime SendDate { get; set; }

    public string? Details { get; set; }

    public int UserId { get; set; }

    public int DrugStoreId { get; set; }

    public int RequestTypeId { get; set; }

    public int StatusReqId { get; set; }

    public virtual DrugStore DrugStore { get; set; } = null!;

    public virtual RequestType RequestType { get; set; } = null!;

    public virtual StatusRequest StatusReq { get; set; } = null!;

    public virtual UserAccount User { get; set; } = null!;
}
