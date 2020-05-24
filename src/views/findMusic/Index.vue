<template>
  <div id="find-music">
    <find-music-nav />
    <find-music-banner
      :banners="banners"
      @banner="bannerClickHandler"
      class="banner-wrapper"
    />
    <recommend-song-list class="recommend-song-list" />
  </div>
</template>

<script>
import FindMusicNav from './Nav'
import FindMusicBanner from './Banner'
import RecommendSongList from './RecommendSongList'
import { mapMutations } from 'vuex'
export default {
  name: 'FindMusic',
  mounted () {
    this._getBanners()
  },
  data () {
    return {
      banners: []
    }
  },
  components: {
    FindMusicNav,
    FindMusicBanner,
    RecommendSongList
  },
  methods: {
    bannerClickHandler (targetId) {
      if (targetId === 0) {
        return
      }
      this._getSongUrl(targetId)
        .then(res => {
          const song = res.data[0]
          this.setCurrentSong(song)
        })
    },
    ...mapMutations([
      'setCurrentSong'
    ]),
    _getBanners () {
      this.axios.get('/banner?type=0')
        .then((res) => {
          this.banners = res.banners
        })
        .catch((err) => {
          console.log(err)
        })
    },
    _getSongUrl (targetId) {
      return this.axios.get(`/song/url?id=${targetId}`)
    }
  }
}
</script>

<style scoped lang="less">
  #find-music {
    margin: 0 auto;
    box-sizing: border-box;
    width: 742px;
    height: 100%;
    .banner-wrapper{
      margin-top: 20px;
    }
    .recommend-song-list{
      margin-top: 30px;
    }
  }
</style>
