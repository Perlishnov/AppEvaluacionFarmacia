using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EvaluacionFarmaciaAPI.Models;

public partial class PharmacyEvaluationDbContext : DbContext
{
    public PharmacyEvaluationDbContext()
    {
    }

    public PharmacyEvaluationDbContext(DbContextOptions<PharmacyEvaluationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<DrugStore> DrugStores { get; set; }

    public virtual DbSet<GeographicLocation> GeographicLocations { get; set; }

    public virtual DbSet<Inspection> Inspections { get; set; }

    public virtual DbSet<License> Licenses { get; set; }

    public virtual DbSet<Municipio> Municipios { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<PersonType> PersonTypes { get; set; }

    public virtual DbSet<Provincium> Provincia { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<RequestType> RequestTypes { get; set; }

    public virtual DbSet<TechnicalDirector> TechnicalDirectors { get; set; }

    public virtual DbSet<UserAccount> UserAccounts { get; set; }

    public virtual DbSet<UserInspection> UserInspections { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=PharmacyEvaluationDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.AddressId).HasName("PK__Address__26A1118D3304469E");

            entity.ToTable("Address");

            entity.Property(e => e.AddressId).HasColumnName("addressID");
            entity.Property(e => e.MunicipioId).HasColumnName("municipioID");
            entity.Property(e => e.ProvinciaId).HasColumnName("provinciaID");
            entity.Property(e => e.Street)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("street");

            entity.HasOne(d => d.Municipio).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.MunicipioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Address__municip__48CFD27E");

            entity.HasOne(d => d.Provincia).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.ProvinciaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Address__provinc__47DBAE45");
        });

        modelBuilder.Entity<DrugStore>(entity =>
        {
            entity.HasKey(e => e.DrugStoreId).HasName("PK__DrugStor__9C9D97391ADB4C0E");

            entity.ToTable("DrugStore");

            entity.HasIndex(e => e.Rnc, "UQ__DrugStor__CAFF69508A07FA92").IsUnique();

            entity.Property(e => e.DrugStoreId).HasColumnName("drugStoreID");
            entity.Property(e => e.AddressId).HasColumnName("addressID");
            entity.Property(e => e.DirectorId).HasColumnName("directorID");
            entity.Property(e => e.LicenseId).HasColumnName("licenseID");
            entity.Property(e => e.LocationId).HasColumnName("locationID");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.OwnerId).HasColumnName("ownerID");
            entity.Property(e => e.Phone)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.RegistrationName).HasColumnName("registrationName");
            entity.Property(e => e.Rnc)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("RNC");
            entity.Property(e => e.ShortName)
                .HasMaxLength(8)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("shortName");
            entity.Property(e => e.Type)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("type");

            entity.HasOne(d => d.Address).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__addre__534D60F1");

            entity.HasOne(d => d.Director).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.DirectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__direc__5629CD9C");

            entity.HasOne(d => d.License).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.LicenseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__licen__5535A963");

            entity.HasOne(d => d.Location).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__locat__5441852A");

            entity.HasOne(d => d.Owner).WithMany(p => p.DrugStores)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DrugStore__owner__571DF1D5");
        });

        modelBuilder.Entity<GeographicLocation>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("PK__Geograph__30646B0E48291DCB");

            entity.ToTable("GeographicLocation");

            entity.Property(e => e.LocationId).HasColumnName("locationID");
            entity.Property(e => e.Altitude)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("altitude");
            entity.Property(e => e.Longitude)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("longitude");
        });

        modelBuilder.Entity<Inspection>(entity =>
        {
            entity.HasKey(e => e.InspectionId).HasName("PK__Inspecti__2BAC0D29DA2062FA");

            entity.ToTable("Inspection");

            entity.Property(e => e.InspectionId).HasColumnName("inspectionID");
            entity.Property(e => e.Confirmed).HasColumnName("confirmed");
            entity.Property(e => e.DrugStoreId).HasColumnName("drugStoreID");
            entity.Property(e => e.ModifiedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("modifiedDate");
            entity.Property(e => e.Observations)
                .HasColumnType("text")
                .HasColumnName("observations");
            entity.Property(e => e.Results)
                .HasColumnType("text")
                .HasColumnName("results");
            entity.Property(e => e.ScheduledDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("scheduledDate");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("state");

            entity.HasOne(d => d.DrugStore).WithMany(p => p.Inspections)
                .HasForeignKey(d => d.DrugStoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inspectio__drugS__5CD6CB2B");
        });

        modelBuilder.Entity<License>(entity =>
        {
            entity.HasKey(e => e.LicenseId).HasName("PK__License__3CBDB9CAD12DC1BF");

            entity.ToTable("License");

            entity.Property(e => e.LicenseId).HasColumnName("licenseID");
            entity.Property(e => e.ExpirationDate)
                .HasColumnType("datetime")
                .HasColumnName("expirationDate");
            entity.Property(e => e.IssueDate)
                .HasColumnType("datetime")
                .HasColumnName("issueDate");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("state");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Municipio>(entity =>
        {
            entity.HasKey(e => e.MunicipioId).HasName("PK__Municipi__CBC36A21A8CFD0EB");

            entity.ToTable("Municipio");

            entity.Property(e => e.MunicipioId).HasColumnName("municipioID");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.ProvinciaId).HasColumnName("provinciaID");

            entity.HasOne(d => d.Provincia).WithMany(p => p.Municipios)
                .HasForeignKey(d => d.ProvinciaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Municipio__provi__44FF419A");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.OwnerId).HasName("PK__Owner__7E4B716CB79C84D7");

            entity.ToTable("Owner");

            entity.HasIndex(e => e.RncCedula, "UQ__Owner__D95DA752A9179F49").IsUnique();

            entity.Property(e => e.OwnerId).HasColumnName("ownerID");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.RncCedula)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("RNC_cedula");
        });

        modelBuilder.Entity<PersonType>(entity =>
        {
            entity.HasKey(e => e.PersonTypeId).HasName("PK__PersonTy__F5E60412E44720C6");

            entity.ToTable("PersonType");

            entity.Property(e => e.PersonTypeId).HasColumnName("personTypeID");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Provincium>(entity =>
        {
            entity.HasKey(e => e.ProvinciaId).HasName("PK__Provinci__671F1345C2611A92");

            entity.Property(e => e.ProvinciaId).HasColumnName("provinciaID");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Request__E3C5DE51E2F4D9E3");

            entity.ToTable("Request");

            entity.Property(e => e.RequestId).HasColumnName("requestID");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.DrugStoreId).HasColumnName("drugStoreID");
            entity.Property(e => e.RequestTypeId).HasColumnName("requestTypeID");
            entity.Property(e => e.SendDate)
                .HasColumnType("datetime")
                .HasColumnName("sendDate");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.DrugStore).WithMany(p => p.Requests)
                .HasForeignKey(d => d.DrugStoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__drugSto__656C112C");

            entity.HasOne(d => d.RequestType).WithMany(p => p.Requests)
                .HasForeignKey(d => d.RequestTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__request__66603565");

            entity.HasOne(d => d.User).WithMany(p => p.Requests)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__userID__6477ECF3");
        });

        modelBuilder.Entity<RequestType>(entity =>
        {
            entity.HasKey(e => e.RequestTypeId).HasName("PK__RequestT__DEA2DAE8E92EA178");

            entity.ToTable("RequestType");

            entity.Property(e => e.RequestTypeId).HasColumnName("requestTypeID");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type");
        });

        modelBuilder.Entity<TechnicalDirector>(entity =>
        {
            entity.HasKey(e => e.DirectorId).HasName("PK__Technica__418D832EBEA6E573");

            entity.ToTable("TechnicalDirector");

            entity.HasIndex(e => e.Cedula, "UQ__Technica__415B7BE5EAF76CAA").IsUnique();

            entity.Property(e => e.DirectorId).HasColumnName("directorID");
            entity.Property(e => e.Cedula)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("cedula");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Exequatur)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("exequatur");
            entity.Property(e => e.IssueDate)
                .HasColumnType("datetime")
                .HasColumnName("issueDate");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Profession)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("profession");
        });

        modelBuilder.Entity<UserAccount>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserAcco__CB9A1CDFA65FCAD2");

            entity.ToTable("UserAccount");

            entity.HasIndex(e => e.Cedula, "UQ__UserAcco__415B7BE52C14CA91").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.Cedula)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("cedula");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.PersonTypeId).HasColumnName("personTypeID");

            entity.HasOne(d => d.PersonType).WithMany(p => p.UserAccounts)
                .HasForeignKey(d => d.PersonTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserAccou__perso__3A81B327");
        });

        modelBuilder.Entity<UserInspection>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.InspectionId }).HasName("PK__User_Ins__4920DC0DCA3EE1FD");

            entity.ToTable("User_Inspection");

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.InspectionId).HasColumnName("inspectionID");
            entity.Property(e => e.Confirmed).HasColumnName("confirmed");
            entity.Property(e => e.ScheduledDate)
                .HasColumnType("datetime")
                .HasColumnName("scheduledDate");

            entity.HasOne(d => d.Inspection).WithMany(p => p.UserInspections)
                .HasForeignKey(d => d.InspectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User_Insp__inspe__619B8048");

            entity.HasOne(d => d.User).WithMany(p => p.UserInspections)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User_Insp__userI__60A75C0F");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
