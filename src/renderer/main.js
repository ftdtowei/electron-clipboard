import Vue from 'vue'
import axios from 'axios'

import N3Components from 'N3-components'
import './lib/index.min.css'
// import './lib/index.min.js'

// install N3
Vue.use(N3Components)

// for English  (default chinese)
// version 2.2.0 or later
// Vue.use(N3Components, 'en')

// import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'
import store from './store'

import clipdb from './dbfile/datastore'
import tagdb from './dbfile/tagdata'

/* 其它代码 */



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

//引入db
Vue.prototype.$clipdb = clipdb
Vue.prototype.$tagdb = tagdb


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
