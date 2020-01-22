/*
 * @Description: Dns proxy
 * @Author: clc
 * @Date: 2019-12-13 18:01:22
 * @LastEditors: clc
 * @LastEditTime: 2019-12-13 18:04:14
 */

import chrome from 'chrome'
import config from '@/assets/js/config'
import { type } from '@/utils/utils'

class DnsProxy {
  constructor() {
    this.scope = config.scope 
    this.hosts = []
  }

  setProxy(hosts) {
    if(!hosts || !type.isArray(hosts)) {
      return 
    }

    if(hosts.length <= 0) {
      this.clear()
      return
    }
    
    this.chromeProxySet(
      this.createPacScript(hosts)
    )
    
    console.log(hosts)
    console.log(this.createPacScript(hosts))
  }

  getProxy() {
    return this.hosts
  }

  createPacScript(hosts) {
    const caseArr = []

    hosts.forEach(item => {
      const {host, ip} = item
      const protocol = /:\d+$/.test(ip) ? '' : ':80'
      caseArr.push(`
        case '${host}':
          proxyValue = 'PROXY ${ip}${protocol}' 
          break
      `)
    })
    
    return `
      function FindProxyForURL(url, host) {
        let proxyValue = 'DIRECT'
        switch(host) {
          ${caseArr.join('')}
        }
        return proxyValue
      }
    `
  }

  chromeProxySet(data) {
    // https://developer.chrome.com/extensions/proxy#type-PacScript
    chrome.proxy.settings.set({
      value: {
        mode: 'pac_script',
        pacScript: {
          data
        }
      },
      scope: this.scope
    }, v => v)
  }

  clear() {
    console.log('clearing chrome proxy')
    chrome.proxy.settings.clear({
      scope: this.scope
    })
  }
}

export default new DnsProxy()