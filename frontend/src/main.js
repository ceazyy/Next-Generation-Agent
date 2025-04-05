import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

/* Import Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRobot, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

/* Add icons to the library */
library.add(faRobot, faTimes, faPaperPlane)

const app = createApp(App)

app.use(createPinia())
app.use(router)

/* Register Font Awesome component globally */
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app') 