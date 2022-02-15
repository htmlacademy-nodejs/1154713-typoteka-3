const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);

module.exports = {
  application: {
    help,
    version,
    generate,
  }
};
