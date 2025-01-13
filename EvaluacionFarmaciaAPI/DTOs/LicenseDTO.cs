using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class LicenseDTO
    {
        public int LicenseId { get; set; }

        public string NameLic { get; set; }

        public string TypeLic { get; set; }

        public string DescriptionLic { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public string StatusLic { get; set; }

        public static LicenseDTO FromModel (License license)
        {
            return new LicenseDTO
            {
                LicenseId = license.LicenseId,
                NameLic = license.NameLic,
                TypeLic = license.TypeLic,
                DescriptionLic = license.DescriptionLic,
                IssueDate = license.IssueDate,
                ExpirationDate = license.ExpirationDate,
                StatusLic = license.StatusLic
            };
        }

    }
}