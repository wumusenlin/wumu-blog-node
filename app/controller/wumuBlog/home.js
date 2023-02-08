'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async home() {
    const { ctx, app } = this;
    const lastTenArticles = await ctx.service.article.getLastTenList();
    const sysInfo = await ctx.service.system.getSysInfo();
    ctx.body = {
      data: lastTenArticles,
      sysInfo,
      success: true,
      message: '加载成功'
    };
  }
}

module.exports = NewsController;
