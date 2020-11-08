<template>
<div class="wrapper"
     :style="showBgColor?'background-color: white;':''">
  <div class="locationWrapper">
    <!-- 地址图标 -->
    <svg viewBox="0 0 30 30"
          class="icon iconLocation">
      <path fill="#FFFFFF"
            fill-rule="evenodd"
            d="M14.521 30.445c.817.738 2.142.75 2.958 0 0 0 11.521-9.82 11.521-17.158C29 5.95 23.18 0 16 0S3 5.949 3 13.287c0 7.339 11.521 17.158 11.521 17.158zM16 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path>
    </svg>    
    <!-- 跳转到地图界面 -->
    <router-link to="/dashboard/map"
                 tag="span"
                 class="address">
      请选择位置
    </router-link>
  </div>
  <!-- 搜索框 -->
  <div class="searchWrapper">
    <div class="searchContent">
      <!-- 搜索图标 -->
      <div class="iconSearchWrapper">
        <svg viewBox="0 0 32 32"
              class="icon iconSearch">
          <path fill="#999"
                fill-rule="evenodd"
                d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z"></path>
        </svg>
      </div>
      <!-- 内容 -->
      <span class="searchPrompt">输入商品名称</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showBgColor: false
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  height: 3.125rem;
  line-height: 3.125rem;
  width: 100%;
  box-sizing: border-box;
  border-top: solid 1px #eeeeee;
  color: white;  
}
// 地址框
.locationWrapper{
  flex: 0, 0, 20rem;
  margin-top: 0.6rem;
  height: 1.875rem;
  line-height: 1.875rem;
  opacity: 0.6;
  background-color: black;
  border-radius: 3.125rem;
  max-width: 55%;
  min-width: 23%;
  white-space: nowrap;
}
.icon {
  fill: #999;
  width: 1rem;
  height: 1rem;
}
.iconLocation {
  position: absolute;
  left: 0.3rem;
  top: 1.0625rem;
  width: 1.875rem;
  height: 1rem;
  vertical-align: middle;
}
.iconSearch {
  margin-top: 0.3125rem;
  width: 1.25rem;
  height: 1.25rem;
}
.iconSearchWrapper {
  display: inline-block;
  width: 1.25rem;
  height: 100%;
  vertical-align: middle;
}
.locationWrapper .address {
  padding-left: 1.7rem;
  display: inline-block;
  font-size: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 70%;
  min-width: 20%;
  vertical-align: middle;
  color: white;
}
.searchWrapper{
  flex: 1;
  top: 0.625rem;
  height: 3.125rem;
  line-height: 3.125rem;
}
.searchContent{
  margin-top: 0.625rem;
  flex: 1;
  margin-right: 2%;
  margin-left: 2%;
  border-radius: 3.125rem;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;
  background: #f2f2f2;
  vertical-align: middle;
}
.searchPrompt{
  display: inline-block;
  vertical-align: top;
  margin-left: 0.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #999999;  
}
</style>