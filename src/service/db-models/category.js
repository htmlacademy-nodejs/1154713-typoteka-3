'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

module.exports = {
  define: (instanceDB) => Category.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    [`category_name`]: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize: instanceDB,
    modelName: `Category`,
    tableName: `categories`,
  }),
};
