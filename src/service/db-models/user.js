'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

module.exports = {
  defineUser: (instanceDB) => User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    [`user_name`]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [`user_surname`]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [`user_password`]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    [`role_id`]: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize: instanceDB,
    modelName: `User`,
    tableName: `users`,
    timestamps: false,
  }),
};
