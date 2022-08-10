<template>
  <div class="home">
    <div class="page_nav">
      <ul>
        <li
          :class="active == index ? 'on' : ''"
          v-for="(item, index) in navList"
          :key="index"
          @click="toDetail(item.key, item.index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <component :is="currentView" :parent="viewIndex" :key="active"></component>
    <!-- <recommend :show="statu"></recommend>
    <song-list :show="statu"></song-list>
    <radio-show :show="statu"></radio-show>
    <raking-list :show="statu"></raking-list> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef } from 'vue'
import Recommend from './components/Recommend.vue'
import SongList from './components/SongList.vue'
import RadioShow from './components/RadioShow.vue'
import RakingList from './components/RakingList.vue'

const active = ref(0)
let currentView = shallowRef(Recommend)
const viewIndex = ref(0)
const navList = reactive([
  {
    name: '个性推荐',
    key: 'Recommend',
    index: 0
  },
  {
    name: '歌单',
    key: 'SongList',
    index: 1
  },
  {
    name: '主播电台',
    key: 'RadioShow',
    index: 2
  },
  {
    name: '排行榜',
    key: 'RadioShow',
    index: 3
  },
  {
    name: '歌手',
    key: 'RadioShow',
    index: 4
  },
  {
    name: '最新音乐',
    key: 'RadioShow',
    index: 5
  }
])
function toDetail(name: string, index: number) {
  switch (name) {
    case 'Recommend':
      currentView.value = Recommend
      break;
    case 'SongList':
      currentView.value = SongList
      break;
    case 'RadioShow':
      currentView.value = RadioShow
      break;
    default:
      currentView.value = RakingList
      break;
  }
  active.value = index;
}
</script>

<style lang="scss" scoped>
.home {
  position: fixed;
  top: 55px;
  left: 200px;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 30px;
  background: #fafafa;
  // min-width: 1100px;
  // overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 1;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e1e1e2;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}
.page_nav {
  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    border-bottom: 1px solid #ddd;
  }
  li {
    list-style: none;
    padding: 15px 0;
    position: relative;
    color: #333;
    font-size: 16px;
    margin: 0 20px;
    cursor: pointer;
  }
  li.on {
    color: #c62f2f;
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      width: 60px;
      height: 2px;
      background: #c62f2f;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.el-carousel__indicator.is-active .el-carousel__button {
  background-color: #c62f2f !important;
}
// .loading {
//   padding: 30px;
//   /deep/ .el-loading-spinner i {
//     color: #666;
//   }
//   /deep/ .el-loading-spinner .el-loading-text {
//     color: #666 !important;
//   }
// }
</style>
