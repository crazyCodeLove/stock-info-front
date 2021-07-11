import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://127.0.0.1:9921"


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
