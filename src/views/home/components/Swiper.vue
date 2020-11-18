<template>
<!-- 外面不能再包裹一个div否则可能出现播到最后一张图片不能播的情况 -->
  <swiper id="swiper"
          :options="swiperOption"
          ref="mySwiper">
    <swiper-slide v-for="(item,index) in data_list"
                  :key="item.public_id">
      <img :src="item.icon_url" :alt="item.public_name">
    </swiper-slide>
    <!-- 轮播图中的小圆圈 可选 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  name: 'Swiper',
  props: {
    data_list: Array
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  data () {
    return {
      swiperOption: {
        // 进来就加载
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
        },
        loop: true,
        //配置自动播放
        autoplay: {
          delay: 3000,
          // 最后一个是否停止
          stopOnLastSlide: false,
          // 用户操作swiper之后，是否禁止autoplay
          disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        // 配置速度
        speed: 600,
        // 滑动后回调函数
        on: {
          slideChangeTransitionEnd () {
          },
          //   preventLinksPropagation: false
        }
      }      
    }
  }
}
</script>
<style scoped lang="less">
#swiper {
  padding-top: 6rem;
  width: 95%;
  height: 10rem;
  border-radius: 1rem;
  img{
    width: 100%;
    height: 100%;
  }
}

</style>