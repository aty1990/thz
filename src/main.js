import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style'
import '@/assets/scss/weui'
import Mint from 'mint-ui'
import store from '@/vuex/store'
import vueTap from 'v-tap';
import FastClick from 'fastclick'
import { getWxSign,shareConfig } from '@/assets/js/tool'
import AwesomePicker from '@/components/vue-awesome-picker.vue'
import '@/assets/scss/app'
require("@/assets/js/layer")
require("@/assets/js/brower")
require("@/assets/scss/layer")

import {
    Popup,
    Field,
    Button,
    Radio ,
    Tabbar,
    TabItem,
    Cell,
    Navbar,
    Header,
    TabContainer, 
    TabContainerItem,
    Swipe,
    Lazyload ,
    SwipeItem,
} from 'mint-ui'
Vue.component(Popup.name, Popup);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Radio.name, Radio);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Navbar.name, TabItem);
Vue.component(Cell.name, Cell);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(AwesomePicker.name, AwesomePicker)

Vue.use(Mint);
Vue.use(vueTap);
Vue.use(Lazyload);

getWxSign();

Vue.config.productionTip = false;

FastClick.attach(document.body); 

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next()
    if(to.name!="goods-detail"){
        setTimeout(()=>{
            shareConfig();
        },500);
    } 
})
router.afterEach((to, from) => {
    document.title = to.meta.title;
    // 加入百度统计
    setTimeout(()=>{
        (function() {
            //每次执行前，先移除上次插入的代码
            document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?15db295353b391bcc532fb002174f9b4";
            hm.id = "baidu_tj"
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    },0);
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})