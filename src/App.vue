<template>
  <div v-if="!store.showDetail">
    <TopItem />
    
    <LeftItem />
    <div class="box_content">
      <router-view />
    </div>
  </div>
  <Footer />
  <MusicDetail />
</template>

<script setup lang="ts">
import LeftItem from '@/components/LeftItem.vue'
import TopItem from '@/components/TopItem.vue'
import Footer from '@/components/Footer.vue'
import MusicDetail from '@/views/musicDetail.vue'
import { useCounterStore } from '@/store/index'

const store = useCounterStore()
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
// #app {
// }
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
img {
  vertical-align: middle;
}
h5,
h4,
h3,
h2,
h1,
p {
  margin: 0;
}
.box_content {
  position: absolute;
  top: 55px;
  left: 200px;
  // width: 100%;
  right: 0;
  height: 100%;
}
.content {
  margin: auto;
  margin-top: 20px;
  max-width: 1000px;
  overflow: hidden;
  margin-bottom: 10vh;
}
</style>
