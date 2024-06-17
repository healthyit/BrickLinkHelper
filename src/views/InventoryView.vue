<template>
  <div class="columns">
    <div class="column is-one-fifth"><CategoryBox /></div>
    <div class="column"><ItemsBox /></div>
    <div class="column" v-if="appStore.selected_item_has_variations"><ItemColoursBox /></div>
  </div>
</template>

<script>
import CategoryBox from '@/components/CategoryBox.vue'
import ItemsBox from '@/components/ItemsBox.vue'
import ItemColoursBox from '@/components/ItemColoursBox.vue'
import { appStore } from "@/store/app_store";

export default {
  name: 'InventoryView',
  components: {
    CategoryBox,
    ItemsBox,
    ItemColoursBox,
    
  },
  data() {
    return {
      appStore: appStore,
    }
  },
  // computed: {
  //   selected_item_has_variations() {
  //     return this.appStore.selected_item_has_variations;
  //   },
  // },
  // watch: {
  //   selected_item_has_variations() {
  //     console.log("Selected Item Has Variations: "+this.selected_item_has_variations);
  //   },
  // },
}

</script>
