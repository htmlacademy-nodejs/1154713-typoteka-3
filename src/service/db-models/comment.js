'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model {}

module.exports = {
  defineComment: (instanceDB) => Comment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    [`comment_text`]: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    [`data_comment`]: {
      // eslint-disable-next-line new-cap
      type: DataTypes.DATE(0),
      allowNull: false,
    },
  }, {
    sequelize: instanceDB,
    modelName: `Comment`,
    tableName: `comments`,
  }),
};
