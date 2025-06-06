<template>
<div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
        <input type="email" name="email" placeholder="Email Address" v-model="email">
        <input type="password" name="password" placeholder="Password" v-model="password">
        <button type="submit">Login</button>
    </form>
</div>
  

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () =>{
    await auth.login(email.value, password.value)
    await auth.fetchUser()

    router.push('/dashboard')
}
</script>>


<style>

</style>