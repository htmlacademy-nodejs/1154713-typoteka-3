DROP TABLE IF EXISTS users_publications;
DROP TABLE IF EXISTS users_comments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS publications_comments;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS publications_categories;
DROP TABLE IF EXISTS publications;
DROP TABLE IF EXISTS categories;

CREATE TABLE roles
(
	id SERIAL PRIMARY KEY,
  user_role VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
  comment_text TEXT NOT NULL,
  data_comment TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
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
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE publications
(
  id SERIAL PRIMARY KEY,
  publication_date DATE NOT NULL,
  picture TEXT,
  full_text TEXT,
  title VARCHAR(250) NOT NULL,
  announce VARCHAR(250) NOT NULL
);

CREATE TABLE users_publications
(
  user_id INTEGER NOT NULL,
  publication_id INTEGER NOT NULL,
  CONSTRAINT users_publications_primary_key PRIMARY KEY (user_id, publication_id),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (publication_id) REFERENCES publications (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE users_comments
(
  user_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  CONSTRAINT users_comments_primary_key PRIMARY KEY (user_id, comment_id),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE publications_comments
(
  publication_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  CONSTRAINT publications_comments_primary_key PRIMARY KEY (publication_id, comment_id),
  FOREIGN KEY (publication_id) REFERENCES publications (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
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
