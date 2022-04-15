'use strict';

const {nanoid} = require(`nanoid`);

const {getDate, getText, getTitle, getDataFromFile, checkGenerateCount, writeToMockJSON} = require(`./utils`);
const {getLogger} = require(`../lib/logger`);

const MAX_ANNOUNCE_STRING_COUNT = 5;

const generate = async (count) => {
  const logger = getLogger(`generate-function`);

  const result = [];

  try {
    const [titles, sentences, categories, comments] = await Promise.all([
      getDataFromFile(`../../data/titles.txt`),
      getDataFromFile(`../../data/sentences.txt`),
      getDataFromFile(`../../data/categories.txt`),
      getDataFromFile(`../../data/comments.txt`)
    ]);

    if (count > 1000) {
      logger.error(`Не больше 1000 публикаций`);
      process.exit();
    } else {
      for (let i = 0; i < count; i++) {
        result.push({
          id: nanoid(6),
          title: getTitle(titles),
          announce: getText(sentences, MAX_ANNOUNCE_STRING_COUNT).join(` `),
          fullText: getText(sentences, sentences.length).join(` `),
          createdDate: getDate(),
          category: Array.from(new Set(getText(categories, categories.length))),
          comments: getText(comments, comments.length).map((item) => ({id: nanoid(6), text: item})),
        });
      }


      console.log('RESULT', result);

    }
    writeToMockJSON(result);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  run: (argument = 1) => {
    checkGenerateCount(argument);
    generate(Number(argument));
  },
};
