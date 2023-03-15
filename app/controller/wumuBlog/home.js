'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {
    const { ctx, app } = this;
    const lastTenArticles = await ctx.service.article.getLastTenList();
    ctx.body = {
      data: lastTenArticles,
      success: true,
      message: '加载成功'
    };
  }
}

module.exports = HomeController;
