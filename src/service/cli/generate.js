'use strict';

const {red} = require(`chalk`);

const {MAX_ANNOUNCE_STRING_COUNT, TITLES_PATH, CATEGORIES_PATH, MAIN_TEXT_PATH} = require(`./consts`);
const {getDate, getText, getTitle, getTextDataFromFile, checkGenerateCount, writeToMockJSON} = require(`./utils`);

const generate = async (count) => {
  const result = [];
  const textData = await Promise.all([
    getTextDataFromFile(TITLES_PATH),
    getTextDataFromFile(MAIN_TEXT_PATH),
    getTextDataFromFile(CATEGORIES_PATH)
  ]);

  if (count > 1000) {
    console.log(red(`Не больше 1000 публикаций`));
    process.exit();
  } else {
    for (let i = 0; i < count; i++) {
      result.push({
        title: getTitle(textData[0]),
        announce: getText(textData[1], MAX_ANNOUNCE_STRING_COUNT),
        fullText: getText(textData[1], textData[1].length),
        createdDate: getDate(),
        сategory: getText(textData[2], textData[2].length, `,`).split(`,`),
      });
    }
  }

  writeToMockJSON(result);
};

module.exports = {
  run: (argument = 1) => {
    checkGenerateCount(argument);
    generate(Number(argument));
  },
};
