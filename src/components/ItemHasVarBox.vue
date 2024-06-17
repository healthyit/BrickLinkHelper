<template>
  <div class="box mb-2 is-light" @click="itemClicked()">
    <article class="media">
      <div class="media-left">
        <figure class="image is-96x96 is-square">
          <img :src="item_data.image_url" :alt="item_data.name" v-if="item.image_url">
        </figure>
      </div>
      <div class="media-content">
        <h1 class="title is-6 pb-1 mb-1">{{ item_data.external_id }} <span @click="syncItem(item_data.id)">-</span> {{ item_data.name }} </h1>
        <div class="columns mb-1 pb-0">
          <div class="column is-size-7 p-1">Size: {{ item_data.dimensions_cm}}</div>
          <div class="column is-size-7 p-1">Weight: {{ item_data.weight_g}}g</div>
          <div class="column is-size-7 p-1">Released: {{ item_data.years_released}}</div>
        </div>
        <div>
          <span v-for="colour in item_data.colours" :key="colour.id"><span class="icon m-1" :style="'background-color: #'+colour.rgb_code+';'" :title="colour.name">&nbsp;</span></span>
        </div>
        </div>
    </article>
  </div>

</template>

<script>
import { appStore } from "@/store/app_store"; 
import { triggerItemSync } from '../requests/config_requests.js'

export default {
  name: 'ItemFilter',
  data() {
    return {
      appStore: appStore,
      item_data: {},
    }
  },
  props: {
    item: { 
      type: Object
    }
  },
  mounted() { 
    this.item_data = this.item;
  },  
  methods: {
    itemClicked(){
      console.log(this.item_data);
      appStore.selected_item = this.item_data;
      if (this.item_data.colours.length > 1){
        appStore.selected_item_has_variations = true; 
      }
    },
    async syncItem(item_id){
        await triggerItemSync(item_id);
    },
  }
}
</script>
