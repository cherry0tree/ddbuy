<template>
<div class="wrapper"
     v-if="menuDown"
     ref="dropMenuWrapp">
  <ul class="itemWraper">
    <li v-for="(item,index) in categoriesDetailData"
        :key="item.id"
        class="titleItem"
        :class="{selected:currentSubTitle === index}"
        @click="itemClick(index)">
      {{item.name}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'DropMenu',
  props: {
    menuDown: Boolean,
    categoriesDetailData: Array,
    currentSubTitle: Number    
  },
  methods: {
    itemClick(index) {
      this.$emit('itemClick', index);
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  position: fixed;
  justify-content: flex-start;
  z-index: 50 !important;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  top: 5.6rem;
  bottom: 3rem;
  .itemWraper{
    padding: 0.5rem;
    display: flex;
    flex-flow: row wrap;
    background-color: white;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .titleItem{
      text-align: center;
      margin-right: 2rem;
      margin-top: 0.4rem;
      width: 3.5rem;
      line-height: 1.4rem;
      height: 1.4rem;
      font-size: 0.65rem;
      color: rgba(0, 0, 0, 0.7);
      border: 1px solid grey;
      border-radius: 1rem;
    }
    .selected {
      background-color: rgba(60, 185, 99, 0.1);
      color: #3cb963;
      border: 1px solid #3cb963;      
    }
  }
}
</style>