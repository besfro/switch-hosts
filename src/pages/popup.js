/*
 * @Description: 
 * @Author: clc
 * @Date: 2019-12-02 15:58:39
 * @LastEditors: clc
 * @LastEditTime: 2019-12-04 13:28:09
 */
import Vue from 'vue'
import Popup from '@/components/Popup'
import { List, Switch, Icon } from 'ant-design-vue'
import reset from '@/assets/less/reset.less'

Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(List)
Vue.use(Switch)

new Vue({
  render: h => h(Popup),
}).$mount('#app')
