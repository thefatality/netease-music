<template>
  <div id="app" class="sky-blue">
    <title-bar class="title-bar"></title-bar>
    <div class="side">
      <menu-list></menu-list>
    </div>
    <div class="main-content">
      <router-view />
    </div>
    <play-bar class="play-bar"></play-bar>
  </div>
</template>

<script lang="js">
import TitleBar from './components/app/TitleBar'
import PlayBar from './components/app/PlayBar'
import MenuList from './components/app/MenuList'
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
    .title-bar{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
    }
    .side{
      position: fixed;
      left: 0;
      top: 50px;
      bottom: 50px;
    }
    .main-content{
      position: fixed;
      top: 50px;
      bottom: 50px;
      left: 200px;
      right: 0;
      overflow-y: scroll;
      background: rgb(250, 250, 250);
    }
    .play-bar{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
