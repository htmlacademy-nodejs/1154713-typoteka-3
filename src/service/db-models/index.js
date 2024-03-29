'use strict';

const {Model} = require(`sequelize`);

const {defineCategory} = require(`./category`);
const {defineComment} = require(`./comment`);
const {definePublication} = require(`./publication`);
const {defineRole} = require(`./role`);
const {defineUser} = require(`./user`);
const {defineRefreshTokens} = require(`./refresh-tokens`);

class PublicationsCategories extends Model {}

module.exports = {
  define: (instanceDB) => {
    const Category = defineCategory(instanceDB);
    const Comment = defineComment(instanceDB);
    const Publication = definePublication(instanceDB);
    const Role = defineRole(instanceDB);
    const User = defineUser(instanceDB);
    const RefreshTokens = defineRefreshTokens(instanceDB);

    PublicationsCategories.init({}, {
      sequelize: instanceDB,
      modelName: `PublicationsCategories`,
      tableName: `publications_categories`,
      timestamps: false,
    });

    Role.hasMany(User, {as: `user`, foreignKey: `role_id`, onDelete: `SET NULL`, onUpdate: `CASCADE`});
    User.belongsTo(Role, {foreignKey: `role_id`});

    User.hasMany(Comment, {as: `comment`, foreignKey: `user_id`, onDelete: `SET NULL`, onUpdate: `CASCADE`});
    Comment.belongsTo(User, {foreignKey: `user_id`});

    Publication.hasMany(Comment, {as: `comments-publication`, foreignKey: `publication_id`, onDelete: `SET NULL`, onUpdate: `CASCADE`});
    Comment.belongsTo(Publication, {foreignKey: `publication_id`});

    User.hasMany(Publication, {foreignKey: `user_id`, onDelete: `SET NULL`, onUpdate: `CASCADE`});
    Publication.belongsTo(User, {foreignKey: `user_id`});

    Publication.belongsToMany(Category, {through: PublicationsCategories, as: `categories`, foreignKey: `publication_id`, otherKey: `category_id`, onDelete: `CASCADE`, onUpdate: `CASCADE`});
    Category.belongsToMany(Publication, {through: PublicationsCategories, as: `publications`, foreignKey: `category_id`, otherKey: `publication_id`, onDelete: `CASCADE`, onUpdate: `CASCADE`});

    Category.hasMany(PublicationsCategories, {as: `categories-publications`, foreignKey: `category_id`, onDelete: `CASCADE`, onUpdate: `CASCADE`});

    return {
      Category,
      Comment,
      Publication,
      Role,
      User,
      PublicationsCategories,
      RefreshTokens,
    };
  },
};
