<template>
<div class="eatWrapper">
  <Search></Search>
  <TodayMenu></TodayMenu>
</div>
</template>

<script>
import Search from './components/Search'
import TodayMenu from './components/TodayMenu'

export default {
  name: 'Eat',
  components: {
    Search,
    TodayMenu
  }
}
</script>
<style scoped>
.eatWrapper {
  background-color: "#f5f5f5";
}
</style>