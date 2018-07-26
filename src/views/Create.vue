<template>
    <section class="section">
        <div class="container is-fullhd">
            <h1 class="title">Create New Snip</h1>
            <div class="columns">
                <div class="column">
                    <form>
                        <div class="field">
                            <div :class="['control', { 'is-loading': loading }]">
                                <textarea
                                    class="textarea monospace"
                                    placeholder="Enter snip text! (hint: use markdown)"
                                    @input="update">
                                </textarea>
                            </div>
                        </div>
                        <div class="field level">
                            <div class="control level-left">
                                <button type="submit"
                                    @click.prevent="addSnip(body, isPublic)"
                                    :disabled="!formValid"
                                    class="button is-info">Create Snip</button>
                            </div>
                            <div class="control level-right">
                                <b-switch v-model="isPublic"
                                    type="is-success">Public Snip</b-switch>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="column">
                    <div class="content" v-html="bodyMarkdown"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { db } from '@/initFirebase'
import _ from 'lodash'
import marked from 'marked'

import ClipboardMixin from '@/mixins/clipboard.mixin'

export default {
    name: 'create',
    mixins: [ClipboardMixin],
    data() {
        return {
            body: '',
            isPublic: true,
            loading: false
        }
    },
    created() {
        this.debouncedUpdate = _.debounce(this.updateMarkdown, 300)
    },
    computed: {
        formValid() {
            if (this.body !== '') {
                return true
            }

            return false
        },
        bodyMarkdown() {
            return marked(this.body, { sanitize: true, breaks: true })
        }
    },
    methods: {
        addSnip(body, isPublic) {
            // <-- and here
            const createdAt = new Date()
            db.collection('snips')
                .add({ body, isPublic, createdAt })
                .then((ref) => {
                    this.$router.push({ name: 'snip', params: { id: ref.id } })

                    this.$snackbar.open({
                        duration: 5000,
                        message: 'Snip created!',
                        type: 'is-success',
                        position: 'is-top-right',
                        actionText: 'OK',
                        queue: false
                    })
                })
        },
        update(e) {
            this.loading = true
            this.debouncedUpdate(e)
        },
        updateMarkdown(e) {
            this.body = e.target.value
            this.loading = false
        }
    }
}
</script>

<style lang="scss">

</style>
