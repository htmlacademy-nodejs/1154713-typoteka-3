'use strict';

const Joi = require(`joi`);

const {
  TITLE_EMPTY,
  TITLE_MAX_LENGTH_ERROR,
  TITLE_MIN_LENGTH_ERROR,
} = require(`../consts`);


/*Заголовок. Обязательное поле. Минимум 30 символов. Максимум 250;
Фотография. Необязательное поле. Позволяет загружать изображения в формате jpg и png;
Дата публикации (дата). Обязательное поле. По умолчанию текущая дата;
Категории. Обязательно для выбора одна категория;
Анонс публикации. Обязательное поле. Минимум 30 символов. Максимум 250;
Полный текст публикации. Необязательное поле. Максимум 1000 символов.*/


/*user_id: 1,
title: 'Как перестать беспокоиться и начать жить',
picture: null,
categories: [ 'IT', 'Без рамки' ],
announce: 'Из под его пера вышло 8 платиновых альбомов.',
full_text: 'Первая большая ёлка была установлена только в 1938 году.',
publication_date: '2020-10-21'*/



module.exports = Joi.object({
  [`user_id`]: Joi
    .number()
    .required(),

  title: Joi
    .string()
    .min(30)
    .max(250)
    .required()
    .message({
      [`string.min`]: TITLE_MIN_LENGTH_ERROR,
      [`string.max`]: TITLE_MAX_LENGTH_ERROR,
      [`string.empty`]: TITLE_EMPTY,
    }),

  picture: Joi
    ,
  
  
  /*categories,
  announce,
  [`full_text`],
  [`publication_date`],*/


});
