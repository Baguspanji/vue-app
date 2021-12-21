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
            isAdmin: true
        }
    },
    {
        path: '/sampah/add',
        name: 'sampah.add',
        component: () => import('./views/sampah/Add.vue'),
        meta: {
            requiresAuth: true,
            isAdmin: true
        }
    },
    {
        path: '/admin',
        name: 'admin.index',
        component: () => import('./views/admin/Index.vue'),
        meta: {
            requiresAuth: true,
            isSuperAdmin: true
        }
    },
    {
        path: '/admin/add',
        name: 'admin.add',
        component: () => import('./views/admin/Add.vue'),
        meta: {
            requiresAuth: true,
            isSuperAdmin: true
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
    const auth = JSON.parse(window.localStorage.getItem("lbUser"))

    if (to.meta.requiresAuth) {
        if (!auth || !auth.token) {
            next('/login')
        } else if (to.meta.isAdmin) {
            if (auth.role === 'admin') {
                next()
            } else {
                alert("anda harus login admin");
            }
        } else if (to.meta.isSuperAdmin) {
            if (auth.role === 'super_admin') {
                next()
            } else {
                alert("anda harus login super admin");
            }
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router