/*
 * @Description: 请求处理
 * @Author: clc
 * @Date: 2019-11-08 15:23:47
 * @LastEditors: clc
 * @LastEditTime: 2019-11-27 15:51:13
 */

import chrome from 'chrome'

// 查找匹配的 url
const findHost = (url, hosts) => {
  const find = hosts.filter(item => {
    let result = false
    const urls = item.urls
    const testing = (url, testUrl) => {
      const reg = new RegExp('^' + url.replace(/\/|\./g, match => `\\${match}`))
      return reg.test(testUrl)
    }
    urls.forEach(subItem => testing(subItem, url) && (result = true))
    return result
  })
  return find[0]
}

// 配置 host
const hosts = [
  {
    urls: ['https://localhost:80', 'https://doc.suantao.com'],
    cors: ['https://union.bytedance.com']
  },
  {
    // 目标域名
    urls: ['https://union.bytedance.com'],
    // 设置跨域源
    cors: [],
    // 需要过滤的头部
    filterHeader: ['X-Frame-Options', 'x-frame-options']
  }
]

export default () => {
  chrome.webRequest.onHeadersReceived.addListener(
    details => {
      const {responseHeaders, url} = details
      const matchHost = findHost(url, hosts)
      // 匹配 host
      if(matchHost) {
        const {cors = [], filterHeader = []} = matchHost
        // 设置 cors
        cors.forEach(item => responseHeaders.push({name: 'Access-Control-Allow-Origin', value: item}))
        // 过滤头部
        for(let i = 0; i < responseHeaders.length; i++) {
          const name = responseHeaders[i].name
          if(filterHeader.indexOf(name) !== -1) {
            responseHeaders.splice(i, 1)
          }
        }
      }
      return {responseHeaders}
    }, 
    {urls: ['<all_urls>']}, 
    ['blocking', 'responseHeaders']
  )
}