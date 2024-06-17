<template>
  <div class="box mb-2 is-light" @click="itemClicked()">
    <article class="media">
      <div class="media-left">
        <figure class="image is-96x96 is-square">
          <a :href="loaded_item.image_url" target="_blank"><img :src="loaded_item.image_url" :alt="loaded_item.name" v-if="loaded_item.image_url"></a>
        </figure>
      </div>
      <div class="media-content">
        <h1 class="title is-6 pb-1 mb-1">{{ loaded_item.external_id }} <span @click="syncItem(loaded_item.id)">-</span> {{ loaded_item.name }} </h1>
        <div class="columns mb-1 pb-0">
          <div class="column is-size-7 p-1">Size: {{ loaded_item.dimensions_cm}}</div>
          <div class="column is-size-7 p-1">Weight: {{ loaded_item.weight_g}}g</div>
          <div class="column is-size-7 p-1">Released: {{ loaded_item.years_released}}</div>
        </div>
        <div>
          <div v-if="has_single_colour" class="block pl-2 pt-1 pb-1 mt-0 mb-1" :style="'background-color: #'+single_colour_code+';'" :title="single_colour_name" >{{ single_colour_name }} </div>
          <ItemPriceBox :item="loaded_item" v-if="synced" />
          <button class="button is-small" :class="{'is-loading': sync_in_progress}" style="width: 100%;" @click="syncItem(loaded_item.id)" v-if="!synced">
            <span>Sync Item</span>
          </button>
        </div>
        </div>
    </article>
  </div> 

</template>

<script>
import { appStore } from "@/store/app_store"; 
import ItemPriceBox from "./ItemPriceBox.vue";
import { triggerItemSync } from '../requests/config_requests.js'

export default {
  name: 'ItemNoVarBox',
  components: {
    ItemPriceBox,
  },
  data() {
    return {
      appStore: appStore,
      synced: false,
      sync_in_progress: false,

      has_single_colour: false,
      single_colour_name: '',
      single_colour_code: '',
      lots: [1, 2],
      loaded_item: {},
    }
  },
  props: {
    item: { 
      type: Object
    }
  },
  mounted() {
    this.loaded_item = this.item;
    this.synced =(this.loaded_item.last_sync_dt_tm.length > 1);
    this.has_single_colour = (this.loaded_item.colours.length == 1);
    if (this.loaded_item.colours.length == 1){
      this.single_colour_name = this.loaded_item.colours[0].name;
    }
    if (this.loaded_item.colours.length == 1){
      this.single_colour_code = this.loaded_item.colours[0].rgb_code;
    }
  },
  methods: {
    async syncItem(item_id){
      if (this.sync_in_progress){
        return;
      }
      this.sync_in_progress = true;
      await triggerItemSync(item_id);
      //reload item
      this.synced = true;
    },
    itemClicked(){
      appStore.selected_item = this.loaded_item;
      if (this.loaded_item.colours.length < 2){
        appStore.selected_item_has_variations = false; 
      }

    }
  }
}
</script>
