using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class UserAccount
{
    public int UserId { get; set; }

    public string DocumentUser { get; set; } = null!;

    public string NameUser { get; set; } = null!;

    public string LastNameUser { get; set; } = null!;

    public string EmailUser { get; set; } = null!;

    public string PasswordUser { get; set; } = null!;

    public int DocumentTypeId { get; set; }

    public int PersonTypeId { get; set; }

    public virtual DocumentType DocumentType { get; set; } = null!;

    public virtual PersonType PersonType { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

    public virtual ICollection<UserInspection> UserInspections { get; set; } = new List<UserInspection>();
}
