<template>
  <div id="title-bar">
    <div class="left-wrapper">
      <div class="logo"></div>
      <button class="history-btn next pointer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_arrow_left"></use>
        </svg>
      </button>
      <button class="history-btn prev pointer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiantouyou"></use>
        </svg>
      </button>
      <div class="search-wrapper">
        <input
          v-model="keyword"
          type="text"
          placeholder="搜索音乐，视频，歌词，电台"
          class="search-inp"
          @focus="focusHandler"
          @blur="blurHandler"
          @keypress.enter="searchHandler"
        />
        <svg
          class="icon search-icon"
          aria-hidden="true"
          @click="searchHandler"
        >
          <use xlink:href="#icon-fangdajing"></use>
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
      <svg
        class="icon pifu-icon"
        aria-hidden="true"
        @click.stop="pifuClickHandler"
      >
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
    <popdialog
      class="search-dialog"
      :left="20"
      v-show="showSearchDialog && hots.length"
    >
      <div class="dialog-content">
        <h5 class="title">热搜榜</h5>
        <ul class="hot-list">
          <li
            v-for="(hot, index) in hots"
            class="hot-item"
            :key="index"
          >
            <p class="index" :class="{red: index <= 2}">{{index+1}}</p>
            <div class="detail">
              <div class="brief">
                <span class="search-word" :class="{bold: index <= 2}">{{hot.searchWord}}</span>
                <span class="score">{{hot.score}}</span>
                <span
                  class="icon"
                  v-if="hot.iconUrl"
                  :style="{backgroundImage: `url(${hot.iconUrl})`}"
                />
              </div>
              <p class="content">{{hot.content}}</p>
            </div>
          </li>
        </ul>
      </div>
    </popdialog>
    <Popdialog
      class="theme-dialog"
      :left="158"
      @click.native.stop
      v-show="showThemeDialog"
    >
      <ul class="theme-list">
        <li
          class="theme-item cool-black"
          @click="themeClickHandler('cool-black')"
        >
          <span class="theme-name">炫酷黑</span>
        </li>
        <li
          class="theme-item official-red"
          @click="themeClickHandler('official-red')"
        >
          <span class="theme-name">官方红</span>
        </li>
        <li
          class="theme-item cute-pink"
          @click="themeClickHandler('cute-pink')"
        >
          <span class="theme-name">可爱粉</span>
        </li>
        <li
          class="theme-item sky-blue"
          @click="themeClickHandler('sky-blue')"
        >
          <span class="theme-name">天际蓝</span>
        </li>
        <li
          class="theme-item fresh-green"
          @click="themeClickHandler('fresh-green')"
        >
          <span class="theme-name">清新绿</span>
        </li>
        <li
          class="theme-item wealthy-gold"
          @click="themeClickHandler('wealthy-gold')"
        >
          <span class="theme-name">土豪金</span>
        </li>
      </ul>
    </Popdialog>
  </div>
</template>

<script>
import Popdialog from '../base/Popdialog'

export default {
  name: 'TitleBar',
  data () {
    return {
      hots: [],
      showSearchDialog: false,
      showThemeDialog: false,
      keyword: '',
      searchRes: []
    }
  },
  mounted () {
    document.body.addEventListener('click', this.bodyClickHandler)
  },
  destroyed () {
    document.body.removeEventListener('click', this.bodyClickHandler)
  },
  methods: {
    pifuClickHandler () {
      this.showThemeDialog = true
    },
    themeClickHandler (theme) {
      const app = document.querySelector('#app')
      app.className = ''
      app.classList.add(theme)
    },
    focusHandler () {
      this._getHots()
      this.showSearchDialog = true
    },
    blurHandler () {
      this.showSearchDialog = false
    },
    searchHandler () {
      if (!this.keyword) {
        return
      }
      this.showSearchDialog = false
      this.$router.push({
        name: 'searchRes',
        query: {
          keyword: this.keyword
        }
      })
    },
    bodyClickHandler () {
      this.showThemeDialog = false
    },
    _getHots () {
      if (this.hots.length > 0) {
        return
      }
      this.axios.get('/search/hot/detail')
        .then(res => {
          this.hots = res.data
        })
    }
  },
  components: {
    Popdialog
  }
}
</script>

<style scoped lang="less">
  @import url(../../css/variable);

  #title-bar {
    position: relative;
    display: flex;
    font-size: @titleFont;
    z-index: 1;

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
          background: rgba(0, 0, 0, .25);
          color: white;

          &::placeholder {
            color: rgba(255, 255, 255, .3);
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

    .search-dialog{
      position: absolute;
      top: 50px;
      left: 310px;
      width: 426px;
      .dialog-content{
        overflow-y: scroll;
        max-height: 500px;
        .title{
          margin: 20px 0 20px 20px;
          font-size: 15px;
          color: rgb(102,102,102);
        }
        .hot-list{
          .hot-item{
            display: flex;
            align-items: center;
            padding: 10px 20px;
            cursor: pointer;

            &:hover{
              background: rgb(237,237,237);
            }
            .index{
              width: 40px;
              font-size: 16px;
              color: rgb(166,166,166);
              &.red{
                color: rgb(225,61,61);
              }
            }
            .detail{
              flex: 1;
              .brief{
                .search-word{
                  font-size: 14px;
                  &.bold{
                    font-weight: bold;
                  }
                }
                .score{
                  margin-left: 15px;
                  font-size: 12px;
                  color: rgb(205,205,205);
                }
              }
              .content{
                margin-top: 8px;
                color: rgb(153,153,153);
              }
            }
            .icon{
              margin-left: 15px;
              height: 14px;
              width: 50px;
              background-size: contain;
              background-repeat: no-repeat;
            }
          }
        }
      }
    }

    .theme-dialog{
      box-sizing: border-box;
      padding: 15px 15px 3px;
      position: absolute;
      top: 50px;
      right: 75px;
      width: 322px;
      .theme-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .theme-item{
          margin-bottom: 12px;
          padding: 1px;
          width: 90px;
          height: 90px;
          border: 1px solid transparent;
          .theme-name{
            box-sizing: border-box;
            display: inline-block;
            margin-top: 70px;
            padding: 0 5px;
            width: 90px;
            height: 20px;
            line-height: 20px;
            font-size: 13px;
            color: white;
            background: rgba(0,0,0,.25);
          }
          &.cool-black{
            &:hover{
              border-color: @cool-black;
            }
            background: @cool-black;
            background-clip: content-box;
            cursor: pointer;
          }
          &.official-red{
            &:hover{
              border-color: @official-red;
            }
            background: @official-red;
            background-clip: content-box;
            cursor: pointer;
          }
          &.cute-pink{
            &:hover{
              border-color: @cute-pink;
            }
            background: @cute-pink;
            background-clip: content-box;
            cursor: pointer;
          }
          &.sky-blue{
            &:hover{
              border-color: @sky-blue;
            }
            background: @sky-blue;
            background-clip: content-box;
            cursor: pointer;
          }
          &.fresh-green{
            &:hover{
              border-color: @fresh-green;
            }
            background: @fresh-green;
            background-clip: content-box;
            cursor: pointer;
          }
          &.wealthy-gold{
            &:hover{
              border-color: @wealthy-gold;
            }
            background: @wealthy-gold;
            background-clip: content-box;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
