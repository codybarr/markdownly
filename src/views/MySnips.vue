<template>
    <section class="section">
        <div class="container">
            <h1 class="title">My Snips</h1>
            <SnipThumbnails :snips="snips" :loading="loading" />
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'marked'

import { db } from '@/initFirebase'

import SnipThumbnails from '@/components/SnipThumbnails.vue'

export default {
    name: 'my-snips',
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
        snips: function loadingFalse() { this.loading = false }
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    firestore() {
        return {
            // snip: db.collection('locations').orderBy('createdAt')
            snips: db.collection('snips').where('uid', '==', this.user.uid)
                .orderBy('createdAt', 'desc')
        }
    }
}
</script>
