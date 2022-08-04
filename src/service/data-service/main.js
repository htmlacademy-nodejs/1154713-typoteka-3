'use strict';

const {DB_TYPE} = process.env;

const sequelize = require(`sequelize`);
const {ADMIN_USER_ROLE_ID, READER_USER_ROLE_ID} = require(`../common/consts`);

const BaseUtils = require(`./base-utils`);

class MainService extends BaseUtils {
  constructor(dbModels) {
    super();

    const {Publication, Category, Comment, User, PublicationsCategories, RefreshTokens} = dbModels;

    this._publications = Publication;
    this._categories = Category;
    this._comments = Comment;
    this._user = User;
    this._publicationsCategories = PublicationsCategories;
    this._refreshTokens = RefreshTokens;
  }

  async getAllPublications(pageNumber = 0) {
    const publicationsCount = await this._publications.count();

    const publicationsData = await this._publications.findAll({
      raw: true,
      group: [`Publication.id`, `User.user_name`, `User.user_surname`],
      attributes: {
        include: this.getIncludeAttributes(sequelize),
      },
      include: this.getIncludeModels(),
    });

    const {rows: paginationData} = await this._publications.findAndCountAll({
      raw: true,
      limit: 8,
      offset: this.getOffsetNumber(publicationsCount, pageNumber),
      subQuery: false,
      group: [`Publication.id`, `User.user_name`, `User.user_surname`],
      attributes: {
        include: this.getIncludeAttributes(sequelize),
      },
      include: this.getIncludeModels(),
    });

    const allPublicationsIds = publicationsData.map(({id}) => id);

    const preparedCommentsData = allPublicationsIds.map((publicationId) =>
      this._comments.findOne({
        limit: 1,
        order: [
          [`data_comment`, `DESC`]
        ],
        group: [`Comment.id`, `User.user_name`, `User.user_surname`],
        where: {
          [`publication_id`]: publicationId,
        },
        include: [
          {
            model: this._user,
            as: `User`,
            attributes: [],
          }
        ],
        attributes: {
          include: [
            [
              (
                DB_TYPE
                  ? sequelize.fn(`concat`, sequelize.col(`User.user_name`), ` `, sequelize.col(`User.user_surname`))
                  : sequelize.literal(`User.user_name || ' ' || User.user_surname`)
              ), `comment_owner`
            ]
          ],
        },
      }));

    const lastCommentsData = (await Promise.all(preparedCommentsData)).filter((item) => item);

    return {
      publicationsCount,
      paginationData,
      publicationsData,
      lastCommentsData,
    };
  }

  async getPublicationById(publicationId) {
    const publication = await this._publications.findByPk(publicationId, {
      raw: true,
      group: [`Publication.id`, `User.user_name`, `User.user_surname`],
      attributes: {
        include: [
          [
            (
              DB_TYPE
                ? sequelize.fn(`array_agg`, sequelize.fn(`DISTINCT`, sequelize.col(`categories.category_name`)))
                : sequelize.fn(`group_concat`, sequelize.col(`categories.category_name`), `|`)
            ), `categories`
          ],
          [
            (
              DB_TYPE
                ? sequelize.fn(`concat`, sequelize.col(`User.user_name`), ` `, sequelize.col(`User.user_surname`))
                : sequelize.literal(`User.user_name || ' ' || User.user_surname`)
            ), `publication_owner`
          ],
        ],
      },
      include: [
        {
          model: this._categories,
          as: `categories`,
          through: {
            attributes: [],
          },
          attributes: [],
        },
        {
          model: this._user,
          as: `User`,
          attributes: [],
        },
      ],
    });

    const publicationComments = await this._comments.findAll({
      raw: true,
      where: {
        [`publication_id`]: publicationId,
      },
      include: [
        {
          model: this._user,
          as: `User`,
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [
            (
              DB_TYPE
                ? sequelize.fn(`concat`, sequelize.col(`User.user_name`), ` `, sequelize.col(`User.user_surname`))
                : sequelize.literal(`User.user_name || ' ' || User.user_surname`)
            ), `comment_owner`
          ]
        ],
      },
    });

    const usedCategoriesData = await this._categories.findAll({
      raw: true,
      where: {
        [`category_name`]: DB_TYPE ? publication.categories : Array.from(new Set(publication.categories.split(`|`))),
      },
      group: [`Category.id`],
      attributes: {
        include: [
          [
            sequelize.fn(`count`, sequelize.col(`Category.id`)), `category_count`
          ]
        ],
      },
      include: [
        {
          model: this._publicationsCategories,
          as: `categories-publications`,
          attributes: [],
        }
      ],
    });

    return {
      publication,
      publicationComments,
      usedCategoriesData,
    };
  }

  async getAllCategories() {
    return await this._categories.findAll({raw: true});
  }

  async setNewPublication(publicationBody) {
    const recordResult = await this._publications.create(publicationBody);

    const searchedCategories = await this._categories.findAll({
      raw: true,
      where: {
        [`category_name`]: publicationBody.categories,
      },
    });

    const recordId = recordResult.dataValues.id;

    const newPublicationsCategoriesRecords = searchedCategories.map(({id}) => ({
      [`publication_id`]: recordId,
      [`category_id`]: id,
    }));

    await this._publicationsCategories.bulkCreate(newPublicationsCategoriesRecords);

    return recordResult;
  }

  async updatePublication(publicationId, publicationBody) {
    return await this._publications.update(publicationBody, {
      where: {
        id: publicationId,
      }
    });
  }

  async deletePublication(publicationId) {
    return await this._publications.destroy({
      where: {
        id: publicationId,
      }
    });
  }

  async getCommentsPublication(publicationId) {
    return await this._comments.findAll({
      raw: true,
      where: {
        [`publication_id`]: publicationId,
      },
    });
  }

  async deleteComment(publicationId, commentId) {
    return await this._comments.destroy({
      where: {
        id: commentId,
        [`publication_id`]: publicationId,
      }
    });
  }

  async addNewComment(body) {
    return await this._comments.create(body);
  }

  async getSearchedData(textSearch) {
    return await this._publications.findAll({
      raw: true,
      where: {
        title: sequelize.where(sequelize.fn(`LOWER`, sequelize.col(`title`)), `LIKE`, `%${textSearch.toLowerCase()}%`),
      }
    });
  }

  async getCategoryDataById(categoryId) {
    const {category_name: categoryName} = await this._categories.findByPk(categoryId);

    return {
      categoryName,
    };
  }

  async getAllUsers() {
    const allUsers = await this._user.findAll({raw: true});
    return allUsers;
  }

  async setNewUser(userData) {
    // eslint-disable-next-line no-unused-vars
    const {retry_password: _, ...mainData} = userData;

    const isSameEmailUserExist = Boolean(await this._user.findOne({
      where: {
        email: mainData.email,
      }
    }));

    const hasAdminUser = Boolean(await this._user.findOne({
      where: {
        [`role_id`]: ADMIN_USER_ROLE_ID,
      },
    }));

    if (isSameEmailUserExist) {
      return {isSameEmailUserExist};
    }

    const result = await this._user.create({
      ...mainData,
      [`role_id`]: hasAdminUser ? READER_USER_ROLE_ID : ADMIN_USER_ROLE_ID,
    });

    return result;
  }

  async findUserEmail(email) {
    const userInDB = await this._user.findOne({
      where: {
        email,
      }
    });

    return userInDB;
  }

  async addRefreshToken(refreshToken) {
    return await this._refreshTokens.create({
      [`refresh_token`]: refreshToken,
    });
  }

  async findRefreshToken(refreshToken) {
    return await this._refreshTokens.findOne({
      where: {
        [`refresh_token`]: refreshToken,
      }
    });
  }
}

module.exports = MainService;
