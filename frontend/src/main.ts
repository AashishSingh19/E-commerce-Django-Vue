import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'

library.add(faEye, faEyeSlash)

const app = createApp(App)
const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)

import { useAuthStore } from './store/auth'
const auth = useAuthStore()
auth.fetchUser()

app.mount('#app')
