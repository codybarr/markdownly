<template>
    <div id="app">
        <Navbar />
        <Notification />
        <router-view />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Notification from '@/components/Notification.vue'

export default {
    name: 'navbar',
    components: {
        Navbar,
        Notification
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
