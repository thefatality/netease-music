<template>
  <div id="app">
    <title-bar></title-bar>
    <router-view/>
    <foot-bar></foot-bar>
  </div>
</template>

<script lang="js">
import TitleBar from './components/TitleBar'
import FootBar from './components/FootBar'
export default {
  name: 'App',
  components: {
    TitleBar,
    FootBar
  }
}
</script>

<style lang="less">
</style>
