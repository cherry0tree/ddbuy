<template>
<div class="Cart">
  <!-- 购物车头部 -->
  <header class="titleWrapper">
    <h4><strong>购物车</strong></h4>
  </header>
  <div class="cartWrapper">
    <!-- 购物车为空 -->
    <div class="emptyCart"
         v-show="!isShowEmptyCart">
      <img src="./../../assets/images/dashboard/cart/empty.png" alt="">
      <div class="title">购物车空空滴</div>
      <router-link to="/dashboard/home"
                   class="goHome">去逛逛</router-link>
    </div>
    <!-- 购物车有数据 -->
    <div class="contentWrapper"
         v-show="isShowEmptyCart">
      <div class="contentWrapperList"
           v-for="(item,index) in shopCart"
           :key="index">
        <div class="left">
          <a href="javaScript:;"
             class="cartCheckBox"
             :checked="item.checked"
             @click.stop="single(item.id)"></a>
        </div>
        <div class="center">
          <img :src="item.smallImage">
        </div>
        <div class="right">
          <a>{{item.name}}</a>
          <div class="bottomContent">
            <p class="shopPrice">{{item.price | moneyFormat}}</p>
            <div class="shopDeal">
              <span @click="reduceItems(item.id, item.num)">-</span>
              <input type="number"
                     disabled
                     v-model="item.num">
              <span @click="addItems(item.id)">+</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <van-submit-bar class="submitBarStyle"
                      :price="totalPrice"
                      :button-text="submitBarText"
                      :disabled="!(selectedGoodNum>0)"
                      v-show="isShowEmptyCart"
                      @submit="onSubmit"
                      >
        <van-checkbox 
                      v-model="isCheckedAll"
                      checked-color='#45c763'>全选</van-checkbox>
      </van-submit-bar>      
    </div>
    <!-- 猜你喜欢 -->
    <van-divider :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }">
      猜你喜欢
    </van-divider>  
    <ProduceItem :product_lists="youLike_product_lists"></ProduceItem>    
  </div>
</div>
</template>

<script>
import {Dialog, Toast} from 'vant'
import { getGuessYouLike } from './../../network/index'
import ProduceItem from './../home/components/ProduceItem'
// 引入Vuex
import { mapState, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'Cart',
  components: {
    ProduceItem
  },
  created() {
    this._initData()
  },
  data(){
    return {
      youLike_product_lists: []
    }
  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters({
      totalPrice: 'SELECTED_GOODS_PRICE',
      selectedGoodNum: 'SELECTED_GOODS_COUNT'
    }),
    isShowEmptyCart() {
      let isshow = false;
      console.log(Object.keys(this.shopCart).length)
      if(Object.keys(this.shopCart).length > 0) {
        isshow = true;
      }     
      return isshow;
     },
     submitBarText() {
       const count = this.selectedGoodNum;
       return '结算' + (count ? `(${count})` : ``);
     },
     //是否全部选中
     isCheckedAll() {

     }
  },
  methods: {
    // 延展mutations中的方法
    ...mapMutations(['SINGLE_SELECT_GOODS', 'REDUCE_GOODS', 'ADD_GOODS']),
    async _initData() {
      let ref = await getGuessYouLike();
      if (ref.success) {
        this.youLike_product_lists = ref.data.product_list;
      }
    },
    //单个商品的选中和非选中
    single(goodsID){
      this.SINGLE_SELECT_GOODS({ goodsID });
    },
    reduceItems(goodsID, goodsNum) {
      if(goodsNum > 1) {
        this.REDUCE_GOODS({goodsID})
      } else if (goodsNum === 1) {
        Dialog.confirm({
          title: '温馨提示',
          message: '确定删除该商品吗?'
        }).then(() => {
          this.REDUCE_GOODS({ goodsID });
        }).catch(() => {
        });
      }
    },
    addItems(goodsID) {
      this.ADD_GOODS({goodsID})
    },
    onSubmit() {
      // 当选中商品数量大于0跳转
      if(this.selectedGoodNum > 0) {
        this.$router.push('/order');
      }
    }
  }
}
</script>
<style scoped lang="less">
.Cart{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .submitBarStyle{
    margin-bottom: 1.4rem;
  }
  .titleWrapper{
    width: 100%;
    height: 2.6rem;
    background: #fff;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;    
  }
  .cartWrapper{
    width: 100%;
    height: 100rem;
    margin-top: 2.6rem;
  }
  .emptyCart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      padding-top: 2rem;
      width: 50%;
      height: 8rem;
      margin: 0 auto;
    }
    .title{
      text-align: center;
      padding: 0.5rem;
    }
    .goHome{
      margin-top: 2rem;
      color: white;
      background-color: #45c763;
      text-align: center;
      margin: 0 auto;
      padding: 0.5rem;
      width: 5rem;
      height: 1rem;
      line-height: 1rem;
      border-radius: 1rem;
    }
  }
  .contentWrapper{
    padding-top: 0.5rem;
    .contentWrapperList{
      display: flex;
      height: 6rem;
      border-bottom: 0.01rem solid #e0e0e0;
      margin-bottom: 0.7rem;
      padding: 0.5rem 0;
      justify-content: center;
      align-items: center;
      .left{
        flex: 1;
        a{
          display: inline-block;
          margin-top: 0.8rem;
          margin-left: 0.5rem;
        }
        //精灵图
        .cartCheckBox{
          background: url("./../../assets/images/dashboard/cart/shop-icon.png") no-repeat;
          background-size: 2.5rem 5rem;
          width: 1rem;
          height: 1rem;
        }
        .cartCheckBox[checked] {
          background-position: -1.2rem 0;
        }
      }
      .center {
        flex: 3;
        img {
          width: 100%;
          height: 100%;
        }      
      }
      .right {
        flex: 6;
        .bottomContent {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .shopPrice {
            font-size: 1rem;
          }
          .shopDeal span{
            display: inline-block;
            width: 1rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
          }
          .shopDeal input {
            width: 2rem;
            height: 1.2rem;
            text-align: center;
            margin: 0 0.2rem;
            font-size: 0.8rem;
            background-color: #f5f5f5;
            border: 0;     
          }
        }
      }
    }
  }
}
</style>