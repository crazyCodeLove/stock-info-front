import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import EncryptUtil from "./util/EncryptUtil";
import UserUtil from "./util/UserUtil";

Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://127.0.0.1:9921"

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let timestamp = new Date().getTime();
    let username = sessionStorage.getItem("username");
    config.headers.sec_once = "username=" + username + ",timestamp=" + timestamp;

    let url = config.url;
    let content = config.headers.sec_once + ",url=" + url;
    if (config.method === 'post' && config.data) {
        content = content + ",data=" + JSON.stringify(config.data)
    }
    let token = sessionStorage.getItem("token");
    if (token) {
        config.headers.token = token;
    }
    content = content + ",token=" + token;
    config.headers.sec_sign = EncryptUtil.sha256(content)

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    if (res && res.data) {
        let code = res.data.code;
        if (code == 1000061 || code == 1000062 || code == 1000063 || code == 1000064 || code == 1000065) {
            UserUtil.clearUserInfo();
            window.location.href = "/login";
        }

    }
    return res;
}, function (error) {
    if (error.response && error.response.status) {
        if (error.response.status === 401) {
            // 未经授权
            UserUtil.clearUserInfo();
            window.location.href = "/login";

        } else if (error.response.status === 403) {
            // 没有权限
            this.$notify.warning({
                title: '没有权限',
                message: '没有相应权限'
            });
        }
    }

    return error;
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
