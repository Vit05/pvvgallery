import * as fb from 'firebase/app'


import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Product from "../views/Products/Product.vue";
import ProductList from "../views/Products/ProductList.vue";
import NewProduct from "../views/Products/NewProduct.vue";
import Checkout from "../views/User/Checkout.vue";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/product/:id',
            props: true,
            name: 'product',
            component: Product
        },
        {
            path: '/list',
            name: 'list',
            component: ProductList,
            meta: {
                auth: true
            }
        },
        {
            path: '/new',
            name: 'new',
            component: NewProduct,
            meta: {
                auth: true
            }

        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            meta: {
                auth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    ],
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(x => x.meta.auth)
    const currentUser = fb.auth().currentUser

    if (requireAuth && !currentUser) {
        next('/login?loginError=true')
    }
    next()
})


export  default router
