<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Public Snips</h1>
            <p v-if="!snips.length">Sorry, no public snips yet</p>
            <div v-else class="columns is-multiline">
                <div class="column is-one-quarter" v-if="snips" v-for="snip in snips">
                    <div class="card box is-paddingless">
                        <div class="card-content">
                            <div class="content truncate" v-html="shortBody(snip.body)"></div>
                            <time :datetime="snip.createdAt.seconds | date('short')">
                                <strong>{{ snip.createdAt.seconds | date('ago') }}</strong>
                            </time>
                        </div>
                        <footer class="card-footer">
                            <router-link :to="{ name: 'snip', params: { id: snip.id }}"
                                class="card-footer-item">View Snip</router-link>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import marked from 'marked'
import { db } from '@/initFirebase'

export default {
    name: 'public-snips',
    data() {
        return {
            snips: []
        }
    },
    methods: {
        shortBody(str) {
            return str
                .split('\n')
                .slice(0, 6)
                .join('<br>')
        }
    },
    firestore() {
        return {
            // snip: db.collection('locations').orderBy('createdAt')
            snips: db.collection('snips').where('isPublic', '==', true).orderBy('createdAt', 'desc')
        }
    }
}
</script>
