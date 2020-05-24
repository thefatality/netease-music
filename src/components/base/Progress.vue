<template>
  <div class="line-wrapper"
    @mousemove="mousemoveHandler"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
  >
    <div class="total-line" ref="processLine">
      <div class="current-line" ref="songProcess">
        <div class="line-btn">
          <div class="inside"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Process',
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    draggable: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.offsetLeft = this.$refs.processLine.offsetLeft
    this.totalWidth = this.$refs.processLine.offsetWidth
    window.addEventListener('resize', () => {
      this.offsetLeft = this.$refs.processLine.offsetLeft
      this.totalWidth = this.$refs.processLine.offsetWidth
    })
    this._initStyle()
  },
  methods: {
    mousedownHandler (e) {
      if (!this.draggable) {
        return
      }
      this.mousedown = true
      this.startPos = e.pageX
      this.$emit('down')
    },
    mousemoveHandler (e) {
      if (!this.mousedown) {
        return
      }
      const offset = e.pageX - this.offsetLeft
      if (offset >= 0 && offset <= this.totalWidth) {
        this.setStyleWidth(offset / this.totalWidth)
        this.$emit('move', offset / this.totalWidth)
      }
    },
    mouseupHandler (e) {
      if (!this.draggable) {
        return
      }
      this.mousedown = false
      this.$emit('up')
    },
    setStyleWidth (width) {
      if (typeof width !== 'number' || width > 1 || width < 0) {
        console.warn('参数必须为百分比')
        return
      }
      width = `${width * 100}%`
      this.$refs.songProcess.style.width = width
    },
    _initStyle () {
      if (this.current === 0) {
        return
      }
      const l = this.current / this.total
      if (isNaN(l) || l > 1 || l < 0) {
        return
      }
      this.setStyleWidth(l)
    }
  }
}
</script>

<style scoped lang="less">
  .line-wrapper{
    height: 100%;
    .total-line {
      width: 100%;
      height: 4px;
      background: rgb(194, 194, 196);
      border-radius: 2px;
      cursor: pointer;
      .current-line{
        position: relative;
        width: 1px;
        height: 100%;
        border-radius: 2px;
        .line-btn{
          position: absolute;
          top: -6px;
          right: -6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid rgb(198, 198, 198);
          background: #fff;
          text-align: center;
          .inside{
            display: inline-block;
            vertical-align: 5px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
