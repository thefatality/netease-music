<template>
  <ul id="search-res-nav">
    <li class="nav-item active">单曲</li>
    <li class="nav-item">歌手</li>
    <li class="nav-item">专辑</li>
    <li class="nav-item">视频</li>
    <li class="nav-item">歌单</li>
    <li class="nav-item">歌词</li>
    <li class="nav-item">主播电台</li>
    <li class="nav-item">用户</li>
  </ul>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped lang="less">
  #search-res-nav{
    text-align: center;
    .nav-item{
      margin: 0 25px;
      padding: 7px 3px;
      display: inline-block;
      color: rgb(51,51,51);
      font-size: 15px;
      cursor: pointer;
      &.active{
        border-bottom: 4px solid;
      }
    }
  }
</style>
