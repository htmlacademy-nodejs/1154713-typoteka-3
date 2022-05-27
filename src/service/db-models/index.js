'use strict';

const {Model} = require(`sequelize`);

const {defineCategory} = require(`./category`);
const {defineComment} = require(`./comment`);
const {definePublication} = require(`./publication`);
const {defineRole} = require(`./role`);
const {defineUser} = require(`./user`);

class PublicationsCategories extends Model {}

module.exports = {
  define: (instanceDB) => {
    const Category = defineCategory(instanceDB);
    const Comment = defineComment(instanceDB);
    const Publication = definePublication(instanceDB);
    const Role = defineRole(instanceDB);
    const User = defineUser(instanceDB);

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

    Publication.belongsToMany(Category, {through: PublicationsCategories});
    Category.belongsToMany(Publication, {through: PublicationsCategories});
    Publication.hasMany(PublicationsCategories, {as: `publications-to-categories`, foreignKey: `publication_id`, onDelete: `CASCADE`, onUpdate: `CASCADE`});
    PublicationsCategories.belongsTo(Publication, {foreignKey: `publication_id`});
    Category.hasMany(PublicationsCategories, {as: `categories-to-publications`, foreignKey: `category_id`, onDelete: `CASCADE`, onUpdate: `CASCADE`});
    PublicationsCategories.belongsTo(Category, {foreignKey: `category_id`});

    return {
      Category,
      Comment,
      Publication,
      Role,
      User,
      PublicationsCategories,
    };
  },
};
