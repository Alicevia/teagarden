const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // publicPath:'/jimao/',//history hash
  publicPath:'./',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('home',resolve('src/views/home'))
      .set('views',resolve('src/views'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#00B57E',
          'link-color': '#00B57E',
          'border-radius-base': '5px',
        },
        javascriptEnabled: true,
      }
    }
  },
}