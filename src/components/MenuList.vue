<template>
  <div id="menu-list">
    <p class="level1">推荐</p>
    <ul class="menu">
      <li class="menu-item active" :class="theme">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
        </svg>
        <span>发现音乐</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <span>私人FM</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yanjing"></use>
        </svg>
        <span>LOOK直播</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-18"></use>
        </svg>
        <span>视频</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lianxiren"></use>
        </svg>
        <span>朋友</span>
      </li>
    </ul>
    <p class="level1">我的音乐</p>
    <ul class="menu">
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle1"></use>
        </svg>
        <span>本地音乐</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载管理</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yun"></use>
        </svg>
        <span>我的音乐云盘</span>
      </li>
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huabanfuben"></use>
        </svg>
        <span>我的收藏</span>
      </li>
    </ul>
    <p class="level1">
      创建歌单
      <svg
        class="icon"
        aria-hidden="true"
        @click="createSongListHandler"
        v-if="showCreateSongList"
      >
        <use xlink:href="#icon-xiajiantou"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        @click="createSongListHandler"
        v-else
      >
        <use xlink:href="#icon-jiantouyou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shezhi"></use>
      </svg>
    </p>
    <ul class="menu" v-show="showCreateSongList">
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xin1"></use>
        </svg>
        <span>我喜欢的音乐</span>
      </li>
    </ul>
    <p class="level1">
      收藏的歌单
      <svg
        class="icon"
        aria-hidden="true"
        @click="collectSongListHandler"
        v-if="showCollectSongList"
      >
        <use xlink:href="#icon-xiajiantou"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        @click="collectSongListHandler"
        v-else
      >
        <use xlink:href="#icon-jiantouyou"></use>
      </svg>
    </p>
    <ul class="menu" v-show="showCollectSongList">
      <li class="menu-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>收藏的歌单1</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MenuList',
  data () {
    return {
      showCreateSongList: true,
      showCollectSongList: true
    }
  },
  methods: {
    createSongListHandler () {
      this.showCreateSongList = !this.showCreateSongList
    },
    collectSongListHandler () {
      this.showCollectSongList = !this.showCollectSongList
    }
  },
  computed: {
    ...mapState([
      'theme'
    ])
  }
}
</script>

<style scoped lang="less">
  #menu-list {
    padding: 0 10px;
    width: 200px;
    height: 100%;
    overflow-y: scroll;
    line-height: 30px;
    background: rgb(245, 245, 247);
    color: rgb(92, 92, 92);
    font-size: 13px;

    .level1 {
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        .icon {
          color: #000;
        }
      }

      .icon {
        margin: 8px 0 0 10px;
        float: right;
        font-size: 14px;
        color: rgb(92, 92, 92);
      }
    }

    .menu {
      .menu-item {
        padding-left: 10px;
        cursor: pointer;

        &.active {
          padding-left: 17px;
          margin: 0 -10px;
          border-left-width: 3px;
          border-left-style: solid;
          background: rgb(230, 231, 234);
        }

        .icon {
          margin-right: 8px;
          font-size: 19px;
          color: rgb(92, 92, 92);
        }

        &:hover {
          color: #000;

          .icon {
            color: #000;
          }
        }

        span {
          display: inline-block;
          vertical-align: 1px;
        }
      }
    }
  }
</style>
