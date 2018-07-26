import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import '@/initFirebase'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import '@/filters/date.filter'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
