'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);
const server = require(`./server`);

module.exports = {
  application: {
    help,
    version,
    generate,
    server,
  }
};
