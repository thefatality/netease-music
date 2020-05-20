<template>
  <div id="app">
    <title-bar></title-bar>
    <router-view/>
  </div>
</template>

<script lang="js">
import TitleBar from './components/TitleBar'
export default {
  name: 'App',
  components: {
    TitleBar
  }
}
</script>

<style lang="less">
</style>
