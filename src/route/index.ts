import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from '@/views/home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      keepAlive: true //设置页面是否需要使用缓存
    },
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