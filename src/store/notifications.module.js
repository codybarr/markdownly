/* eslint-disable */
import { SET_NOTIFICATION, UNSET_NOTIFICATION } from './mutations.type'

// import router from '@/router'

const state = {
	notification: null
}

const getters = {
	notification(state) {
		return state.notification
	}
}

const mutations = {
	[SET_NOTIFICATION](state, notification) {
		console.log('Setting notification...')
		state.notification = notification
	},
	[UNSET_NOTIFICATION](state) {
		console.log('Unsetting notification...')
		state.notification = null
	}
}

export default {
	state,
	getters,
	mutations
}
