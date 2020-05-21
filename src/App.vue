<template>
  <div id="app">
    <title-bar></title-bar>
    <div class="main-content">
      <div class="side">
        <menu-list></menu-list>
      </div>
      <router-view/>
    </div>
    <play-bar></play-bar>
  </div>
</template>

<script lang="js">
import TitleBar from './components/TitleBar'
import PlayBar from './components/PlayBar'
import MenuList from './components/MenuList'
export default {
  name: 'App',
  components: {
    TitleBar,
    PlayBar,
    MenuList
  }
}
</script>

<style lang="less">
  #app{
    .main-content{
      height: calc(100vh - 100px); // TitleBar PlayBar的高度都为50px
      .side{
        height: 100%;
      }
    }
  }
</style>
