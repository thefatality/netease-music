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
      <span class="current">{{passedTime}}</span>
      <Progress
        :total="songTime"
        :current="currentTime"
        :draggable="!!currentSong.url"
        @down="songProgressDownHandler"
        @move="songProgressMoveHandler"
        @up="songProgressUpHandler"
        ref="songProcess"
      />
      <span class="total">{{totalTime}}</span>
    </div>
    <div class="volume-wrapper">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlianglabashengyin"></use>
      </svg>
      <Progress
        :total="1"
        :current="volume"
        @down="volumeProgressDownHandler"
        @move="volumeProgressMoveHandler"
        @up="volumeProgressUpHandler"
        ref="volumeProcess"
      />
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
      @loadedmetadata="loadedHandler"
      @ended="endedHandler"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Progress from '../base/Progress'

const STATUS_ENUM = {
  STOP: 'stop',
  PLAY: 'play'
}

export default {
  name: 'FootBar',
  data () {
    return {
      STATUS_ENUM,
      currentTime: 0,
      songTime: 0,
      playedTime: 0,
      volume: 0.5,
      status: STATUS_ENUM.STOP
    }
  },
  mounted () {
    this.$refs.audio.volume = this.volume
  },
  computed: {
    ...mapState([
      'currentSong'
    ]),
    passedTime () {
      return this._formatTime(this.playedTime)
    },
    totalTime () {
      return this._formatTime(this.songTime)
    }
  },
  methods: {
    loadedHandler () {
      this.songTime = (this.$refs.audio.duration | 0)
      this.currentTime = 0
      this.playedTime = 0
      this.status = this.STATUS_ENUM.PLAY
    },
    endedHandler () {
      this.status = this.STATUS_ENUM.STOP
      this.playedTime = 0
      this.currentTime = 0
      this.$refs.songProcess.setStyleWidth(0)
    },
    changeStatusHandler () {
      if (!this.$refs.audio.src) {
        return
      }
      this.status = this.status === this.STATUS_ENUM.STOP
        ? this.STATUS_ENUM.PLAY
        : this.STATUS_ENUM.STOP
    },
    songProgressDownHandler () {
      clearInterval(this.timer)
    },
    songProgressMoveHandler (percentage) {
      this.playedTime = percentage * this.songTime | 0
    },
    songProgressUpHandler () {
      this.currentTime = this.playedTime
      this.$refs.audio.currentTime = this.playedTime
      this._setInterval()
    },
    volumeProgressDownHandler () {
    },
    volumeProgressMoveHandler (percentage) {
      this._volume = percentage
      this.$refs.audio.volume = percentage
    },
    volumeProgressUpHandler () {
      this.volume = this._volume
      this.$refs.audio.volume = this.volume
    },
    _formatTime (time) {
      const minute = (time / 60) | 0
      const second = time - minute * 60
      return `${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`
    },
    _setInterval () {
      this.timer = setInterval(() => {
        this.playedTime++
        this.$refs.songProcess.setStyleWidth(this.playedTime / this.songTime)
      }, 1000)
    }
  },
  watch: {
    currentSong () {
      this.status = this.STATUS_ENUM.STOP
      this.playedTime = 0
      this.currentTime = 0
      this.$refs.songProcess.setStyleWidth(0)
    },
    status () {
      const audio = this.$refs.audio
      if (this.status === this.STATUS_ENUM.PLAY) {
        this._setInterval()
        audio.play()
      } else {
        clearInterval(this.timer)
        audio.pause()
      }
    }
  },
  components: {
    Progress
  }
}
</script>

<style scoped lang="less">
  #foot-bar {
    display: flex;
    height: 49px;
    background: rgb(246, 246, 248);
    border-top: 1px solid rgb(225,225,226);

    .operate-song-wrapper,
    .process-wrapper,
    .line-wrapper,
    .volume-wrapper,
    .operate-wrapper {
      display: flex;
      align-items: center;
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
