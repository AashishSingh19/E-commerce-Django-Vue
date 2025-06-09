<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar" />
  </div>
  <router-view/>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const showNavbar = computed(() => {
  return !['login', 'register'].includes(route.name as string)
})
</script>

<style>
#app {
  font-family: 'Segoe UI', sans-serif;
}
</style>
