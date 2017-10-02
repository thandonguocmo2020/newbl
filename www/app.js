import CSS from './assets/css/layout.css';

import 'element-ui/lib/theme-default/index.css';
import ElementUI from 'element-ui';
import Paginate from 'vuejs-paginate'


import Vue from 'vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import VeeValidate from 'vee-validate';

const config = {
    delay: 1000
}
Vue.use(VeeValidate, config);

Vue.component('paginate', Paginate)

import App from './app.vue';

sync(store, router);

Vue.use(ElementUI);


var app = new Vue({
    el: '#app',
    // nprogress,
    router,
    store,
    render: h => h(App)
});