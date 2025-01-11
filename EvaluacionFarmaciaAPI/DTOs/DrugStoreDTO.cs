using System;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class DrugStoreDTO
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

        static public DrugStoreDTO FromModel (DrugStore drugstore)
        {
            return new DrugStoreDTO
            {
                DrugStoreId = drugstore.DrugStoreId,
                DocumentDs = drugstore.DocumentDs,
                NameDs = drugstore.NameDs,
                PhoneDs = drugstore.PhoneDs,
                Address = drugstore.Address,
                ShortName =  drugstore.ShortName,
                Altitude = drugstore.Altitude,
                Longitude = drugstore.Longitude,
                RegistrationDate = drugstore.RegistrationDate,
                DrugStoreTypeId = drugstore.DrugStoreTypeId,
                DocumentTypeId = drugstore.DocumentTypeId,
                MunicipioId = drugstore.MunicipioId,
                LicenseId = drugstore.LicenseId,
                DirectorId = drugstore.DirectorId,
                OwnerId = drugstore.OwnerId
            };
        }
    }
}