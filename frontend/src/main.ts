import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash, faCircleUser } from '@fortawesome/free-solid-svg-icons'

library.add(faEye, faEyeSlash, faCircleUser)

const app = createApp(App)
const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)


import { useAuthStore } from './store/auth'
const auth = useAuthStore()
auth.init()
if (auth.tokens?.access) {
  auth.fetchUser()
}

app.mount('#app')
