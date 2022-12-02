'use strict';

const Service = require('egg').Service;

/**
 * Article Api Service
 */
class Article extends Service {
  constructor(ctx) {
    super(ctx);
    this.config = this.ctx.app.config.news;
    this.serverUrl = this.config.serverUrl;
    this.pageSize = this.config.pageSize;
    this.tableName = 'article';
  }

  /**
   * request hacker-news api
   * @param {String} api - Api name
   * @param {Object} [opts] - urllib options
   * @return {Promise} response.data
   */
  async request(api, opts) {
    const options = Object.assign({
      dataType: 'json',
      timeout: ['30s', '30s'],
    }, opts);

    const result = await this.ctx.curl(`${this.serverUrl}/${api}`, options);
    return result.data;
  }

  /**
   * get top story ids
   * @param {Number} [page] - page number, 1-base
   * @param {Number} [pageSize] - page count
   * @return {Promise} id list
   */
  async getTopStories(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || this.pageSize;

    const result = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
    });
    return Object.keys(result).map(key => result[key]);
  }

  /**
   * query item
   * @param {Number} id - itemId
   * @return {Promise} item info
   */
  async getItem(id) {
    return this.request(`item/${id}.json`);
  }

  /**
   * get user info
   * @param {Number} id - userId
   * @return {Promise} user info
   */
  async getUser(id) {
    return this.request(`user/${id}.json`);
  }


  async post(values = {}, articleDetailValues) {
    if (JSON.stringify(values) === '{}') {
      return false
    }
    try {


      // 插入
      // const result = await this.ctx.app.mysql.insert(this.tableName, values); // 在article 表中，插入 title 为[text] 的记录
      const articleResult = await this.ctx.app.mysql.insert('article', values); // 在 post 表中，插入 title 为 Hello World 的记录
      console.log('articleResult', articleResult)
      const { insertId, message, affectedRows } = articleResult;
      const insertSuccess = affectedRows === 1;
      if (insertSuccess) {
        const newArticleDetailValues = { ...articleDetailValues, article_id: insertId }
        const articleDetailResult = await this.ctx.app.mysql.insert('article_detail', newArticleDetailValues);
        console.log('articleDetailResult', articleDetailResult)
        const hereInsertSuccess = articleDetailResult.affectedRows === 1;
        return {
          data: { insertId: articleDetailResult.insertId },
          success: hereInsertSuccess,
          message: articleDetailResult.message
        }
      }

      return {
        success: false,
        message: message
      }
    } catch (error) {
      console.log('error', error)
      return {
        success: false,
        message: '插入失败'
      }
    }
  }

  async getDetail(id) {
    try {
      const article = await this.ctx.app.mysql.get('article', { article_id: id });
      const article_detail = await this.ctx.app.mysql.get('article_detail', { article_id: id });
      return {
        data: {
          ...article,
          ...article_detail,
        },
        message: '获取数据成功',
      }
    } catch (e) {
      console.log('e', e)
      return {
        success: false,
        message: '获取数据失败',
      }
    }
  }
}

module.exports = Article;