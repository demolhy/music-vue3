import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route/index'
import './static/icon/iconfont.css'
import './static/icon/iconfont.js'
import Loading from './components/loading';
const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(Loading).use(router).mount('#app')
