import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

apiClient.interceptors.request.use(config =>{
    const token = localStorage.getItem('access')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default apiClient