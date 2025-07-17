<template>
  <div class="p-4">
    <button @click="toggleDarkMode" class="px-4 py-2 bg-gray-800 text-white rounded">
      Toggle Dark Mode
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref<boolean>(false)

const toggleDarkMode = (): void => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
}
</script>

<style>
body.dark {
  background-color: #121212;
  color: #ffffff;
  transition: background-color 0.3s ease;
}
</style>
