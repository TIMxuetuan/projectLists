import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/iconfont/iconfont.css'  //引入阿里icon

import axios from "../src/request/http"

Vue.prototype.$post = axios.fetchPost;
Vue.prototype.$get = axios.fetchGet;


/*使用vant-ui库 */
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


import '../libs/rem.js'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
