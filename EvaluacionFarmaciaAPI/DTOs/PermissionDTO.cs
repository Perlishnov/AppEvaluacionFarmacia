using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class PermissionDTO
    {
        public int PermissionId { get; set; }
        public string? NamePerm { get; set; }
        public string DescriptionsPerm { get; set; }

        public static PermissionDTO FromModel (Permission permission)
        {
            return new PermissionDTO
            {
                PermissionId = permission.PermissionId,
                NamePerm = permission.NamePerm,
                DescriptionsPerm = permission.DescriptionsPerm
            };
        }
    }
}