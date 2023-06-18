'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.redirect('/', '/home');
  router.redirect('/', '/home')
  router.get('/sysInfo', controller.system.info)
  
  router.get('/home',controller.wumuBlog.home.home)
  router.post('/article/post', controller.wumuBlog.article.post)
  router.get('/article/detail/:id', controller.wumuBlog.article.detail)
  router.post('/upload', controller.wumuBlog.upload.upload)
  router.post('/ckeditorUpload', controller.wumuBlog.upload.ckeditorUpload)
};
