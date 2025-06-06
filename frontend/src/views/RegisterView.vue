<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
        <input name="first_name" placeholder="First Name" v-model="first_name">
        <input name="last_name" placeholder="Last Name" v-model="last_name">
        <input type="email" name="email" placeholder="Email" v-model="email">
        <input type="password" name="password" placeholder="Password" v-model="password">
        <input type="password" name="confirm_password" placeholder="Confirm Password" v-model="confirm_password">
        <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from '../lib/axios'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')

const error = ref('')
const success = ref(false)

const handleRegister = async() => {
    error.value = ''
    success.value = false

    if(password.value !== confirm_password.value){
        error.value = 'Passwords do not match'
        return
    }
    try{
        await axios.post('auth/users/', {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            password: password.value,
        })
        success.value = true
    }catch(err:any){
        if(err.response?.data){
            const data = err.response.data
            error.value = Object.values(data).map((v) => Array.isArray(v) ? v.join(' ') : v).join(' ');

        }else{
            error.value = 'Registration failed.'
        }
    }
}


</script>

<style>

</style>