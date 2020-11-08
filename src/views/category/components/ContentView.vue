<template>
<div class="wrapper">
  <!-- 可滑动的标题 -->
  <div class="subTitleWrapper" ref="subTitleWrapper">
    <ul ref="ulContent">
      <li class="title"
          :class="{selected:currentSubTitle === index}"
          v-for="(detailItem,index) in categoriesDetailData"
          :key="detailItem.id"
          ref="subTitle"
          @click="subTitleClick(index)">
          {{detailItem.name}}
      </li>
    </ul>
  </div>
  <!-- 下拉菜单 -->
  <div class="showMenu" 
       v-show="isShowDropMenu"
       @click="menuClick">
    <span class="downMenu"
          v-if="menuDown">
      <svg-icon iconClass="down"
                style="width:1.5rem;height:1.5rem"></svg-icon>
    </span>
    <span class="upMenu"
          v-else>
      <svg-icon iconClass="up"
                style="width:1.5rem;height:1.5rem" />
    </span>
  </div>
  <!-- 下拉菜单内容 单独封装一个组件-->
  <DropMenu :menuDown="!menuDown"
            :categoriesDetailData="categoriesDetailData"
            :currentSubTitle="currentSubTitle"
            @itemClick="itemClick"></DropMenu>
  <!-- 商品内容列表 -->
  <section class="r_list"
           ref="r_list">
      <!-- 必须要有下面的这个div 否则遍历不出所有的值-->
    <div>     
      <div v-for="(it,index) in categoriesDetailData"
          :key="index"
          ref="good">
        <p class="productCategoryTitle">
          {{it.name}}
        </p>
        <ul v-for="(item,index) in it.products"
            :key="index"
            >
          <li class="list">
            <div class="list_item flex">
              <p>
                <img v-lazy="item.small_image" alt="">
              </p>
              <div>
                <p class="name">{{item.product_name}}</p>
                <p class="des">{{item.spec}}</p>
                <p class="price">{{item.price | moneyFormat}}</p>
                <p class="originPrice">{{item.origin_price | moneyFormat}}</p>
                <div class="iconCartWrapper">
                  <svg-icon iconClass="car"
                            style="width:1.5rem;height:1.5rem">
                  </svg-icon>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>  
  </section>

</div>
</template>

<script>
import BScroll from 'better-scroll'
import DropMenu from './DropMenu'

export default {
  name: 'ContentView',
  components: {
    DropMenu
  },
  props: {
    categoriesDetailData: Array
  },
  watch: { 
    categoriesDetailData () {
      this.$nextTick(() => {
        this._initTitleScroll();
        this._initProductScroll();
        this._isShowDropMenu();
      })
    }
  },
  data() {
    return {
      currentSubTitle: 0,
      isShowDropMenu: false,
      menuDown: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initTitleScroll();
      this._initProductScroll();
      this._isShowDropMenu();
    })
  },
  methods: {
    itemClick(index){
      this.currentSubTitle = index;
    },
    subTitleClick(index) {
      this.currentSubTitle = index;
      // 让产品列表根据点击的index值滚动
      this.productScroll.scrollToElement(this.$refs.good[index], 100, 0, 0);
    },
    menuClick() {
      this.menuDown = !this.menuDown;
    },
    //是否显示标题下拉按钮
    _isShowDropMenu () {
      // 如果标题超出则显示下拉框按钮
      let subTitleWrapperWidth = this.$refs.subTitleWrapper.clientWidth;
      let ulContentWidth = this.$refs.ulContent.clientWidth;
      this.isShowDropMenu = ulContentWidth > subTitleWrapperWidth ? true : false;
      console.log(this.isShowDropMenu)
      console.log(ulContentWidth)
      console.log(subTitleWrapperWidth)
    },
    _initTitleScroll() {
      let contentWrapperWidth = 120;
      let el = this.$refs.subTitle; //一个li
      for (let i = 0; i< el.length; i++) {
        contentWrapperWidth += el[i].clientWidth;
      }
      //给ul设置宽度,保证可以横向滚动
      this.$refs.ulContent.style.width = contentWrapperWidth + 'px';
      if (!this.titleScroll) {
        this.titleScroll = new BScroll('.subTitleWrapper', {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true,
        });        
      } else {
        this.titleScroll.refresh();
      }
    },
    _initProductScroll() {
      if (!this.productScroll) {
        this.productScroll = new BScroll(this.$refs.r_list, {
          click: true,
          probeType: 3
        })        
      } else {
        this.productScroll.refresh();
        //进入默认商品列表滚到顶部
        this.productScroll.scrollToElement(this.$refs.good[0], 10, 0, 0);
      }
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  width: 100%;
  .subTitleWrapper{
    width: 100%;
    height: 2.8rem;
    display: inline-block;
    white-space: nowrap;
    border-bottom: solid 0.01rem #e8e9e8;
    overflow: hidden;
    position: fixed;    
    z-index: 999;
    top: 2.8rem;
    background-color: white;
    .title{
      display: inline-block;
      font-size: 0.73rem;
      padding: 1rem;
    }
    .selected {
      color: #3cb963;
    }    
  }
  .showMenu{
    position: fixed;
    width: 10%;
    height: 2.5rem;
    line-height: 2.5rem;
    right: -0.2rem;
    z-index: 1999;
    margin-top: 0.1rem;
    background-color: white;
  }
}
.r_list{
  position: absolute;
  left: 5.2rem;
  right: 0;
  top: 2.9rem;
  bottom: 0rem;
  overflow: hidden;
  // 防止抖动
  -webkit-transform: translateZ(0);
  transform: translateZ(0);  
  .productCategoryTitle{
    display: inline-block;
    font-size: 0.73rem;
    padding: 1rem;
    border-left: 3px solid #d9dde1;
    height: 0.32rem;
    width: 100%;
    font-size: 0.73rem;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
    padding-left: 0.28rem;
  }
  .list{
    padding: 0.36rem 0.36rem 0 0.36rem;
    img {
      width: 4.0625rem;
      height: 4.0625rem;
      border-radius: 0.04rem;
      display: block;
      background-size: contain;
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .list_item{
      justify-content: flex-start;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding-bottom: 1rem;
      position: relative;
      & > div {
        margin-left: 0.2rem;
        .name{
          font-size: 0.8375rem;
          line-height: 1rem;
          color: rgb(7, 17, 27);
          margin-bottom: 0.16rem;
        }
        .des,.sale {
          padding: 0.2rem;
          line-height: 0.8rem;
          font-size: 0.65rem;
          color: rgb(147, 153, 159);
          margin-bottom: 0.16rem;
        }
        .sale {
          margin-bottom: 0;
          span{
            margin-left: 0.24rem;
          }
        }
        .price {
          display: inline;
          font-size: 0.75rem;
          color: red;
        }
        .originPrice {
          display: inline;
          padding-left: 0.5rem;
          text-decoration: line-through;
          font-size: 0.6875rem;
          color: #b2b2b2;
        }
        .iconCartWrapper{
          position: absolute;
          width: 1.875rem;
          top: 4.4rem;
          right: 0.6rem;
        }
      }
    }
  }
}
</style>