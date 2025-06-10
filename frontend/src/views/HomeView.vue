<template>
  <h1>Welcome {{ user?.first_name }}</h1>
  <button type="submit" @click="handleLogout">Logout</button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from '../lib/axios'
import { useRouter } from 'vue-router'
import { useAuthStore} from '../store/auth'
interface User {
    id: Number
    email: string
    first_name: string
    last_name: string
}

const user = ref<User | null>(null)
const router = useRouter()
const auth = useAuthStore()
onMounted(async() => {
    try{
        const res = await axios.get<User>('auth/users/me/')
        user.value = res.data
    }catch(err){
        console.error('Failed to fetch user profile', err)
    }
})

const handleLogout =() => {
    auth.logout()
    router.push('/login')
}

</script>

<style>

</style>