import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/auth/Login.vue')
    },
    {
        path: '/',
        name: 'home.index',
        component: () => import('./views/home/Index.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/sampah',
        name: 'sampah.index',
        component: () => import('./views/sampah/Index.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/sampah/add',
        name: 'sampah.add',
        component: () => import('./views/sampah/Add.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/admin',
        name: 'admin.index',
        component: () => import('./views/admin/Index.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/admin/add',
        name: 'admin.add',
        component: () => import('./views/admin/Add.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/data',
        name: 'data.index',
        component: () => import('./views/table/Index.vue'),
        meta: {
            requiresAuth: true,
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("token") != null) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router