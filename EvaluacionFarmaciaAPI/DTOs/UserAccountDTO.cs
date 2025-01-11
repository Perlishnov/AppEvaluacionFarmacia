using System;
using EvaluacionFarmaciaAPI.Models;

namespace EvaluacionFarmaciaAPI.DTOs
{
    public class UserAccountDTO
    {
        public int UserId { get; set; }
        public string DocumentUser { get; set; } = null!;
        public string NameUser { get; set; } = null!;
        public string LastNameUser { get; set; } = null!;
        public string EmailUser { get; set; } = null!;
        public string PasswordUser { get; set; } = null!;
        public int DocumentTypeId { get; set; }
        public int PersonTypeId { get; set; }

        // Método para mapear el modelo a DTO
        public static UserAccountDTO FromModel(UserAccount userAccount)
        {
            return new UserAccountDTO
            {
                UserId = userAccount.UserId,
                DocumentUser = userAccount.DocumentUser,
                NameUser = userAccount.NameUser,
                LastNameUser = userAccount.LastNameUser,
                EmailUser = userAccount.EmailUser,
                PasswordUser = userAccount.PasswordUser,
                DocumentTypeId = userAccount.DocumentTypeId,
                PersonTypeId = userAccount.PersonTypeId
            };
        }
    }
}
