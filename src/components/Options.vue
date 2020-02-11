<!--
 * @Description: 
 * @Author: clc
 * @Date: 2019-12-02 15:27:39
 * @LastEditors: clc
 * @LastEditTime: 2019-12-06 17:51:07
 -->
<template>
  <div class="container">
    <div class="title"><a href="#"><i>Switch Hosts</i></a></div>
    <div class="tab-wrapp">
      <a-tabs class="tabs cus-tabs" type="editable-card" defaultActiveKey="defaultActiveKey" 
      :hideAdd="true" :tabBarStyle="tabBarStyle" :tabBarGutter="0" tabPosition="left">
        <a-tab-pane v-for="(item, index) of tabs" class="tabs-content" :closable="false" :key="item.id">
          <template v-slot:tab>
            <div class="tabs-nav" @mouseenter="item.hover = true" @mouseleave="item.hover = false">
              <div class="nav-title">
                <a-switch v-model="item.actived" size="small" @click="switchHost(item)" />
                <input v-if="item.titleEditing" v-model="item.title" class="text text-ellipsis" 
                :title="item.title" @blur="item.titleEditing = false" @keyup.13="item.titleEditing = false" :ref="`input-${item.id}`">
                <span v-else class="text text-ellipsis" :title="item.title">{{item.title}}</span>
              </div>
              <a-icon v-show="item.hover" class="nav-icon fade-enter-active" type="edit" @click.stop="editTitle(item)" />
              <a-icon v-show="item.hover && closable" class="nav-icon fade-enter-active" type="close" @click.stop="delteOne(index)" />
            </div>
          </template>
          <host-editer height="600px" :content="item.content" @change="editerChange(item, arguments)"></host-editer>
        </a-tab-pane>
        <template v-slot:tabBarExtraContent>
          <div class="button">
            <a-button type="primary" size="small" shape="circle" icon="plus" @click="addOne"></a-button>
          </div>
        </template>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import hostProxy from '@/assets/js/hostProxy' 
import storage from '@/assets/js/storage'
import HostEditer from '@/components/HostEditer'
export default {
  name: 'Options',
  data() {
    return {
      watcherLock: false,
      tabs: []
    }
  },
  computed: {
    defaultActiveKey() {
      return this.tabs.filter(item => item.actived)[0].key || this.tabs[0].key 
    },
    tabStyle() {
      return {
        height: '100px'
      }
    },
    tabBarStyle() {
      return {
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        width: '220px'
      }
    },
    closable() {
      return this.tabs.length > 1
    }
  },
  mounted() {
    // 读取 storage 数据
    storage.getStorage()
      .then(value => {
        console.log('get', value)
        this.watcherLock = true
        this.tabs = value
      })
  },
  components: {
    HostEditer
  },
  methods: {
    editerChange(item, [hosts, text]) {
      item.hosts = hosts
      item.content = text
      // 设置 Proxy
      if(item.actived) {
        hostProxy.setProxy(hosts)
      }
    },
    saveStorage() {
      console.group('save storage')
      console.log(this.tabs)
      console.groupEnd('save storage')
      storage.saveStorage(this.tabs)
    },
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
    },
    editTitle(item) {
      item.titleEditing = true
      this.$nextTick(() => {
        const el = this.$refs[`input-${item.id}`][0]
        el && el.focus()
      })
    },
    addOne() {
      const def = storage.defaultData[0]
      def.id = `sd-key-${performance.now()}`,
      this.tabs.push(def)
    },
    delteOne(index) {
      this.tabs.splice(index, 1)
    }
  },
  watch: {
    tabs: {
      deep: true,
      handler() {
        if(!this.watcherLock) {
          this.saveStorage()
        } else {
          this.watcherLock = false
        }
      }
    }
  }
}
</script>

<style lang="less">
body {
  background: #f1f1f1;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.title {
  font-size: 60px;
  padding-bottom: 30px;
  margin-top: -20px;
}
.tab-wrapp {
  width: 800px;
  height: 600px;
  background: #fff;
}
.tabs.cus-tabs {
  height: 100%;
  .ant-tabs-content {
    padding-left: 0;
  }
  .tabs-nav {
    padding: 4px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-tabs-card-bar.ant-tabs-left-bar {
    border: 0;
    .ant-tabs-tab {
      cursor: pointer;
      text-align: left;
      padding: 0;
      border: 0;
      background: #f8f8f8;
    }
    .ant-tabs-tab.ant-tabs-tab-active {
      background: #f5f5f5;
      padding-right: 0!important;
      border-left: 1px solid #ccc;
      border-radius: 0;
    }
    .ant-tabs-tab:hover {
      background: #f7f7f7
    }
  }
  .nav-title {
    width: 150px;
    display: flex;
    align-items: center;
    .text {
      width: 100%;
      line-height: 22px;
      margin: 4px 5px;
      padding: 3px 8px;
      border: 0;
      outline: 0;
      background: none;
    }
    input.text {
      background: #fff;
    }
  }
  .nav-icon {
    margin-right: -8px;
  }
  .button {
    min-height: 40px;
  }
}
</style>
