'use strict';

const {createServer} = require(`http`);
const {ANSWER_SUCCESS} = require(`./consts`);
const {getDataFromFile, getResponseErrorScenario, getHtmlPage} = require(`./utils`);

const server = (port) => {
  const httpServer = createServer(async ({url}, res) => {
    switch (url) {
      default:
        getResponseErrorScenario(res);
        break;

      case `/`:
        try {
          const mockData = await getDataFromFile(`mock.json`, false);
          const titles = JSON.parse(mockData).map(({title}) => title);

          res.writeHead(ANSWER_SUCCESS, {
            'Content-type': `text/html; charset=utf-8;`
          });
          res.end(getHtmlPage(titles));
        } catch {
          getResponseErrorScenario(res);
        }
        break;
    }
  });

  httpServer.listen(port, () => console.log(`Серевер запущен. Порт: ${port}`));

  httpServer.on(`error`, ({message}) => console.log(`Ошибка ${message}`));
};

module.exports = {
  run: (port = 3000) => server(port),
};
