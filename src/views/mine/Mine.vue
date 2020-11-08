<template>
<div class="wrapper">
  <van-nav-bar :title="'我的'"
               :fixed=true
               :border=false
               style="height:2.5rem"/>
  <van-cell-group style="margin-top:2.4rem">
    <van-cell style="background-color: #3bba63;color:#FFF;"
              label-class="labelClass"
              is-link
              center>
      <template slot="title">
        <!-- 未登录状态 -->
        <div class="personMsg"
             v-if="!userInfo.token">
          <img :src="user_image.noLogin_icon" alt="">
          <div class="personInfo">
            <div @click="goToPage('login')">立即登录</div>
          </div>
        </div>
        <!-- 已登录状态 -->
        <div class="personMsg"
             v-if="userInfo.token">
          <img class="iconImage"
               :src="user_image.login_icon" 
               alt="">
          <div class="personInfo">
            <span>{{userInfo.user_name}}</span>
            <span>手机号码:{{phoneNumber}}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </van-cell-group>
  <!-- 订单相关-->
  <van-cell-group>
    <van-cell :title="'我的订单'"
              icon="label"
              :value="'查看全部订单'"
              is-link
              >
    </van-cell>
    <van-grid :border=false>
      <van-grid-item v-for="(order,index) in orderData"
                     :key="index"
                     :icon="order.icon"
                     :text="order.title" />
    </van-grid>
  </van-cell-group>

  <van-cell-group style="margin-top:0.4rem">
    <van-cell :title="'我的优惠券'"
              icon="gold-coin"
              is-link />
    <van-cell :title="'我的收货地址'"
              icon="todo-list"
              is-link/>
  </van-cell-group>

  <van-cell-group style="margin-top:0.4rem">
    <van-cell is-link
              icon="vip-card">
      <template slot="title">
        <span class="custom-title">我的绿卡</span>
        <van-tag type="danger" :round=true>NEW</van-tag>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group style="margin-top:0.4rem">
    <!-- 联系客服 -->
    <van-cell :title="'联系客服'"
              icon="phone"
              :value="'客服时间 07:00-22:00'"
              is-link />
    <!-- 意见反馈 -->
    <van-cell :title="'意见反馈'"
              icon="comment-circle"
              is-link />
  </van-cell-group>
  <div class="version">当前版本{{version}}</div>
</div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { _VERSION_ } from './../../common/global'
import { mapState } from 'vuex'

export default {
  name: 'Mine',
  computed: {
    ...mapState(['userInfo']),
    phoneNumber(){
      var mobile = String(this.userInfo.phone)
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return mobile.replace(reg, '$1****$2')
    }
  },
  data() {
    return {
      //头像
      user_image: {
        login_icon: require('./../../assets/images/dashboard/mine/defaultImg.jpeg'),
        noLogin_icon: require('./../../assets/images/dashboard/mine/grey.jpg'),
        female: require('./../../assets/images/dashboard/mine/female.png'),
        male: require('./../../assets/images/dashboard/mine/male.png')        
      },
      //订单状态
      orderData: [
        { icon: 'cart-circle-o', title: '待支付' },
        { icon: 'gift-o', title: '待收货' },
        { icon: 'smile-comment-o', title: '待评价' },
        { icon: 'cash-back-record', title: '售后/退款' }
      ],
      //版本信息
      version: _VERSION_
    }
  },
  methods: {
    goToPage(name){
      this.$router.push({ name })
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  width: 100%;
  background-color: #f5f5f5;
  margin-bottom: 3rem;
  .personMsg{
    display: flex;
    align-items: center;
    img{
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 0.8rem;
    }    
  }
  .version{
    margin: 0 auto;
    text-align: center;
    font-size: 0.6rem;
    background-color: #ffffff;
    height: 2rem;
    line-height: 2rem;
    color: grey;
  }
}
</style>