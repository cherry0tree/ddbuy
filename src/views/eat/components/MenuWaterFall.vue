<template>
<div class="container-water-fall">
  <waterfall :col='col'
             :data="data"
             @loadmore="loadmore">
    <div class="cell-item"
         v-for="(item,index) in data"
         :key="item.id">
      <img v-lazy="item.image">
      <div class="item-body">
        <div class="item-desc">{{item.name}}</div>
        <div class="item-footer">
          <img class="avatar" 
               v-lazy="item.author_avatar" 
               alt="">
          <div class="name">{{item.author_name}}</div>
        </div>
      </div>
    </div>
  </waterfall>
</div>
</template>

<script>
import { getTodayMenuDetail } from '../../../network/index'
import { Toast } from 'vant';

export default {
  name: 'MenuWaterFall',
  data() {
    return {
      col: 2,
      data: [],
      menulistDetail: [],
      page: 1
    }
  },
  created() {
    this._initData();
  },
  methods: {
    async _initData() {
      let ref = await getTodayMenuDetail('/lk01');
      if (ref.success) {
        this.menulistDetail = ref.data.big_recommend.list;
        this.data = ref.data.big_recommend.list;
        console.log(this.data)
      }
    },
    //不能用async await loadmore必须是同步
   loadmore() {
      let index = ++this.page;
      let param;
      if(index > 31) {
        Toast({
          message: '到底了',
          duration: 800
        });
        return;
      } else {
        param = index >= 10 ? `/1k${index}` : `/lk0${index}`;
      }
      getTodayMenuDetail(param).then(response => {
        if (response.success) {
          let newArray = response.data.big_recommend.list;
          this.data = this.data.concat(newArray);
        }
      });
    }
  }
}
</script>
<style scoped lang="less">
.container-water-fall{
  width: 100vw;
  box-sizing: border-box;
  background-color: #f5f5f5f5;
  .cell-item{
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 1px;
    padding: 0.3rem;
    img{
      border-radius: 12px;
      width: 100%;
      display: block;
      background-size: contain;
    }
    .item-body{
      padding: 0.6rem;
    }
    .item-footer{
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 1rem;
      .avatar{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .name {
        max-width: 150px;
        margin-left: 10px;
        font-size: 0.75rem;
        color: #999999;
      }      
    }
  }
}
</style>