using System;
using System.Collections.Generic;

namespace EvaluacionFarmaciaAPI.Models;

public partial class DrugStore
{
    public int DrugStoreId { get; set; }

    public string DocumentDs { get; set; } = null!;

    public string NameDs { get; set; } = null!;

    public string PhoneDs { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string ShortName { get; set; } = null!;

    public double Altitude { get; set; }

    public double Longitude { get; set; }

    public DateOnly RegistrationDate { get; set; }

    public int DrugStoreTypeId { get; set; }

    public int DocumentTypeId { get; set; }

    public int MunicipioId { get; set; }

    public int LicenseId { get; set; }

    public int DirectorId { get; set; }

    public int OwnerId { get; set; }

    public virtual TechnicalDirector Director { get; set; } = null!;

    public virtual DocumentType DocumentType { get; set; } = null!;

    public virtual DrugStoreType DrugStoreType { get; set; } = null!;

    public virtual ICollection<Inspection> Inspections { get; set; } = new List<Inspection>();

    public virtual License License { get; set; } = null!;

    public virtual Municipio Municipio { get; set; } = null!;

    public virtual Owner Owner { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
