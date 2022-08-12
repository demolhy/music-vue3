<template>
  <div v-if="pageContent.commentList.length > 0 && pageContent.songData" class="ani_box" :class="store.showDetail === true ? 'on' : ''" v-infinite-scroll="onLoad" :infinite-scroll-disabled="disabled" style="height: 1000px;">
    <div
      class="bg-blur"
      :style="'background: url(' + pageContent.songData.al.picUrl + ')'"
    ></div>
    <div class="content">
      <i class="close iconfont icon-cha" @click="onClose"></i>
      <div class="ms" v-if="pageContent.songData.al">
        <div class="lf">
          <!-- <img src="../assets/singlecover.png" alt=""> -->
          <img v-if="store.showDetail" class="cover" :src="pageContent.songData.al.picUrl" alt="" />
          <div class="m_btn">
            <div class="btn"><i class="iconfont icon-xinaixin"></i>喜欢</div>
            <div class="btn"><i class="iconfont icon-shoucang"></i>收藏</div>
            <div class="btn"><i class="iconfont icon-xiazai1"></i>下载</div>
            <div class="btn"><i class="iconfont icon-fenxiang"></i>分享</div>
          </div>
        </div>
        <div class="rg">
          <div class="title">{{ pageContent.songData.name }}</div>
          <ul class="gs">
            <li>
              专辑：<span>{{ pageContent.songData.al.name }}</span>
            </li>
            <li>
              歌手：<span>{{ pageContent.songData.ar[0].name }}</span>
            </li>
          </ul>
          <div class="lyric">
            <ul>
              <li
                v-for="(item, index) in pageContent.objLyric"
                :key="index"
                :style="{
                  color: pageContent.Lyindex === index ? '#186dc5' : '#333'
                }"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="title">
          听友评论<span>(已有{{ pageContent.total }}条评论)</span>
        </div>
        <div class="com_input">
          <input type="text" placeholder="发表评论" />
          <button>发送</button>
        </div>
        <div class="hot_com">
          <div
            class="list"
            v-for="(item, index) in pageContent.commentList"
            :key="index"
          >
            <div class="lf">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="rg">
              <div class="com">
                <span class="name">{{ item.user.nickname }}:</span>
                <span>{{ item.content }}</span>
              </div>
              <div class="btm">
                <div class="time">2021年2月10日 10:10</div>
                <div class="btn">
                  <div class="btn1">
                    <i class="iconfont icon-xinaixin"></i
                    ><span>({{ item.likedCount }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="loading" class="base">正在加载...</div>
          <div v-if="emptyData" class="base">到底啦~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
// import { ElInfiniteScroll } from 'element-plus'
import { SongData, ObjLyri, CommentList, ObjLyricItem } from '@/types/home'
import http from '@/request/index'
import { useCounterStore } from '@/store/index'

// const app = getCurrentInstance() as ComponentInternalInstance

// const progressBar = app.appContext.config.globalProperties.$loadings
const store = useCounterStore()
const pageContent = reactive({
  Lyindex: 0,
  songData: {} as SongData,
  objLyric: [] as ObjLyri,
  total: '',
  commentList: [] as CommentList
})
const boxShow = ref(store.showDetail)
const count = ref(1)
const loading = ref(false)
const emptyData = ref(false)
// 获取歌曲信息
const getContent = async () => {
  const data = await http.get('/song/detail', { ids: 516823326 })
  pageContent.songData = data.songs[0]
  // console.log(proxy.$loadings);
  
  // setTimeout(() => {
  //   progressBar.hide()
  // }, 2000);
  // console.log(proxy.appContext.config.globalProperties.$loadings);
  
  // setTimeout(() => {
  // proxy && proxy.appContext.config.globalProperties.$loadings.hide()
  // }, 1000);
}
// 获取评论
const getHotComment = async () => {
  loading.value = true
  const data = await http.get('/comment/hot', { id: 516823326, type: 0, sortType: 1, offset: count.value, limit: 20 })
  // pageContent.commentList = [...pageContent.commentList, ...data.data.comments]
  // pageContent.total = data.data.totalCount
  pageContent.total = data.total
  loading.value = false
  if (data.hotComments.length === 0) {
    emptyData.value = true
    return
  }
  pageContent.commentList = [...pageContent.commentList, ...data.hotComments]
  
}
// 获取歌词
const getLyric = async () => {
  const data = await http.get('/lyric', { id: 516823326 })
  const regNewline = /\n/
  const lineArr = data.lrc.lyric.split(regNewline)
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
  lineArr.forEach((item: string) => {
    const match = item.match(regTime)
    let obj = {} as ObjLyricItem
    // item.split()
    if (item.split(']')[1]) {
      obj.time = match ? formatLyricTime(match[0].slice(1, match[0].length - 1)) : 0
      obj.name = item.split(']')[1] === '' ? '' : item.split(']')[1]
      pageContent.objLyric.push(obj)
    }
  })
}
// 格式化歌词的时间 转换成 sss:ms
const formatLyricTime = (time: string): number => {
  const regMin = /.*:/
  const regSec = /:.*\./
  const regMs = /\./
  const matchMin = time.match(regMin)
  const matchSec = time.match(regSec)
  const matchMS = time.match(regMs) as { index: number }
  const min = matchMin && parseInt(matchMin[0].slice(0, 2))
  let sec = matchSec && parseInt(matchSec[0].slice(1, 3))
  const ms = time.slice((matchMS).index + 1, matchMS.index + 3)
  if (min !== 0 && sec && min) {
    sec += min * 60
  }
  // console.log(matchMS, time, sec + '.' + ms);
  return Number(sec + '.' + ms)
}
// 关闭
const onClose = () => {
  store.setHideDetail()
}
const disabled = computed(() => emptyData.value || loading.value)
const onLoad = (e: any) => {
  console.log(1, e)
  count.value += 1
  getHotComment()
}
onMounted(() => {
  // progressBar.show()
  getContent()
  getHotComment()
  getLyric()
})
</script>

<style lang="scss" scope>
.close{
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 20px !important;
  cursor: pointer;
}
.ani_box {
  transition: all 0.5s;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  bottom: 0;
  overflow: auto;
  transform: translateY(100%);
  transition: transform .5s;
  &.on {
    // top: 0;
    transform: translateY(0);
  }
}
.ms {
  display: flex;
  margin-top: 30px;
  align-items: flex-end;
  .lf {
    width: 38%;
    .cover {
      width: 99%;
      background: url('../assets/singlecover.png') no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding: 50px;
      border-radius: 50%;
      transition: all 0.5s;
      transform: rotate(30deg);
      animation: ratate 20s linear infinite;
    }
    .m_btn {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .btn {
        padding: 6px 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 12px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        background: #fff;
        i {
          margin-right: 6px;
          font-size: 14px;
        }
      }
    }
  }
  .rg {
    margin-left: 100px;
    width: 62%;
    .title {
      font-size: 24px;
      font-weight: 500;
    }
    .gs {
      margin-top: 10px;
      font-size: 12px;
      list-style: none;
      padding: 0;
      display: flex;
      li {
        margin-right: 40px;
        span {
          color: #186dc5;
          cursor: pointer;
        }
      }
    }
    .lyric {
      position: relative;
      margin-top: 30px;
      height: 300px;
      overflow-y: scroll;
      // &::after{
      //   position: absolute;
      //   content: "";
      //   top: 0;
      //   left: 0;
      //   right: 0;
      //   height: 30px;
      //   filter: blur(20);
      //   background: rgba(0, 0, 0, 0.3);
      // }
      &::-webkit-scrollbar {
        width: 8px;
        height: 16px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          margin-bottom: 20px;
          font-family: '宋体';
        }
      }
    }
  }
}
.comment {
  margin-top: 80px;
  .title {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    span {
      font-size: 12px;
      color: #999;
      margin-left: 10px;
    }
  }
  .com_input {
    border: 1px solid #eee;
    margin-top: 15px;
    background: #fff;
    position: relative;
    input {
      border: none;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      background: none;
      padding-left: 20px;
      outline: none;
    }
    button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: #c62f2f;
      color: #fff;
      border: none;
      padding: 4px 10px;
      border-radius: 4px;
      outline: none;
    }
  }
  .hot_com {
    // padding-bottom: 80px;
    .list {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .lf {
        margin-right: 15px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-top: 5px;
        }
      }
      .rg {
        font-size: 13px;
        width: 100%;
        span {
          line-height: 25px;
        }
        .name {
          color: #186dc5;
        }
        .btm {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          align-items: center;
          .time {
            color: #999;
            font-size: 12px;
          }
          .btn1 {
            cursor: pointer;
            i {
              font-size: 12px;
              color: #999;
            }
            span {
              font-size: 12px;
              color: #999;
              margin-left: 4px;
            }
          }
        }
      }
    }
    .base {
      text-align: center;
      font-size: 12px;
      color: #999;
      padding: 10px 0;
    }
  }
}
.bg-blur {
  position: absolute;
  top: 0;
  left: 0;
  // transform: translate(-50%, -50%);
  width: 100%;
  height: 40%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(70px);
  z-index: -1;
  opacity: .4;
}
@keyframes ratate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
