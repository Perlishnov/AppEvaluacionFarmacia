using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class DocumentType
{
    public int DocumentTypeId { get; set; }

    public string NameDocType { get; set; } = null!;

    public virtual ICollection<DrugStore> DrugStores { get; set; } = new List<DrugStore>();

    public virtual ICollection<Owner> Owners { get; set; } = new List<Owner>();

    public virtual ICollection<TechnicalDirector> TechnicalDirectors { get; set; } = new List<TechnicalDirector>();

    public virtual ICollection<UserAccount> UserAccounts { get; set; } = new List<UserAccount>();
}
