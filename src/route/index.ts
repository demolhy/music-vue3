import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from '@/views/home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/songListDetail',
    name: 'SongListDetail',
    component: () => import('@/views/songListDetaild.vue')
  },
  {
    path: '/musicDetail',
    name: 'MusicDetail',
    component: () => import('@/views/musicDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router