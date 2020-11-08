<template>
<div class="CategoryWrapper">
  <!--头部-->
  <Header></Header>
  <!--内容-->
  <div class="listWrapper">
    <!--左边-->
    <div class="leftWrapper">
      <ul class="wrapper">
        <li class="categoryItem"
            v-for="(cate, index) in categoriesData"
            :class="{ selected: currentIndex === index }"
            @click="clickLeftLi(index)"
            :key="cate.id"
            ref="menuList">
          <span class="textWrapper">{{ cate.name }}</span>
        </li>
      </ul>
    </div>
    <!--右边-->
    <ContentView :categoriesDetailData="categoriesDetailData"></ContentView>
  </div>
</div>
</template>

<script>
import Header from './components/SearchHead'
//引入接口
import ContentView from './components/ContentView'

import {
  getCategoryData,
  getCategoryDetailData
} from './../../network/index.js'
//引入滚动组件
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  components: {
    Header,
    ContentView
  },
  data() {
    return {
      // 右边列表数据
      categoriesDetailData: [],
      // 左边列表数据
      categoriesData: [],
      // 左边item选中与否
      currentIndex: 0
    }
  },
  created() {
    this._initData()
  },
  methods: {
    //初始化操作(数据和界面)
    async _initData () {
    //获取左边的数据
      let leftRes = await getCategoryData();
      console.log(leftRes)
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate
      }
      //获取右边的数据 lk001 初始化获取推荐
      let rightRes = await getCategoryDetailData('/lk001')
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate
        console.log(rightRes.data)
      }
      //初始化滚动视图
      this.$nextTick(() => {
        if(!this.leftScroll) {
          this.leftScroll = new BScroll('.leftWrapper', {
            probeType: 3,
            click: true,
            scrollY: true,
            tap: true,
            mouseWheel: true
          })
        } else {
          this.leftScroll.refresh()
        }
      })  
    },
    async clickLeftLi(index) {
      //改变索引
      this.currentIndex = index
      // 滚动到对应的位置
      setTimeout(() => {
        let menuLists = this.$refs.menuList
        let el = menuLists[index]
        //滚动到对应元素上
        this.leftScroll.scrollToElement(el, 100)
      }, 900)
      //获取右边的数据
      let param
      if (index >= 9) {
        param = `/1k0${index+1}`
      } else {
        param = `/lk00${index + 1}`
      }
      let rightRes = await getCategoryDetailData(param)
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate
        console.log(rightRes.data)
      }      
    }
  }
}
</script>
<style scoped>
.CategoryWrapper{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;  
}
.listWrapper{
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}
.leftWrapper{
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}
.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 0.01rem #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
}
.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}
@media (min-width: 960px) {
  .wrapper {
    border-right: 0.01rem solid #e8e9e8;
  }
  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>