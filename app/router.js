'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.redirect('/', '/home');
  router.redirect('/', '/home')
  router.get('/home',controller.wumuBlog.home.home)
  router.post('/article/post', controller.wumuBlog.article.post)
  router.get('/article/detail/:id', controller.wumuBlog.article.detail)
  router.get('/sysInfo', controller.system.info)
};
