<template>
  <div id="recommend-song-list">
    <list title="推荐歌单" :show-more="true">
      <ul class="song-list">
        <li class="song-item custom">
          <div class="date">
            <p class="week">{{week}}</p>
            <p class="month">{{month}}</p>
          </div>
          <p class="song-list-name">每日歌曲推荐</p>
          <div class="copy-writer">
            <p class="copy-writer-text">
              根据您的音乐口味生成每日更新
            </p>
          </div>
        </li>
        <li
          class="song-item"
          v-for="song in songList"
          :key="song.id"
          :style="{backgroundImage: `url(${song.picUrl})`}"
        >
          <p class="play-count"></p>
          <p class="song-list-name">{{song.name}}</p>
          <div class="copy-writer">
            <p class="copy-writer-text">
              {{song.copywriter}}
            </p>
          </div>
          <div class="play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-erji"></use>
            </svg>
            {{song.playCount}}
          </div>
        </li>
      </ul>
    </list>
  </div>
</template>

<script>
import List from '../../components/app/List'

export default {
  name: 'RecommendSongList',
  data () {
    return {
      songList: [],
      week: '星期日',
      month: 24
    }
  },
  mounted () {
    this.getSongList()
  },
  methods: {
    getSongList () {
      this.axios.get('/personalized?limit=9')
        .then(res => {
          this.songList = res.result
        })
        .catch(err => {
          console.warn(err)
        })
    }
  },
  components: {
    List
  }
}
</script>

<style scoped lang="less">
  #recommend-song-list {
    .song-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .song-item {
        position: relative;
        overflow: hidden;
        margin-bottom: 25px;
        padding-top: 140px;
        width: 140px;
        background-size: 140px;
        background-repeat: no-repeat;
        cursor: pointer;
        &.custom{
          padding-top: 0;
          .date{
            padding-top: 15px;
            box-sizing: border-box;
            width: 140px;
            height: 140px;
            border: 1px solid rgb(229,229,229);
            .week{
              text-align: center;
              color: rgb(102,102,102);
            }
            .month{
              margin-top: 10px;
              text-align: center;
              font-size: 80px;
              font-weight: 500;
            }
          }
        }
        &:hover{
          .copy-writer{
            top: 0;
          }
          .play{
            display: none;
          }
        }
        .song-list-name{
          margin-top: 4px;
          line-height: 20px;
          font-size: 13px;
        }
        .copy-writer {
          padding: 10px;
          position: absolute;
          top: -52px;
          left: 0;
          right: 0;
          line-height: 16px;
          font-size: 12px;
          color: white;
          background: rgba(0, 0, 0, .3);
          transition: top .15s linear .3s;

          .copy-writer-text {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
        }
        .play{
          padding: 5px;
          position: absolute;
          right: 0;
          top: 0;
          color: white;
          font-size: 12px;
          background: rgba(0, 0, 0, .3);
        }
      }
    }
  }
</style>
