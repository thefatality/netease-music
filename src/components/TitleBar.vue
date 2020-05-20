<template>
  <div id="title-bar" :class="theme">
    <div class="left-wrapper">
      <div class="logo"></div>
      <button class="history-btn next pointer"></button>
      <button class="history-btn prev pointer"></button>
      <div class="search-wrapper">
        <input type="text" placeholder="搜索音乐，视频，歌词，电台" class="search-inp"/>
        <svg class="icon search-icon" aria-hidden="true">
          <use xlink:href="#icon-shezhi"></use>
        </svg>
      </div>
    </div>
    <div class="right-wrapper">
      <svg class="icon avatar-icon" aria-hidden="true">
        <use xlink:href="#icon-touxiang"></use>
      </svg>
      <div class="login hover pointer">
        <span class="username">未登录</span>
        <svg class="icon below-icon" aria-hidden="true">
          <use xlink:href="#icon-below-s"></use>
        </svg>
      </div>
      <span class="vip hover pointer">开通VIP</span>
      <svg class="icon pifu-icon" aria-hidden="true">
        <use xlink:href="#icon-pifu"></use>
      </svg>
      <svg class="icon youxiang-icon" aria-hidden="true">
        <use xlink:href="#icon-youxiang"></use>
      </svg>
      <svg class="icon shezhi-icon" aria-hidden="true">
        <use xlink:href="#icon-shezhi"></use>
      </svg>
      <span class="segment">|</span>
      <svg class="icon mini-icon" aria-hidden="true">
        <use xlink:href="#icon--zuixiaohua"></use>
      </svg>
      <svg class="icon zuixiao-icon" aria-hidden="true">
        <use xlink:href="#icon-zuixiaohua"></use>
      </svg>
      <svg class="icon zuida-icon" aria-hidden="true">
        <use xlink:href="#icon-zuidahua"></use>
      </svg>
      <svg class="icon close-icon" aria-hidden="true">
        <use xlink:href="#icon-ego-close"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TitleBar',
  computed: {
    ...mapState([
      'theme'
    ])
  }
}
</script>

<style scoped lang="less">
  @import url(../css/variable);

  #title-bar {
    display: flex;
    height: 50px;
    font-size: @titleFont;

    .hover:hover {
      color: white;
    }

    .pointer{
      cursor: pointer;
    }

    .left-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;

      .logo {
        margin-right: 65px;
        display: inline-block;
        width: 180px;
        height: 100%;
        background: url(/imgs/topbar.png) no-repeat 18px -9px;
      }

      .history-btn {
        width: 27px;
        height: 22px;
        border: 1px solid rgb(70, 150, 212);
        background: transparent;

        &.next {
          border-radius: 4px 0 0 4px;
        }

        &.prev {
          border-radius: 0 4px 4px 0;
        }
      }

      .search-wrapper {
        position: relative;
        display: inline-block;

        .search-inp {
          margin-left: 12px;
          padding: 11px;
          box-sizing: border-box;
          width: 220px;
          height: 23px;
          border-radius: 12px;
          background: rgb(70, 139, 213);
          color: white;

          &::placeholder {
            color: rgb(139, 179, 227);
            font-size: 13px;
          }

          &:focus + .search-icon {
            color: white;
          }
        }

        .search-icon {
          position: absolute;
          right: 7px;
          top: 4px;
          color: rgb(151, 190, 231);
        }
      }
    }

    .right-wrapper {
      display: flex;
      padding-right: 5px;
      color: rgb(209, 236, 255);
      align-items: center;

      .avatar-icon {
        margin-right: 5px;
        font-size: 26px;
      }

      .login {
        &:hover {
          .below-icon {
            color: white;
          }
        }

        .username {
          margin-right: 10px;
        }

        .below-icon {
          margin-right: 10px;
        }
      }

      .vip {
        margin-right: 10px;
      }

      .pifu-icon {
        margin-right: 20px;
        font-size: 18px;
      }

      .youxiang-icon {
        margin-right: 20px;
        font-size: 22px;
        color: white;
      }

      .shezhi-icon {
        margin-right: 10px;
        font-size: 18px;
      }

      .segment {
        margin-top: -5px;
        margin-right: 10px;
        font-size: 20px;
        color: rgb(67, 150, 213);
      }
      .mini-icon,
      .zuixiao-icon,
      .zuida-icon,
      .close-icon{
        margin-right: 10px;
        font-size: 18px;
      }
    }
  }
</style>
