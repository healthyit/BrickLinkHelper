

<template>
    <div class="box">
        <h1 class="title">Categories</h1>
        <div class="scroll-box">
          <CategoryTree />
        </div>
    </div>    
      
</template>

<style scoped>
.scroll-box {
  height: 74vh;
  overflow-y: auto;
}
</style>

<script>
import CategoryTree from '@/components/CategoryTree.vue'

export default {
  name: 'CategoryBox',
  components: {
    CategoryTree,
  },
  data() {
    return {
    }
  },
}

</script>
