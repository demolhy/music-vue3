<template>
  <div class="header">
    <div class="left">
      <div class="logo">
        <img src="../assets/logo.png" />
        <span>网易云音乐</span>
      </div>
      <div class="page">
        <!-- <span class="iconfont icon-chevron_left_24px"></span>
        <span class="iconfont icon-chevron_right_24px"></span> -->
      </div>
      <div class="search">
        <input type="text" placeholder="搜索音乐" />
        <span class="iconfont icon-sousuo"></span>
      </div>
    </div>
    <div class="right">
      <div class="photo" @click="login">
        <img src="../assets/login2.png" />
        <span>未登录</span>
      </div>
      <div class="icon">
        <i class="icon1 iconfont icon-xin"></i>
        <i class="icon2 iconfont icon-yifu"></i>
        <i class="icon3 iconfont icon-shezhi"></i>
      </div>
      <div class="right_btn">
        <i class="iconfont icon-reduce"></i>
        <i class="iconfont icon-cha"></i>
      </div>
    </div>
    <!-- <i class="iconfont icon-xinaixin"></i> -->
  </div>
</template>

<script setup lang="ts" name="TopItem">
import { reactive } from 'vue'
const login = () => {
  console.log(1)
}
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #c62f2f;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  // min-width: 1200px;
  overflow: hidden;
  z-index: 999;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .photo {
      display: flex;
      align-items: center;
      position: relative;
      margin-right: 15px;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      span {
        color: #e8c0c0;
        font-size: 14px;
        margin-left: 5px;
      }
      &::after{
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -15px;
        width: 0;
        height: 0;
        border-top: 5px solid #eee;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent
      }
    }
    .icon {
      display: flex;
      align-items: center;
      margin-right: 20px;
      i {
        font-size: 18px;
        color: #e8c0c0;
        margin-left: 20px
      }
      .icon2{
        margin-top: -3px
      }
    }
    .right_btn{
      border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
      padding-left: 10px;
      i{
        color: #e8c0c0;
        margin-left: 10px
      }
    }
  }
}
.logo {
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  span {
    letter-spacing: 2px;
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
}
.page {
  margin-left: 100px;
  span {
    // background: rgba($color: #000000, $alpha: 0.1);
    color: rgba($color: #fff, $alpha: 0.5);
    margin: 0;
    display: inline-block;
    height: 23px;
    line-height: 23px;
    width: 25px;
    text-align: center;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
  }
}
.search {
  margin-left: 20px;
  position: relative;
  input {
    background: rgba($color: #000000, $alpha: 0.2);
    border: none;
    height: 23px;
    line-height: 23px;
    border-radius: 10px;
    color: #fff;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
    outline: none;
    &::placeholder {
      color: rgba($color: #fff, $alpha: 0.5);
    }
  }
  span {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba($color: #fff, $alpha: 0.5);
  }
}
</style>
