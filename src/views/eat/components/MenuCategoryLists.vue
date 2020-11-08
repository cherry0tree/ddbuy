<template>
<div class="wrapper">
 <!-- 使用vue-waterfall2 组件 完成的瀑布流 -->
  <MenuWaterFall></MenuWaterFall>
</div>
</template>

<script>
import MenuWaterFall from './MenuWaterFall'

export default {
  name: 'MenuCategoryLists',
  components:{
    MenuWaterFall
  },
  props: {
    todayMenuCategoryLists: Array
  }
}
</script>
<style scoped>

</style>