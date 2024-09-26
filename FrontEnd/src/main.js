import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

import setupInterceptors from './services/setupInterceptors';

setupInterceptors(store);
createApp(App)  
.use(router)
.use(store)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')