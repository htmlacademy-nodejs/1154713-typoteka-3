// тестовый сервер
'use strict';

const { createServer } = require(`http`);

const HTTP_SUCCESS = 200;
const HTTP_ERROR = 404;

const STYLES = `
h1 {
  color: red;
  font-size: 24px;
}
p {
  color: green;
  font-size: 16px;
}`;

const getHeader = (contentType) => ({
  'Content-type': `${contentType}; charset=UTF-8`,
});

const getPage = (userAgent) => `
<!DOCTYPE html>
  <html lang="ru">
  <head>
    <title>From Node with love!</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Привет !!!</h1>
    <p>Ты используешь: ${userAgent}.</p>
  </body>
</html>
`;

const httpServer = createServer((req, res) => {
  switch (req.url) {
    case `/`:
      res.writeHead(HTTP_SUCCESS, getHeader(`text/html`));
    
      res.end(getPage(req.headers[`user-agent`]));
      break;
    
    case `/style.css`:
      res.writeHead(HTTP_SUCCESS, getHeader(`text/css`));

      res.end(STYLES);
      break;

    default:
      res.writeHead(HTTP_ERROR, getHeader(`text/plain`));

      res.end(`Ничего не найдено`);
      break;
  }
});

httpServer.listen(8000, () => console.log(`Server started...`));

httpServer.on(`error`, ({message: errorMessage}) => console.log(`Error - ${errorMessage}`));
