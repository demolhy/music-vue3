import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route/index'
import './static/icon/iconfont.css'
import './static/icon/iconfont.js'
import Loading from './components/loading';
console.log(Loading);
const app = createApp(App)

app.use(Loading).use(router).use(createPinia()).mount('#app')
app.config.globalProperties.$Message = '123'
export default app