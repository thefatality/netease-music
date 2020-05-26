<template>
  <div id="find-music">
    <find-music-nav />
    <find-music-banner class="banner-wrapper" />
    <recommend-song-list class="recommend-song-list" />
    <private-content class="private-content" />
    <new-song class="new-song" />
    <recommend-mv class="recommend-mv" />
  </div>
</template>

<script>
import FindMusicNav from './Nav'
import FindMusicBanner from './Banner'
import RecommendSongList from './RecommendSongList'
import PrivateContent from './PrivateContent'
import NewSong from './NewSong'
import RecommendMv from './RecommendMv'
export default {
  name: 'FindMusic',
  components: {
    FindMusicNav,
    FindMusicBanner,
    RecommendSongList,
    PrivateContent,
    NewSong,
    RecommendMv
  }
}
</script>

<style scoped lang="less">
  #find-music {
    margin: 0 auto;
    width: 762px;
    .banner-wrapper{
      margin: 20px 0;
    }
    .private-content,
    .new-song,
    .recommend-mv{
      margin-top: 40px;
    }
  }
</style>
