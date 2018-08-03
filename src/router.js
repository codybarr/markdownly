import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import PublicSnips from '@/views/PublicSnips.vue'

import MySnips from '@/views/MySnips.vue'
import CreateSnip from '@/views/CreateSnip.vue'
import EditSnip from '@/views/EditSnip.vue'

import firebase from 'firebase/app'

import store from '@/store'
import { SET_NOTIFICATION } from '@/store/mutations.type'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/snips',
        name: 'snips',
        component: PublicSnips
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/create',
        name: 'create-snip',
        component: CreateSnip
    },
    {
        path: '/snip/:id',
        name: 'view-snip',
        component: () => import('@/views/ViewSnip')
    },

        // Auth

    {
        path: '/my-snips',
        name: 'my-snips',
        component: MySnips,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/snip/:id/edit',
        name: 'edit-snip',
        component: EditSnip
    }
    ]
})

router.beforeEach((to, from, next) => {
    // Check for requiresAuth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check if NO logged user
        if (!firebase.auth().currentUser) {
            store.commit(SET_NOTIFICATION, {
                type: 'is-danger',
                message: 'You must be logged in to access that page.'
            })
            // Go to login
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            // Proceed to route
            next()
        }
    } else {
        // route doesn't require auth
        next()
    }
})

export default router
