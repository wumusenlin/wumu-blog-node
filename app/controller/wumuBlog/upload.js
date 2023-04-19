const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller;

class uploadController extends Controller {
  async upload() {
    const { ctx } = this;
    try {
      const files = ctx.request.files
      console.log('files', files)

      if (files.length === 1) {
        const file = files[0]
        // 读取文件
        const fileInstance = fs.readFileSync(file.filepath)
        // console.log('fileInstance', fileInstance)
        const fileName = path.join('.', '..', '.', `upload`, `${(new Date()).valueOf()}-${file.filename}`)
        // 将文件存到指定位置
        fs.writeFileSync(fileName, fileInstance)
        ctx.body = {
          errno: 0,
          data: {
            url: fileName,
            url:'https://s1.ax1x.com/2023/03/24/pp048Qx.png',
            alt: file.filename,
          }
        }
      }




    } catch (error) {
      console.log('error', error)
      ctx.body = { errno: 0, message: '上传出错了' }
    }
  }
}

module.exports = uploadController;