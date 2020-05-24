<template>
  <div id="list">
    <header class="header">
      <h3 class="title">{{title}}</h3>
      <p v-if="showMore" class="more">更多></p>
    </header>
    <section class="content">
      <slot/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    title: {
      type: String,
      default: ''
    },
    showMore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
  #list {
    .header{
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(225,225,225);

      .title {
        display: inline-block;
        font-size: 18px;
        color: rgb(51, 51, 51);
      }
      .more {
        margin-top: 3px;
        float: right;
        font-size: 13px;
        color: rgb(102, 102, 102);
      }
    }
  }
</style>
