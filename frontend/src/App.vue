<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar" />
  </div>
  <router-view/>
</template>


<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useCartStore } from './store/cart'


const route = useRoute()

const showNavbar = computed(() => {
  return !['login', 'register'].includes(route.name as string)
})

onMounted(()=> {
  const cartStore = useCartStore()
  cartStore.loadCart()
})
</script>

<style>
#app {
  font-family: 'Segoe UI', sans-serif;
}
</style>
