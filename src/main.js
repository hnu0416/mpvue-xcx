import Vue from 'vue'
import App from '@/App'
import store from '@/vuex/store'
import util from '@/common/util'
import http from '@/http/http'
import pageService from '@/http/page.service'

Vue.prototype.$util = util;
Vue.prototype.$http = http;
Vue.prototype.$page = pageService;

// 导入过滤器
import * as filters from '@/common/filter'
Object.keys(filters).forEach(key=>{
  Vue.use(filters[key])
});
Vue.use(filters);

Vue.config.productionTip = false
App.store = store;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();


export default {
  config: {
    "pages": [
      "pages/index"
    ],
    "window": {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#26a2ff",
      "navigationBarTitleText": "工作台",
      "navigationBarTextStyle": "light"
    },
    "tabBar": {
      "backgroundColor": "#f3f3f3",
      "borderStyle": "white",
      "color": "#bbb",
      "selectedColor": "#26a2ff",
      "list": [{
        "iconPath": "static/img/home/tab_home.png",
        "selectedIconPath": "static/img/home/tab_home_active.png",
        "pagePath": "pages/index",
        "text": "首页"
      }, {
        "iconPath": "static/img/home/tab_personal.png",
        "selectedIconPath": "static/img/home/tab_personal_active.png",
        "pagePath": "pages/center",
        "text": "我的"
      }]
    }
  }
}
