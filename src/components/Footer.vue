<template>
  <div class="footer" v-if="showFooter">
    <div class="slider">
      <el-slider
        v-model="slider"
        size="small"
        :format-tooltip="formatProcessToolTip"
        @input="inputCurrentTime"
      />
    </div>
    <div class="player_box">
      <div class="left_box">
        <div class="pic" @click="showBox">
          <img :src="pageContent.songItem.picUrl" alt="" />
        </div>
        <div class="text">
          <div class="title" v-if="pageContent.songItem">
            {{ pageContent.songItem.name
            }}<span>- {{ pageContent.songItem.ar }}</span>
          </div>
          <div class="time">
            {{ realFormatSecond(pageContent.playTime) }} /
            {{ realFormatSecond(pageContent.allTime) }}
          </div>
        </div>
      </div>
      <!-- <aplayer
        v-if="isShow"
        preload="none"
        ref="videoPlayer"
        :narrow="false"
        theme="#c62f2f"
        :music="musics"
        :list="songs"
      >
      </aplayer> -->
      <audio
        ref="videoPlayer"
        @pause="onPause"
        @play="onPlay"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
        :src="musicSrc"
      ></audio>
    </div>
    <div class="play_icon">
      <i @click="onLast" class="icon1 iconfont icon-xiayishou1"></i>
      <i
        v-if="musicStute"
        @click.stop="onPauseing"
        class="iconfont icon3 icon-zantingtingzhi"
      ></i>
      <i
        v-if="!musicStute"
        @click.stop="onPlaying"
        class="iconfont icon2 icon-bofang"
      ></i>
      <i @click="onNext" class="icon1 iconfont icon-xiayishou"></i>
    </div>
    <!-- <div class="progress">
      <span>00:00</span>
      <p>
        <i></i>
      </p>
      <span>04:00</span>
      <div class="volume">
        <i class="iconfont icon-yinliang"></i>
        <p></p>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, watch, nextTick } from 'vue'
import { SongItem } from '@/types/home'
import { useCounterStore } from '@/store/index'
import http from '@/request/index'
import music from '@/static/music/falling-star.mp3'


const store = useCounterStore()
const musicStute = ref(false)
const slider = ref(0)
const videoPlayer = ref()
const musicSrc = ref(store.musicSrcData)
const showFooter = ref(false)
const pageContent = reactive({
  songItem: {
    name: '星球坠落Live',
    picUrl:
      'http://p1.music.126.net/Hx-PJgpdWJIA8PEx_2XJag==/109951163575606355.jpg?param=130y130',
    ar: '艾热/李佳隆'
  } as SongItem,
  playTime: 0,
  allTime: 0
})
const musicList = reactive({
  list: [],
  index: 0
})
const subscribe = store.$subscribe(
  async (
    mutation: {
      events: {
        [x: string]: any
        key: string
      }
    },
    state: { musicSrcData: string }
  ) => {
    // 监听pinia state变化
    const newMusicStore = mutation.events
    console.log('oo1', mutation, newMusicStore.key)
    if (newMusicStore.key === 'musicIDs') {
      console.log(newMusicStore.newValue)
      
      
      const index = newMusicStore.newValue.index
      musicList.list = newMusicStore.newValue.ids
      musicList.index = newMusicStore.newValue.index
      playMusic(musicList.index)
    }

    // videoPlayer.value.play()
  },
  { detached: true }
)

const playMusic = async(index: number) => {
  console.log(index);
  musicList.index = index
  slider.value = 0
  
  const musicData = await http.get('song/url', {
    id: musicList.list[index]
  })
  musicSrc.value = musicData.data[0].url
  showFooter.value = true
  // store.setMusicSrc(musicData.data[0].url)
  const datas = await http.get('/song/detail', {
    ids: musicList.list[index]
  })
  console.log('datas', datas);
  
  pageContent.songItem.name = datas.songs[0].name
  let songAr = ''
  datas.songs[0].ar &&
    datas.songs[0].ar.map((item: { name: string }, index: number) => {
      if (index === 0) {
        songAr = songAr.concat(item.name)
        return
      }
      songAr = songAr.concat('/', item.name)
    })
  pageContent.songItem.ar = songAr
  pageContent.songItem.picUrl = datas.songs[0].al.picUrl
  // console.log(musicData.data[0].url);

  // console.log('new',musicSrc.value);

  slider.value = 0
  await nextTick()
  videoPlayer.value.play()
}
const showBox = () => {
  store.setShowDetail()
}
const onLast = () => {
  // store.setCount()
  videoPlayer.value.pause()
  if (musicList.index === 0) {
    playMusic(0)
  } else {
    playMusic(musicList.index - 1)
  }
}
const onNext = () => {
  // store.setCount()
  videoPlayer.value.pause()
  if (musicList.index !== musicList.list.length - 1) {
    playMusic(musicList.index + 1)
  } else {
    playMusic(0)
  }
}
const onPauseing = () => {
  musicStute.value = !musicStute.value
  videoPlayer.value.pause()
}
const onPlaying = () => {
  musicStute.value = !musicStute.value
  videoPlayer.value.play()
}
// 播放位置
const onTimeupdate = (res: { target: { currentTime: number } }): void => {
  // console.log(res)
  pageContent.playTime = res.target.currentTime
  slider.value = (pageContent.playTime / pageContent.allTime) * 100
  if (slider.value === 100) {
    videoPlayer.value.pause()
    if (musicList.index !== musicList.list.length - 1) {
      playMusic(musicList.index + 1)
    } else {
      playMusic(0)
    }
  }
}
// 音乐总时长
const onLoadedmetadata = (res: { target: { duration: string } }) => {
  pageContent.allTime = parseInt(res.target.duration)
}
const onPause = () => {
  musicStute.value = false
}
const onPlay = () => {
  musicStute.value = true
}
// 改变播放位置
const changeCurrentTime = (index: number) => {
  videoPlayer.value.currentTime = (index / 100) * pageContent.allTime
  
  // console.log(index, videoPlayer.value)
}
const inputCurrentTime = (index: number) => {
  videoPlayer.value.currentTime = (index / 100) * pageContent.allTime
  // if (index === 100 && musicList.index !== musicList.list.length - 1) {
  //   console.log('==>', musicList.index);
  //   playMusic(musicList.index + 1)
  // }
}
const formatProcessToolTip = (index = 0) => {
  const html = (pageContent.allTime / 100) * index
  return `进度条：${realFormatSecond(html)}`
}

const realFormatSecond = (second: string | number) => {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second.toString())

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '00:00'
  }
}
</script>

<style scoped lang="scss">
.player_box {
  width: 100%;
  padding: 0 15px;
  .left_box {
    display: flex;
    align-items: center;
    .pic {
      width: 38px;
      height: 38px;
      border-radius: 6px;
      margin-right: 10px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 10;
      }
      &:hover::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        background-image: url('../assets/top.png');
        background-size: 100% 100%;
        width: 20px;
        height: 20px;
      }
    }
    .title {
      font-size: 13px;
      color: #333;
      span {
        margin-left: 10px;
        color: #999;
        font-size: 12px;
      }
    }
    .time {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  height: 50px;
  z-index: 9999;
  display: flex;
  align-items: center;
  border-top: 2px solid #eee;
  padding: 0px;
  .slider {
    position: absolute;
    bottom: 38px;
    width: 100%;
  }
  .play_icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    i {
      background: #ff3b3b;
      color: #fff;
      border-radius: 50%;
      padding: 8px;
      text-align: center;
      margin: 0 10px;
      cursor: pointer;
    }
    .icon1 {
      padding: 6px;
      background: none;
      color: #ff3b3b;
    }
    .icon2 {
      padding: 8px 10px;
      &::before {
        margin-right: -4px;
      }
    }
  }
  .progress {
    display: flex;
    align-items: center;
    margin-left: 30px;
    span {
      font-size: 12px;
      color: #666;
    }
    p {
      width: 70vw;
      height: 4px;
      background: #ccc;
      margin: 0 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      i {
        width: 10px;
        height: 10px;
        display: block;
        background: #fff;
        border-radius: 50%;
        position: relative;
        border: 1px solid #ccc;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: red;
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
      }
    }
    .volume {
      margin-left: 20px;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 14px;
        color: #666;
      }
      p {
        width: 5vw;
        margin: 0 5px;
      }
    }
  }
}

// /deep/ .aplayer-pic {
//   width: 40px;
//   height: 40px;
//   margin-left: 10px;
//   border-radius: 4px;
// }
// /deep/ .aplayer {
//   background: none;
//   margin: 0;
//   box-shadow: none;
// }
// /deep/ .aplayer.aplayer-narrow {
//   width: 100%;
// }
// /deep/ .aplayer {
//   position: initial;
//   width: 100%;
// }
// /deep/ .aplayer-controller {
//   position: inherit;
// }
// /deep/ .aplayer-bar-wrap {
//   position: absolute;
//   width: 100%;
//   bottom: 55px;
//   left: 0;
// }
// /deep/ .aplayer-controller .aplayer-time {
//   flex: 1;
//   justify-content: flex-end;
// }
// /deep/ .aplayer .aplayer-body {
//   align-items: center;
// }
// /deep/ .aplayer .aplayer-body .aplayer-info {
//   overflow: initial;
// }
// /deep/ .aplayer .aplayer-body .aplayer-info .aplayer-music {
//   flex-grow: initial;
//   padding-bottom: 7px;
// }
// /deep/ .aplayer-time-inner {
//   position: absolute;
//   left: 0;
//   top: 0px;
// }
// /deep/ .aplayer-icon {
//   width: 20px;
//   height: 20px;
//   margin-top: -27px;
//   margin-right: 10px;
// }
// /deep/ .aplayer-pic .aplayer-play .aplayer-icon-play,
// /deep/ .aplayer-pic .aplayer-pause .aplayer-icon-pause {
//   top: 30px;
// }
// /deep/ .aplayer-pic .aplayer-pause .aplayer-icon-pause {
//   top: 29px;
// }
// /deep/ .aplayer-volume-wrap .aplayer-volume-bar-wrap:after {
//   content: none;
//   // width: 27px;
// }
// /deep/ .aplayer-bar-wrap .aplayer-bar {
//   background: #eee;
//   height: 1px;
// }
// /deep/ .aplayer-bar-wrap .aplayer-bar .aplayer-loaded {
//   height: 1px;
//   background: #ccc;
// }
</style>
<style>
.footer .el-slider__runway,
.footer .el-slider__bar {
  height: 3px;
}
.footer .el-slider__bar {
  background-color: #ff3b3b;
}
.footer .el-slider__button {
  width: 12px;
  height: 12px;
  border-color: #ff3b3b;
  margin-top: -2px;
}
</style>
