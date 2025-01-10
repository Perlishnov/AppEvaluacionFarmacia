using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionFarmaciaAPI.Models;

public partial class FarmaciaDesarrolloWebContext : DbContext
{
    public FarmaciaDesarrolloWebContext()
    {
    }

    public FarmaciaDesarrolloWebContext(DbContextOptions<FarmaciaDesarrolloWebContext> options)
        : base(options)
    {
    }

    public virtual DbSet<DocumentType> DocumentTypes { get; set; }

    public virtual DbSet<DrugStore> DrugStores { get; set; }

    public virtual DbSet<DrugStoreType> DrugStoreTypes { get; set; }

    public virtual DbSet<Inspection> Inspections { get; set; }

    public virtual DbSet<License> Licenses { get; set; }

    public virtual DbSet<Municipio> Municipios { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<PersonType> PersonTypes { get; set; }

    public virtual DbSet<Provincium> Provincia { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<RequestType> RequestTypes { get; set; }

    public virtual DbSet<Result> Results { get; set; }

    public virtual DbSet<StatuSinspection> StatuSinspections { get; set; }

    public virtual DbSet<StatusRequest> StatusRequests { get; set; }

    public virtual DbSet<TechnicalDirector> TechnicalDirectors { get; set; }

    public virtual DbSet<UserAccount> UserAccounts { get; set; }

    public virtual DbSet<UserInspection> UserInspections { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=FarmaciaDesarrolloWeb;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CI_AS");

        modelBuilder.Entity<DocumentType>(entity =>
        {
            entity.HasKey(e => e.DocumentTypeId).HasName("PK__Document__A48A06CEB7B6A819");

            entity.ToTable("DocumentType");

            entity.Property(e => e.DocumentTypeId).HasColumnName("documentTypeID");
            entity.Property(e => e.NameDocType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("nameDocType");
        });

        modelBuilder.Entity<DrugStore>(entity =>
        {
            entity.HasKey(e => e.DrugStoreId).HasName("PK__DrugStor__9C9D973973B25506");

            entity.ToTable("DrugStore");

            entity.HasIndex(e => e.DocumentDs, "UQ__DrugStor__EFAA5573B6222DCC").IsUnique();

            entity.Property(e => e.DrugStoreId).HasColumnName("drugStoreID");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Altitude).HasColumnName("altitude");
            entity.Property(e => e.DirectorId).HasColumnName("directorID");
            entity.Property(e => e.DocumentDs)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("documentDS");
            entity.Property(e => e.DocumentTypeId).HasColumnName("documentTypeID");
            entity.Property(e => e.DrugStoreTypeId).HasColumnName("drugStoreTypeID");
            entity.Property(e => e.LicenseId).HasColumnName("licenseID");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.MunicipioId).HasColumnName("municipioID");
            entity.Property(e => e.NameDs)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameDS");
            entity.Property(e => e.OwnerId).HasColumnName("ownerID");
            entity.Property(e => e.PhoneDs)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phoneDS");
            entity.Property(e => e.RegistrationDate).HasColumnName("registrationDate");
            entity.Property(e => e.ShortName)
                .HasMaxLength(8)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("shortName");

            entity.HasOne(d => d.Director).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.DirectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__direc__6EF57B66");

            entity.HasOne(d => d.DocumentType).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.DocumentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__docum__6C190EBB");

            entity.HasOne(d => d.DrugStoreType).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.DrugStoreTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__drugS__6B24EA82");

            entity.HasOne(d => d.License).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.LicenseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__licen__6E01572D");

            entity.HasOne(d => d.Municipio).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.MunicipioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__munic__6D0D32F4");

            entity.HasOne(d => d.Owner).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__owner__6FE99F9F");
        });

        modelBuilder.Entity<DrugStoreType>(entity =>
        {
            entity.HasKey(e => e.DrugStoreTypeId).HasName("PK__DrugStor__1094FEF5E3321C1D");

            entity.ToTable("DrugStoreType");

            entity.Property(e => e.DrugStoreTypeId).HasColumnName("drugStoreTypeID");
            entity.Property(e => e.TypeDrugstore)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("typeDrugstore");
        });

        modelBuilder.Entity<Inspection>(entity =>
        {
            entity.HasKey(e => e.InspectionId).HasName("PK__Inspecti__2BAC0D2930C03030");

            entity.ToTable("Inspection");

            entity.Property(e => e.InspectionId).HasColumnName("inspectionID");
            entity.Property(e => e.DrugStoreId).HasColumnName("drugStoreID");
            entity.Property(e => e.ModifiedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");
            entity.Property(e => e.ScheduledDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("scheduledDate");
            entity.Property(e => e.StatusInspId).HasColumnName("statusInspID");

            entity.HasOne(d => d.DrugStore).WithMany(p => p.Inspections)
                .HasForeignKey(d => d.DrugStoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inspectio__drugS__778AC167");

            entity.HasOne(d => d.StatusInsp).WithMany(p => p.Inspections)
                .HasForeignKey(d => d.StatusInspId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Inspection_StatuSInspection");
        });

        modelBuilder.Entity<License>(entity =>
        {
            entity.HasKey(e => e.LicenseId).HasName("PK__License__3CBDB9CAEBED21DC");

            entity.ToTable("License");

            entity.Property(e => e.LicenseId).HasColumnName("licenseID");
            entity.Property(e => e.DescriptionLic)
                .HasColumnType("text")
                .HasColumnName("descriptionLic");
            entity.Property(e => e.ExpirationDate)
                .HasColumnType("datetime")
                .HasColumnName("expirationDate");
            entity.Property(e => e.IssueDate)
                .HasColumnType("datetime")
                .HasColumnName("issueDate");
            entity.Property(e => e.NameLic)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameLic");
            entity.Property(e => e.StatusLic)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("statusLic");
            entity.Property(e => e.TypeLic)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("typeLic");
        });

        modelBuilder.Entity<Municipio>(entity =>
        {
            entity.HasKey(e => e.MunicipioId).HasName("PK__Municipi__CBC36A21EC3F70AF");

            entity.ToTable("Municipio");

            entity.Property(e => e.MunicipioId).HasColumnName("municipioID");
            entity.Property(e => e.NameMun)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameMun");
            entity.Property(e => e.ProvinciaId).HasColumnName("provinciaID");

            entity.HasOne(d => d.Provincia).WithMany(p => p.Municipios)
                .HasForeignKey(d => d.ProvinciaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Municipio__provi__6754599E");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.OwnerId).HasName("PK__Owner__7E4B716C2BD24928");

            entity.ToTable("Owner");

            entity.HasIndex(e => e.DocumentOwner, "UQ__Owner__6BEA33D91A5742CC").IsUnique();

            entity.Property(e => e.OwnerId).HasColumnName("ownerID");
            entity.Property(e => e.DocumentOwner)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("documentOwner");
            entity.Property(e => e.DocumentTypeId).HasColumnName("documentTypeID");
            entity.Property(e => e.EmailOwner)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("emailOwner");
            entity.Property(e => e.LastNameOwner)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastNameOwner");
            entity.Property(e => e.NameOwner)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameOwner");
            entity.Property(e => e.PhoneOwner)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phoneOwner");

            entity.HasOne(d => d.DocumentType).WithMany(p => p.Owners)
                .HasForeignKey(d => d.DocumentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Owner__documentT__5BE2A6F2");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.PermissionId).HasName("PK__Permissi__D821317CE4C9CE7E");

            entity.ToTable("Permission");

            entity.Property(e => e.PermissionId).HasColumnName("permissionID");
            entity.Property(e => e.DescriptionsPerm)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("descriptionsPerm");
            entity.Property(e => e.NamePerm)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("namePerm");

            entity.HasMany(d => d.PersonTypes).WithMany(p => p.Permissions)
                .UsingEntity<Dictionary<string, object>>(
                    "PersonPermission",
                    r => r.HasOne<PersonType>().WithMany()
                        .HasForeignKey("PersonTypeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__PersonPer__perso__7B5B524B"),
                    l => l.HasOne<Permission>().WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__PersonPer__permi__7A672E12"),
                    j =>
                    {
                        j.HasKey("PermissionId", "PersonTypeId").HasName("PK__PersonPe__E77F513DEFC1843A");
                        j.ToTable("PersonPermission");
                        j.IndexerProperty<int>("PermissionId").HasColumnName("permissionID");
                        j.IndexerProperty<int>("PersonTypeId").HasColumnName("personTypeID");
                    });
        });

        modelBuilder.Entity<PersonType>(entity =>
        {
            entity.HasKey(e => e.PersonTypeId).HasName("PK__PersonTy__F5E6041220AA4847");

            entity.ToTable("PersonType");

            entity.Property(e => e.PersonTypeId).HasColumnName("personTypeID");
            entity.Property(e => e.TypePerson)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("typePerson");
        });

        modelBuilder.Entity<Provincium>(entity =>
        {
            entity.HasKey(e => e.ProvinciaId).HasName("PK__Provinci__671F1345E3A46435");

            entity.Property(e => e.ProvinciaId).HasColumnName("provinciaID");
            entity.Property(e => e.NameProv)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameProv");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Request__E3C5DE513CE8ACE7");

            entity.ToTable("Request");

            entity.Property(e => e.RequestId).HasColumnName("requestID");
            entity.Property(e => e.Details)
                .HasColumnType("text")
                .HasColumnName("details");
            entity.Property(e => e.DrugStoreId).HasColumnName("drugStoreID");
            entity.Property(e => e.RequestTypeId).HasColumnName("requestTypeID");
            entity.Property(e => e.SendDate)
                .HasColumnType("datetime")
                .HasColumnName("sendDate");
            entity.Property(e => e.StatusReqId).HasColumnName("statusReqID");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.DrugStore).WithMany(p => p.Requests)
                .HasForeignKey(d => d.DrugStoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__drugSto__02FC7413");

            entity.HasOne(d => d.RequestType).WithMany(p => p.Requests)
                .HasForeignKey(d => d.RequestTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__request__03F0984C");

            entity.HasOne(d => d.StatusReq).WithMany(p => p.Requests)
                .HasForeignKey(d => d.StatusReqId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__statusR__04E4BC85");

            entity.HasOne(d => d.User).WithMany(p => p.Requests)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__userID__02084FDA");
        });

        modelBuilder.Entity<RequestType>(entity =>
        {
            entity.HasKey(e => e.RequestTypeId).HasName("PK__RequestT__DEA2DAE8F6F8BEFC");

            entity.ToTable("RequestType");

            entity.Property(e => e.RequestTypeId).HasColumnName("requestTypeID");
            entity.Property(e => e.RequestType1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestType");
        });

        modelBuilder.Entity<Result>(entity =>
        {
            entity.HasKey(e => e.ResultsId).HasName("PK__Results__A898B8918320CDC2");

            entity.Property(e => e.ResultsId).HasColumnName("resultsID");
            entity.Property(e => e.DescriptionsResults)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("descriptionsResults");
            entity.Property(e => e.InspectionId).HasColumnName("inspectionID");
            entity.Property(e => e.Observations)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("observations");

            entity.HasOne(d => d.Inspection).WithMany(p => p.Results)
                .HasForeignKey(d => d.InspectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Results__inspect__07C12930");
        });

        modelBuilder.Entity<StatuSinspection>(entity =>
        {
            entity.HasKey(e => e.StatusInspId).HasName("PK__StatuSIn__F029CFDA2AEE2023");

            entity.ToTable("StatuSInspection");

            entity.Property(e => e.StatusInspId).HasColumnName("statusInspID");
            entity.Property(e => e.StatusInsp)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("statusInsp");
        });

        modelBuilder.Entity<StatusRequest>(entity =>
        {
            entity.HasKey(e => e.StatusReqId).HasName("PK__StatusRe__A16B9C5AFBB26209");

            entity.ToTable("StatusRequest");

            entity.Property(e => e.StatusReqId).HasColumnName("statusReqID");
            entity.Property(e => e.StatusReq)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("statusReq");
        });

        modelBuilder.Entity<TechnicalDirector>(entity =>
        {
            entity.HasKey(e => e.DirectorId).HasName("PK__Technica__418D832EE0E806D5");

            entity.ToTable("TechnicalDirector");

            entity.HasIndex(e => e.PhoneTd, "UQ__Technica__960F471D18D975C0").IsUnique();

            entity.HasIndex(e => e.DocumentTd, "UQ__Technica__EFABD75C97BF901E").IsUnique();

            entity.Property(e => e.DirectorId).HasColumnName("directorID");
            entity.Property(e => e.DocumentTd)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("documentTD");
            entity.Property(e => e.DocumentTypeId).HasColumnName("documentTypeID");
            entity.Property(e => e.EmailTd)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("emailTD");
            entity.Property(e => e.Exequatur)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("exequatur");
            entity.Property(e => e.IssueDate)
                .HasColumnType("datetime")
                .HasColumnName("issueDate");
            entity.Property(e => e.LastNameTd)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastNameTD");
            entity.Property(e => e.NameTd)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameTD");
            entity.Property(e => e.PhoneTd)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phoneTD");
            entity.Property(e => e.Profession)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("profession");

            entity.HasOne(d => d.DocumentType).WithMany(p => p.TechnicalDirectors)
                .HasForeignKey(d => d.DocumentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Technical__docum__5812160E");
        });

        modelBuilder.Entity<UserAccount>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserAcco__CB9A1CDF4202749A");

            entity.ToTable("UserAccount");

            entity.HasIndex(e => e.EmailUser, "UQ__UserAcco__AF638C4C2212B369").IsUnique();

            entity.HasIndex(e => e.DocumentUser, "UQ__UserAcco__B370AB37B1897274").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.DocumentTypeId).HasColumnName("documentTypeID");
            entity.Property(e => e.DocumentUser)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("documentUser");
            entity.Property(e => e.EmailUser)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("emailUser");
            entity.Property(e => e.LastNameUser)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastNameUser");
            entity.Property(e => e.NameUser)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nameUser");
            entity.Property(e => e.PasswordUser)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("passwordUser");
            entity.Property(e => e.PersonTypeId).HasColumnName("personTypeID");

            entity.HasOne(d => d.DocumentType).WithMany(p => p.UserAccounts)
                .HasForeignKey(d => d.DocumentTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserAccou__docum__4D94879B");

            entity.HasOne(d => d.PersonType).WithMany(p => p.UserAccounts)
                .HasForeignKey(d => d.PersonTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserAccou__perso__4E88ABD4");
        });

        modelBuilder.Entity<UserInspection>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.InspectionId }).HasName("PK__User_Ins__4920DC0D20205FE3");

            entity.ToTable("User_Inspection");

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.InspectionId).HasColumnName("inspectionID");
            entity.Property(e => e.ScheduledDate)
                .HasColumnType("datetime")
                .HasColumnName("scheduledDate");

            entity.HasOne(d => d.Inspection).WithMany(p => p.UserInspections)
                .HasForeignKey(d => d.InspectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User_Insp__inspe__7F2BE32F");

            entity.HasOne(d => d.User).WithMany(p => p.UserInspections)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User_Insp__userI__7E37BEF6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
