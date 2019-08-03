<template>
	<CreateEditSnip :editing="true" :snip="snip" @submit="updateSnip" />
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { SET_NOTIFICATION } from '@/store/mutations.type'

import { db } from '@/initFirebase'

import CreateEditSnip from '@/components/CreateEditSnip.vue'

export default {
	name: 'edit-snip',
	components: {
		CreateEditSnip
	},
	data() {
		return {
			snipId: this.$route.params.id,
			snip: {
				body: '',
				isPublic: true
			}
		}
	},
	beforeRouteEnter(to, from, next) {
		db.collection('snips')
			.doc(to.params.id)
			.get()
			.then(doc => {
				if (doc.data().uid === store.getters.user.uid) {
					next(vm => {
						console.log('snip edit data', doc.data())
						vm.snip = doc.data()
					})
				} else {
					// Snip does not belong to current user
					store.commit(SET_NOTIFICATION, {
						type: 'is-danger',
						message: "HEY! That's not your snip!"
					})
					next(vm => {
						vm.$router.push('/')
					})
				}
			})
	},
	watch: {
		$route: 'fetchData'
	},
	methods: {
		fetchData() {
			db.collection('snips')
				.doc(to.params.id)
				.get()
				.then(doc => {
					this.snip = doc.data()
				})
		},
		updateSnip(snip) {
			// <-- and here
			const updatedAt = new Date()
			const { body, isPublic } = snip

			const updatedSnip = { body, isPublic, updatedAt }
			db.collection('snips')
				.doc(this.snipId)
				.set(updatedSnip, { merge: true })
				.then(() => {
					this.$router.push({
						name: 'view-snip',
						params: { id: this.$route.params.id }
					})

					this.$snackbar.open({
						duration: 5000,
						message: 'Snip updated!',
						type: 'is-success',
						position: 'is-bottom',
						actionText: 'OK',
						queue: false
					})
				})
		}
	}
}
</script>
