import {
  SELECTED_GOODS_PRICE,
  SELECTED_GOODS
} from "./mutation-type";

export default {
  SELECTED_GOODS_PRICE(state) {
    let totalPrice = 0;
    Object.values(state.shopCart).forEach((goods, index) => {
      if(goods.checked) {
        totalPrice += (goods.price * goods.num * 100)
      }
    });
    return totalPrice;
  },
  SELECTED_GOODS_COUNT(state) {
    let count = 0;
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((goods) => {
      if(goods.checked) {
        count++;
      }
    })
    return count;
  },
  SELECTED_GOODS(state) {
    let goodsArray = [];
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((goods, index) => {
      if(goods.checked) {
        goodsArray.push(shopCart[goods.id])
      }
    })
    return goodsArray;
  }
}