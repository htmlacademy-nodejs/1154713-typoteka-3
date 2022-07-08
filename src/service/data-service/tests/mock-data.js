'use strict';

const CATAGORIES_MOCK = [`Деревья`, `За жизнь`, `Без рамки`, `Разное`, `IT`, `Музыка`];

const PUBLICATIONS_MOCK = [
  {
    [`publication_date`]: `1/12/1999`,
    picture: null,
    [`full_text`]: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    title: `Ёлки. История деревьев`,
    announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    [`user_id`]: 1,
  },
  {
    [`publication_date`]: `1/12/2000`,
    picture: null,
    [`full_text`]: `Первая большая ёлка была установлена только в 1938 году.`,
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Из под его пера вышло 8 платиновых альбомов.`,
    [`user_id`]: 2,
  },
  {
    [`publication_date`]: `1/12/2001`,
    picture: null,
    [`full_text`]: `Это один из лучших рок-музыкантов.`,
    title: `Что такое золотое сечение`,
    announce: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    [`user_id`]: 3,
  },
  {
    [`publication_date`]: `2/11/2023`,
    picture: null,
    [`full_text`]: `Он написал больше 30 хитов.`,
    title: `Учим HTML и CSS`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    [`user_id`]: 1,
  },
];

const ROLES_MOCK = [`guest`, `reader`, `author`];

const USERS_MOCK = [
  {
    email: `vasya@mail.ru`,
    [`user_name`]: `Vasya`,
    [`user_surname`]: `Vasya`,
    [`user_password`]: `Password`,
    avatar: null,
    [`role_id`]: 1,
  },
  {
    email: `petya@mail.ru`,
    [`user_name`]: `Petya`,
    [`user_surname`]: `Petya`,
    [`user_password`]: `Password`,
    avatar: null,
    [`role_id`]: 2,
  },
  {
    email: `grisha@mail.ru`,
    [`user_name`]: `Grisha`,
    [`user_surname`]: `Grisha`,
    [`user_password`]: `Password`,
    avatar: null,
    [`role_id`]: 3,
  }
];

const COMMENTS_MOCK = [
  {
    [`comment_text`]: `Это где ж такие красоты?`,
    [`data_comment`]: `11.11.2000, 22:33`,
    [`user_id`]: 1,
    [`publication_id`]: 1,
  },
  {
    [`comment_text`]: `Совсем немного...`,
    [`data_comment`]: `11.11.2001, 22:33`,
    [`user_id`]: 1,
    [`publication_id`]: 3,
  },
  {
    [`comment_text`]: `Согласен с автором!`,
    [`data_comment`]: `11.11.1999, 11:33`,
    [`user_id`]: 2,
    [`publication_id`]: 1,
  },
  {
    [`comment_text`]: `Мне кажется или я уже читал это где-то?`,
    [`data_comment`]: `11.11.2003, 22:33`,
    [`user_id`]: 2,
    [`publication_id`]: 2,
  },
  {
    [`comment_text`]: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
    [`data_comment`]: `11.11.1790, 01:33`,
    [`user_id`]: 3,
    [`publication_id`]: 2,
  },
  {
    [`comment_text`]: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
    [`data_comment`]: `11.11.2344, 09:33`,
    [`user_id`]: 3,
    [`publication_id`]: null,
  },
  {
    [`comment_text`]: `Хочу такую же футболку :-)`,
    [`data_comment`]: `11.11.2000, 22:33`,
    [`user_id`]: 1,
    [`publication_id`]: 3,
  },
  {
    [`comment_text`]: `Плюсую, но слишком много буквы!`,
    [`data_comment`]: `11.11.2009, 10:33`,
    [`user_id`]: null,
    [`publication_id`]: null,
  },
  {
    [`comment_text`]: `Планируете записать видосик на эту тему?`,
    [`data_comment`]: `11.11.2003, 22:33`,
    [`user_id`]: null,
    [`publication_id`]: null,
  }
];

const PUBLICATIONS_CATEGORIES_MOCK = [
  {
    [`publication_id`]: 1,
    [`category_id`]: 1,
  },
  {
    [`publication_id`]: 1,
    [`category_id`]: 2,
  },
  {
    [`publication_id`]: 1,
    [`category_id`]: 3,
  },
  {
    [`publication_id`]: 2,
    [`category_id`]: 4,
  },
  {
    [`publication_id`]: 2,
    [`category_id`]: 1,
  },
  {
    [`publication_id`]: 3,
    [`category_id`]: 5,
  },
  {
    [`publication_id`]: 3,
    [`category_id`]: 3,
  },
  {
    [`publication_id`]: 4,
    [`category_id`]: 5,
  }
];

const FIRST_UPDATED_PUBLICATION = {
  id: 1,
  [`publication_date`]: `1999-01-11 21:00:00.000 +00:00`,
  picture: null,
  [`full_text`]: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  title: `Ёлки. История деревьев`,
  announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  [`user_id`]: 1,
  [`publication_owner`]: `Vasya Vasya`,
  categories: [`Без рамки`, `Деревья`, `За жизнь`],
  comments: [`Согласен с автором!`, `Это где ж такие красоты?`],
};

const FIRST_PUBLICATION_BY_ID = {
  id: 1,
  [`publication_date`]: `1999-01-11 21:00:00.000 +00:00`,
  picture: null,
  [`full_text`]: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  title: `Ёлки. История деревьев`,
  announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  [`user_id`]: 1,
  categories: `Деревья|За жизнь|Без рамки`,
  [`publication_owner`]: `Vasya Vasya`
};

const COMMENTS_FIRST_PUBLICATION_BY_ID = {
  id: 1,
  [`comment_text`]: `Это где ж такие красоты?`,
  [`data_comment`]: `2000-11-11 19:33:00.000 +00:00`,
  [`user_id`]: 1,
  [`publication_id`]: 1,
  [`comment_owner`]: `Vasya Vasya`,
};

const USED_CATEGORIES_FIRST_PUBLICATION_BY_ID = [
  {id: 1, [`category_name`]: `Деревья`, [`category_count`]: 2},
  {id: 2, [`category_name`]: `За жизнь`, [`category_count`]: 1},
  {id: 3, [`category_name`]: `Без рамки`, [`category_count`]: 2}
];

const NEW_PUBLICATION = {
  [`user_id`]: 1,
  title: `ТестТестТестТестТестТестТестТестТестТест`,
  picture: null,
  categories: [`IT`, `Без рамки`],
  announce: `АнонсАнонсАнонсАнонсАнонсАнонсАнонсАнонс`,
  [`full_text`]: `Полный текст`,
  [`publication_date`]: `2020-10-21`,
};

const FINDED_COMMENTS_PUBLICATION = [
  {
    id: 1,
    [`comment_text`]: `Это где ж такие красоты?`,
    [`data_comment`]: `2000-11-11 19:33:00.000 +00:00`,
    [`user_id`]: 1,
    [`publication_id`]: 1
  },
  {
    id: 3,
    [`comment_text`]: `Согласен с автором!`,
    [`data_comment`]: `1999-11-11 08:33:00.000 +00:00`,
    [`user_id`]: 2,
    [`publication_id`]: 1
  }
];

module.exports = {
  CATAGORIES_MOCK,
  PUBLICATIONS_MOCK,
  ROLES_MOCK,
  USERS_MOCK,
  COMMENTS_MOCK,
  PUBLICATIONS_CATEGORIES_MOCK,
  FIRST_UPDATED_PUBLICATION,
  FIRST_PUBLICATION_BY_ID,
  COMMENTS_FIRST_PUBLICATION_BY_ID,
  USED_CATEGORIES_FIRST_PUBLICATION_BY_ID,
  NEW_PUBLICATION,
  FINDED_COMMENTS_PUBLICATION,
};
