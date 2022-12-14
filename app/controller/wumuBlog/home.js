'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async homePage() {
    const { ctx, app } = this;
    const sql = `select * from article`
    const articles = await app.mysql.query(sql);
    ctx.body = {
      data: articles,
      success: true,
      message: '加载成功'
    };
  };
  async home() {
    const { ctx, app } = this;
    const values = {
      limit: 10,
      orders: [['create_time', 'desc']],
    }
    const lastTenArticles = await app.mysql.select('article', values);

    ctx.body = {
      data: lastTenArticles,
      success: true,
      message: '加载成功'
    };
  }
}

module.exports = NewsController;
