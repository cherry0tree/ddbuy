<template>
<div class="wrapper">
  <div class="flashItemWrapper">
    <ul class="itemWrapper"
        ref="ulWrapper">
      <li ref="productItem"
          class="itemInCovers"
          v-for="(item,index) in flash_sale_product_list"
          :key="index">
        <img v-lazy="item.small_image" class="itemImage">
        <span class="title">{{item.name}}</span>
        <div class="price">
          <p class="nowPrice">{{item.price | moneyFormat}}</p>
          <p class="originPrice">{{item.origin_price | moneyFormat}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  name: 'FlashFood',
  props: {
    flash_sale_product_list: Array
  },
  mounted () {
    // this.$nextTick(() => {
    //   let contentWrapperWidth = 0;
    //   console.log(this.$refs)
    //   let el = this.$refs.productItem;
    //   console.log(el)
    //   for (let i = 0; i < el.length; i++) {
    //     contentWrapperWidth += el[i].clientWidth;
    //   }
    //   // 给ul设置值
    //   this.$refs.ulWrapper.style.width = contentWrapperWidth + 'px';      
    //   console.log(this.$refs.ulWrapper.style.width)
    //   if (!this.scroll) {
    //     // 名字一定要唯一 和父组件独立
    //     this.scroll = new BScroll('.flashItemWrapper', {
    //       probeType: 2,
    //       startX: 0,
    //       click: true,
    //       scrollX: true,
    //       scrollY: false,
    //       eventPassthrough: "vertical",
    //     });
    //   } else {
    //     this.scroll.refresh();
    //   }      
    // })
  }
}
</script>
<style scoped lang="less">
.wrapper {
  .flashItemWrapper{
    width: 100%;
    overflow: hidden;
    position: relative;
    .itemWrapper {
      display: flex;
      justify-content: flex-start;
    }    
    .itemInCovers{
      // 设置子li的宽度
      flex: 0 0 6rem;
      align-items: center;
      padding-right: 0.5rem;
      .itemImage {
        width: 100%;
        border-radius: 50%;
        background-size: contain;
      }
      .title {
        padding: 0.2rem;
        display: inline-block;
        font-size: 0.6258rem;
        height: 1.8rem;
        line-height: 1rem;
        font-size: 0.625rem;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price{
        position: relative;
        padding-left: 0.5rem;
        .nowPrice {
          color: #f37078;
          font-size: 0.928rem;
        }
        .originPrice{
          font-size: 0.6875rem;
          color: #999999;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>