<template>
<div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
        <input type="email" name="email" placeholder="Email Address" v-model="email">
        <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>

        <div class="password-field">
            <input
                :type="showPassword ? 'text' : 'password'"
                name="password"
                placeholder="Password"
                v-model="password"
            />
            <font-awesome-icon
                :icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                class="toggle-icon"
                @click="showPassword = !showPassword"
            />
         </div>
        <p v-if="fieldErrors.password" class="error-message">{{ fieldErrors.password }}</p>

        <button type="submit">Login</button>
    </form>
    <br/>
    <p v-if="error" class="error-message">{{ error }}</p>
</div>
  

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)
const auth = useAuthStore()
const router = useRouter()
const togglePassword = () => {
    showPassword.value = !showPassword.value
}
const fieldErrors = ref<Record<string, string>>({})


const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)

const validateFields = () =>{
    fieldErrors.value = {}

    if(!email.value.trim()) fieldErrors.value.email = 'Email is required'
    else if(!isValidEmail(email.value)) fieldErrors.value.email = 'Email is invalid'

    if(!password.value) fieldErrors.value.password = 'Password is required'

    return Object.keys(fieldErrors.value).length === 0
}

const handleLogin = async () =>{
    error.value = ''

    if(!validateFields()) return
    try{
        await auth.login(email.value, password.value)
        await auth.fetchUser()
        router.push('/')
    }catch(err: any){
        error.value = 'Login Failed. Please check your credentials.'
    }

}
</script>>


<style scoped>
.login {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.login form {
  display: flex;
  flex-direction: column;
}

.login input {
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}

.login input:focus {
  border-color: #4f46e5;
  outline: none;
}

.login button {
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login button:hover {
  background-color: #4338ca;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
  text-align: left;
}

.password-field {
  position: relative;
  width: 100%;
}

.password-field input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  font-size: 1rem;
  box-sizing: border-box;
}

.toggle-icon {
  position: absolute;
  right: 0.75rem;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1.1rem;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

</style>
