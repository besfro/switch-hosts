/*
 * @Description: 此模块用于扩展向页面发送消息
 * @Author: clc
 * @Date: 2019-11-29 11:54:16
 * @LastEditors: clc
 * @LastEditTime: 2019-11-29 17:13:54
 */

import chrome from 'chrome'
 
class PageMessage {
  constructor(tabId, frameId, pageHandler) {
    this.tabId = tabId
    this.frameId = frameId
    this.extensionId = chrome.runtime.id
    this.handler = pageHandler
    this.messages = {}
    this.messageCount = 0
    this.createListener()
  }

  // 添加监听
  // https://developer.chrome.com/extensions/runtime#event-onMessage
  createListener() {
    chrome.runtime.onMessage.addListener((message, page, response) => {
      console.log('i am listening')
      this.response(message, response)
    })
  }
  
  response(message, response) {
    const {messageId} = message
    const findMessage = this.messages[messageId]
    findMessage(response)
  }

  createMessageId() {
    const count = this.messageCount++
    const createRandom = len => Math.round(Math.random() * Math.pow(len, 10))
    const random = createRandom(3)
    const randomS = createRandom(6)
    return btoa(`_${randomS}_`).substr(0, 3) + btoa(`${count}${random}`)
  }

  addMessage(messageId, fn) {
    this.messages[messageId] = (...args) => {
      fn && fn(...args)
      delete this.messages[messageId]
    }
  }

  // 向页面发送消息
  send(data) {
    const {tabId, frameId, extensionId} = this
    const messageId = this.createMessageId()
    const code = `
      chrome.runtime.sendMessage(
        '${extensionId}', 
        {messageId: '${messageId}'}, 
        ${this.handler.toString()}
      )
    `
    this.addMessage(messageId, response => response(data))
    // 向页面发送消息
    // 由于扩展的限制 消息从page先发起
    chrome.tabs.executeScript(tabId, {
      code,
      frameId,
      allFrames: false
    })
  }
}

const instances = {}

export default {
  contact(tabId, frameId, handler) {
    const id = `${tabId}-${frameId}`
    const message = instances[id]
    if(message) {
      return message
    } else {
      const newMessage = new PageMessage(tabId, frameId, handler)
      instances[id] = newMessage
      return newMessage
    }
  }
}