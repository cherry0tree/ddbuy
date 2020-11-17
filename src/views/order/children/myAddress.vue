<template>
<div class="wrapper">
  <!--导航栏-->
  <van-nav-bar :title="'添加地址'"
               left-arrow
               :fixed=true
               :border=true
               @click-left="onClickLeft">
  </van-nav-bar>
  <!-- 没有数据的占位图 -->
  <div class="noDataPlaceHold"
       v-show="shippingAddress.length < 1">
      <img src="./../../../assets/images/dashboard/order/noAddress.png"
           alt="">
      <span class="desc">还没有添加过地址呢,添加一个吧😄</span>
  </div>
  <!-- 联系人 -->
  <van-address-list v-model="chosenAddressId"
                    :list="shippingAddress"
                    @add="onAdd"
                    @edit="onEdit"
                    @select="onBackAddress"
                    style="margin-top: 3rem"
                    :add-button-text="'添加地址'">
  </van-address-list>

  <transition name="router-slider"
              mode="out-in">
    <router-view></router-view>
  </transition>  
</div>
</template>

<script>
import PubSub from 'pubsub-js'
import {CHOOSE_USER_ADDRESS} from './../../../config/pubsub_type.js'
import { mapState } from 'vuex'
export default {
  name: 'myAddress',
  data() {
    return {
      chosenAddressId: 0,
    }
  },
  computed: {
    ...mapState(['shippingAddress']),
  },
  methods: {
    onClickLeft () {
      this.$router.back();
    },
    onAdd() {
      this.$router.push({ path: '/order/myAddress/addAddress' });
    },
    onEdit(item, index) {
      this.$router.push({ name: 'editAddress', params: {content: item}});
    },
    onBackAddress(item, index) {
      console.log(item)
      PubSub.publish(CHOOSE_USER_ADDRESS, item);
      this.$router.back();
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40%;
      height: 20%;      
    }
    .desc{
      color: grey;
      font-size: 0.6rem;
    }
  }
  
}
</style>