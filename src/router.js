import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import PublicSnips from '@/views/PublicSnips.vue'

import Create from '@/views/Create.vue'
import ViewSnip from '@/views/ViewSnip.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
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
            name: 'create',
            component: Create
        },
        {
            path: '/snip/:id',
            name: 'snip',
            component: ViewSnip
        }
    ]
})
