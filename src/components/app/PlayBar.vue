<template>
  <div id="foot-bar">
    <div class="operate-song-wrapper">
      <div class="prev-song">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
      </div>
      <div
        class="play-stop-song"
        :class="{hack: status === 'stop'}"
        @click="changeStatusHandler"
      >
        <svg class="icon" aria-hidden="true" v-show="status === STATUS_ENUM.STOP">
          <use xlink:href="#icon-arrow-"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="status === STATUS_ENUM.PLAY">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
      <div class="next-song">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
      </div>
    </div>
    <div class="process-wrapper">
      <span class="current">{{currentTime}}</span>
      <div class="line-wrapper">
        <div class="total-line">
          <div class="current-line">
            <div class="line-btn">
              <div class="inside"></div>
            </div>
          </div>
        </div>
      </div>
      <span class="total">{{totalTime}}</span>
    </div>
    <div class="volume-wrapper">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
      <div class="line-wrapper">
        <div class="total-line">
          <div class="current-line">
            <div class="line-btn">
              <div class="inside"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="operate-wrapper">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
    </div>
    <audio
      :src="currentSong.url"
      ref="audio"
      @canplay="canPlayHandler"
      @ended="endedHandler"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

const STATUS_ENUM = {
  STOP: 'stop',
  PLAY: 'play'
}

export default {
  name: 'FootBar',
  data () {
    return {
      STATUS_ENUM,
      currentTime: '00:00',
      totalTime: '00:00',
      status: STATUS_ENUM.STOP,
      timer: 0
    }
  },
  computed: {
    ...mapState([
      'currentSong'
    ])
  },
  methods: {
    canPlayHandler () {
      this.totalTime = this._formatTime(this.$refs.audio.duration | 0)
      this.status = this.STATUS_ENUM.PLAY
    },
    endedHandler () {
      this.status = this.STATUS_ENUM.STOP
    },
    changeStatusHandler () {
      this.status = this.status === this.STATUS_ENUM.STOP
        ? this.STATUS_ENUM.PLAY
        : this.STATUS_ENUM.STOP
    },
    _formatTime (time) {
      const minute = (time / 60) | 0
      const second = time - minute * 60
      return `${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`
    }
  },
  watch: {
    status (newVal, oldVal) {
      const audio = this.$refs.audio
      this.status === this.STATUS_ENUM.PLAY ? audio.play() : audio.pause()
    }
  }
}
</script>

<style scoped lang="less">
  #foot-bar {
    display: flex;
    height: 50px;
    background: rgb(246, 246, 248);

    .operate-song-wrapper,
    .process-wrapper,
    .line-wrapper,
    .volume-wrapper,
    .operate-wrapper {
      display: flex;
      align-items: center;
    }

    .line-wrapper{
      height: 100%;
      overflow: hidden;
      padding: 0 10px;
      .total-line {
        flex: 1;
        position: relative;
        height: 4px;
        background: rgb(194, 194, 196);
        border-radius: 2px;
        cursor: pointer;
        .current-line{
          position: absolute;
          left: -100%;
          height: 100%;
          width: 100%;
          border-radius: 2px;
          .line-btn{
            position: absolute;
            top: -6px;
            right: -6px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid rgb(198, 198, 198);
            background: #fff;
            text-align: center;
            .inside{
              display: inline-block;
              vertical-align: 5px;
              width: 4px;
              height: 4px;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .operate-song-wrapper {
      padding-left: 30px;

      .prev-song,
      .next-song,
      .play-stop-song {
        margin-right: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        .icon {
          color: white;
        }
      }

      .prev-song,
      .next-song {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }

      .play-stop-song {
        box-sizing: border-box;
        width: 36px;
        height: 36px;
        font-size: 18px;
        &.hack{ // 看起来不居中 调整一下
          padding-left: 3px;
        }
      }
    }

    .process-wrapper {
      flex: 1;

      .current {
        margin-right: 14px;
        font-size: 13px;
      }
      .line-wrapper{
        flex: 1;
      }
      .total {
        margin-left: 14px;
        font-size: 13px;
      }
    }

    .volume-wrapper {
      padding: 15px;
      position: relative;
      .icon{
        margin-right: 10px;
        color: rgb(102,102,102);
      }
      .line-wrapper{
        width: 95px;
      }
    }

    .operate-wrapper{
      .icon{
        margin-right: 10px;
        color: rgb(102,102,102);
      }
    }
  }
</style>
