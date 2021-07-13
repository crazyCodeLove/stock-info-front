import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/home/Index.vue'),
        meta: {
            requireAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

router.beforeEach((to, from, next) => {
    let username = sessionStorage.getItem("username");

    if (to.path == "/login") {
        if (username) {
            next("/index");
        } else {
            next();
        }
    } else {
        // requireAuth:可以在路由元信息指定哪些页面需要登录权限
        if (to.meta.requireAuth && username) {
            next();
        } else {
            next("/login");
        }
    }
})