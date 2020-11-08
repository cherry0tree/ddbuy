import {
        USER_INFO,
        SINGLE_SELECT_GOODS,
        REDUCE_GOODS,
        ADD_GOODS
} from './mutation-type'

import {  Toast } from 'vant'
import router from '@/router/index'
import Vue from 'vue'

export default {
  
  //保存用户信息到本地
  [USER_INFO](state, {userInfo}) {
    //把外界传来的userInfo保存到state中的userInfo
    state.userInfo = userInfo;
    console.log(state.userInfo)
  },
  [SINGLE_SELECT_GOODS](state,{goodsID}) {
    let shopCart = state.shopCart;
    console.log(shopCart)
    let goods = shopCart[goodsID]
    console.log(goods)
    goods.checked = !goods.checked;
    
  },
  [REDUCE_GOODS](state, {goodsID}) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsID];
    if (goods['num'] > 0) {
      goods['num']--;
    }
    if(goods['num'] === 0) {
      delete shopCart[goodsID];
    }
    state.shopCart = {
      ...shopCart
    };    
  },
  [ADD_GOODS](state,{goodsID}) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsID];
    goods['num']++;
    state.shopCart = {
      ...shopCart
    };      
  },
  // 添加商品进购物车
  addCart(state, product) {
    //判断是否有用户登录
    // if(state.userInfo.token) {
      //添加数据
      //延迟900毫秒等待动画结束
      //自定义的goodsID只在该方法内有效,在外面为undefined
      let goodsID = product.id;
      let shopCart = state.shopCart;
      if(shopCart[goodsID]) {
        shopCart[goodsID]['num']++;
      } else {
          shopCart[goodsID] = {
            'num': 1,
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'smallImage': product.small_image,
            'checked': true
          }
          console.log(shopCart)
          state.shopCart = {
            ...shopCart
          };          
          console.log(state.shopCart)
          Toast({
            message: '成功加入购物车',
            duration: 800
          })
      }
    // } else {
    //没有登录跳转到登录界面
    //   router.push('/login')
    // }
  }
}
