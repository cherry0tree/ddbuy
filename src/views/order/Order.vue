<template>
<div class="wrapper">
  <van-nav-bar :title="'填写订单'"
               left-arrow 
               :fixed=true
               @click-left="onClickLeft" />
  <!-- 选择收货地址 -->               
  <van-contact-card :type="address_type"
                    :add-text="'选择收货地址'"
                    :name="address_name"
                    :tel="address_phone"
                    style="margin-top:3rem"
                    @click="chooseAddress">
  </van-contact-card>
  <van-cell-group>
    <van-cell :title="'送达时间'"
              is-link>
      <template slot="label">
        <span>超过十分钟可获得积分补偿</span>
      </template>
    </van-cell>
    <!-- 送货时间区间选择器 -->
    <!-- <TimeIntervalList ref="timeInterval"
                      >
    </TimeIntervalList> -->
    <!-- 商品缩略图 -->
    <div class="ImageWrapper">
      <div class="productWrapper">
        <ul class="imgWrapper"
            ref="imgWrapper">
          <li ref="subWrapper"
              style="display:inline"
              v-for="(item,index) in goods"
              :key="index">
            <img :src="item.smallImage" alt="">
          </li>
        </ul>
      </div>
      <ul class="productCount">
        <span class="number">{{selectedCount}}</span>
        <van-icon name="arrow" />
      </ul>
    </div>
  </van-cell-group>
  <!-- 支付方式选择 -->
  <van-radio-group v-model="radio">
    <van-cell-group :title="'支付方式'">
      <van-cell clickable
                @click="radio = '1'">
        <template slot="title">
          <img src="./../../assets/images/dashboard/order/wx.png" 
               alt=""
               width="25px"
               height="25px"
               style=" vertical-align: middle;padding-right:5px">>
          <span>微信支付</span>
        </template>
        <van-radio slot="right-icon"
                   name="1"
                   checked-color="#07c160">
        </van-radio>
      </van-cell>
      <van-cell clickable
                @click="radio = '2'">
        <template slot="title">
          <img src="./../../assets/images/dashboard/order/zfb.png"
                alt=""
                width="25px"
                height="25px"
                style=" vertical-align: middle;padding-right:5px">
          <span>支付宝支付</span>
        </template>
        <van-radio slot="right-icon"
                    name="2"
                    checked-color="#07c160" />
      </van-cell>
      <van-cell clickable
                @click="radio = '3'">
        <template slot="title">
          <img src="./../../assets/images/dashboard/order/hb.png"
                alt=""
                width="25px"
                height="25px"
                style=" vertical-align: middle;padding-right:5px">
          <span>花呗</span>
        </template>
        <van-radio slot="right-icon"
                    name="3"
                    checked-color="#07c160" />
      </van-cell>       
    </van-cell-group>
  </van-radio-group>
  <!-- 优惠券及积分满减 -->
  <van-cell-group style="margin-top: 0.6rem">
    <van-coupon-cell :coupons="coupons"
                     @click="showList = true">
    </van-coupon-cell>
  </van-cell-group>
  <!-- 备注 -->
  <van-cell-group style="margin-top: 0.6rem">
    <van-field :label="'备注'"
               type="textarea"
               :placeholder="'选填可以告诉我们您的需求'"
               rows="1"
               autosize
               is-link>
    </van-field>
  </van-cell-group>
  <!-- 商品金额 -->
  <van-cell-group style="margin-top: 0.6rem">
    <van-cell :title="'商品金额'">
      <div class="money">{{(selectedTotalPrice/100) |moneyFormat }}</div>
    </van-cell>
    <van-cell :title="'配送费'">
      <div class="money">0.00</div>
    </van-cell>    
  </van-cell-group>
  <!-- 提交订单 -->
  <van-submit-bar :price="actualPrice"
                  :label="'实付'"
                  :button-text="'提交订单'"
                  @submit="onSubmit">
  </van-submit-bar>
  <!-- 路由出口 -->
  <transition name="router-slider"
              mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex';
import { Toast, Dialog } from 'vant';
import { CHOOSE_USER_ADDRESS } from './../../config/pubsub_type.js'
import TimeIntervalList from './children/TimeIntervalList'
export default {
  name: 'Order',
  components: {
    TimeIntervalList
  },
  computed: {
    ...mapGetters({
      goods: 'SELECTED_GOODS',
      selectedCount: 'SELECTED_GOODS_COUNT',
      selectedTotalPrice: 'SELECTED_GOODS_PRICE'
    }),
    actualPrice() {
      return this.selectedTotalPrice;
    }
  },
  mounted() {
    //订阅发布的通知
    PubSub.subscribe(CHOOSE_USER_ADDRESS, (msg, data) => {
      if (msg == CHOOSE_USER_ADDRESS) {
        //修改卡片的类型
        console.log(data)
        this.address_type = 'edit';
        this.address_name = data.name;
        this.address_phone = data.tel;
        this.address_id = data.id;
      }
    })
  },
  beforeDestroy () {
    // 销毁订阅
    PubSub.unsubscribe(CHOOSE_USER_ADDRESS);
  },
  data() {
    return {
      address_type: 'add',           //地址卡片类型
      address_name: null,            // 收货人
      address_phone: null,           // 收货人电话
      address_id: null,              // 收货人地址ID
      radio: '1',                    // 支付方式
      showList: false,              // 展示优惠列表
      coupons: [{                    // 优惠券信息
        available: 1,
        condition: '无使用门槛\n最多优惠1.5元',
        reason: '',
        value: 150,
        name: '优惠券',
        startAt: 1549104000,
        endAt: 1614592000,
        valueDesc: '1.5',
        unitDesc: '元'        
      }]                     

    }
  },
  methods: {
    onClickLeft () {
      this.$router.back();
    },
    chooseAddress() {
      console.log(this.$router)
      this.$router.push('/order/myAddress');
    },
    onSubmit() {
      Toast({
        message: '提交成功',
        duration: 800
      });      
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  width: 100%;
  height: 100%;  
  background-color: #f5f5f5;
  margin-bottom: 5rem;
  .ImageWrapper{
    height: 4rem;
    width: 100%;
    position: relative;
    .productWrapper{
      display: flex;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: start;
      height: 4rem;
      width: 80%;
      overflow: hidden;
      .imgWrapper{
        flex-wrap: nowrap;
        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }
    .productCount{
      right: 0.1rem;
      top: 1.5rem;
      position: absolute;
      color: grey;
    }    
  }
}
</style>  