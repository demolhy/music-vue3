<template>
  <div>
    <!-- <div class="loading" id="loading"></div> -->
    <div class="content">
      2
      <!-- <div class="content_list">
        <div class="title">
          <h5>推荐歌单</h5>
        </div>
        <div class="list_box">
          <div class="box">
            <div class="list1 list">
              <h5>星期三</h5>
              <p>10</p>
            </div>
            <p>每日推荐</p>
          </div>
          <div
            class="box"
            v-for="(item, index) in songMenuList"
            :key="index"
            @click="toListDetail(item.id)"
          >
            <div class="list1 list">
              <img :src="item.coverImgUrl" alt />
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
            v-for="(item, index) in newMusicList"
            :key="index"
            @click="paly(item)"
          >
            <div class="lf">
              <span>{{ index + 1 }}</span>
              <img :src="item.picUrl" alt="" />
              <h5>{{ item.name }}</h5>
            </div>
            <div class="singer">{{ item.singerName }}</div>
            <div class="album">
              {{
                item.song.transName === null ? item.name : item.song.transName
              }}
            </div>
            <div class="time">05:00</div>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElCarousel, ElCarouselItem } from 'element-plus'
const bannerList = reactive([
  {
    imageUrl: 'http://p1.music.126.net/WXrqJFTt5NwDaJm4JuGPNw==/109951165297673385.jpg?imageView&quality=89'
  },
  {
    imageUrl: 'http://p1.music.126.net/ZGUns7WvgJ0ZF4txDMy2BA==/109951165367464959.jpg?imageView&quality=89'
  },
  {
    imageUrl: 'http://p1.music.126.net/j1SpKTAlu7cxAScpGkpKfw==/109951165367550061.jpg?imageView&quality=89'
  },
  {
    imageUrl: 'http://p1.music.126.net/xyN0mJ7dYicGEbU--zmiRg==/109951165367513014.jpg?imageView&quality=89'
  },
  {
    imageUrl: 'http://p1.music.126.net/WXrqJFTt5NwDaJm4JuGPNw==/109951165297673385.jpg?imageView&quality=89'
  }
])
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