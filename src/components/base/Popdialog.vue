<template>
  <div id="pop-dialog">
    <div class="triangle" :style="{left: `${left}px`}" />
    <slot class="slot" />
  </div>
</template>

<script>
export default {
  name: 'Popdialog',
  props: {
    left: {
      type: Number,
      default: 10
    },
    height: {
      type: Number
    }
  }
}
</script>

<style scoped lang="less">
  #pop-dialog{
    position: relative;
    background: white;
    .triangle{
      position: absolute;
      top: -8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid white;
    }
  }
</style>
