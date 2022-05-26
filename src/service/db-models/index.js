'use strict';

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const definePublication = require(`./publication`);
const defineRole = require(`./role`);
const defineUser = require(`./user`);


// fix queries прежде чем продолжать


module.exports = {
  define: (instanceDB) => {
    const Category = defineCategory(instanceDB);
    const Comment = defineComment(instanceDB);
    const Publication = definePublication(instanceDB);
    const Role = defineRole(instanceDB);
    const User = defineUser(instanceDB);
  },
};
