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

ALTER TABLE Album
ADD CONSTRAINT fk_artist_album
    FOREIGN KEY (artist_id)
    REFERENCES Artist(id)
    ON DELETE CASCADE;

ALTER TABLE Track
ADD CONSTRAINT fk_album_track
    FOREIGN KEY (album_id)
    REFERENCES Album(id)
    ON DELETE CASCADE;

DROP TABLE Track;
DROP TABLE Album;
DROP TABLE Artist;

-- 'SELECT * FROM Artist INNER JOIN Album ON id = artist_id'

-- 'SELECT * FROM Album INNER JOIN Album ON id = artist_id'

-- "SELECT DISTINCT Puerto.id_pu, pu_nombre, id_re, id_ci 
--                 FROM Puerto INNER JOIN Instalacion 
--                 ON Puerto.id_pu = Instalacion.id_pu
--                 WHERE Instalacion.tipo = 'astillero'"
    