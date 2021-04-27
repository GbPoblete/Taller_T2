CREATE DATABASE music;

CREATE TABLE Artist(
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    albums VARCHAR(100),
    tracks VARCHAR(100),
    self VARCHAR(100)
);

CREATE TABLE Album(
    id VARCHAR(200) PRIMARY KEY,
    artist_id VARCHAR(200),
    FOREIGN KEY(artist_id) REFERENCES Artist(id),
    name VARCHAR(100),
    genre VARCHAR(100),
    artist VARCHAR(100),
    tracks VARCHAR(100),
    self VARCHAR(100)
    
);

CREATE TABLE Track(
    id VARCHAR(200) PRIMARY KEY,
    album_id VARCHAR(200),
    FOREIGN KEY (album_id) REFERENCES Album(id),
    name VARCHAR(100),
    duration FLOAT,
    times_played INT,
    artist VARCHAR(100),
    album VARCHAR(100),
    self VARCHAR(100)
);

INSERT INTO prueba_artist (id, name, age) VALUES
    (encode('Michael Jackson', 'base64'), 'Michael Jackson', 54),
    (encode('Chayanne', 'base64'), 'Chayanne', 51);