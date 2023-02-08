'use strict';

const Service = require('egg').Service;

/**
 * syc_info Api Service
 */
class System extends Service {
  constructor(ctx) {
    super(ctx);
    this.tableName = 'sys_info';
  }

  //获取系统信息
  async getSysInfo(){
    try {
      const id = 1;
      return await this.ctx.app.mysql.get(this.tableName,{id})
    } catch (error) {
      return {}
    }
  }
}

module.exports = System;