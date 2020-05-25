<template>
  <div id="new-song">
    <list title="最新音乐" :show-more="true">
      <ul class="song-list">
        <li
          class="song-item"
          :class="{bg: hasBg(index), border: hasBorder(index)}"
          v-for="(song, index) in newSong"
          :key="song.id"
        >
          <p class="sequence">{{getSequence(index)}}</p>
          <div class="pic" :style="{backgroundImage: `url(${song.picUrl})`}"></div>
          <div class="info">
            <p class="name">
              {{song.name}}
              <span v-if="song.song.alias && song.song.alias.length" class="alias">
                ({{getAlias(song.song.alias)}})
              </span>
              <span v-if="song.song.transName" class="alias">
                ({{song.song.transName}})
              </span>
            </p>
            <div class="artists">{{getArtists(song.song.artists)}}</div>
          </div>
        </li>
      </ul>
    </list>
  </div>
</template>

<script>
import List from '../../components/app/List'

export default {
  name: 'NewSong',
  data () {
    return {
      newSong: []
    }
  },
  mounted () {
    this._getNewSong()
  },
  methods: {
    getArtists (artists) {
      return artists.map(artist => artist.name).join('/')
    },
    getSequence (index) {
      return (index + 1) > 9 ? `${index + 1}` : `0${index + 1}`
    },
    getAlias (alias) {
      return alias.join('，')
    },
    hasBg (index) {
      return [1, 3, 6, 8].includes(index)
    },
    hasBorder (index) {
      return index < 5
    },
    _getNewSong () {
      this.axios.get('/personalized/newsong')
        .then(res => {
          this.newSong = res.result
        })
    }
  },
  components: {
    List
  }
}
</script>

<style scoped lang="less">
  #new-song {
    .song-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 320px;
      border: 1px solid rgb(237, 237, 237);
      .song-item {
        box-sizing: border-box;
        padding: 12px;
        width: 50%;
        display: flex;
        align-items: center;
        &.border{
          border-right: 1px solid rgb(237, 237, 237);
        }
        &.bg{
          background: rgb(245, 245, 247);
        }
        &:hover{
          background: rgb(235, 236, 237);
        }

        .sequence {
          padding-right: 15px;
          font-size: 13px;
          color: rgb(165, 153, 177);
        }

        .pic {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-size: contain;
        }

        .info {
          padding-left: 10px;
          flex: 1;
          font-size: 12px;

          .name {
            color: rgb(51, 51, 51);
            .alias{
              color: rgb(150, 136, 164);
            }
          }

          .artists {
            margin-top: 10px;
            cursor: pointer;
            color: rgb(150, 136, 164);
            &:hover{
              color: rgb(51, 51, 51);
            }
          }
        }
      }
    }
  }
</style>
