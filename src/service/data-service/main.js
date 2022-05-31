'use strict';

const sequelize = require(`sequelize`);

class MainService {
  constructor(dbModels) {
    const {Publication, Category, Comment} = dbModels;

    this._publications = Publication;
    this._categories = Category;
    this._comments = Comment;
  }





  async getAllPublications() {

    
    //return await this._publications.findAll({raw: true});

    return await this._publications.findAll({
      raw: true,

      attributes: {
        include: [`categories.category_name`],


        //include: [sequelize.fn(`string_agg`, sequelize.col(`categories.category_name`))],
      },

      
      
      include: [
        {
          model: this._categories,
          as: `categories`,
          through: {
            attributes: [],
          },

          attributes: [],
        }
      ],

      /*include: {
        model: this._categories,
      },*/



    });




  }

  async getPublicationById(publicationId) {
    return await this._publications.findByPk(publicationId);
  }

  async getAllCategories() {
    return await this._categories.findAll({raw: true});
  }

  async setNewPublication(publicationBody) {
    const recordResult = await this._publications.create(publicationBody);

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
        title: {
          [sequelize.Op.substring]: textSearch
        },
      }
    });
  }
}

module.exports = MainService;
