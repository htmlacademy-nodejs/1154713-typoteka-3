'use strict';

const {gray} = require(`chalk`);

module.exports = {
  run() {
    console.log(gray(`Программа запускает http-сервер и формирует файл с данными для API.`));
    console.log(gray(`
        Гайд:
        service.js <command>
        Команды:
            --version:            выводит номер версии
            --help:               печатает этот текст
            --generate <count>    формирует файл mocks.json
    `));
    process.exit();
  }
};
