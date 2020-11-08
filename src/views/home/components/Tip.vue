<template>
<div class="Tip">
  <div class="tipBox">
    <img src="@/assets/images/dashboard/home/Tip/transport.png"
          alt="">
    <span class="tipText">最快20分钟送达</span>
  </div>
  <div class="tipBox">
    <img src="@/assets/images/dashboard/home/Tip/money.png"
          alt="">
    <span class="tipText">15元起送</span>
  </div>
  <div class="tipBox">
    <img src="@/assets/images/dashboard/home/Tip/seal.png"
          alt="">
    <span class="tipText">安心退换</span>     
  </div>

  <img class="adImg" :src="home_ad" alt="">
</div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    home_ad: String
  }
}
</script>
<style scoped lang="less">
.adImg{
  margin-top: 0.8rem;
  width: 100%;
  height: 6rem;
  margin-bottom: -0.2rem;
}
.tipBox{
  float: left;
  width: 33%;
  text-align: center;
  img {
    vertical-align: middle;
    height: 1rem;
    width: 1rem;
    margin-right: 0.2rem; 
  }
}
.tipText {
  font-size: 0.6rem;
  color: #45c763;
}
</style>