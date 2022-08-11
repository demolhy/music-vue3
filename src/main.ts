import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route/index'
import './static/icon/iconfont.css'
import './static/icon/iconfont.js'

createApp(App).use(router).use(createPinia()).mount('#app')
