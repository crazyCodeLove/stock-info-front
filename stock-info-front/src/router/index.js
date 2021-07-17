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
        component: () => import('../views/Index.vue'),
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'data-analyse/csi',
                name: 'data-analyse/csi',
                component: () => import('../views/analyse/CsiIndexAnalyse'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'data-analyse/option2',
                name: 'data-analyse/option2',
                component: () => import('../views/analyse/Option2Analyse'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'data-analyse/option3',
                name: 'data-analyse/option3',
                component: () => import('../views/analyse/Option3Analyse'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'exchange/fund',
                name: 'exchange/fund',
                component: () => import('../views/exchange/FundExchange'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'exchange/stock',
                name: 'exchange/stock',
                component: () => import('../views/exchange/StockExchange'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'platform/fetch-data',
                name: 'platform/fetch-data',
                component: () => import('../views/platform/FetchData'),
                meta: {
                    requireAuth: true
                }
            }

        ]
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