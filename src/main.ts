import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import type { ToastOptions } from 'vue-toastification/dist/types/types'
import './base.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  pauseOnFocusLoss: false,
} as ToastOptions)

app.mount('#app')
