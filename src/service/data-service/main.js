'use strict';

const sequelize = require(`sequelize`);

class MainService {
  constructor(dbModels) {
    const {Publication, Category, Comment, User} = dbModels;

    this._publications = Publication;
    this._categories = Category;
    this._comments = Comment;
    this._user = User;
  }

  async getAllPublications() {
    const publicationsData = await this._publications.findAll({
      raw: true,
      group: [`Publication.id`, `User.user_name`, `User.user_surname`],
      attributes: {
        include: [
          [
            sequelize.fn(`array_agg`, sequelize.fn(`DISTINCT`, sequelize.col(`categories.category_name`))), `categories`
          ],
          [
            sequelize.fn(`array_agg`, sequelize.fn(`DISTINCT`, sequelize.col(`comments-publication.comment_text`))), `comments`
          ],
          [
            sequelize.fn(`concat`, sequelize.col(`User.user_name`), ` `, sequelize.col(`User.user_surname`)), `publication_owner`
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
          model: this._comments,
          as: `comments-publication`,
          attributes: [],
        },
        {
          model: this._user,
          as: `User`,
          attributes: [],
        },
      ],
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
              sequelize.fn(`concat`, sequelize.col(`User.user_name`), ` `, sequelize.col(`User.user_surname`)), `comment_owner`
            ]
          ],
        },
      }));

    const lastCommentsData = (await Promise.all(preparedCommentsData)).filter((item) => item);

    return {
      publicationsData,
      lastCommentsData,
    };
  }







  async getPublicationById(publicationId) {
    return await this._publications.findByPk(publicationId, {
      raw: true,
      group: [`Publication.id`],
      attributes: {
        include: [
          [
            sequelize.fn(`array_agg`, sequelize.fn(`DISTINCT`, sequelize.col(`categories.category_name`))), `categories`
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
      ],
    });
  }




  async getAllCategories() {
    return await this._categories.findAll({raw: true});
  }






  async setNewPublication(publicationBody) {



    console.log('PUB_BODY~~~~~~~~~~~~~~~~~~~', publicationBody);

    /*PUB_BODY - must to be {
      title: '1111',
      picture: '',
      
      announce: '333',
      full_text: '222',
      publication_date: '2020-10-21'


      categories: [],
    }*/

    // сдел нов запись в связующей таблице публикаций и категорий

    const recordResult = await this._publications.create(publicationBody);



    console.log('SET~~~~~~!!!!!!!!!!', recordResult);

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
}

module.exports = MainService;
