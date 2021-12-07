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
        component: () => import('./views/home/Index.vue')
    },
    {
        path: '/sampah',
        name: 'sampah.index',
        component: () => import('./views/sampah/Index.vue')
    },
    {
        path: '/sampah/add',
        name: 'sampah.add',
        component: () => import('./views/sampah/Add.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
})

export default router