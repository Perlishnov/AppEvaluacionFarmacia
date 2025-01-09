using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Permission
{
    public int PermissionId { get; set; }

    public string? NamePerm { get; set; }

    public string DescriptionsPerm { get; set; } = null!;

    public virtual ICollection<PersonType> PersonTypes { get; set; } = new List<PersonType>();
}
