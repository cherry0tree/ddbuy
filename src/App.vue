<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@import "assets/css/normalize.css";
#app {
  width: 100%;
  height: 100%;
}
* {
  touch-action: pan-y;
}
</style>
