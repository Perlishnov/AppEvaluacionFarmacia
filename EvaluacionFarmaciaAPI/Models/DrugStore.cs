using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class DrugStore
{
    public int DrugStoreId { get; set; }

    public string Rnc { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Type { get; set; }

    public string Phone { get; set; } = null!;

    public string ShortName { get; set; } = null!;

    public int RegistrationName { get; set; }

    public int AddressId { get; set; }

    public int LocationId { get; set; }

    public int LicenseId { get; set; }

    public int DirectorId { get; set; }

    public int OwnerId { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual TechnicalDirector Director { get; set; } = null!;

    public virtual ICollection<Inspection> Inspections { get; set; } = new List<Inspection>();

    public virtual License License { get; set; } = null!;

    public virtual GeographicLocation Location { get; set; } = null!;

    public virtual Owner Owner { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
