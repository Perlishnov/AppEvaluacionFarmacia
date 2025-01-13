using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class DrugStoreTypeDTO
    {
        public int DrugStoreTypeId { get; set; }
        public string TypeDrugstore { get; set; }

        public static DrugStoreTypeDTO FromModel (DrugStoreType drugStoreType)
        {
            return new DrugStoreTypeDTO
            {
                DrugStoreTypeId = drugStoreType.DrugStoreTypeId,
                TypeDrugstore = drugStoreType.TypeDrugstore
            };
        }
    }
}
