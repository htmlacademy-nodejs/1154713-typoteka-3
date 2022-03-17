'use strict';

const ANSWER_ERROR = 404;
const SERVER_SERVICE_ERROR = 500;
const ARGUMENT_ERROR = 400;

const POST_REQUEST_BODY_ARGUMENTS = 4;

const BodyArguments = {
  Title: `title`,
  Announce: `announce`,
  FullText: `fullText`,
  Category: `category`,
};

module.exports = {
  ANSWER_ERROR,
  SERVER_SERVICE_ERROR,
  ARGUMENT_ERROR,
  POST_REQUEST_BODY_ARGUMENTS,
  BodyArguments,
};
