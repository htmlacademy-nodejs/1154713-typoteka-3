'use strict';

const MAX_ANNOUNCE_STRING_COUNT = 5;

const TITLES_PATH = `../../data/titles.txt`;
const MAIN_TEXT_PATH = `../../data/sentences.txt`;
const CATEGORIES_PATH = `../../data/categories.txt`;

const ANSWER_SUCCESS = 200;
const ANSWER_ERROR = 404;

module.exports = {
  MAX_ANNOUNCE_STRING_COUNT,
  TITLES_PATH,
  MAIN_TEXT_PATH,
  CATEGORIES_PATH,
  ANSWER_ERROR,
  ANSWER_SUCCESS,
};
