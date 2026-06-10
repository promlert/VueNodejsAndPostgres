import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import the icons you need
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faCar,
  faList,
  faPlus,
  faEdit,
  faTrash,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faCar,
  faList,
  faPlus,
  faEdit,
  faTrash,
  faShieldAlt
)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Register Font Awesome globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Initialize auth
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')