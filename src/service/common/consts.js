'use strict';

const ANSWER_ERROR = 404;
const SERVER_SERVICE_ERROR = 500;
const ARGUMENT_ERROR = 400;

const COMMENT_ARGUMENTS = [
  `comment_text`,
  `data_comment`,
  `user_id`,
  `publication_id`
];

module.exports = {
  ANSWER_ERROR,
  SERVER_SERVICE_ERROR,
  ARGUMENT_ERROR,
  COMMENT_ARGUMENTS,
};
