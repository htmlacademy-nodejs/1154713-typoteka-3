--получаем список всех категорий
SELECT * FROM categories;

--получаем список категорий, для которых создана минимум одна публикация
SELECT
  publications_categories.category_id as "id",
  categories.category_name
FROM publications_categories
JOIN categories ON publications_categories.category_id = categories.id
GROUP BY
  publications_categories.category_id,
  categories.category_name
HAVING count(publications_categories.category_id) > 1
ORDER BY publications_categories.category_id ASC;

--получаем список категорий с количеством публикаций
SELECT
  categories.category_name,
  count(publications_categories.category_id) as "publications_count"
FROM categories
JOIN publications_categories ON publications_categories.category_id = categories.id
GROUP BY
  categories.category_name,
  publications_categories.category_id;

--получаем список публикаций
SELECT
  publications.id,
  publications.title,
  publications.announce,
  publications.publication_date,
  concat(users.user_name, ' ', users.user_surname) as "author_name",
  users.email,
  count(comments.publication_id) as "comments_count",
  (
	  SELECT
	  	string_agg(DISTINCT categories.category_name, ', ')
	  FROM publications_categories
	  JOIN categories ON categories.id = publications_categories.category_id
	  WHERE publications_categories.publication_id = publications.id
  ) as "in_categories"
FROM publications
JOIN users ON users.id = publications.user_id
LEFT JOIN comments ON comments.publication_id = publications.id
GROUP BY
  publications.id,
  publications.title,
  publications.announce,
  publications.publication_date,
  users.user_name,
  users.user_surname,
  users.email
ORDER BY publications.publication_date DESC;

--получаем полную информацию определённой публикации
SELECT
  publications.id,
  publications.title,
  publications.announce,
  publications.full_text,
  publications.publication_date,
  publications.picture,
  concat(users.user_name, ' ', users.user_surname) as "author",
  users.email,
  count(comments.publication_id) as "comments_count",
  (
	  SELECT
	  	string_agg(DISTINCT categories.category_name, ', ')
	  FROM publications_categories
	  JOIN categories ON categories.id = publications_categories.category_id
	  WHERE publications_categories.publication_id = publications.id
  ) as "in_categories"
FROM publications
JOIN users ON users.id = publications.user_id
LEFT JOIN comments ON comments.publication_id = publications.id
WHERE publications.id = 4
GROUP BY
  publications.id,
  publications.title,
  publications.announce,
  publications.full_text,
  publications.publication_date,
  publications.picture,
  users.user_name,
  users.user_surname,
  users.email;

--получаем список из 5 свежих комментариев
SELECT 
  comments.id as "comment_id",
  comments.publication_id,
  concat(users.user_name, ' ', users.user_surname) as "author",
  comments.comment_text
FROM comments
JOIN publications ON publications.id = comments.publication_id
JOIN users ON users.id = comments.user_id
ORDER BY comments.data_comment DESC
LIMIT 5

--получаем список комментариев для определённой публикации
SELECT 
  comments.id as "comment_id",
  comments.publication_id,
  concat(users.user_name, ' ', users.user_surname) as "author",
  comments.comment_text
FROM comments
JOIN publications ON publications.id = comments.publication_id
JOIN users ON users.id = comments.user_id
WHERE comments.publication_id = 1
ORDER BY comments.data_comment DESC

--обновляем заголовок определенной публикации
UPDATE publications
SET title = 'Как я встретил Новый год'
WHERE publications.id = 1
