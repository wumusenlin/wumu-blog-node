'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.redirect('/', '/news'); 
  router.get('/news', controller.news.list);
  router.get('/news/item/:id', controller.news.detail);
  router.get('/news/user/:id', controller.news.user);
  router.get('/api/test', controller.test.testList)
  router.get('/wumu-blog/home',controller.wumuBlog.home.homePage)
};
