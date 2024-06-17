<template>
  <div class="home">
    <div class="columns">
      <div class="column is-one-fifth"><StatsBox/></div>
      <div class="column"><HomeInfoBox /></div>
    </div>
  </div>
</template>

<script>

import StatsBox from '@/components/StatsBox.vue'
import HomeInfoBox from '@/components/HomeInfoBox.vue'

export default {
  name: 'HomeView',
  components: {
    StatsBox,
    HomeInfoBox
  }, 
}
</script>

<style scoped>
table {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>

