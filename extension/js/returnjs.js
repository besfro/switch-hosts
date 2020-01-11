/*
 * @Description: 
 * @Author: clc
 * @Date: 2019-11-08 14:46:16
 * @LastEditors: clc
 * @LastEditTime: 2019-11-29 17:53:25
 */

import chrome from 'chrome'
//import pageMessage from './pageMessage'
import config from '@public/lib/manifest'
import {createRegexp} from '@utils/utils'

const fetchScript = src => {
  return fetch(src, {mode: 'cors'})
    .then(resp => resp.text())
    .then(text => {
        const codeRegexp =  createRegexp('C(u,s.pos,s.StartTime,a.ShortID)')
        // 匹配代码段 并且替插入代码
        const newText = text.replace(codeRegexp, match => {
            return `Knock.added(() => ${match}),${match}`
        })
        return newText
    })
}

// 向当前窗口注入代码
const rejectCode = (tabId, frameId, code) => {
  chrome.tabs.executeScript(tabId, {
    code,
    frameId,
    allFrames: false
  })
}

export default () => {
  chrome.webRequest.onBeforeRequest.addListener(
    details => {
      const {url, tabId, frameId} = details
      const injectedjsName = config['injected.umd.js'] || config['injected.umd.min.js']
      // 拦截脚本
      // 记录拦截地址 并且插入远程脚本
      rejectCode(tabId, frameId, `
        (() => {
          const topOrigin = location.hash.substr(1)
          const script = document.createElement('script')
          script.async = false
          script.src = topOrigin + '/lib/${injectedjsName}'
          document.body.append(script)
        })()
      `)
      // 拉取代码
      // const newText = await fetchScript(url)
      // const message = pageMessage.contact(tabId, frameId, params => {
      //   const {key, data} = params
      //   switch(key) {
      //     case 'appendScript':
      //       debugger
      //       const script = document.createElement('script')
      //       script.text = data
      //       document.head.append(script)
      //       break
      //   }
      // }) 
      // message.send({key: 'appendScript', data: newText})
      return {redirectUrl: 'https://doc.suantao.com/js/injectcode.js'}
    },
    {
      urls: [
        '*://s3a.bytecdn.cn/ies/webcast_union_platform_promotion/index.*.js'
      ],
      types: ['script']
    }, 
    ['blocking']
  )
} 
