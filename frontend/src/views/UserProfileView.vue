<template>
<div class="user-profile">
    <h1>My Account</h1>
    <div class="profile-container">
        <div class="user-details">
            <h3>Account Details</h3>
            <label for="first_name">
                First Name:
                <input type="text" class="firstname" v-model="firstname">
            </label>
            <label for="last_name">
                Last Name:
                <input type="text" class="lastname" v-model="lastname">
            </label>
            <label for="email">
                Email:
                <input type="email" class="email" v-model="email">
            </label>
            <label for="password">
                Password:
                <input type="password" class="password" v-model="password" placeholder="**********">
            </label>
            <button class="update" @click="updateProfile">Update</button>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import apiClient from '@/services/axios';
import { useAuthStore } from '@/store/auth';

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
// const authStore = useAuthStore()

const fetchUserInfo = async() => {
    try{
        const token = localStorage.getItem('access')
        const response = await apiClient.get('http://127.0.0.1:8000/api/users/profile/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = response.data
        firstname.value = data.first_name
        lastname.value = data.last_name
        email.value = data.email
    } catch(error){
        console.error('Failed to load user profile:', error)
    }
}

const updateProfile = async() =>{
    try{
        const token = localStorage.getItem('access')
        const payload: Record<string, any> = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
        }

        if(password.value){
            payload['password'] = password.value
        }

        const response = await apiClient.put('http://127.0.0.1:8000/api/users/profile/', payload, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        alert('Profile Update Successfully.')
        password.value = ''
    }catch(error) {
        console.error('Failed to update profile:', error)
        alert('Failed to update profile.')
    }
}
onMounted(() => {
    fetchUserInfo()
})
</script>

<style>
.user-profile{
    max-width: 1200px;
    margin: 0 auto; 
    padding: 2rem 1rem 1rem;
    font-family: 'Segoe UI', Roboto, sans-serif;
    color: #2c3e50;
}
.user-profile h1 {
  text-align: left;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0; 
  margin-bottom: 0.5rem; 
  color: #1a1a1a;
  letter-spacing: 1px;
}
.profile-container {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;
}

.user-details{
  flex: 1 1 48%;
  max-width: 48%;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}
.user-details h3 {
  text-align: left;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}
.user-details label {
  display: block;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  color: #444;
  font-weight: 500;
}
.user-details input{
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 0.5rem;
  background-color: #fdfdfd;
  transition: border-color 0.3s;
}
.user-details input:focus {
  border-color: #5a67d8;
  outline: none;
}
.user-details button{
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-details button:hover {
  background-color: #45a049;
}

</style>