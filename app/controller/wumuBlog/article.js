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

  async detail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.article.getDetail(id)


    ctx.body = {
      ...res,
      success: true,
    };
  }

  async post(ctx) {
    const { request } = ctx;
    const { body } = request;
    const { html, title, img_link } = body;
    const articleValues = {
      title: title,
      create_time: new Date(),
      article_user: 1,
      like_count: 0,
      comment_count: 0,
      read_count: 0,
      push_date: new Date(),
      img_link,
    }
    const articleDetailValues = {
      content_html: html,
    }
    const res = await ctx.service.article.post(articleValues, articleDetailValues)

    ctx.body = res;
  }
}

module.exports = NewsController;
