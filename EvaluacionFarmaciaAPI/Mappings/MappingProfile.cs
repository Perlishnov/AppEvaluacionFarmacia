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
        CreateMap<Owner, OwnerDTO>().ReverseMap();
        CreateMap<TechnicalDirector, TechnicalDirectorDTO>();
        //Mapeo Inspecciones de un inspector
        //TODO Solucionar InspectionGetDTO
        /* CreateMap<Inspection, InspectionGetDTO>()
            .ForMember(dest => dest.DrugStoreName, opt => opt.MapFrom(src => src.DrugStore.NameDs))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.StatusInsp.StatusInsp)); */
        //CreateMap<InspectionDTO, Inspection>();
        
        //Mapeo para el registro de usuario
        CreateMap<UserAccountDTO, UserAccount>()
            .ForMember(dest => dest.PasswordUser, opt => opt.MapFrom(src => BCrypt.Net.BCrypt.HashPassword(src.PasswordUser)));

        //Mapeos de FilterController
        CreateMap<Provincium, ProvinciaDTO>();
        CreateMap<Municipio, MunicipioDTO>();
        CreateMap<DocumentType, DocumentTypeDTO>();
        CreateMap<PersonType, PersonTypeDTO>();
        CreateMap<RequestType, RequestTypeDTO>();
        CreateMap<DrugStoreType, DrugStoreTypeDTO>();

    }
}
