<template>
<div class="dashBoard">
  <van-tabbar v-model="active"
              :safe-area-inset-bottom="true"
              active-color="#75a342"
              class="active_tab">
    <van-tabbar-item v-for="(item, index) in tabbars"
                     :key="index"
                     @click="tabClick(index, item.name)">
      <template slot="icon" slot-scope="props">
        <img :src="props.active ? item.active : item.normal" />
      </template>
        <span>{{item.title}}</span>
    </van-tabbar-item>
  </van-tabbar>

<!-- 缓存界面选择加载 记住页面相应状态-->
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive" />
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive" />
</div>
</template>

<script>

export default {
  name: 'dashBoard',
  created() {
    //通过路由跳转绑定Tabbar的选中
    this.tabbarSelected(this.$route.name)
  },
  watch: {
    // 监听路由变化,保证路由跳转Tabbar选中正常    
    $route: {
      handler(val, oldval) {
        this.tabbarSelected(val.name)
      }
    }
  },
  data() {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: 'home',
          title: '首页',
          normal: require('@/assets/images/dashboard/home_default.png'),
          active: require('@/assets/images/dashboard/home_selected.png')
        },
        {
          name: 'category',
          title: '种类',
          normal: require('@/assets/images/dashboard/category_default.png'),
          active: require('@/assets/images/dashboard/category_selected.png')
        },
        {
          name: 'eat',
          title: '吃什么',
          normal: require('@/assets/images/dashboard/eat_default.png'),
          active: require('@/assets/images/dashboard/eat_selected.png')
        },
        {
          name: 'cart',
          title: '购物车',
          normal: require('@/assets/images/dashboard/shoppingcart_default.png'),
          active: require('@/assets/images/dashboard/shoppingcart_selected.png'),
          num: 5
        },
        {
          name: 'mine',
          title: '我的',
          normal: require('@/assets/images/dashboard/mine_default.png'),
          active: require('@/assets/images/dashboard/mine_selected.png')
        }        
      ]
    }
  },
  methods: {
    tabbarSelected(item) {
      //枚举各页面
      const mapType = {
        home: 0,
        category: 1,
        eat: 2,
        cart: 3,
        mine: 4        
      }
      this.active = mapType[item]
    },
    //点击tabbar触发的方法
    tabClick(index, val) {
      this.currIndex = index;
      this.$router.push(val)
    }
  }
}
</script>
<style scoped>
.active_tab{
  background-color: #eee;
}
</style>