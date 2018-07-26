<template>
    <section class="hero is-dark is-fullheight has-fixed-navbar">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">Markdown.ly</h1>
                <!-- <h2 class="subtitle"></h2> -->
                <router-link to="/create" class="button is-success is-medium">
                    <span class="icon is-medium">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span>New Snip</span>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'home',
    components: {
        Navbar
    }
}
</script>

<style lang="scss">
</style>
