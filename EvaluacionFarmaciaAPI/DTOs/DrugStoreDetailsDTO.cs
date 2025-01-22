namespace EvaluacionFarmaciaAPI.DTOs;

public class DrugStoreDetailsDto
{
    public required int DrugStoreID { get; set; }
    public required string DocumentDS { get; set; }
    public required string NameDS { get; set; }
    public required string PhoneDS { get; set; }
    public required string Address { get; set; }
    public required string ShortName { get; set; }
    public double? Altitude { get; set; }
    public double? Longitude { get; set; }
    public DateTime RegistrationDate { get; set; }
    public required string DrugStoreTypeName { get; set; }
    public required string DocumentTypeName { get; set; }
    public required string MunicipioName { get; set; }
    public required string LicenseName { get; set; }
    public required string DirectorName { get; set; }
    public required string OwnerName { get; set; }
}
