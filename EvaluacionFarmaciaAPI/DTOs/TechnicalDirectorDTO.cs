using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class TechnicalDirectorDTO
    {
        public int DirectorId { get; set; }
        public int DocumentTypeId { get; set; }
        public string DocumentTd { get; set; }
        public string NameTd { get; set; }
        public string LastNameTd { get; set; }
        public string Profession { get; set; }
        public string EmailTd { get; set; }
        public string PhoneTd { get; set; }
        public string? Exequatur { get; set; }
        public DateTime? IssueDate { get; set; }

        public static TechnicalDirectorDTO FromModel (TechnicalDirector technicalDirector)
        {
            return new TechnicalDirectorDTO
            {
                DirectorId = technicalDirector.DirectorId,
                DocumentTypeId = technicalDirector.DocumentTypeId,
                DocumentTd = technicalDirector.DocumentTd,
                NameTd = technicalDirector.NameTd,
                LastNameTd = technicalDirector.LastNameTd,
                Profession = technicalDirector.Profession,
                EmailTd = technicalDirector.EmailTd,
                PhoneTd = technicalDirector.PhoneTd,
                Exequatur = technicalDirector.Exequatur,
                IssueDate = technicalDirector.IssueDate
            };
        }
    }
}