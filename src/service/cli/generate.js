'use strict';

const {promises: {writeFile}} = require(`fs`);
const {red, green} = require(`chalk`);

const {CATEGORIES, TEXT, TITLE, MAX_ANNOUNCE_STRING_COUNT} = require(`./consts`);
const {getDate, getText, getTitle, checkGenerateCount} = require(`./utils`);

const generate = async (count) => {
  const result = [];

  if (count > 1000) {
    console.log(red(`Не больше 1000 публикаций`));
    process.exit();
  } else {
    for (let i = 0; i < count; i++) {
      result.push({
        title: getTitle(TITLE),
        announce: getText(TEXT, MAX_ANNOUNCE_STRING_COUNT),
        fullText: getText(TEXT, TEXT.length),
        createdDate: getDate(),
        сategory: getText(CATEGORIES, CATEGORIES.length, `,`).split(`,`),
      });
    }
  }

  try {
    await writeFile(`../../mock.json`, JSON.stringify(result));
    console.log(green(`Файл записан УСПЕШНО.`));
    process.exit(0);
  } catch {
    console.log(red(`ОШИБКА записи в файл.`));
    process.exit(1);
  }
};

module.exports = {
  run: (argument = 1) => {
    checkGenerateCount(argument);
    generate(Number(argument));
  },
};
