using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class RequestDTO
    {
        public int RequestId { get; set; }
        public DateTime SendDate { get; set; }
        public string? Details { get; set; }
        public int UserId { get; set; }
        public int DrugStoreId { get; set; }
        public int RequestTypeId { get; set; }
        public int StatusReqId { get; set; }

        public static RequestDTO FromModel (Request request)
        {
            return new RequestDTO
            {
                RequestId = request.RequestId,
                SendDate = request.SendDate,
                Details = request.Details,
                UserId = request.UserId,
                DrugStoreId = request.DrugStoreId,
                RequestTypeId = request.RequestTypeId,
                StatusReqId = request.StatusReqId
            };
        }
    }
}