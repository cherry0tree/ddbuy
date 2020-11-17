import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级组件
const dashBoard = () => import('../views/dashboard/dashBoard.vue');
// 懒加载二级组件 Tarbar
const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const Eat = () => import('../views/eat/Eat.vue');
const Cart = () => import('../views/cart/Cart.vue');
const Mine = () => import('../views/mine/Mine.vue');
// 注册登录
const Login = () => import('../views/login/Login.vue');
// 加载订单相关的组件
const Order = () => import('../views/order/Order.vue');
const myAddress = () => import('../views/order/children/myAddress.vue');
const AddAddress = () => import('../views/order/children/children/AddAddress.vue')
const EditAddress = () => import('../views/order/children/children/EditAddress.vue');

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/dashboard',
    // 是否数据缓存
    meta: {
      keepAlive: true
    }    
  },
  {
    // 根页面
    path: '/dashboard',
    name: 'dashboard',
    component: dashBoard,
    children: [
      {
        path: '/dashboard',
        redirect: '/dashboard/home',
      },
      {
        // 主页
        path: 'home',
        name: 'home',
        component: Home,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }      
      },
      {
        // 分类
        path: 'category',
        name: 'category',
        component: Category,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }  
      },
      {
        // 吃什么
        path: 'eat',
        name: 'eat',
        component: Eat,
        // 是否数据缓存
        meta: {
          keepAlive: true
        }        
      },
      {
        // 购物车
        path: 'cart',
        name: 'cart',
        component: Cart,
        meta: {
          keepAlive: true
        }        
      },
      {
        // 我的
        path: 'mine',
        name: 'mine',
        component: Mine,
        meta: {
          keepAlive: true
        }                         
      }
    ]
  },
  {
    // 登录
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    // 订单
    path: '/order',
    name: 'order',
    component: Order,
    children: [{
        //我的地址
        path: 'myAddress',
        name: 'myAddress',
        component: myAddress,
        children: [{
          path: 'addAddress',
          name: 'addAddress',
          component: AddAddress
        },{
          path: 'editAddress',
          name: 'editAddress',
          component: EditAddress          
        }]
    }]
  }
]

const router = new VueRouter({
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return {
            x: 0,
            y: 0
        }
    }
  },  
  routes
})

export default router
