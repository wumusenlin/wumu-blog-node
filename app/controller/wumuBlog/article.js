'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async getArticle(id) {
    const { ctx } = this;
    const data = Array.from(new Array(12)).map((_val, i) => ({
      name: `name${i}`,
      id: i,
    }));
    ctx.body = {
      data,
      success: true,
      message: '加载成功'
    };
  }
}

module.exports = NewsController;
