import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button, message, Layout, Table, Input, Col, Switch,
  Cascader, Comment, Avatar, List, Spin, AutoComplete, Checkbox,
  Modal, Form, Select, Upload, Icon, Tooltip, Row, Menu
} from 'ant-design-vue'

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: "23a9ece5a475725cf1a4b1cda321e6ce",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geolocation"
  ],
  v: "1.4.4"
});



Vue.use(Input)
Vue.use(AutoComplete)
Vue.use(Checkbox)
Vue.use(Button)//重置css样式
Vue.use(Layout)
Vue.use(Table)
Vue.use(message)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Menu)
Vue.use(Comment)
Vue.use(Avatar)
Vue.use(List)
Vue.use(Switch)
Vue.use(Spin)




Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
