-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists ac_villagers;
DROP table if exists cats;
DROP table if exists coffee_drinks;
DROP table if exists movies;
DROP table if exists art_museums;

CREATE table ac_villagers (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  species VARCHAR NOT NULL,
  catchphrase VARCHAR
);

INSERT INTO ac_villagers (name, species, catchphrase) VALUES
('Ruby', 'Rabbit', 'lil ears'),
('Bob','Cat','pthhpth'),
('Erik','Deer','chow down'),
('Ribbot','Frog','zzrrbbitt'),
('Amelia','Eagle','cuz');

CREATE table cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  breed VARCHAR NOT NULL,
  longHair BOOLEAN NOT NULL
);

INSERT INTO cats (breed, longHair) VALUES
('Himalayan', TRUE),
('Persian', TRUE),
('Manx', FALSE),
('Korat', FALSE),
('Pixiebob', FALSE);

CREATE table coffee_drinks (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  milk BOOLEAN,
  oz INT NOT NULL
);

INSERT INTO coffee_drinks (name, milk, oz) VALUES
('Cortado', TRUE, 5),
('Americano', FALSE, 6),
('Espresso', FALSE, 2),
('Macchiato', TRUE, 3),
('Cappuccino', TRUE, 6);

CREATE table movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR NOT NULL,
  director VARCHAR NOT NULL,
  premiere DATE NOT NULL
);

INSERT INTO movies (title, director, premiere) VALUES
('The Shawshank Redemption', 'Frank Darabont', '09-23-1994'),
('The Godfather', 'Francis Ford Coppola', '03-24-1972'),
('The Dark Knight', 'Christopher Nolan', '07-18-2008'),
('12 Angry Men', 'Sidney Lumet', '04-19-1957'),
('The Matrix', 'Lana Wachowski & Lilly Wachowski', '03-31-1999');

CREATE table art_museums (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  location VARCHAR NOT NULL
);

INSERT INTO art_museums (name, location) VALUES
('The Museum of Modern Art','New York City'),
('The Getty','Los Angeles'),
('Lourve Museum','Paris'),
('Victoria and Albert Museum','London'),
('Accademia Gallery','Florence');







