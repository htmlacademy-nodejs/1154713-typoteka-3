DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS publications_categories;
DROP TABLE IF EXISTS publications;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS categories;

CREATE TABLE roles
(
	id SERIAL PRIMARY KEY,
  user_role VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE categories
(
	id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_surname VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  avatar TEXT,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE publications
(
  id SERIAL PRIMARY KEY,
  publication_date DATE NOT NULL,
  picture TEXT,
  full_text TEXT,
  title VARCHAR(250) NOT NULL,
  announce VARCHAR(250) NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
  comment_text TEXT NOT NULL,
  data_comment TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
  user_id INTEGER,
  publication_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  FOREIGN KEY (publication_id) REFERENCES publications (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE publications_categories
(
  publication_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT publications_categories_primary_key PRIMARY KEY (publication_id, category_id),
  FOREIGN KEY (publication_id) REFERENCES publications (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX ON publications(title);

ALTER TABLE comments OWNER to yurj;
ALTER TABLE publications_categories OWNER to yurj;
ALTER TABLE publications OWNER to yurj;
ALTER TABLE users OWNER to yurj;
ALTER TABLE roles OWNER to yurj;
ALTER TABLE categories OWNER to yurj;
