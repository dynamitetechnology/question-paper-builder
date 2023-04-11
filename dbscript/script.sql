create database restorant;

DROP TABLE IF EXISTS users; 
CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    enabled BIT DEFAULT '1',
    created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS otp; 
CREATE TABLE otp(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    otp varchar(255),
    otp_requested_time DATETIME DEFAULT NOW(),
    enabled BIT DEFAULT '1',
    created_at TIMESTAMP DEFAULT NOW()
);