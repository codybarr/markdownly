import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import user from './user.module'
import notifications from './notifications.module'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		notifications
	}
})
