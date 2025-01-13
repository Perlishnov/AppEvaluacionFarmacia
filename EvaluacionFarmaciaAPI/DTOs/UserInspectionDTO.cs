using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class UserInspectionDTO
    {
        public int UserId { get; set; }
        public int InspectionId { get; set; }
        public DateTime ScheduledDate { get; set; }

        public static UserInspectionDTO FromModel (UserInspection userInspection)
        {
            return new UserInspectionDTO
            {
                UserId = userInspection.UserId,
                InspectionId = userInspection.InspectionId,
                ScheduledDate = userInspection.ScheduledDate
            };
        }
    }
}