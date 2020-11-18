<template>
<div class="Home">
  <div class="head">
    <Header></Header>
    <Swiper :data_list="data_list"></Swiper>
    <Tip :home_ad="home_ad"></Tip>
  </div>
  <Navigation :nav_list="nav_list"></Navigation>
  <!-- 跳转到会员界面 -->
  <VipTip></VipTip>
  <!-- 限时抢购 -->
  <FlashBuy :flash_sale_product_list="flash_sale_product_list"></FlashBuy>
  <!-- 特色专区 -->
  <SpecialZone :specialZone="specialZone"></SpecialZone>
  <!--TabbarItem 商品 -->
  <TabbarGoodsItem :tabbar_all_product_list="tabbar_all_product_list"
                   :flash_sale_product_list="flash_sale_product_list"></TabbarGoodsItem>
  <!-- 最底部 -->
  <van-divider>我是有底线的</van-divider>

</div>
</template>

<script type="text/javascript">
import Header from './components/Header'
import Swiper from './components/Swiper'
import Tip from './components/Tip'
import Navigation from './components/Navigation'
import VipTip from './components/VipTip'
import FlashBuy from './components/flash/FlashBuy'
import SpecialZone from './components/SpecialZone'
import TabbarGoodsItem from './components/TabbarGoodsItem'
//请求数据
import { getHomeData } from '../../network/index'

export default {
  name: 'Home',
  components: {
    Header,
    Swiper,
    Tip,
    Navigation,
    VipTip,
    FlashBuy,
    SpecialZone,
    TabbarGoodsItem
  },
  created() {
    // 数据初始化,加载数据
    this._initData()
  },
  data (){
    return {
      data_list: [], // 首页轮播图数据
      home_ad: '', // 首页广告
      nav_list: [], //导航数据
      flash_sale_product_list: [], // 限时抢购
      tabbar_all_product_list: [],
      specialZone: {} // 特色专区数据
    }
  },
  methods: {
    async _initData () {
      const response = await getHomeData()
      console.log(response.data)
      if (response.success) {
         const data = response.data
         this.data_list = data.list[0].icon_list
         this.home_ad = data.home_ad.image_url
         this.nav_list = data.list[2].icon_list
         // 给限时抢购赋值
         this.flash_sale_product_list = data.list[3].product_list
         // 给Tabbar 商品列表赋值
         this.tabbar_all_product_list = data.list[12].product_list
         // 给特色专区赋值
         this.specialZone = data.special_zone         
      }
    }
  }
}
</script>
<style lang="less" scoped>
.Home{
  background-color: "#f5f5f5";
  padding-bottom: 3rem;
  .head {
    margin-top: -3rem;
    width: 100%;
    background-image: url("http://518taole.7-orange.cn/backImage.png");
  }
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>