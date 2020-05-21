<template>
  <div id="app">
    <title-bar></title-bar>
    <router-view/>
    <play-bar></play-bar>
  </div>
</template>

<script lang="js">
import TitleBar from './components/TitleBar'
import PlayBar from './components/PlayBar'
export default {
  name: 'App',
  components: {
    TitleBar,
    PlayBar
  }
}
</script>

<style lang="less">
</style>
