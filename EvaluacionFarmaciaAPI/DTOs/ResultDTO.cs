using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class ResultDTO
    {
        public int ResultsId { get; set; }
        public int InspectionId { get; set; }
        public string? Observations { get; set; }
        public string? DescriptionsResults { get; set; }
        
        public static ResultDTO FromModel (Result result)
        {
            return new ResultDTO
            {
                ResultsId = result.ResultsId,
                InspectionId = result.InspectionId,
                Observations = result.Observations,
                DescriptionsResults = result.DescriptionsResults
            };
        }
    }
}