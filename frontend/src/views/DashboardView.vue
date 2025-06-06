<template>
  <h1>Welcome {{ user?.first_name }}</h1>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from '../lib/axios'

interface User {
    id: Number
    email: string
    first_name: string
    last_name: string
}

const user = ref<User | null>(null)

onMounted(async() => {
    try{
        const res = await axios.get<User>('auth/users/me/')
        user.value = res.data
    }catch(err){
        console.error('Failed to fetch user profile', err)
    }
})

</script>

<style>

</style>