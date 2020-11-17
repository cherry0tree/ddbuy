<template>
<div class="wrapper">
  <van-nav-bar :title="'添加地址'"
               left-arrow
               :fixed=true
               :border=true
               @click-left="onClickLeft">
  </van-nav-bar>
  <van-address-edit :area-list="areaList"
                    show-postal
                    show-set-default
                    show-search-result
                    :search-result="searchResult"
                    :save-button-text="'保存并使用'"
                    style="margin-top:3rem"
                    @save="onSave">
  </van-address-edit>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import areaList from './../../../../config/area.js'
export default {
  name: 'AddAddress',
  data() {
    return {
      areaList: areaList,
      searchResult: []
    }
  },
  methods: {
    ...mapMutations(['ADD_USER_SHOPPING_ADDRESS']),
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      let addressID = this.addressID().toString();
      content['id'] = addressID;
      content['address'] = content.province + content.city + content.county + content.addressDetail;
      this.ADD_USER_SHOPPING_ADDRESS({
        addressID,
        content
      });
      this.$router.back();      
    },
    //生成不重复的id
    addressID() {
      var lastUid = 0;
      return (new Date()).getTime() * 1000 + (lastUid++) % 1000;
    }
  }
}
</script>
<style scoped lang="less">
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