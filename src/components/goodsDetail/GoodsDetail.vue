<template>
<div class="wrapper">
  <van-nav-bar :title="'商品详情'"
               :fixed=true
               left-arrow
               @click-left="onClickLeft">
  </van-nav-bar>
  <div class="goodsDetailWrapper">
    <!-- 商品图 -->
    <div class="goodsImage">
      <img :src="goodsInfo.small_image" alt="">
    </div>
    <!-- 商品名称 -->
    <div class="productInfo">
      <div class="title">{{goodsInfo.name}}</div>
      <div class="subTitle">{{goodsInfo.spec}}</div>
      <span class="originPrice">{{goodsInfo.origin_price | moneyFormat}}</span>
      <span class="price">{{goodsInfo.price}}</span>
      <span class="totalSales">已售:{{goodsInfo.total_sales}}</span>
      <van-divider />
      <div class="shippingInfo">
        <van-icon name="cluster-o" />
        此商品按500g/份计价,如实收少于500g将退还差价
      </div>
      <div class="shippingInfo">
        <van-icon name="clock-o" />
        最快29分钟内送达
      </div> 
    </div>
    <div class="showGoods">
      <img :src="goodsImage" alt="">
    </div>
    <!-- 底部商品导航    -->
    <van-goods-action :safe-area-inset-bottom=true
                      style="z-index:100">
      <van-goods-action-icon icon="cart-o"
                             :info="goodsNum"
                             @click="onClickCar" />
      <van-goods-action-button type="warning"
                               :text="'添加到购物车'"
                               @click="onClickAddToCar" />
    </van-goods-action>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'GoodsDetail',
  data() {
    return {
      goodsInfo: this.$route.query,
      goodsImage: 'https:\/\/img.ddimg.mobi\/3f280ff77ab3d1571213379189.jpg?width=750&height=1869'
    }
  },
  computed: {
    ...mapState(['shopCart']),
    // 购物车商品数量
    goodsNum() {
      let num = 0;
      Object.values(this.shopCart).forEach((goods, index) => {
        num += goods.num;
      });
      if (num > 0) {
        return num
      }
    }
  },
  methods: {
    ...mapMutations(['addCart']),
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickCar() {
      this.$router.push({ name: 'cart' });
    },
    onClickAddToCar() {
      this.addCart(this.goodsInfo);
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  background-color: #f5f5f5;
  .goodsDetailWrapper{
    overflow: hidden;
    margin-top: 2rem;
    .goodsImage{
      width: 100%;
      img{
        width: 100%;
        height: 80%;        
      }
    }
    .productInfo{
      background-color: white;
      padding: 0.5rem;
      .title{
        color: black;
        font-size: 0.8rem;        
      }
      .subTitle {
        padding: 0.5rem 0;
        color: grey;
        font-size: 0.6rem;
      }
      .originPrice {
        color: #e25450;
        padding-right: 0.5rem;
        font-size: 0.8rem;
      }
      .price {
        color: grey;
        font-size: 0.5rem;
        text-decoration: line-through;
      }                  
      .totalSales {
        float: right;
        color: #e25450;
        font-size: 0.8rem;
      }
      .shippingInfo {
        font-size: 0.6rem;
        height: 0.8rem;
        color: grey;
      }
      .showGoods {
        width: 100%;
        img {
          width: 100%;
        }
      }      
    }
  }
}
</style>