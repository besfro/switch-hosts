<!--
 * @Description: 
 * @Author: clc
 * @Date: 2019-12-03 10:58:06
 * @LastEditors: clc
 * @LastEditTime: 2019-12-12 17:46:46
 -->
<template>
  <div id="popup">
    <div class="header">Switch hosts</div>
    <a-list class="list" size="small" bordered :dataSource="tabs">
      <a-list-item class="list-item" slot="renderItem" slot-scope="item">
        <a-switch v-model="item.actived" size="small" @change="switchHost(item)" /> <span class="text text-ellipsis" :title="item">{{item.title}}</span>
      </a-list-item>
    </a-list>
    <a class="footer" target="_blank" :href="settingUrl">
      <a-icon type="setting" /> 设置
    </a>
  </div>
</template>

<script>
  import chrome from 'chrome'
  import hostProxy from '@/assets/js/hostProxy' 
  import storage from '@/assets/js/storage'
  export default {
    name: 'Popup',
    data() {
      return {
        tabs: []
      }
    },
    computed: {
      settingUrl() {
        return `chrome-extension://${chrome.runtime.id}/dist/options.html`
      }
    },
    mounted() {
      // 读取 storage 数据
      storage.getStorage()
        .then(value => {
          console.log('get', value)
          this.tabs = value
        })
    },
    methods: {
      switchHost(item) {
        const {id, actived, hosts} = item
        
        if(actived) {
          this.tabs.forEach(item => {
            if(item.id !== id) {
              item.actived = false
            }
          })
          // 切换Dns代理
          hostProxy.setProxy(hosts)
        } else {
          let findActived = this.tabs.filter(item => item.actived)
          // 没有勾选清除代理
          findActived.length <= 0 && hostProxy.clear()
        }

        storage.saveStorage(this.tabs)
      },
    }
  }
</script>

<style lang="less"> 
body, html {
  height: 360px;
}
.list {
  height: 300px;
  max-height: 300px;
  min-width: 180px;
  overflow-y: scroll;
  border-radius: 0;
}
.ant-list-bordered {
  border: 1px solid #f1f1f1;
  .ant-list-item {
    border-bottom: 1px solid #f1f1f1;
  }
}
.list-item .ant-list-item-content {
  align-items: center
}
.text {
  margin-left: 10px;
  width: 100px;
}
.header, .footer {
  padding: 6px 16px;
  color: #444;
  display: block;
}
.footer {
  background: #f1f1f1;
}
</style>