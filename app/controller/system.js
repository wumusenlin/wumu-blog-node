'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async info() {
    const { ctx } = this;
    try {
      const res = await ctx.service.system.getSysInfo()
      ctx.body = {
        data: res,
        success: true,
      };
    } catch (error) {
      ctx.body = {
        message: '获取失败',
        success: false,
      };
    }
  }
}

module.exports = NewsController;
