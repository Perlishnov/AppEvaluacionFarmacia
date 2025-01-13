using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class DocumentTypeDTO
    {
        public int DocumentTypeId { get; set; }
        public string NameDocType { get; set; } 

        public static DocumentTypeDTO FromModel (DocumentType documentType)
        {
            return new DocumentTypeDTO
            {
                DocumentTypeId = documentType.DocumentTypeId,
                NameDocType = documentType.NameDocType
            };
        }
    }
}