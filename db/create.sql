-- Table: Adres
CREATE TABLE IF NOT EXISTS Adres (
    ulica VARCHAR(255),
    nrBudynku VARCHAR(10),
    nrMieszkania VARCHAR(10),
    Miasto VARCHAR(100),
    KodPocztowy VARCHAR(20)
);

-- Table: Magazyn
CREATE TABLE IF NOT EXISTS Magazyn (
    numer SERIAL PRIMARY KEY,
    DataOstatniejDostawy DATE
);

-- Enumeration: KategoriaProduktu
CREATE TYPE KategoriaProduktu AS ENUM (
    'Sery',
    'Jogurty',
    'Twarożi',
    'Mleko',
    'Masła i tłuszcze',
    'Inne',
    'Śmietany i śmietanki'
);

-- Table: Produkt
CREATE TABLE IF NOT EXISTS Produkt (
    id SERIAL PRIMARY KEY,
    cenaRegularna REAL,
    nazwa VARCHAR(255),
    opis TEXT,
    waga REAL,
    kategoria KategoriaProduktu
);

-- Table: Promocja
CREATE TABLE IF NOT EXISTS Promocja (
    id SERIAL PRIMARY KEY,
    procent INTEGER,
    wartosc INTEGER
);

-- Table: StanMagazynowy
CREATE TABLE IF NOT EXISTS StanMagazynowy (
    id SERIAL PRIMARY KEY,
    dataZmiany DATE,
    liczbaSzt INTEGER,
    magazyn_id INTEGER REFERENCES Magazyn(numer) ON DELETE CASCADE
);

-- Table: Koszyk
CREATE TABLE IF NOT EXISTS Koszyk (
    id SERIAL PRIMARY KEY,
    dataUtworzenia DATE,
    cenaCalkowita REAL
);

-- Table: Gosc
CREATE TABLE IF NOT EXISTS Gosc (
    id SERIAL PRIMARY KEY
);

-- Table: Klient
CREATE TABLE IF NOT EXISTS Klient (
    id SERIAL PRIMARY KEY,
    login VARCHAR(100),
    email VARCHAR(100),
    haslo VARCHAR(255),
    telefon VARCHAR(20),
    adres_id INTEGER REFERENCES Adres
);

-- Table: ProgramLojalnosciowy
CREATE TABLE IF NOT EXISTS ProgramLojalnosciowy (
    punktyLojalnosciowe INTEGER,
    calkowitaWartoscZakupow REAL,
    klient_id INTEGER REFERENCES Klient(id)
);

-- Table: Zamowienie
CREATE TABLE IF NOT EXISTS Zamowienie (
    nrZam SERIAL PRIMARY KEY,
    dataZlozenia DATE,
    dataDostarczenia DATE,
    wartosc REAL,
    AdresRozliczeniowy VARCHAR(255),
    nip VARCHAR(20),
    statusZamowienia VARCHAR(50),
    przypisanePunktyLojalnosciowe INTEGER,
    platnosc PlatnosciElektroniczna
);

-- Enumeration: PlatnosciElektroniczna
CREATE TYPE PlatnosciElektroniczna AS ENUM (
    'Blik',
    'Visa',
    'AmericanExpress',
    'Przelew'
);

-- Table: Reklamacja
CREATE TABLE IF NOT EXISTS Reklamacja (
    id SERIAL PRIMARY KEY,
    powodReklamacji TEXT,
    attribute VARCHAR(255)
);

-- Table: Zwrot
CREATE TABLE IF NOT EXISTS Zwrot (
    id SERIAL PRIMARY KEY,
    powodZwrotu TEXT,
    adresOdbioru INTEGER REFERENCES Adres,
    dataOdbioru DATE
);

-- Table: Kurier
CREATE TABLE IF NOT EXISTS Kurier (
    id SERIAL PRIMARY KEY,
    imie VARCHAR(100),
    nazwisko VARCHAR(100),
    telefon VARCHAR(20)
);

-- Table: Pracownik
CREATE TABLE IF NOT EXISTS Pracownik (
    id SERIAL PRIMARY KEY,
    imie VARCHAR(100),
    nazwisko VARCHAR(100),
    telefon VARCHAR(20)
);

-- Table: Dostawa
CREATE TABLE IF NOT EXISTS Dostawa (
    id SERIAL PRIMARY KEY,
    dataDostawy DATE,
    adresDostawy INTEGER REFERENCES Adres
);