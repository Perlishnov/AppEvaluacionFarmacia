USE [master]
GO
/****** Object:  Database [FarmaciaDesarrolloWeb]    Script Date: 1/23/2025 10:29:00 PM ******/
CREATE DATABASE [FarmaciaDesarrolloWeb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FarmaciaDesarrolloWeb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\FarmaciaDesarrolloWeb.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FarmaciaDesarrolloWeb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\FarmaciaDesarrolloWeb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FarmaciaDesarrolloWeb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ARITHABORT OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET RECOVERY FULL 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET  MULTI_USER 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'FarmaciaDesarrolloWeb', N'ON'
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET QUERY_STORE = ON
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [FarmaciaDesarrolloWeb]
GO
/****** Object:  Table [dbo].[DocumentType]    Script Date: 1/23/2025 10:29:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentType](
	[documentTypeID] [int] IDENTITY(1,1) NOT NULL,
	[nameDocType] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[documentTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DrugStore]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DrugStore](
	[drugStoreID] [int] IDENTITY(1,1) NOT NULL,
	[documentDS] [varchar](11) NOT NULL,
	[nameDS] [varchar](50) NOT NULL,
	[phoneDS] [varchar](15) NOT NULL,
	[address] [varchar](200) NOT NULL,
	[shortName] [char](8) NOT NULL,
	[altitude] [float] NOT NULL,
	[longitude] [float] NOT NULL,
	[registrationDate] [date] NOT NULL,
	[drugStoreTypeID] [int] NOT NULL,
	[documentTypeID] [int] NOT NULL,
	[municipioID] [int] NOT NULL,
	[licenseID] [int] NOT NULL,
	[directorID] [int] NOT NULL,
	[ownerID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[drugStoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[documentDS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DrugStoreType]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DrugStoreType](
	[drugStoreTypeID] [int] IDENTITY(1,1) NOT NULL,
	[typeDrugstore] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[drugStoreTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inspection]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inspection](
	[inspectionID] [int] IDENTITY(1,1) NOT NULL,
	[scheduledDate] [datetime] NOT NULL,
	[modifiedDate] [datetime] NOT NULL,
	[statusInspID] [int] NOT NULL,
	[drugStoreID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[inspectionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[License]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[License](
	[licenseID] [int] IDENTITY(1,1) NOT NULL,
	[nameLic] [varchar](50) NOT NULL,
	[typeLic] [varchar](50) NOT NULL,
	[descriptionLic] [text] NOT NULL,
	[issueDate] [datetime] NOT NULL,
	[expirationDate] [datetime] NOT NULL,
	[statusLic] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[licenseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Municipio]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Municipio](
	[municipioID] [int] IDENTITY(1,1) NOT NULL,
	[nameMun] [varchar](50) NOT NULL,
	[provinciaID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[municipioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Owner]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Owner](
	[ownerID] [int] IDENTITY(1,1) NOT NULL,
	[documentTypeID] [int] NOT NULL,
	[documentOwner] [varchar](11) NOT NULL,
	[nameOwner] [varchar](50) NOT NULL,
	[lastNameOwner] [varchar](50) NOT NULL,
	[emailOwner] [varchar](150) NOT NULL,
	[phoneOwner] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ownerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[documentOwner] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[permissionID] [int] IDENTITY(1,1) NOT NULL,
	[namePerm] [varchar](200) NULL,
	[descriptionsPerm] [varchar](200) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[permissionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonPermission]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonPermission](
	[permissionID] [int] NOT NULL,
	[personTypeID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[permissionID] ASC,
	[personTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonType]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonType](
	[personTypeID] [int] IDENTITY(1,1) NOT NULL,
	[typePerson] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[personTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provincia]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provincia](
	[provinciaID] [int] IDENTITY(1,1) NOT NULL,
	[nameProv] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[provinciaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[requestID] [int] IDENTITY(1,1) NOT NULL,
	[sendDate] [datetime] NOT NULL,
	[details] [text] NULL,
	[userID] [int] NOT NULL,
	[drugStoreID] [int] NOT NULL,
	[requestTypeID] [int] NOT NULL,
	[statusReqID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[requestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequestType]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequestType](
	[requestTypeID] [int] IDENTITY(1,1) NOT NULL,
	[typeReq] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[requestTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Results]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Results](
	[resultsID] [int] IDENTITY(1,1) NOT NULL,
	[inspectionID] [int] NOT NULL,
	[observations] [varchar](200) NULL,
	[descriptionsResults] [varchar](200) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[resultsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusInspection]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusInspection](
	[statusInspID] [int] IDENTITY(1,1) NOT NULL,
	[statusInsp] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[statusInspID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusRequest]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusRequest](
	[statusReqID] [int] IDENTITY(1,1) NOT NULL,
	[statusReq] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[statusReqID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TechnicalDirector]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechnicalDirector](
	[directorID] [int] IDENTITY(1,1) NOT NULL,
	[documentTypeID] [int] NOT NULL,
	[documentTD] [varchar](11) NOT NULL,
	[nameTD] [varchar](50) NOT NULL,
	[lastNameTD] [varchar](50) NOT NULL,
	[profession] [varchar](50) NOT NULL,
	[emailTD] [varchar](150) NOT NULL,
	[phoneTD] [varchar](15) NOT NULL,
	[exequatur] [varchar](10) NULL,
	[issueDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[directorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[phoneTD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[documentTD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Inspection]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Inspection](
	[userID] [int] NOT NULL,
	[inspectionID] [int] NOT NULL,
	[scheduledDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC,
	[inspectionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccount]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccount](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[documentUser] [varchar](11) NOT NULL,
	[nameUser] [varchar](50) NOT NULL,
	[lastNameUser] [varchar](50) NOT NULL,
	[emailUser] [varchar](150) NOT NULL,
	[passwordUser] [varchar](256) NOT NULL,
	[documentTypeID] [int] NOT NULL,
	[personTypeID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[emailUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[documentUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Inspection] ADD  DEFAULT (getdate()) FOR [scheduledDate]
GO
ALTER TABLE [dbo].[Inspection] ADD  DEFAULT (getdate()) FOR [modifiedDate]
GO
ALTER TABLE [dbo].[DrugStore]  WITH CHECK ADD FOREIGN KEY([directorID])
REFERENCES [dbo].[TechnicalDirector] ([directorID])
GO
ALTER TABLE [dbo].[DrugStore]  WITH CHECK ADD FOREIGN KEY([documentTypeID])
REFERENCES [dbo].[DocumentType] ([documentTypeID])
GO
ALTER TABLE [dbo].[DrugStore]  WITH CHECK ADD FOREIGN KEY([drugStoreTypeID])
REFERENCES [dbo].[DrugStoreType] ([drugStoreTypeID])
GO
ALTER TABLE [dbo].[DrugStore]  WITH CHECK ADD FOREIGN KEY([licenseID])
REFERENCES [dbo].[License] ([licenseID])
GO
ALTER TABLE [dbo].[DrugStore]  WITH CHECK ADD FOREIGN KEY([municipioID])
REFERENCES [dbo].[Municipio] ([municipioID])
GO
ALTER TABLE [dbo].[DrugStore]  WITH CHECK ADD FOREIGN KEY([ownerID])
REFERENCES [dbo].[Owner] ([ownerID])
GO
ALTER TABLE [dbo].[Inspection]  WITH CHECK ADD FOREIGN KEY([drugStoreID])
REFERENCES [dbo].[DrugStore] ([drugStoreID])
GO
ALTER TABLE [dbo].[Inspection]  WITH CHECK ADD  CONSTRAINT [FK_Inspection_StatuSInspection] FOREIGN KEY([statusInspID])
REFERENCES [dbo].[StatusInspection] ([statusInspID])
GO
ALTER TABLE [dbo].[Inspection] CHECK CONSTRAINT [FK_Inspection_StatuSInspection]
GO
ALTER TABLE [dbo].[Municipio]  WITH CHECK ADD FOREIGN KEY([provinciaID])
REFERENCES [dbo].[Provincia] ([provinciaID])
GO
ALTER TABLE [dbo].[Owner]  WITH CHECK ADD FOREIGN KEY([documentTypeID])
REFERENCES [dbo].[DocumentType] ([documentTypeID])
GO
ALTER TABLE [dbo].[PersonPermission]  WITH CHECK ADD FOREIGN KEY([permissionID])
REFERENCES [dbo].[Permission] ([permissionID])
GO
ALTER TABLE [dbo].[PersonPermission]  WITH CHECK ADD FOREIGN KEY([personTypeID])
REFERENCES [dbo].[PersonType] ([personTypeID])
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD FOREIGN KEY([drugStoreID])
REFERENCES [dbo].[DrugStore] ([drugStoreID])
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD FOREIGN KEY([requestTypeID])
REFERENCES [dbo].[RequestType] ([requestTypeID])
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD FOREIGN KEY([statusReqID])
REFERENCES [dbo].[StatusRequest] ([statusReqID])
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[UserAccount] ([userID])
GO
ALTER TABLE [dbo].[Results]  WITH CHECK ADD FOREIGN KEY([inspectionID])
REFERENCES [dbo].[Inspection] ([inspectionID])
GO
ALTER TABLE [dbo].[TechnicalDirector]  WITH CHECK ADD FOREIGN KEY([documentTypeID])
REFERENCES [dbo].[DocumentType] ([documentTypeID])
GO
ALTER TABLE [dbo].[User_Inspection]  WITH CHECK ADD FOREIGN KEY([inspectionID])
REFERENCES [dbo].[Inspection] ([inspectionID])
GO
ALTER TABLE [dbo].[User_Inspection]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[UserAccount] ([userID])
GO
ALTER TABLE [dbo].[UserAccount]  WITH CHECK ADD FOREIGN KEY([documentTypeID])
REFERENCES [dbo].[DocumentType] ([documentTypeID])
GO
ALTER TABLE [dbo].[UserAccount]  WITH CHECK ADD FOREIGN KEY([personTypeID])
REFERENCES [dbo].[PersonType] ([personTypeID])
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAssignedInspections]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAssignedInspections]
    @InspectorId INT
AS
BEGIN
    SELECT 
        i.InspectionID,
        i.ScheduledDate,
        i.ModifiedDate,
        i.StatusInspID, -- Agrega esta columna
        ds.DrugStoreID,
        ds.NameDS AS DrugStoreName,
        si.StatusInsp AS Status
    FROM User_Inspection ui
    INNER JOIN Inspection i ON ui.InspectionID = i.InspectionID
    INNER JOIN DrugStore ds ON i.DrugStoreID = ds.DrugStoreID
    INNER JOIN StatuSInspection si ON i.StatusInspID = si.StatusInspID
    WHERE ui.UserID = @InspectorId;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDrugStoreById]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetDrugStoreById]
    @DrugStoreId INT
AS
BEGIN
    SELECT 
        ds.DrugStoreID,
        ds.DocumentDS,
        ds.NameDS,
        ds.PhoneDS,
        ds.Address,
        ds.ShortName,
        ds.Altitude,
        ds.Longitude,
        ds.RegistrationDate,
        dt.TypeDrugstore AS DrugStoreTypeName,
        dtp.NameDocType AS DocumentTypeName,
        m.NameMun AS MunicipioName,
        l.NameLic AS LicenseName,
		CONCAT(td.NameTD, ' ', td.LastNameTD) AS DirectorName,
        CONCAT(o.NameOwner, ' ', o.LastNameOwner) AS OwnerName
    FROM DrugStore ds
    LEFT JOIN DrugStoreType dt ON ds.DrugStoreTypeID = dt.DrugStoreTypeID
    LEFT JOIN DocumentType dtp ON ds.DocumentTypeID = dtp.DocumentTypeID
    LEFT JOIN Municipio m ON ds.MunicipioID = m.MunicipioID
    LEFT JOIN License l ON ds.LicenseID = l.LicenseID
    LEFT JOIN TechnicalDirector td ON ds.DirectorID = td.DirectorID
    LEFT JOIN Owner o ON ds.OwnerID = o.OwnerID
    WHERE ds.DrugStoreID = @DrugStoreId;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDrugStores]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetDrugStores]
AS
BEGIN
    SELECT 
        ds.DrugStoreID,
        ds.DocumentDS,
        ds.NameDS,
        ds.PhoneDS,
        ds.Address,
        ds.ShortName,
        ds.Altitude,
        ds.Longitude,
        ds.RegistrationDate,
        dt.TypeDrugstore AS DrugStoreTypeName,
        dtp.NameDocType AS DocumentTypeName,
        m.NameMun AS MunicipioName,
        l.NameLic AS LicenseName,
		CONCAT(td.NameTD, ' ', td.LastNameTD) AS DirectorName,
        CONCAT(o.NameOwner, ' ', o.LastNameOwner) AS OwnerName
    FROM DrugStore ds
    LEFT JOIN DrugStoreType dt ON ds.DrugStoreTypeID = dt.DrugStoreTypeID
    LEFT JOIN DocumentType dtp ON ds.DocumentTypeID = dtp.DocumentTypeID
    LEFT JOIN Municipio m ON ds.MunicipioID = m.MunicipioID
    LEFT JOIN License l ON ds.LicenseID = l.LicenseID
    LEFT JOIN TechnicalDirector td ON ds.DirectorID = td.DirectorID
    LEFT JOIN Owner o ON ds.OwnerID = o.OwnerID
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetDrugStoresByOwnerId]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetDrugStoresByOwnerId]
    @OwnerId INT
AS
BEGIN
    SELECT 
        ds.DrugStoreID,
        ds.DocumentDS,
        ds.NameDS,
        ds.PhoneDS,
        ds.Address,
        ds.ShortName,
        ds.Altitude,
        ds.Longitude,
        ds.RegistrationDate,
        dt.TypeDrugstore AS DrugStoreTypeName,
        dtp.NameDocType AS DocumentTypeName,
        m.NameMun AS MunicipioName,
        l.NameLic AS LicenseName,
        CONCAT(td.NameTD, ' ', td.LastNameTD) AS DirectorName,
        CONCAT(o.NameOwner, ' ', o.LastNameOwner) AS OwnerName
    FROM DrugStore ds
    LEFT JOIN DrugStoreType dt ON ds.DrugStoreTypeID = dt.DrugStoreTypeID
    LEFT JOIN DocumentType dtp ON ds.DocumentTypeID = dtp.DocumentTypeID
    LEFT JOIN Municipio m ON ds.MunicipioID = m.MunicipioID
    LEFT JOIN License l ON ds.LicenseID = l.LicenseID
    LEFT JOIN TechnicalDirector td ON ds.DirectorID = td.DirectorID
    LEFT JOIN Owner o ON ds.OwnerID = o.OwnerID
    WHERE ds.OwnerID = @OwnerId;
END;

GO
/****** Object:  StoredProcedure [dbo].[sp_HandlePharmacyRequests]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_HandlePharmacyRequests]
    @OperationType NVARCHAR(50),
    @DrugStoreID INT = NULL,
    @OwnerName NVARCHAR(50) = NULL,
    @OwnerDocument NVARCHAR(50) = NULL,
    @OwnerEmail NVARCHAR(150) = NULL,
    @OwnerPhone NVARCHAR(20) = NULL,
    @DirectorName NVARCHAR(50) = NULL,
    @DirectorLastName NVARCHAR(50) = NULL,
    @DirectorDocument NVARCHAR(50) = NULL,
    @DirectorEmail NVARCHAR(150) = NULL,
    @DirectorPhone NVARCHAR(20) = NULL,
    @DirectorProfession NVARCHAR(50) = NULL,
    @DirectorExequatur NVARCHAR(20) = NULL,
    @IssueDate DATE = NULL,
    @PharmacyTypeID INT = NULL,
    @NewPharmacyName NVARCHAR(100) = NULL,
    @PharmacyAddress NVARCHAR(150) = NULL,
    @MunicipioID INT = NULL,
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @RequestTypeID INT;
    DECLARE @RequestDetails NVARCHAR(MAX);
    DECLARE @OwnerID INT;
    DECLARE @DirectorID INT;

    -- Determinar el tipo de solicitud 
    SET @RequestTypeID = CASE 
        WHEN @OperationType = 'Apertura' THEN 2
        WHEN @OperationType = 'Renovación de Registro' THEN 3
        WHEN @OperationType = 'Cambio de Director Técnico' THEN 4
        WHEN @OperationType = 'Cambio de Nombre' THEN 5
        WHEN @OperationType = 'Cambio de Propietario' THEN 6
        WHEN @OperationType = 'Cambio de Dirección' THEN 7
        ELSE NULL
    END;

    -- Generar los detalles de la solicitud 
    SET @RequestDetails = CASE 
        WHEN @OperationType = 'Apertura' THEN CONCAT('Apertura de farmacia con nombre "', @NewPharmacyName, '".')
        WHEN @OperationType = 'Renovación de Registro' THEN CONCAT('Renovación de registro de la farmacia "', @NewPharmacyName, '".')
        WHEN @OperationType = 'Cambio de Director Técnico' THEN CONCAT('Cambio de director técnico a "', @DirectorName, ' ', @DirectorLastName, '".')
        WHEN @OperationType = 'Cambio de Nombre' THEN CONCAT('Cambio de nombre de la farmacia "', @DrugStoreID, '" a "', @NewPharmacyName, '".')
        WHEN @OperationType = 'Cambio de Propietario' THEN CONCAT('Cambio de propietario a "', @OwnerName, '".')
        WHEN @OperationType = 'Cambio de Dirección' THEN CONCAT('Cambio de dirección a "', @PharmacyAddress, '".')
        ELSE 'Operación no especificada.'
    END;

    -- Insertar la solicitud en la tabla Request
    DECLARE @RequestID INT;
    INSERT INTO Request (sendDate, details, userID, drugStoreID, requestTypeID, statusReqID)
    VALUES (GETDATE(), @RequestDetails, @UserID, @DrugStoreID, @RequestTypeID, 2);
    SET @RequestID = SCOPE_IDENTITY();

    -- Operaciones específicas según el tipo de solicitud
    IF @OperationType = 'Apertura'
    BEGIN
        -- Verificar si el propietario ya existe
        SELECT @OwnerID = OwnerId 
        FROM Owner 
        WHERE documentOwner = @OwnerDocument;

        -- Si no existe, insertar nuevo propietario
        IF @OwnerID IS NULL
        BEGIN
            INSERT INTO Owner (nameOwner, documentOwner, emailOwner, phoneOwner)
            VALUES (@OwnerName, @OwnerDocument, @OwnerEmail, @OwnerPhone);
            SET @OwnerID = SCOPE_IDENTITY();
        END

        -- Verificar si el director técnico ya existe
        SELECT @DirectorID = DirectorId 
        FROM TechnicalDirector 
        WHERE documentTD = @DirectorDocument;

        -- Si no existe, insertar nuevo director
        IF @DirectorID IS NULL
        BEGIN
            INSERT INTO TechnicalDirector (nameTD, lastNameTD, documentTD, emailTD, phoneTD, profession, exequatur, issueDate)
            VALUES (@DirectorName, @DirectorLastName, @DirectorDocument, @DirectorEmail, @DirectorPhone, @DirectorProfession, @DirectorExequatur, @IssueDate);
            SET @DirectorID = SCOPE_IDENTITY();
        END

        -- Insertar la farmacia
        INSERT INTO DrugStore (nameDS, address, municipioID, drugStoreTypeID, ownerID, directorID)
        VALUES (@NewPharmacyName, @PharmacyAddress, @MunicipioID, @PharmacyTypeID, @OwnerID, @DirectorID);
    END

    ELSE IF @OperationType = 'Cambio de Director Técnico'
    BEGIN
        -- Verificar si el director técnico ya existe
        SELECT @DirectorID = DirectorId 
        FROM TechnicalDirector 
        WHERE documentTD = @DirectorDocument;

        -- Si no existe, insertar nuevo director
        IF @DirectorID IS NULL
        BEGIN
            INSERT INTO TechnicalDirector (nameTD, lastNameTD, documentTD, emailTD, phoneTD, profession, exequatur, issueDate)
            VALUES (@DirectorName, @DirectorLastName, @DirectorDocument, @DirectorEmail, @DirectorPhone, @DirectorProfession, @DirectorExequatur, @IssueDate);
            SET @DirectorID = SCOPE_IDENTITY();
        END

        -- Actualizar farmacia con el director existente o nuevo
        UPDATE DrugStore
        SET directorID = @DirectorID
        WHERE drugStoreID = @DrugStoreID;
    END

    ELSE IF @OperationType = 'Cambio de Propietario'
    BEGIN
        -- Verificar si el propietario ya existe
        SELECT @OwnerID = OwnerId 
        FROM Owner 
        WHERE documentOwner = @OwnerDocument;

        -- Si no existe, insertar nuevo propietario
        IF @OwnerID IS NULL
        BEGIN
            INSERT INTO Owner (nameOwner, documentOwner, emailOwner, phoneOwner)
            VALUES (@OwnerName, @OwnerDocument, @OwnerEmail, @OwnerPhone);
            SET @OwnerID = SCOPE_IDENTITY();
        END

        -- Actualizar farmacia con el propietario existente o nuevo
        UPDATE DrugStore
        SET ownerID = @OwnerID
        WHERE drugStoreID = @DrugStoreID;
    END


    ELSE IF @OperationType = 'Renovación de Registro'
    BEGIN
        UPDATE DrugStore
        SET address = @PharmacyAddress, 
            municipioID = @MunicipioID,
            drugStoreTypeID = @PharmacyTypeID
        WHERE drugStoreID = @DrugStoreID;
    END

    ELSE IF @OperationType = 'Cambio de Nombre'
    BEGIN
        UPDATE DrugStore
        SET nameDS = @NewPharmacyName
        WHERE drugStoreID = @DrugStoreID;
    END

    ELSE IF @OperationType = 'Cambio de Dirección'
    BEGIN
        UPDATE DrugStore
        SET address = @PharmacyAddress, 
            municipioID = @MunicipioID
        WHERE drugStoreID = @DrugStoreID;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertDrugStore]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Stored Procedure para insertar un nuevo DrugStore
CREATE PROCEDURE [dbo].[sp_InsertDrugStore]
    @DocumentDS NVARCHAR(50),
    @NameDS NVARCHAR(100),
    @PhoneDS NVARCHAR(50),
    @Address NVARCHAR(200),
    @ShortName NVARCHAR(50),
    @Altitude FLOAT,
    @Longitude FLOAT,
    @RegistrationDate DATETIME,
    @DrugStoreTypeID INT,
    @DocumentTypeID INT,
    @MunicipioID INT,
    @LicenseID INT,
    @DirectorID INT,
    @OwnerID INT
AS
BEGIN
    INSERT INTO [dbo].[DrugStore] 
        ([documentDS], [nameDS], [phoneDS], [address], [shortName], [altitude], [longitude], [registrationDate], [drugStoreTypeID], [documentTypeID], [municipioID], [licenseID], [directorID], [ownerID])
    VALUES 
        (@DocumentDS, @NameDS, @PhoneDS, @Address, @ShortName, @Altitude, @Longitude, @RegistrationDate, @DrugStoreTypeID, @DocumentTypeID, @MunicipioID, @LicenseID, @DirectorID, @OwnerID);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateInspectionStatus]    Script Date: 1/23/2025 10:29:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateInspectionStatus]
    @InspectionId INT,
    @StatusId INT
AS
BEGIN
    UPDATE Inspection
    SET StatusInspID = @StatusId, ModifiedDate = GETDATE()
    WHERE InspectionID = @InspectionId;
END;
GO
USE [master]
GO
ALTER DATABASE [FarmaciaDesarrolloWeb] SET  READ_WRITE 
GO
