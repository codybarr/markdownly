<template>
    <div>
        <b-loading :active="loading" :is-full-page="false"></b-loading>
        <!-- <p v-if="loadingSnips">Loading Snips...</p> -->
        <div v-if="!loading">
            <p v-if="snips.length == 0">Sorry, no snips yet.</p>
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
                            <router-link :to="{ name: 'view-snip', params: { id: snip.id }}"
                                class="card-footer-item">View Snip</router-link>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'snip-thumbnails',
    props: ['snips', 'loading'],
    methods: {
        shortBody(str) {
            return str
                .split('\n')
                .slice(0, 6)
                .join('<br>')
        }
    },
}
</script>
