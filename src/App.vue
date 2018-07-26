<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'navbar',
    components: {
        Navbar
    }
}
</script>

<style lang="scss">

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.monospace {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
}

.hero.is-fullheight.has-fixed-navbar {
  min-height: calc(100vh - 3.25rem);
}
</style>
