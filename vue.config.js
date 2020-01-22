/*
 * @Description: 
 * @Author: clc
 * @Date: 2019-12-03 10:54:06
 * @LastEditors: clc
 * @LastEditTime: 2019-12-04 18:21:54
 */

const path = require('path') 
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  outputDir: 'extension/dist',
  publicPath: '',
  pages: {
    options: {
      entry: 'src/pages/options.js',
      filename: 'options.html',
      title: 'options'
    },
    popup: {
      entry: 'src/pages/popup.js',
      filename: 'popup.html',
      title: 'popup'
    }
  },
  devServer: {
    allowedHosts: [
      'test.com',
      'hh.baidu.com'
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config.externals({
      chrome: 'chrome'
    })
  }
}