<template>
<div class="wrapper">
  <van-nav-bar :title="'编辑地址'"
               left-arrow
               :fixed=true
               :border=true
               @click-left="onClickLeft">              
  </van-nav-bar>
  <van-address-edit :area-list="areaList"
                    show-postal
                    show-delete
                    show-set-default
                    show-search-result
                    :addressInfo="addressInfo"
                    :search-result="searchResult"
                    @save="onSave"
                    @delete="onDelete"
                    style="margin-top:3rem">
  </van-address-edit>  
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import areaList from './../../../../config/area.js'
export default {
  name: 'EditAddress',
  data(){
    return {
      areaList: areaList,
      addressInfo: {},
      searchResult: []
    }
  },
  mounted() {
    this.addressInfo = this.$route.params.content;
  },
  methods: {
    ...mapMutations(['CHANGE_USER_SHOPPING_ADDRESS', 'DELETE_USER_SHOPPING_ADDRESS']),
    //返回上级界面
    onClickLeft() {
      this.$router.go(-1);
    },
    onDelete(content) {
      let id = content.id;
      console.log(content)
      this.DELETE_USER_SHOPPING_ADDRESS({ id });
      this.$router.back();
    },
    onSave(content) {
      let id = content.id;
      content['address'] = content.province + content.city + content.county + content.addressDetail;
      this.CHANGE_USER_SHOPPING_ADDRESS({
        id, content
      });
      this.$router.back();      
    }
  }
}
</script>
<style scoped>
.wrapper{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;  
}
</style>