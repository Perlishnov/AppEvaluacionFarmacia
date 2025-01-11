using System;
using System.Collections.Generic;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class PersonTypeDTO
    {
        public int PersonTypeId { get; set; }
        public string TypePerson { get; set; }

        public static PersonTypeDTO FromModel (PersonType personType)
        {
            return new PersonTypeDTO
            {
                PersonTypeId = personType.PersonTypeId,
                TypePerson = personType.TypePerson
            };
        }
    }
}