-- Creacion de la base de datos
CREATE DATABASE PharmacyEvaluationDB;
USE PharmacyEvaluationDB;

-- Tabla PersonType
CREATE TABLE PersonType (
    personTypeID INT IDENTITY(1,1) PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

-- Tabla UserAccount
CREATE TABLE UserAccount (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    cedula VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(MAX) NOT NULL,
    personTypeID INT NOT NULL FOREIGN KEY REFERENCES PersonType(personTypeID)
);

-- Tabla RequestType
CREATE TABLE RequestType (
    requestTypeID INT IDENTITY(1,1) PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);



-- Tabla License
CREATE TABLE License (
    licenseID INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    issueDate DATETIME NOT NULL,
    expirationDate DATETIME NOT NULL,
    state VARCHAR(50) NOT NULL
);

-- Tabla GeographicLocation
CREATE TABLE GeographicLocation (
    locationID INT IDENTITY(1,1) PRIMARY KEY,
    longitude DECIMAL NOT NULL,
    altitude DECIMAL NOT NULL
);

-- Tabla Provincia
CREATE TABLE Provincia (
    provinciaID INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla Municipio
CREATE TABLE Municipio (
    municipioID INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    provinciaID INT NOT NULL FOREIGN KEY REFERENCES Provincia(provinciaID)
);

-- Tabla Address
CREATE TABLE Address (
    addressID INT IDENTITY(1,1) PRIMARY KEY,
    street VARCHAR(50) NOT NULL,
    provinciaID INT NOT NULL FOREIGN KEY REFERENCES Provincia(provinciaID),
    municipioID INT NOT NULL FOREIGN KEY REFERENCES Municipio(municipioID)
);

-- Tabla TechnicalDirector
CREATE TABLE TechnicalDirector (
    directorID INT IDENTITY(1,1) PRIMARY KEY,
    cedula VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    profession VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(MAX) NOT NULL,
    exequatur VARCHAR(10) NOT NULL,
    issueDate DATETIME NOT NULL
);

-- Tabla Owner
CREATE TABLE Owner (
    ownerID INT IDENTITY(1,1) PRIMARY KEY,
    RNC_cedula VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(MAX) NOT NULL
);


-- Tabla DrugStore
CREATE TABLE DrugStore (
    drugStoreID INT IDENTITY(1,1) PRIMARY KEY,
    RNC VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    type CHAR(1) NULL CHECK (type IN ('R', 'H')),
    phone VARCHAR(MAX) NOT NULL,
    shortName CHAR(8) NOT NULL,
    registrationName INT NOT NULL,
    addressID INT NOT NULL FOREIGN KEY REFERENCES Address(addressID),
    locationID INT NOT NULL FOREIGN KEY REFERENCES GeographicLocation(locationID),
    licenseID INT NOT NULL FOREIGN KEY REFERENCES License(licenseID),
    directorID INT NOT NULL FOREIGN KEY REFERENCES TechnicalDirector(directorID),
    ownerID INT NOT NULL FOREIGN KEY REFERENCES Owner(ownerID)
);

-- Tabla Inspection
CREATE TABLE Inspection (
    inspectionID INT IDENTITY(1,1) PRIMARY KEY,
    scheduledDate DATETIME NOT NULL DEFAULT GETDATE(),
    state VARCHAR(50) NOT NULL,
    results TEXT NULL,
    observations TEXT NULL,
    confirmed BIT NOT NULL DEFAULT 0,
    modifiedDate DATETIME NULL DEFAULT GETDATE(),
    drugStoreID INT NOT NULL FOREIGN KEY REFERENCES DrugStore(drugStoreID)
);

-- Tabla User_Inspection
CREATE TABLE User_Inspection (
    userID INT NOT NULL,
    inspectionID INT NOT NULL,
    scheduledDate DATETIME NOT NULL,
    confirmed BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (userID, inspectionID),
    FOREIGN KEY (userID) REFERENCES UserAccount(userID),
    FOREIGN KEY (inspectionID) REFERENCES Inspection(inspectionID)
);




-- Tabla Request
CREATE TABLE Request (
    requestID INT IDENTITY(1,1) PRIMARY KEY,
    state VARCHAR(50) NOT NULL,
    sendDate DATETIME NOT NULL,
    description TEXT NULL,
    userID INT NOT NULL FOREIGN KEY REFERENCES UserAccount(userID),
    drugStoreID INT NOT NULL FOREIGN KEY REFERENCES DrugStore(drugStoreID),
    requestTypeID INT NOT NULL FOREIGN KEY REFERENCES RequestType(requestTypeID)
);


