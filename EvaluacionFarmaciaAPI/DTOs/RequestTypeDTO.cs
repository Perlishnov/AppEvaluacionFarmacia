using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class RequestTypeDTO
    {
        public int RequestTypeId { get; set; }
        public string TypeReq { get; set; }
        
        public static RequestTypeDTO FromModel (RequestType requestType)
        {
            return new RequestTypeDTO
            {
                RequestTypeId = requestType.RequestTypeId,
                TypeReq = requestType.TypeReq
            };
        }
    }
}