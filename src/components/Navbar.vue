<template>
    <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img src="@/assets/markdown100.png">
                <span class="navbar-item">Markdown.ly</span>
            </router-link>

            <div :class="['navbar-burger', 'burger', { 'is-active': mobileNavActive }]"
                data-target="mobileNav"
                @click="toggleNav">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="mobileNav" :class="['navbar-menu', { 'is-active': mobileNavActive }]">
            <div class="navbar-start">
                <router-link to="/snips"
                    class="navbar-item"
                    activeClass="is-active">Snips</router-link>
                <router-link to="/about"
                    class="navbar-item"
                    activeClass="is-active">About</router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <router-link to="/create" class="button is-success">
                        <span class="icon">
                            <i class="fas fa-plus"></i>
                        </span>
                        <span>New Snip</span>
                    </router-link>
                </div>
                <div class="navbar-item">
                    <router-link to="/" class="button is-info">
                        <span class="icon">
                            <i class="fab fa-google"></i>
                        </span>
                        <span>Login</span>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            mobileNavActive: false
        }
    },
    methods: {
        toggleNav() {
            this.mobileNavActive = !this.mobileNavActive
        }
    }
}
</script>
