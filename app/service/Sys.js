'use strict';

const Service = require('egg').Service;

/**
 * syc_info Api Service
 */
class Syc extends Service {
  constructor(ctx) {
    super(ctx);
    this.tableName = 'sys_info';
  }

  //新增已读
  async addRead(article_id) {
    const article_id = id
  }
}

module.exports = Syc;