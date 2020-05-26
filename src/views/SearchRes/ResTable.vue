<template>
  <ul id="res-table">
    <li class="table-head">
      <div class="table-title sequence"></div>
      <div class="table-title operate">操作</div>
      <div class="table-title title">音乐标题</div>
      <div class="table-title singer">歌手</div>
      <div class="table-title album">专辑</div>
      <div class="table-title duration">时长</div>
      <div class="table-title hot">热度</div>
    </li>
    <li
      class="res-item"
      v-for="(song, index) in songs"
      :key="song.id"
      @dblclick="dblclickHandler(song.id)"
    >
      <div class="item-content sequence">{{paddingZero(index + 1)}}</div>
      <div class="item-content operate">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xin1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
      </div>
      <div class="item-content title">{{song.name}}</div>
      <div class="item-content singer">{{getArtistsName(song.artists)}}</div>
      <div class="item-content album">{{song.album.name}}</div>
      <div class="item-content duration">{{getDuration(song.duration)}}</div>
      <div class="item-content hot"></div>
    </li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ResTable',
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentSong'
    ]),
    dblclickHandler (id) {
      this.axios.get('/song/url', {
        params: {
          id
        }
      })
        .then(res => {
          this.setCurrentSong(res.data[0])
        })
    },
    paddingZero (index) {
      return index > 9 ? `${index}` : `0${index}`
    },
    getArtistsName (artists) {
      return artists.map(artist => artist.name).join('/')
    },
    getDuration (duration) {
      duration = duration / 1000 | 0
      const minute = duration / 60 | 0
      const second = duration % 60
      return `${this.paddingZero(minute)}:${this.paddingZero(second)}`
    }
  }
}
</script>

<style scoped lang="less">
  @import url(../../css/func);
  #res-table{
    .table-head{
      font-size: 0;
      border-top: 1px solid rgb(225,225,226);
      border-bottom: 1px solid rgb(225,225,226);
    }
    .table-title,
    .item-content{
      box-sizing: border-box;
      padding: 7px;
      display: inline-block;
      font-size: 12px;
      color: rgb(102,102,102);
      &.sequence,
      &.operate,
      &.title,
      &.singer,
      &.album,
      &.duration,
      &.hot{
        .ellipse
      }
      .icon{
        margin-left: 5px;
        font-size: 14px;
        color: rgb(172,172,173);
      }
    }
    .table-title{
      border-right: 1px solid rgb(225,225,226);
    }
    .sequence{
      width: 52px;
      text-align: right;
      color: rgb(172,172,173);
      border: none !important;
    }
    .operate{
      width: 58px;
      border-left: 1px solid rgb(225,225,226);
      &.item-content{
        border: none;
      }
    }
    .res-item{
      &:nth-of-type(2n+1){
        background: rgb(245,245,247);
      }
      &:hover{
        background: rgb(235,236,237);
      }
    }
    .title{
      width: 27%;
    }
    .singer{
      width: 15%;
    }
    .album{
      width: 19.40%;
    }
    .duration{
      width: 8.8%;
    }
    .hot{
      border: none !important;
    }
  }
</style>
