CREATE DATABASE music;

CREATE TABLE prueba_artist(
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

INSERT INTO prueba_artist (id, name, age) VALUES
    ('1', 'Michael Jackson', 54),
    ('2', 'Chayanne', 51);