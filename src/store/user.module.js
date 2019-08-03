/* eslint-disable */
import firebase from 'firebase/app'
import 'firebase/auth'

import { UserService } from '@/store/api.service'
import { LOGIN, LOGOUT } from '@/store/actions.type'
import { LOADING_USER, SET_USER, UNSET_USER } from './mutations.type'

import router from '@/router'

const state = {
	user: null,
	loggedIn: false,
	loadingUser: true,
	checkingForExistingUser: true
}

const getters = {
	user(state) {
		return state.user
	},
	loggedIn(state) {
		return state.loggedIn
	},
	loadingUser(state) {
		return state.loadingUser
	},
	checkingForExistingUser(state) {
		// has to be a function so our watcher in the router
		// will know when this has changed
		return function() {
			return state.checkingForExistingUser
		}
	}
}

const actions = {
	[LOGIN]({ commit }) {
		commit(LOADING_USER)
		return UserService.login()
			.then(({ user }) => {
				commit(SET_USER, user)
			})
			.catch(error => {
				console.log('Error logging in...', error)
				throw new Error(error)
			})
	},
	[LOGOUT]({ commit }) {
		return UserService.logout()
			.then(() => commit(UNSET_USER))
			.then(() => router.push('/'))
	}
}

const mutations = {
	[LOADING_USER](state) {
		console.log('Loading user...')
		state.loadingUser = true
	},
	[SET_USER](state, user) {
		console.log('Setting user...', user)
		state.user = user
		state.loggedIn = true
		state.loadingUser = false
		state.checkingForExistingUser = false
	},
	[UNSET_USER](state) {
		console.log('Unsetting user...')
		state.user = {}
		state.loggedIn = false
		state.loadingUser = false
		state.checkingForExistingUser = false
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
