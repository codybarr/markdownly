import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import firebase from 'firebase/app'
import 'firebase/auth'
import '@/initFirebase'
import { FETCH_CARDS } from '@/store/actions.type'
import { LOADING_USER, SET_USER, UNSET_USER } from '@/store/mutations.type'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import '@/filters/date.filter'

Vue.use(Buefy, {
    defaultIconPack: 'fas'
})

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(function(user) {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            router,
            store,
            created() {
                if (user) {
                    store.commit(SET_USER, user)
                } else {
                    store.commit(LOADING_USER)
                    store.commit(UNSET_USER)
                }
            },
            render: h => h(App)
        }).$mount('#app')
    }
})

// new Vue({
//     router,
//     store,
//     created() {
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 store.commit(SET_USER, user)
//             } else {
//                 store.commit(LOADING_USER)
//                 store.commit(UNSET_USER)
//             }
//         })
//     },
//     render: h => h(App)
// }).$mount('#app')
