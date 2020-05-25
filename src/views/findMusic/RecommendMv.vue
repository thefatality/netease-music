<template>
  <div id="recommend-mv">
    <list title="推荐MV" :show-more="true">
      <ul class="mv-list">
        <li
          class="mv-item"
          v-for="mv in mvs"
          :style="{backgroundImage: `url(${mv.picUrl})`}"
          :key="mv.id"
        >
          <p class="name">{{mv.name}}</p>
          <p class="artist-name">{{getArtists(mv.artists)}}</p>
          <p class="play-count">
            <svg class="icon camera" aria-hidden="true">
              <use xlink:href="#icon-18"></use>
            </svg>
            {{getPlayCount(mv.playCount)}}
          </p>
          <p class="copy-writer">{{mv.copywriter}}</p>
        </li>
      </ul>
    </list>
  </div>
</template>

<script>
import List from '../../components/app/List'

export default {
  name: 'RecommendMv',
  data () {
    return {
      mvs: []
    }
  },
  mounted () {
    this._getRecommendMv()
  },
  components: {
    List
  },
  methods: {
    getArtists (artists) {
      return artists.map(artist => artist.name).join('/')
    },
    getPlayCount (count) {
      if (count >= 100000) {
        return `${(count / 10000) | 0}万`
      }
      return count
    },
    _getRecommendMv () {
      this.axios.get('/personalized/mv')
        .then(res => {
          this.mvs = res.result.slice(0, 3)
        })
    }
  }
}
</script>

<style scoped lang="less">
  #recommend-mv {
    .mv-list {
      display: flex;
      justify-content: space-between;

      .mv-item {
        overflow: hidden;
        position: relative;
        padding-top: 136px;
        width: 243px;
        background-size: 243px 136px;
        background-repeat: no-repeat;
        line-height: 18px;

        &:hover{
          .copy-writer{
            top: 0;
          }
          .play-count{
            display: none;
          }
        }

        .name {
          margin-top: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 13px;
        }

        .artist-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          color: rgb(102, 102, 102);
        }

        .play-count{
          position: absolute;
          top: 0;
          right: 0;
          padding: 3px;
          font-size: 13px;
          color: white;
          background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.3));
          .camera{
            margin-right: 3px;
            font-size: 17px;
          }
        }

        .copy-writer{
          position: absolute;
          padding: 8px;
          top: -52px;
          left: 0;
          right: 0;
          font-size: 12px;
          color: white;
          background: rgba(0,0,0,.3);
          transition: top linear .3s .3s;
        }
      }
    }
  }
</style>
