DROP TABLE IF EXISTS drinks, favorites, users CASCADE;


CREATE TABLE drinks(
  id SERIAL PRIMARY KEY,
  drink_name VARCHAR(225),
  image VARCHAR(300),
  instructions VARCHAR (1000),
  ing1 VARCHAR (225),
  ing2 VARCHAR (225),
  ing3 VARCHAR (225),
  mes1 VARCHAR (225),
  mes2 VARCHAR (225),
  mes3 VARCHAR (225)
);

CREATE TABLE  favorites (
  id SERIAL PRIMARY KEY,
  drink_name VARCHAR(225),
  image VARCHAR(300),
  instructions VARCHAR (1000),
  ing1 VARCHAR (225),
  ing2 VARCHAR (225),
  ing3 VARCHAR (225),
  mes1 VARCHAR (225),
  mes2 VARCHAR (225),
  mes3 VARCHAR (225),
  drinks_id SERIAL REFERENCES drinks(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR (225),
  email VARCHAR (225),
  password VARCHAR (225)
);

