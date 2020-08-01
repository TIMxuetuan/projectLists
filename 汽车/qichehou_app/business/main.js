import Vue from 'vue'
import App from './App'
import {_CONFIG} from './config.js'
import {util} from './common/util.js'

Vue.config.productionTip = false

Vue.prototype._config = _CONFIG;
Vue.prototype._util = util;
Vue.prototype._app = {
	userInfo:null
};

App.mpType = 'app'

//引入uviewUI
import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()
