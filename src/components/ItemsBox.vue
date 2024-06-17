

<template>
    <div class="box">
        <h1 class="title">Items</h1>
        <div class="scroll-box">
          <div><ItemsFilterSection /></div>
          <div><ItemsListSection /></div>
          <div><ItemsPaginationSection /></div>
        </div>

    </div>    
      
</template>

<style>
.scroll-box {
  height: 74vh;
  overflow-y: auto;
}
</style>

<script>
import ItemsFilterSection from '@/components/ItemsFilterSection.vue'
import ItemsListSection from '@/components/ItemsListSection.vue'
import ItemsPaginationSection from './ItemsPaginationSection.vue'

export default {
  name: 'ItemBox',
  components: {
    ItemsFilterSection,
    ItemsListSection,
    ItemsPaginationSection,
  },
  data() {
    return {
    }
  },
}

</script>./ItemsPaginationSection.vue
