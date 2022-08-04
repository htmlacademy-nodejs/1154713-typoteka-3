'use strict';

const {DataTypes, Model} = require(`sequelize`);

class RefreshTokens extends Model {}

module.exports = {
  defineRefreshTokens: (instanceDB) => RefreshTokens.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    [`refresh_token`]: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    sequelize: instanceDB,
    modelName: `RefreshTokens`,
    tableName: `refresh_tokens`,
    timestamps: false,
  }),
};
