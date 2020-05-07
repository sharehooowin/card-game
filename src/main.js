import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import WxUtils from './lib/WxUtils';
import Utils from './lib/Utils';
import VerifyUtils from './lib/VerifyUtils';
import Api from './api/api';
import router from './router/router';
import History from './router/history';
import { TweenMax } from 'gsap';
import Vconlose from 'vconsole';


// 微信授权
// Utils.auth();

import './assets/css/reset.css' //重写样式引入
import './assets/js/layout';
import Loader from './assets/js/LoaderPixi';
Vue.config.productionTip = false;
Vue.prototype.$wxUtils = WxUtils;
Vue.prototype.$utils = Utils;
Vue.prototype.$verifyUtils = VerifyUtils;
Vue.prototype.$api = Api;
Vue.prototype.$TweenMax = TweenMax;
Vue.prototype.$History = History;

new Vue({
    store,
    router,
    render: h => h(App),
    created:function(){
        this.$History.init();
    },
}).$mount('#app')
new Vconlose()


// 微信分享
// let { title,url,desc,link,imgUrl } = this.$wxUtils;
// WxUtils.initWX(url, title, desc, link, imgUrl,()=>{
//
// });
