<template>
  <div id="private-content">
    <list title="独家放送" :show-more="true">
      <ul class="private-list">
        <li
          class="private-item"
          v-for="privateContent in privates"
          :key="privateContent.id"
          :style="{backgroundImage: `url(${privateContent.sPicUrl})`}"
        >
          <p class="private-name">{{privateContent.name}}</p>
          <svg class="icon camera" aria-hidden="true">
            <use xlink:href="#icon-18"></use>
          </svg>
        </li>
      </ul>
    </list>
  </div>
</template>

<script>
import List from '../../components/app/List'
export default {
  name: 'PrivateContent',
  data () {
    return {
      privates: []
    }
  },
  mounted () {
    this._getPrivate()
  },
  methods: {
    _getPrivate () {
      this.axios.get('/personalized/privatecontent')
        .then(res => {
          this.privates = res.result
        })
    }
  },
  components: {
    List
  }
}
</script>

<style scoped lang="less">
  #private-content{
    .private-list{
      display: flex;
      justify-content: space-between;
      .private-item{
        position: relative;
        padding-top: 136px;
        width: 240px;
        background-size: 240px 136px;
        background-repeat: no-repeat;
        cursor: pointer;
        .private-name{
          margin-top: 3px;
          line-height: 20px;
          font-size: 13px;
          color: rgb(51,51,51);
        }
        .camera{
          box-sizing: border-box;
          position: absolute;
          padding: 4px;
          top: 7px;
          left: 7px;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          border: 1px solid white;
          background: rgba(0,0,0,.3);
        }
      }
    }
  }
</style>
