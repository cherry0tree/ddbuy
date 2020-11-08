<template>
<div class="wrapper">
  <div class="searchBox"
       @click="clickSearch">
    <div class="iconSearchWrapper">
      <svg-icon iconClass="search"
          class="icon" />
    </div>
    <span class="searchPrompt">搜索菜谱</span>
    <div class="collection">
       <!-- 收藏 -->
       <svg-icon iconClass="collection"></svg-icon>
    </div>
  </div>
  <div class="todayMenu">今日菜单</div>
</div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Search',
  methods: {
    clickSearch() {
      Toast({
        message: '暂未实现',
        duration: 800
      })
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  position: fixed;
  background: #fff;
  padding: 0.5rem 0.625rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .searchBox {
    display: block;
    right: 2rem;
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: 0.875rem;
    width: 80%;
    background: #f2f2f2;
    border-radius: 1.75rem;
    .iconSearchWrapper{
      position: absolute;
      left: 0.9375rem;
      top: 0.75rem;
      width: 1.25rem;
      height: 1.25rem;
      .icon{
        fill: #999;
        width: 1rem;
        height: 1rem;
      }
    }
    .searchPrompt{
      padding: 0 0 0 2rem;
      color: #b5b5b5;
    }
  }
  .collection{
    position: absolute;
    top: 0.6rem;
    right: 1.5rem;
    width: 2.5em;
    height: 2rem;
  }
  .todayMenu{
    margin-top: 0.9rem;
    padding-left: 0.4rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-left: 0.25rem solid #75a342;
    font-size: 0.6728rem;
    font-weight: 2000;
  }

}
</style>