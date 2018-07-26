<template>
    <section class="section">
        <div class="container">
            <div class="field has-addons">
                <div class="control">
                    <input id="permalink"
                        class="input"
                        type="text"
                        :value="url" 
                        readonly>
                </div>
                <div class="control">
                    <a class="button is-info" @click="copy">
                        <span class="icon">
                            <i class="far fa-copy"></i>
                        </span>
                    </a>
                </div>
            </div>
            <div class="content" v-html="body"></div>
        </div>
    </section>
</template>

<script>
import marked from 'marked'
import { db } from '@/initFirebase'

import ClipboardMixin from '@/mixins/clipboard.mixin'

export default {
    name: 'view-snip',
    mixins: [ClipboardMixin],
    data() {
        return {
            snipId: this.$route.params.id,
            snip: {},
            url: window.location.href
        }
    },
    methods: {
        copy() {
            this.copyToClipboard(this.url)
            this.$snackbar.open({
                duration: 5000,
                message: 'Snip URL copied to clipboard',
                type: 'is-success',
                position: 'is-bottom-right',
                actionText: 'Sweet!',
                queue: false
            })
        }
    },
    computed: {
        // title() { return this.snip.title },
        body() { 
            if (this.snip && this.snip.body) {
                // let snipBodyWithBreaks = this.snip.body.split('\n').join('<br/>')
                return marked(this.snip.body, { sanitize: true, breaks: true })
            } else {
                return ''
            }
        }
    },
    firestore() {
        return {
            // snip: db.collection('locations').orderBy('createdAt')
            snip: db.collection('snips').doc(this.snipId)
        }
    }
}
</script>
