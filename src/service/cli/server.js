'use strict';

const {promises: {readFile}} = require(`fs`);

const {red, green} = require(`chalk`);

const {getDataFromFile} = require(`./utils`);
const {getServerConfig} = require(`./server-config`);

module.exports = {
  run: async (port = 3000) => {
    try {
      const fileData = await readFile(`mock.json`);
      const categoriesData = await getDataFromFile(`./data/categories.txt`);

      const serverConfig = getServerConfig(JSON.parse(fileData), categoriesData);

      serverConfig.listen(port, () => console.log(green(`Service server started`)));
    } catch ({message}) {
      console.log(red(`Ошибка ${message}`));
    }
  },
};
