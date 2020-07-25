import Vue from 'vue'
import App from './App'
import uniPopup from "./components/uni-popup/uni-popup.vue";
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue"
import wPicker from "@/components/w-picker/w-picker.vue";
import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
import _CONFIG from './config.js'

import {
	format
} from './common/global.func.js'

Vue.component('uni-popup', uniPopup)
Vue.component('uni-calendar', uniCalendar)
Vue.component('w-picker', wPicker)
Vue.component('cmd-cellItem', cmdCellItem)
Vue.component('Wuc-tab', WucTab)
Vue.component('cmd-progress', cmdProgress)
Vue.component('uni-drawer', uniDrawer)
Vue.prototype._config = _CONFIG;

Vue.config.productionTip = false
Date.prototype.format = format 
App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
