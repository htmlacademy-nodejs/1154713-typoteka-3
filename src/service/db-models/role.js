'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Role extends Model {}

module.exports = {
  defineRole: (instanceDB) => Role.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    [`user_role`]: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize: instanceDB,
    modelName: `Role`,
    tableName: `roles`,
  }),
};
