using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class UserAccount
{
    public int UserId { get; set; }

    public string Cedula { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int PersonTypeId { get; set; }

    public virtual PersonType PersonType { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

    public virtual ICollection<UserInspection> UserInspections { get; set; } = new List<UserInspection>();
}
