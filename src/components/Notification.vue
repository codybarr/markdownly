<template>
	<section class="section" v-if="notification">
		<div class="container">
			<b-notification :type="notification.type" @close="clearNotification">
				{{ notification.message }}
			</b-notification>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { UNSET_NOTIFICATION } from '@/store/mutations.type'

export default {
	name: 'notification',
	computed: {
		...mapGetters(['notification'])
	},
	methods: {
		clearNotification() {
			store.commit(UNSET_NOTIFICATION)
		}
	}
}
</script>
