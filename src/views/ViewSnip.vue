<template>
    <section class="section">
        <div class="container">
            <div class="field columns">
                <div class="control column">
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input id="permalink" class="input" type="text" :value="url" readonly>
                        </div>
                        <div class="control">
                            <a class="button is-info" @click="copy">
                            <span class="icon">
                                <i class="far fa-copy"></i>
                            </span>
                        </a>
                        </div>
                    </div>
                </div>
                <div class="control column has-text-right">
                    <div class="field">
                        <div class="level">
                            <div class="level-item">
                                <b-switch v-model="showMarkdown" type="is-info">
                                    Formatted
                                </b-switch>
                            </div>
                            <div v-if="snipOwner" class="level-item">
                                <router-link :to="{ name: 'edit-snip', params: { id: snipId } }"
                                    class="button is-link">
                                    <span class="icon">
                                        <i class="far fa-copy"></i>
                                    </span>
                                    <span>Edit Snip</span>
                                </router-link>
                            </div>
                            <div v-if="snipOwner" class="level-item">
                                <button class="button is-danger" @click.prevent="deleteSnip">
                                    <span class="icon">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                    <span>Delete Snip</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showMarkdown" class="content" v-html="body"></div>
            <div v-else>
                <textarea :value="body"
                  class="textarea is-expanded monospace"
                  rows="20"
                  readonly></textarea>
            </div>
        </div>
    </section>
</template>
<script>
import marked from 'marked'
import { db } from '@/initFirebase'

import { mapGetters } from 'vuex'

import ClipboardMixin from '@/mixins/clipboard.mixin'

export default {
    name: 'view-snip',
    mixins: [ClipboardMixin],
    data() {
        return {
            snipId: this.$route.params.id,
            snip: {},
            url: window.location.href,
            showMarkdown: true
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
        },
        deleteSnip() {
            this.$dialog.confirm({
                title: 'Deleting Snip',
                message: 'Are you sure you want to <strong>delete</strong> this snip?',
                confirmText: 'Delete',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    db.collection('snips').doc(this.snipId).delete().then(() => {
                        this.$router.push('/my-snips')
                        this.$snackbar.open({
                            duration: 5000,
                            message: 'Snip deleted!',
                            position: 'is-bottom',
                            queue: false
                        })
                    })
                }
            })
        }
    },
    computed: {
        // title() { return this.snip.title },
        body() {
            if (this.snip && this.snip.body) {
                if (this.showMarkdown) {
                    return marked(this.snip.body, { sanitize: true, breaks: true })
                }
                return this.snip.body
            }
            return ''
        },
        snipOwner() {
            return this.snip && this.loggedIn && this.snip.uid === this.user.uid
        },
        ...mapGetters([
            'user',
            'loggedIn'
        ])
    },
    firestore() {
        return {
            // snip: db.collection('locations').orderBy('createdAt')
            snip: db.collection('snips').doc(this.snipId)
        }
    }
}

</script>
