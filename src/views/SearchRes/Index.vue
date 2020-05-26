<template>
  <div id="search-res">
    <p class="key-word">
      搜索“<span class="blue">{{keyword}}</span>”，共找到{{songCount}}首单曲
    </p>
    <search-res-nav />
    <res-table :songs="songs" />
  </div>
</template>

<script>
import SearchResNav from './Nav'
import ResTable from './ResTable'
export default {
  name: 'Index',
  data () {
    return {
      songs: [],
      songCount: 0,
      keyword: ''
    }
  },
  mounted () {
    this.keyword = this.$route.query.keyword
    this._getSearchRes()
  },
  methods: {
    _getSearchRes () {
      this.axios.get(`/search?keywords=${this.keyword}&limit=100`)
        .then(res => {
          this.songs = res.result.songs
          this.songCount = res.result.songCount
        })
    }
  },
  watch: {
    $route () {
      this.keyword = this.$route.query.keyword
      this._getSearchRes()
    }
  },
  components: {
    SearchResNav,
    ResTable
  }
}
</script>

<style scoped lang="less">
  #search-res{
    .key-word{
      margin: 30px;
      font-size: 14px;
      .blue{
        color: rgb(12,115,194);
      }
    }
  }
</style>
