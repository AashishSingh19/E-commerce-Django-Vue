<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
        <input name="first_name" placeholder="First Name" v-model="first_name">
        <p v-if="fieldErrors.first_name" class="error-message">{{ fieldErrors.first_name }}</p>

        <input name="last_name" placeholder="Last Name" v-model="last_name">
        <p v-if="fieldErrors.last_name" class="error-message">{{ fieldErrors.last_name }}</p>

        <input type="email" name="email" placeholder="Email" v-model="email">
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

        <div class="password-field">
        <input
            :type="showConfirmPassword ? 'text' : 'password'"
            name="confirm_password"
            placeholder="Confirm Password"
            v-model="confirm_password"
        />
        <font-awesome-icon
            :icon="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
            class="toggle-icon"
            @click="showConfirmPassword = !showConfirmPassword"
        />
        </div>
        <p v-if="fieldErrors.confirm_password" class="error-message">{{ fieldErrors.confirm_password }}</p>

        <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">Registration successful! Please log in.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from '../lib/axios'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const confirm_password = ref('')
const togglePassword = () => {
    showPassword.value = !showPassword.value
}
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}
const error = ref('')
const success = ref(false)
const fieldErrors = ref<Record<string, string>>({})

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)

const validateFields = () =>{
    fieldErrors.value = {}

    if(!first_name.value.trim()) fieldErrors.value.first_name = 'First name is required'
    if(!last_name.value.trim()) fieldErrors.value.last_name = 'Last name is required'
    if(!email.value.trim()) fieldErrors.value.email = 'Email is required'
    else if(!isValidEmail(email.value)) fieldErrors.value.email = 'Email is invalid'
    if(!password.value.trim()) fieldErrors.value.password = 'Password is required'
    else if(password.value.length < 6) fieldErrors.value.password = 'Password must contain atleast 6 characters'
    if(!confirm_password.value.trim()) fieldErrors.value.confirm_password = 'Please confirm your password'
    else if(password.value !== confirm_password.value) fieldErrors.value.confirm_password = 'Passwords do not match'

    return Object.keys(fieldErrors.value).length === 0

}

const handleRegister = async() => {
    error.value = ''
    success.value = false

    if(!validateFields()) return

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

<style scoped>
.register {
  max-width: 500px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.register form {
  display: flex;
  flex-direction: column;
}

.register input {
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}

.register input:focus {
  border-color: #4f46e5;
  outline: none;
}

.register button {
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register button:hover {
  background-color: #4338ca; 
}

.error-message {
  color: #dc2626;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.success-message {
  color: #16a34a;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
  text-align: left;
}

.success-message {
  color: #16a34a;
  font-size: 0.95rem;
  margin-top: 1rem;
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
