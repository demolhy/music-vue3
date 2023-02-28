<template>
  <div>
    <!-- <div class="loading" id="loading"></div> -->
    <div class="content" v-loading-state:state="loading">
      <div v-if="!loading">
        <el-carousel
          :interval="4000"
          type="card"
          height="200px"
          :autoplay="true"
        >
          <el-carousel-item
            v-for="item in pageContent.bannerList"
            :key="item.encodeId"
          >
            <img :src="item.imageUrl" />
          </el-carousel-item>
        </el-carousel>
        <div class="content_list">
          <div class="title">
            <h5>推荐歌单</h5>
          </div>
          <div class="list_box">
            <div class="box">
              <div class="list1 list">
                <h5>{{ getDay }}</h5>
                <p>{{ new Date().getDate() }}</p>
              </div>
              <p>每日推荐</p>
            </div>
            <div
              class="box"
              v-for="(item, index) in pageContent.songMenuList"
              :key="index"
              @click="toListDetail(item.id)"
            >
              <div class="list1 list">
                <img :src="item.coverImgUrl" />
              </div>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div class="content_list">
          <div class="title">
            <h5>最新音乐</h5>
          </div>
          <ul class="music_list">
            <li
              class="list"
              v-for="(item, index) in pageContent.newMusicList"
              :key="index"
              @dblclick="onPalyMusic(item.id, item.name)"
            >
              <div class="lf">
                <span>{{ index + 1 }}</span>
                <img :src="item.picUrl" />
                <h5>{{ item.name }}</h5>
              </div>
              <div class="singer">{{ item.singerName }}</div>
              <div class="album">
                {{
                  item.song.transName === null ? item.name : item.song.transName
                }}
              </div>
              <div class="time">{{ getDuration(item.song.duration) }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- <Loading /> -->
</template>

<script setup lang="ts">
// import Loading from '@/components/Loading.vue'
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref
} from 'vue'
// import { ElCarousel, ElCarouselItem } from 'element-plus'
import { Banners, SongMenuList, NewMusicList } from '@/types/home'
import http from '@/request/index'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store/index'
import { ElNotification } from 'element-plus';

const store = useCounterStore()
const router = useRouter()
const app = getCurrentInstance() as ComponentInternalInstance
const progressBar = app.appContext.config.globalProperties.$loadings
const loading = ref(false)

let pageContent = reactive({
  bannerList: [] as Banners,
  songMenuList: [] as SongMenuList,
  newMusicList: [] as NewMusicList
})

// 获取轮播图
const getBanner = async () => {
  const data = await http.get<Banners>('/banner')
  pageContent.bannerList = data.banners
  console.log(data, pageContent.bannerList)
}
// 获取歌单
const getSongMenuList = async () => {
  const data = await http.get<SongMenuList>('/top/playlist/highquality', { limit: 9 })
  pageContent.songMenuList = data.playlists
}
// 获取最新音乐
const getNewMusicList = async () => {
  const data = await http.get<NewMusicList>('/personalized/newsong', { limit: 20 })
  pageContent.newMusicList = data.result
  // progressBar.hide()
  loading.value = false
}
// 跳转歌单详情
const toListDetail = (id: number) => {
  console.log(id)
  router.push({
    path: '/songListDetail',
    query: {
      id
    }
  })
}
const onPalyMusic = (ids: number, name: string) => {
  const musicArr: number[] = []
  pageContent.newMusicList && pageContent.newMusicList.map((item: { id: number }) => {
    musicArr.push(item.id)
  })
  console.log(musicArr, musicArr.indexOf(ids));

  store.setMusicIDArr({
    index: musicArr.indexOf(ids),
    ids: musicArr
  })

  ElNotification({
    title: '正在播放...',
    message: name,
    duration: 2000,
  })
}
// 歌曲时长
const getDuration = computed(() => {
  return (duration: number) => {
    const str = (duration / 60 / 1000).toFixed(2)
    return str.replace('.', ':')
  }
})
const getDay = computed(() => {
  let time
  let week = new Date().getDay()
  switch (week) {
    case 0:
      time = '星期日'
      break
    case 1:
      time = '星期一'
      break
    case 2:
      time = '星期二'
      break
    case 3:
      time = '星期三'
      break
    case 4:
      time = '星期四'
      break
    case 5:
      time = '星期五'
      break
    default:
      time = '星期六'
  }
  return time
})
onMounted(() => {
  loading.value = true
  // progressBar.show()
  getBanner()
  getSongMenuList()
  getNewMusicList()
})
</script>

<style lang="scss" scoped>
.content img {
  width: 100%;
  height: 100%;
  // object-fit: cover;
  border-radius: 4px;
}
.content_list {
  margin-bottom: 40px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    h5 {
      font-size: 18px;
      font-weight: 400;
      margin: 0;
      color: #333;
      font-family: Microsoft Yahei;
    }
    p {
      font-size: 12px;
      cursor: pointer;
      color: #999;
    }
  }
  .list_box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .box {
      width: 19%;
      margin-bottom: 15px;
      p {
        font-size: 12px;
        color: #333;
        margin-top: 5px;
        word-break: break-all;
        // width: 190px;
      }
    }
    justify-content: space-between;
    .list {
      width: 100%;
      text-align: center;
      // width: 100%;
      height: 80%;
      // margin: 0 10px;
      border-radius: 6px;
      margin-right: 14px;
      border: 1px solid #eee;
      box-sizing: border-box;
      cursor: pointer;
    }
    .list1 {
      background: #fff;
      display: flex;
      align-items: center;
      flex-flow: column;
      justify-content: center;
      h5 {
        font-size: 18px;
        font-weight: 400;
        font-family: Microsoft Yahei;
      }
      p {
        color: #c62f2f;
        font-size: 66px;
        // font-family: Microsoft Yahei;
      }
    }
  }
  .music_list {
    margin-top: 0px;
    padding-left: 0px;
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      cursor: pointer;
      &:nth-child(even) {
        background: #f5f5f5;
      }
      .lf {
        display: flex;
        align-items: center;
        width: 55%;
        span {
          color: #ccc;
          font-size: 12px;
        }
        img {
          margin: 0 20px;
          margin-right: 10px;
          width: 60px;
          height: 60px;
        }
        h5 {
          font-size: 14px;
          font-weight: 400;
          color: #333;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-right: 40px;
        }
      }
      .singer,
      .album,
      .time {
        color: #666;
        font-size: 12px;
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .singer {
        padding-right: 10px;
      }
      .time {
        text-align: right;
      }
    }
  }
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
