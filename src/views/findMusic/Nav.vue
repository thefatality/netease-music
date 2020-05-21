<template>
  <div id="find-music-nav">
    <ul class="nav-list">
      <li class="nav-item active">个性推荐</li>
      <li class="nav-item">歌单</li>
      <li class="nav-item">主播电台</li>
      <li class="nav-item">排行榜</li>
      <li class="nav-item">歌手</li>
      <li class="nav-item">最新音乐</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped lang="less">
  #find-music-nav{
    .nav-list{
      border-bottom: 1px solid rgb(225,225,226);
      text-align: center;
      font-size: 15px;
      color: rgb(51,51,51);
      .nav-item{
        display: inline-block;
        margin-right: 45px;
        line-height: 45px;
        &.active{
          border-bottom-width: 2px;
          border-bottom-style: solid;
        }
      }
    }
  }
</style>
