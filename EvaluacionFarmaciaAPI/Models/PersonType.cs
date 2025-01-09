using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class PersonType
{
    public int PersonTypeId { get; set; }

    public string TypePerson { get; set; } = null!;

    public virtual ICollection<UserAccount> UserAccounts { get; set; } = new List<UserAccount>();

    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
