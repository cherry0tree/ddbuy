<template>
<div class="wrapper">
  <div class="searchBox">
    <span class="searchPrompt">输入商品名称</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchHead'
}
</script>
<style scoped>
.wrapper{
  padding: 0.5rem 0.625rem;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: solid 1px #e6e6e6;
}
.searchBox{
  display: block;
  padding: 0 0.875rem 0 1.75rem;
  border-radius: 1.75rem;
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: 0.875rem;
  background: #f2f2f2;  
}
.searchPrompt {
  color: #b5b5b5;
}
</style>