<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: true, //支持上拉加载更多
      click: true
    })
    //监听当前滚动位置，返回scroll事件与当前滚动的坐标
    if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
        })
    }
    //上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })    
  },
  methods: {
    //default time 500ms
    scrollTo(x, y, time=500) {
      this.scroll.scrollTo(x, y, time)
    },
    //继续多次上拉后显示上拉加载更多
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    //刷新重新获取高度
    refresh() {
      console.log('after debounce refresh count')
      this.scroll.refresh()
    }
  }
}
</script>
<style scoped>

</style>