import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css';//elemenet ui样式

import '@/assets/css/iconfont/iconfont.css';//字体图标 在同文件夹下有枚举的html可查看
import '@/assets/css/main.scss';//通用样式
import '@/assets/css/common.scss';//样式工具
import '@/assets/css/vue-index.scss' //用于修改vue样式
import '@/assets/css/layout-index.scss' //用于修改框架的样式
// import "@/assets/css/perfect-scrollbar.scss";
// 引入自定义指令
import '@/directives/directives'

import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import App from './App.vue'

import {post} from './utils/http'//封装axios
import comUtils from './utils/commonUtils.js';//通用的工具js
import runTimeScript from './utils/runTimeScript.js';//首次载入执行的脚本
runTimeScript.init();

Vue.use(ElementUI);
Vue.prototype.$post=post;
Vue.prototype.$comUtils=comUtils;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
