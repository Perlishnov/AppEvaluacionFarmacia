using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class PersonType
{
    public int PersonTypeId { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<UserAccount> UserAccounts { get; set; } = new List<UserAccount>();
}
