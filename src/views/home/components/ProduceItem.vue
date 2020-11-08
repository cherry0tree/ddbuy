<template>
<div class="wrapper">
  <div class="item" v-for="(product,index) in product_lists"
       :key="index">
    <img v-lazy="product.small_image" alt="">
    <p class="itemTitle">{{product.name}}</p>
    <p class="itemSubTitle">{{product.spec}}</p>
    <span class="price">
      {{product.price | moneyFormat}}
    </span>
    <span class="originPrice">{{product.origin_price | moneyFormat}}</span>
    <div class="buyCar"
         @click.stop="addCart(product)">
      <svg-icon iconClass="car"
                style="width:1.5rem;height:1.5rem"></svg-icon>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'ProduceItem',
  props: {
    product_lists: Array
  },
  data() {
    return {
    }
  },
  methods: {
    addCart(product){
      this.$store.commit('addCart', product)
    }
  }
}
</script>
<style scoped>
.wrapper{
  background-color: #f5f5f5;
  height: auto;
  padding-left: 2%;
  padding-top: 0.5rem;  
}
.item{
  position: relative;
  display: inline-block;
  width: 48%;
  margin-right: 2%;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 0.3rem;
  padding-bottom: 0.6rem;
}
.item img {
  width: 100%;
  height: 100%;
  background-size: contain;
}
.item .itemTitle{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 1rem;
  font-size: 0.625rem;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
}
.item .itemSubTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: gray;
  padding-top: 0.2rem;
  font-size: 0.45rem;
  line-height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 1.5rem;  
}
.item .price {
  padding-left: 0.5rem;
  color: #f37078;
  font-size: 0.928rem;
}
.originPrice {
  font-size: 0.6875rem;
  color: #999999;
  text-decoration: line-through;
}
.buyCar {
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 1rem;
  bottom: 0.5rem;
}
</style>