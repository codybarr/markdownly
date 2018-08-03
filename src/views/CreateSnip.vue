<template>
    <CreateEditSnip :editing="false" :snip="snip" @submit="addSnip" />
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/initFirebase'

import CreateEditSnip from '@/components/CreateEditSnip.vue'

export default {
    name: 'create-snip',
    components: {
        CreateEditSnip
    },
    data() {
        return {
            snip: {
                body: '',
                isPublic: true
            }
        }
    },
    computed: {
        ...mapGetters([
            'user',
            'loggedIn',
            'loadingUser'
        ])
    },
    methods: {
        addSnip(snip) {
            // <-- and here
            const createdAt = new Date()
            const uid = this.user.uid || null
            const { body, isPublic } = snip
            db.collection('snips')
                .add({ body, isPublic, uid, createdAt })
                .then((ref) => {
                    this.$router.push({ name: 'view-snip', params: { id: ref.id } })

                    this.$snackbar.open({
                        duration: 5000,
                        message: 'Snip created!',
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

<style lang="scss">

</style>
