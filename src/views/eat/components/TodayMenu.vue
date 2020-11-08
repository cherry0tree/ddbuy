<template>
<div class="wrapper">
  <div class="todayMenuWrapper">
    <div class="menuList">
      <ul ref="menuUlContent">
        <li class="menuItem"
            v-for="(item, index) in todayMenuCategoryLists"
            :key="item.id"
            ref="menuTitle"
            @click="menuItemClick(index)"
            :class="{ selected: currentSubTitle === index }">
          {{ item.name }}
        </li>
      </ul>     
    </div>
    <div class="menuAll"
         @click="clickAll">
      {{ msg }}
      <span class="downMenu"
            v-if="menuDown">
          <!-- <span>全部</span> -->
          <svg-icon iconClass="down"
                    style="width:1rem;height:1rem" />
      </span>
      <span class="upMenu"
            v-else>
          <!-- <span>收起</span> -->
          <svg-icon iconClass="up"
                    style="width:1rem;height:1rem" />
      </span>      
    </div>
  </div>
  <MenuCategoryLists :todayMenuCategoryLists="todayMenuCategoryLists">
  </MenuCategoryLists>
  
</div>
</template>

<script>
import MenuCategoryLists from './MenuCategoryLists'
import { getTodayMenuCategoryList } from '../../../network/index'
import BScroll from 'better-scroll'
// 引入通知
import PubSub from 'pubsub-js'

export default {
  name: 'TodayMenu',
  components:{
    MenuCategoryLists
  },
  created() {
    this._initData()
  },
  mounted(){
  },
  watch: {
    menuDown() {
      this.msg = this.menuDown == true ? '全部' : '关闭'
    }
  },
  data() {
    return {
      menuDown: true,
      currentSubTitle: 0,
      todayMenuCategoryLists: [],
      msg: '全部'
    }
  },
  methods: {
    clickAll() {
      this.menuDown = !this.menuDown
    },
    //获取数据
    async _initData() {
      let todayMenuCategory = await getTodayMenuCategoryList()
      if (todayMenuCategory.success) {
        this.todayMenuCategoryLists = todayMenuCategory.data.list
        console.log(this.todayMenuCategoryLists)
        //异步获取数据后进行初始化才能计算出正确的X宽度
        this._initMenuTitleScroll()
      }
    },
    //初始化菜单栏滑动
    _initMenuTitleScroll () {
      //nextTick 让ul完全渲染完成后
      this.$nextTick(() => {
        if (!this.menuTitleScroll) {
          let contentWrapperWidth = 100
          let el = this.$refs.menuTitle
          console.log(el)
          for (let i = 0; i < el.length; i++) {
            contentWrapperWidth += el[i].clientWidth * 1.18
          }
          //给ul设置宽度,保证可以横向滚动
          this.$refs.menuUlContent.style.width = contentWrapperWidth + 'px'
          console.log(this.$refs.menuUlContent)
          this.menuTitleScroll = new BScroll('.menuList', {
            probeType: 3,
            startX: 0,
            click: true,
            scrollX: true
          })          
        } else {
          this.menuTitleScroll.refresh()
        }
      })
    },
    menuItemClick(index) {
      this.currentSubTitle = index;
    }
  }
}
</script>
<style scoped lang="less">
.wrapper{
  width: 100%;
  margin-top: 6.5rem;
  margin-bottom: 3rem;
  .todayMenuWrapper{
    position: fixed;
    width: 100%;
    white-space: nowrap;
    height: 1.5rem;
    display: inline-block;
    border-bottom: solid 0.01rem #e8e9e8;
    z-index: 999;
    top: 5.1rem;
    background-color: white;
    .menuList{
      width: 80%;
      overflow: hidden;
      .menuItem{
        margin-right: 0.5rem;
        display: inline-block;
        font-size: 0.73rem;
        padding: 0.2rem;
        border: 1px solid #dedede;
        border-radius: 0.6rem;
      }
      .selected{
        color: #3cb963;
        border: 1px solid #3cb963;        
      }
    }
    .menuAll{
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 0.9rem;
      font-size: 0.6rem;
      color: gray;
    }
  }
}
</style>