using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class StatusInspectionDTO
    {
        public int StatusInspId { get; set; }
        public string? StatusInsp { get; set; }

        public static StatusInspectionDTO FromModel (StatuSinspection statuSinspection)
        {
            return new StatusInspectionDTO
            {
                StatusInspId = statuSinspection.StatusInspId,
                StatusInsp = statuSinspection.StatusInsp
            };
        }
    }
}