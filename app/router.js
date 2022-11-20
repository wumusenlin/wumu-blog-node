'use strict';

module.exports = app => {
  const { router, controller } = app;

  app.redirect('/', '/home');
  router.redirect('/', '/home')
  router.get('/home',controller.wumuBlog.home.home)
  router.get('/wumu-blog/home',controller.wumuBlog.home.homePage)
};
