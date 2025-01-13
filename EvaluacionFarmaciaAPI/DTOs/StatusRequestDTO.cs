using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class StatusRequestDTO
    {
        public int StatusReqId { get; set; }
        public string StatusReq { get; set; }

        public static StatusRequestDTO FromModel (StatusRequest statusRequest)
        {
            return new StatusRequestDTO
            {
                StatusReqId = statusRequest.StatusReqId,
                StatusReq = statusRequest.StatusReq
            };
        }
    }
}