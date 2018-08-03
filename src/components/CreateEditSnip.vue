<template>
    <section class="section">
        <div class="container is-fullhd">
            <h1 class="title">{{ createOrEdit }} Snip</h1>
            <div class="columns">
                <div class="column">
                    <form>
                        <div class="field">
                            <div :class="['control', { 'is-loading': loading }]">
                                <textarea
                                    class="textarea monospace"
                                    placeholder="Enter snip text! (hint: use markdown)"
                                    rows="15"
                                    v-model="body"> <!-- @input="update"> -->
                                </textarea>
                            </div>
                        </div>
                        <div class="field level">
                            <div class="control level-left">
                                <button type="submit"
                                    @click.prevent="createOrUpdate"
                                    :disabled="!formValid"
                                    class="button is-info">{{ createOrEdit }} Snip</button>
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
import _ from 'lodash'
import marked from 'marked'

export default {
    name: 'create-edit-snip',
    props: ['editing', 'snip'],
    data() {
        return {
            body: this.snip.body,
            isPublic: this.snip.isPublic,
            loading: false
        }
    },
    watch: {
        'snip': 'setFormValues'
    },
    created() {
        this.debouncedUpdate = _.debounce(this.updateMarkdown, 300)
    },
    computed: {
        createOrEdit() {
            return this.editing == true ? 'Edit' : 'Create'
        },
        formValid() {
            if (this.body !== '') {
                return true
            }

            return false
        },
        bodyMarkdown() {
            return marked(this.body, { sanitize: true, breaks: true })
        },
    },
    methods: {
        createOrUpdate() {
            let snip = {
                body: this.body,
                isPublic: this.isPublic
            }
            this.$emit('submit', snip)
        },
        setFormValues() {
            this.body = this.snip.body
            this.isPublic = this.snip.isPublic
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
