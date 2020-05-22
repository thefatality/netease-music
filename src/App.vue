<template>
  <div id="app" :class="theme">
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
import TitleBar from './components/app/TitleBar'
import PlayBar from './components/app/PlayBar'
import MenuList from './components/app/MenuList'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    TitleBar,
    PlayBar,
    MenuList
  },
  computed: {
    ...mapState([
      'theme'
    ])
  }
}
</script>

<style lang="less">
  #app{
    .main-content{
      display: flex;
      height: calc(100vh - 100px); // TitleBar PlayBar的高度都为50px
      background: rgb(250, 250, 250);
      .side{
        height: 100%;
      }
    }
  }
</style>
