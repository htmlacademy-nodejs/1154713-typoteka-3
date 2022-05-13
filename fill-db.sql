DELETE FROM users;
DELETE FROM publications;
DELETE FROM roles;
DELETE FROM categories;
DELETE FROM comments;
DELETE FROM publications_categories;

ALTER SEQUENCE roles_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE publications_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;

--заполнение таблицы roles
INSERT INTO roles(user_role) VALUES
  ('guest'),
  ('reader'),
  ('author');

--заполнение таблицы categories
INSERT INTO categories(category_name) VALUES
  ('IT'),
  ('природа'),
  ('мир'),
  ('автомобили'),
  ('путешествия');

--заполнение таблицы users
INSERT INTO users(email, user_name, user_surname, user_password, avatar, role_id) VALUES
  ('vasya@mail.ru', 'Vasya', 'Vasya', 'Password', null, 1),
  ('petya@mail.ru', 'Petya', 'Petya', 'Password', null, 2),
  ('grisha@mail.ru', 'Grisha', 'Grisha', 'Password', null, 3);

--заполнение таблицы publications
INSERT INTO publications(publication_date, picture, full_text, title, announce) VALUES
  ('1/18/1999', null, null, 'publication 1', 'announce'),
  ('1/18/1999', null, null, 'publication 2', 'announce'),
  ('1/18/1999', null, null, 'publication 3', 'announce');

--заполнение таблицы comments
INSERT INTO comments(comment_text) VALUES
  ('ok'),
  ('not bad'),
  ('bad'),
  ('no good'),
  ('what'),
  ('yes'),
  ('sorry'),
  ('nevermind');

--заполнение таблицы publications_categories
INSERT INTO publications_categories(publication_id, category_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 1),
  (3, 5),
  (3, 3);
