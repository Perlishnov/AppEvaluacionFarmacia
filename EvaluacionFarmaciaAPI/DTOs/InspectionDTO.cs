using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class InspectionDTO
    {
        public int InspectionId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int StatusInspId { get; set; }
        public int DrugStoreId { get; set; }

        public static InspectionDTO FromModel (Inspection inspection)
        {
            return new InspectionDTO
            {
                InspectionId = inspection.InspectionId,
                ScheduledDate = inspection.ScheduledDate,
                ModifiedDate = inspection.ModifiedDate,
                StatusInspId = inspection.StatusInsp,
                DrugStoreId = inspection.DrugStore
            };
        }

    }
}