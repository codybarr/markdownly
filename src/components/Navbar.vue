<template>
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img src="@/assets/markdown100.png">
                <span class="brand-text">Markdown.ly</span>
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
                <div v-if="loadingUser" class="navbar-item">
                    <button class="button is-info is-loading">Button</button>
                </div>
                <template v-else>
                    <div v-if="loggedIn" class="navbar-item has-dropdown is-hoverable is-right">
                        <a class="navbar-link">
                            <span class="email-text">{{ user.email }}</span>
                            <figure class="image is-24x24 avatar media">
                                <img :src="user.photoURL" />
                            </figure>
                        </a>

                        <div class="navbar-dropdown">
                            <router-link to="/my-snips" class="navbar-item">
                                <span class="icon">
                                    <i class="fas fa-paste"></i>
                                </span>
                                <span>My Snips</span>
                            </router-link>

                            <a class="navbar-item" @click.prevent="logout">
                                <span class="icon">
                                    <i class="fas fa-sign-out-alt"></i>
                                </span>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                    <div v-else class="navbar-item">
                        <button @click.prevent="login"
                            class="button is-info">
                            <span class="icon">
                                <i class="fab fa-google"></i>
                            </span>
                            <span>Login</span>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { LOGIN, LOGOUT } from '@/store/actions.type'

export default {
    name: 'navbar',
    data() {
        return {
            mobileNavActive: false
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
        toggleNav() {
            this.mobileNavActive = !this.mobileNavActive
        },
        login() {
            store.dispatch(LOGIN)
        },
        logout() {
            store.dispatch(LOGOUT)
        }
    }
}
</script>

<style lang="scss">
    .brand-text {
        padding-left: 10px;
    }

    .email-text {
        padding-right: 10px;
    }

    .avatar img {
        border-radius: 50%;   
    }
</style>
