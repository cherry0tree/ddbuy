<template>
<div class="wrapper">
  <van-nav-bar :title="'请选择地址'"
               :border=false
               :fixed="true"
               @click-left="onClickLeft"
               left-arrow
               style="height:1.5rem">
  </van-nav-bar>
  <!-- 地图部分 -->
  <div class="aMap">
    <div class="amap-page-container">
      <el-amap ref="map"
               vid="amapDemo"
               :plugin="plugin"
               :zoom="zoom"
               :center="center"
               class="amap-map"
               :events="events"
               v-show="showMap">
        <el-amap-marker vid="component-marker"
                        :position="makerConf.position"
                        :content="makerConf.content" />
      </el-amap>
    </div>
  </div>
  <!-- 地址列表 -->
  <div class="adrs">
    <ul v-if="list.length > 0">
      <van-cell-group :title="'当前位置'">
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <span class="custom-title">
            <p class="title">{{list[0].name}}</p>
            <p class="subTitle">{{list[0].address}}</p>            
          </span>
        </van-cell>
      </van-cell-group>
      <!-- 附近位置 -->
      <van-cell-group :title="'附近位置'">
        <ul>
          <li class="nearLists"
              v-for="(item,index) in list"
              :key="index"
              @click="clickAddredd(item)">
            <p class="title">{{item.name}}</p>
            <p class="subTitle">{{item.address}}</p>
          </li>
        </ul>
      </van-cell-group>
    </ul>
  </div>
</div>
</template>

<script>
import PubSub from 'pubsub-js'
import { LOCATION_ADDRESS } from '../../../../config/pubsub_type'
import { setLocalStore } from '../../../../config/global'
import VueAMap from 'vue-amap'
import Vue from 'vue'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  // 申请的高德key
  key: 'cde7aa4cab0681d34ddb6916431125b2',
  // 插件集合所有的
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch',
    'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType',
    'AMap.PolyEditor', 'AMap.CircleEditor',
    'AMap.Geolocation'],
  uiVersion: '1.0',
  v: '1.4.4'  
});
export default {
  name: 'Map',
  data() {
    var me = this;
    me.city = me.city || '成都';
    return {
      showMap: true,
      list: [],
      currentLocation: [],
      currIndex: 0,
      zoom: 16,
      center: [114.397169, 30.50576],
      events: {
        init: (o) => {
          o.setCity(me.city, result => {
            me.center = result;
            if (result && result.length > 0) {
              me.zoom = 16;
              me.makerConf.position = result;
              me.getList(result);
            }
          });         
        },
        // 拖拽
        "dragend": function (e) {
          var point = this.getCenter();
          var pos = [point.lng, point.lat];
          me.makerConf.position = [point.lng, point.lat];
          me.getList(pos);          
        },
      },
      makerConf: {
        position: [114.397169, 30.50576],
        content: ""        
      },
      searchOption: {
        city: me.city,
        citylimit: true
      },
      plugin: [
        'Scale',
        {
          pName: 'Geolocation',
          events: {
            init (o) {
              // 获取当前位置
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  me.$nextTick();
                }
              });
            },
            complete: function (result) {
              //定位成功
              var address = result.formattedAddress
              var point = result.position;
              var obj = {
                address: address,
                name: "",
                location: point
              }
              me.makerConf.position = [point.lng, point.lat];
              me.getList([point.lng, point.lat]);
            },
            error: function () {
            }
          }
        }
      ]            
    }
  },
  methods: {
    clickAddredd(item) {
    //发通知给Header组件修改名称      
      PubSub.publish(LOCATION_ADDRESS, item.name);
      setLocalStore('userLocation', item.name);
      this.$router.back();

    },
    onClickLeft() {
      this.$router.back();
    },
    getList: function (result) {
      //获取列表
      var me = this;
      me.$Geocoder({
        lnglatXY: result,
        success: function (res) {
          if (res.regeocode && res.regeocode.pois) {
            me.list = res.regeocode.pois;
          } else {
            me.list = [];
          }
        },
        error: function (res) {
          me.list = [];
        }
      });      
    },
    //将坐标点转化为，详细地址
    $Geocoder (options) {
      options = options || {};
      if (AMap) {
        AMap.plugin(['AMap.Geocoder'], () => {
          const geocoder = new AMap.Geocoder({
            radius: options.radius || 1000,
            extensions: options.extensions || "all"
          })
          var lnglatXY = options.lnglatXY || [114.397169, 30.50576]; //已知点坐标
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              options.success && options.success(result);
            } else {
              options.error && options.error(status, result);
            }
          });
        });
      }
    }    
  }
}
</script>
<style scoped lang="less">
.wrapper{
  position: fixed;  
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background-color: #f5f5f5;
  .adrs{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: calc(100vh);
    .title {
      color: black;
      font-size: 0.8rem;
    }
    .subTitle {
      color: grey;
      font-size: 0.6rem;
    }     
  }
  .amap-page-container {
    margin-top: 1.5rem;
    height: 10rem;
  }
  .amap-map{
    height: 10rem;
  }
}
</style>