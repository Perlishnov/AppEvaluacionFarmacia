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
        //Mapeo Inspecciones de un inspector
        /* CreateMap<Inspection, InspectionGetDTO>()
            .ForMember(dest => dest.DrugStoreName, opt => opt.MapFrom(src => src.DrugStore.NameDs))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Stat.StatusInsp)); */
        //CreateMap<InspectionDTO, Inspection>();


    }
}
