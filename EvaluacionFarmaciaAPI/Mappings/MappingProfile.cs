using AutoMapper;
using EvaluacionFarmaciaAPI.DTOs;
using EvaluacionFarmaciaAPI.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapear DTO a modelo y viceversa
        CreateMap<DrugStoreDTO, DrugStore>();
        CreateMap<DrugStore, DrugStoreDTO>();
        CreateMap<UserAccount, UserAccountDTO>().ReverseMap();

    }
}
