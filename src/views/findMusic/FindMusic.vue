<template>
  <div id="find-music">
    <find-music-nav></find-music-nav>
  </div>
</template>

<script>
import FindMusicNav from './Nav'
export default {
  name: 'FindMusic',
  components: {
    FindMusicNav
  }
}
</script>

<style scoped lang="less">
  #find-music {
    padding: 0 30px;
    width: 100%;
    height: 100%;
    background: rgb(250, 250, 250);
  }
</style>
