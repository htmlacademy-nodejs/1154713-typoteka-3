'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Publication extends Model {}

module.exports = {
  definePublication: (instanceDB) => Publication.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    [`publication_date`]: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
    },
    [`full_text`]: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    announce: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [`user_id`]: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize: instanceDB,
    modelName: `Publication`,
    tableName: `publications`,
    timestamps: false,
  }),
};
