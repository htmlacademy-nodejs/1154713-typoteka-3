'use strict';

const {blue} = require(`chalk`);
const {version} = require(`../../../package.json`);

module.exports = {
  run() {
    console.log(blue(version));
    process.exit();
  }
};
