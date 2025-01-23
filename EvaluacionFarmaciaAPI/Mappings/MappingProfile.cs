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

        //LicenseController
        CreateMap<License, LicenseDTO>();
        CreateMap<LicenseDTO, License>();

    }
}
