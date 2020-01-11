/*
 * @Description: 
 * @Author: clc
 * @Date: 2019-12-02 15:58:34
 * @LastEditors: clc
 * @LastEditTime: 2019-12-04 15:24:36
 */
import Vue from 'vue'
import Options from '@/components/Options'
import { Icon, Button, Tabs, Switch } from 'ant-design-vue';
import reset from '@/assets/less/reset.less'

Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(Switch)

new Vue({
  render: h => h(Options),
}).$mount('#app')
