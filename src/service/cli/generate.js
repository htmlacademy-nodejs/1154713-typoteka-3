'use strict';

const {red} = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getDate, getText, getTitle, getDataFromFile, checkGenerateCount, writeToMockJSON} = require(`./utils`);

const MAX_ANNOUNCE_STRING_COUNT = 5;

const generate = async (count) => {
  const result = [];

  try {
    const textData = await Promise.all([
      getDataFromFile(`../../data/titles.txt`),
      getDataFromFile(`../../data/sentences.txt`),
      getDataFromFile(`../../data/categories.txt`),
      getDataFromFile(`../../data/comments.txt`)
    ]);

    if (count > 1000) {
      console.log(red(`Не больше 1000 публикаций`));
      process.exit();
    } else {
      for (let i = 0; i < count; i++) {
        result.push({
          id: nanoid(6),
          title: getTitle(textData[0]),
          announce: getText(textData[1], MAX_ANNOUNCE_STRING_COUNT).join(` `),
          fullText: getText(textData[1], textData[1].length).join(` `),
          createdDate: getDate(),
          сategory: getText(textData[2], textData[2].length),
          comments: getText(textData[3], textData[3].length).map((item) => ({id: nanoid(6), text: item})),
        });
      }
    }
    writeToMockJSON(result);
  } catch (error) {
    console.log(red(error.message));
    process.exit(1);
  }
};

module.exports = {
  run: (argument = 1) => {
    checkGenerateCount(argument);
    generate(Number(argument));
  },
};
