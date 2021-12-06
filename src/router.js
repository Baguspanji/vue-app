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
        path: '/book',
        name: 'book.index',
        component: () => import('./views/book/Index.vue')
    },
    {
        path: '/book/add',
        name: 'book.add',
        component: () => import('./views/book/Add.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
})

export default router