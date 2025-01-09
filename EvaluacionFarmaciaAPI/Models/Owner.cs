using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class Owner
{
    public int OwnerId { get; set; }

    public int DocumentTypeId { get; set; }

    public string DocumentOwner { get; set; } = null!;

    public string NameOwner { get; set; } = null!;

    public string LastNameOwner { get; set; } = null!;

    public string EmailOwner { get; set; } = null!;

    public string PhoneOwner { get; set; } = null!;

    public virtual DocumentType DocumentType { get; set; } = null!;

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();
}
