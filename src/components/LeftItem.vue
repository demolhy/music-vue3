<template>
  <div class="left_nav">
    <div class="nav" v-for="(item, index) in data.nav" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="box">
        <div
          class="item"
          :class="data.tab == items.key ? 'on' : ''"
          v-for="(items, indexs) in item.content"
          :key="indexs"
          @click="toPage(items.key)"
        >
          <i class="iconfont" :class="items.icon"></i>
          <span>{{ items.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="LeftItem">
import { reactive } from 'vue'
const data = reactive({
  tab: 1,
  nav: [
    {
      title: '推荐',
      content: [
        {
          key: 1,
          icon: 'icon-yinle',
          name: '发现音乐'
        },
        {
          key: 2,
          icon: 'icon-diantai',
          name: '私人FM'
        },
        {
          key: 3,
          icon: 'icon-zhibobofangshexiangjitianxianxianxing',
          name: '视频'
        },
        {
          key: 4,
          icon: 'icon-pengyou',
          name: '朋友'
        }
      ]
    },
    {
      title: '我的音乐',
      content: [
        {
          key: 5,
          icon: 'icon-gedan',
          name: '本地音乐'
        },
        {
          key: 6,
          icon: 'icon-xiazai',
          name: '下载管理'
        },
        {
          key: 7,
          icon: 'icon-yunpan',
          name: '我的音乐云盘'
        },
        {
          key: 8,
          icon: 'icon-huabanfuben',
          name: '我的收藏'
        }
      ]
    },
    {
      title: '创建的歌单',
      content: [
        {
          key: 9,
          icon: 'icon-xinaixin',
          name: '我喜欢的音乐',
          url: ''
        }
      ]
    }
  ]
})
const toPage = (key: number) => {
  console.log(key)
}
</script>
<style lang="scss" scoped>
.left_nav {
  position: fixed;
  left: 0;
  top: 55px;
  width: 200px;
  background: #f5f5f7;
  bottom: 0;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 2px;
    height: 1;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e1e1e2;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  .nav {
    margin-bottom: 10px;
    .title {
      padding: 6px 10px;
      font-size: 12px;
      color: #999;
    }
    .item {
      padding: 8px 15px;
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      i {
        color: #666;
        line-height: 1;
      }
      i.icon-xinaixin {
        font-size: 12px;
      }
      span {
        margin-left: 8px;
        font-size: 12px;
        color: #666;
      }
    }
    .item.on {
      background: #e6e7ea;
      i {
        color: #333;
      }
      span {
        color: #333;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #c62f2f;
        width: 3px;
      }
    }
  }
}
</style>
