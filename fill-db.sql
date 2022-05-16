DELETE FROM users;
DELETE FROM publications;
DELETE FROM roles;
DELETE FROM categories;
DELETE FROM comments;
DELETE FROM publications_categories;
DELETE FROM users_publications;

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
  ('Деревья'),
  ('За жизнь'),
  ('Без рамки'),
  ('Разное'),
  ('IT'),
  ('Музыка'),
  ('Кино'),
  ('Программирование'),
  ('Железо');

--заполнение таблицы users
INSERT INTO users(email, user_name, user_surname, user_password, avatar, role_id) VALUES
  ('vasya@mail.ru', 'Vasya', 'Vasya', 'Password', null, 1),
  ('petya@mail.ru', 'Petya', 'Petya', 'Password', null, 2),
  ('grisha@mail.ru', 'Grisha', 'Grisha', 'Password', null, 3);

--заполнение таблицы publications
INSERT INTO publications(publication_date, picture, full_text, title, announce) VALUES
  ('1/18/1999', null, 'Ёлки — это не просто красивое дерево. Это прочная древесина.', 'Ёлки. История деревьев', 'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.'),
  ('1/18/2000', null, 'Первая большая ёлка была установлена только в 1938 году.', 'Как перестать беспокоиться и начать жить', 'Из под его пера вышло 8 платиновых альбомов.'),
  ('1/18/2001', null, 'Это один из лучших рок-музыкантов.', 'Что такое золотое сечение', 'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.');

--заполнение таблицы comments
INSERT INTO comments(comment_text, data_comment) VALUES
  ('Это где ж такие красоты?', '11.11.2000, 22:33'),
  ('Совсем немного...', '11.11.2001, 22:33'),
  ('Согласен с автором!', '11.11.1999, 11:33'),
  ('Мне кажется или я уже читал это где-то?', '11.11.2003, 22:33'),
  ('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', '11.11.1790, 01:33'),
  ('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '11.11.2344, 09:33'),
  ('Хочу такую же футболку :-)', '11.11.2000, 22:33'),
  ('Плюсую, но слишком много буквы!', '11.11.2009, 10:33'),
  ('Планируете записать видосик на эту тему?', '11.11.2003, 22:33');

--заполнение таблицы publications_categories
INSERT INTO publications_categories(publication_id, category_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 1),
  (3, 5),
  (3, 3);

--заполнение таблицы users_publications
INSERT INTO users_publications(user_id, publication_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

--заполнение таблицы users_comments
INSERT INTO users_comments(user_id, comment_id) VALUES
  (1, 1),
  (1, 2),
  (1, 7),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6);

--заполнение таблицы publications_comments
INSERT INTO publications_comments(publication_id, comment_id) VALUES
  (1, 1),
  (1, 3),
  (2, 4),
  (2, 5),
  (3, 2),
  (3, 7);
