<template>
	<section class="section">
		<div class="container">
			<h1 class="title">Public Snips</h1>
			<SnipThumbnails :snips="snips" :loading="loading" />
		</div>
	</section>
</template>

<script>
import marked from 'marked'
import { db } from '@/initFirebase'

import SnipThumbnails from '@/components/SnipThumbnails.vue'

export default {
	name: 'public-snips',
	components: {
		SnipThumbnails
	},
	data() {
		return {
			snips: [],
			loading: true
		}
	},
	watch: {
		snips: function loadingFalse() {
			this.loading = false
		}
	},
	firestore() {
		return {
			// snip: db.collection('locations').orderBy('createdAt')
			snips: db
				.collection('snips')
				.where('isPublic', '==', true)
				.orderBy('createdAt', 'desc')
		}
	}
}
</script>
