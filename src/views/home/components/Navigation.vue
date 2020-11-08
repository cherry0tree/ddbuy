<template>
<div class="NavigationWrapper">
  <van-grid :column-num="5"
            :border="false">
    <van-grid-item v-for="(item,index) in nav_list"
                   :key="item.cid"
                   :icon="item.icon_url"
                   :text="item.name">
    </van-grid-item>
  </van-grid>
</div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    nav_list: Array
  }
}
</script>
<style scoped>

</style>