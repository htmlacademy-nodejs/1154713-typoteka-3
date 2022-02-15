'use strict';

const {CATEGORIES, TEXT, TITLE, MAX_ANNOUNCE_STRING_COUNT} = require(`./consts`);
const {getDate, getText, getTitle, writeToFile, checkGenerateCount} = require(`./utils`);

const generate = (count) => {
  const result = [];

  if (count > 1000) {
    console.log(`Не больше 1000 публикаций`);
    process.exit();
  } else {
    for (let i = 0; i !== count; i++) {
      result.push({
        title: getTitle(TITLE),
        announce: getText(TEXT, MAX_ANNOUNCE_STRING_COUNT),
        fullText: getText(TEXT, TEXT.length),
        createdDate: getDate(),
        сategory: getText(CATEGORIES, CATEGORIES.length, `,`).split(`,`),
      });
    }
  }

  writeToFile(`../../mock.json`, JSON.stringify(result));
};

module.exports = {
  run: (argument = 1) => {
    checkGenerateCount(argument);
    generate(Number(argument));
  },
};
