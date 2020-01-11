<!--
 * @Description: 
 * @Author: clc
 * @Date: 2019-12-03 10:58:06
 * @LastEditors: clc
 * @LastEditTime: 2019-12-12 17:46:46
 -->
<template>
  <div id="popup">
    <div class="header">Switch Dns</div>
    <a-list class="list" size="small" bordered :dataSource="list">
      <a-list-item class="list-item" slot="renderItem" slot-scope="item">
        <a-switch defaultChecked size="small" @change="onChange" /> <span class="text text-ellipsis" :title="item">{{item}}</span>
      </a-list-item>
    </a-list>
    <a class="footer" target="_blank" href="chrome-extension://oajlbalolinmghpheonenbdnjfndffgn/dist/options.html">
      <a-icon type="setting" /> 设置
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Popup',
    data() {
      return {
        list: [
          'dev',
          'test',
          'prod',

          'dev',
          'test',
          'prod',
          'dev',
          'test',
          'prod',
          'dev',
          'test',
          'prod',
          'dev',
          'test',
          'prod',
          'dev',
          'test',
          'prod',
          'dev',
          'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
          'prod'
        ]
      }
    },
    methods: {
      onChange() {}
    }
  }
</script>

<style lang="less"> 
body, html {
  height: 360px;
}
.list {
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 0;
}
.ant-list-bordered {
  border: 1px solid #f1f1f1
}
.ant-list-bordered .ant-list-item {
  border-bottom: 1px solid #f1f1f1
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