

<template>
  <div class="notification" v-if="!appStore.selected_category && !appStore.item_filter ">
    Choose a Category or Search for something to see items
  </div>
  <span v-if="isLoading" class="icon">
            <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
        </span> 
  <ul v-if="!this.isLoading">
    <li v-for="item in items" :key="item.id">
      <ItemHasVarBox v-if="item.colours.length > 1" :item="item" />
      <ItemNoVarBox v-if="item.colours.length < 2" :item="item" />
    </li>
      
    </ul>
</template>


<script>
import { appStore } from "@/store/app_store";
import { fetchItems } from "../requests/config_requests";
import ItemHasVarBox from "../components/ItemHasVarBox.vue"
import ItemNoVarBox from "../components/ItemNoVarBox.vue"

export default {
  name: 'ItemList',
  components: {
    ItemHasVarBox,
    ItemNoVarBox,
  },
  data() {
    return {
      appStore: appStore,
      isLoading: true,
      items: []
    }
  },
  computed: {
    selected_category() {
      return this.appStore.selected_category;
    },
    selected_page() {
      return this.appStore.item_page;
    },
    name_filter() {
      return this.appStore.item_filter;
    },

  },
  mounted() {
    if (this.$route.params.filter) {
      this.appStore.item_filter = this.$route.params.filter;
    }
    if (!this.appStore.item_filter) {
      this.appStore.item_filter = "";
    }
    this.refresh_list();
  },
  watch: {
    selected_category() {
      appStore.item_page = 1;
      appStore.item_filter = "";
      this.refresh_list();
    },
    selected_page() {
      this.refresh_list();
    },
    name_filter() {
      this.refresh_list();
    },

  },
  methods: {
    async refresh_list() {
      if (this.appStore.selected_category >0 || this.appStore.item_filter.length > 0 ) {
        this.isLoading = true;
        try {
          const response = await fetchItems(appStore.selected_category, appStore.item_filter, appStore.item_page);
          this.items = response.data;
          appStore.item_page_count = response.meta.max_pages;
          appStore.item_page = response.meta.page;
          // Go through items and if external-id = filter preselect the item
          if (appStore.item_filter.length > 0) {
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].external_id == appStore.item_filter) {
                appStore.selected_item = this.items[i];
                if (Array.isArray(this.items[i].colours) && this.items[i].colours.length > 1) {
                  appStore.selected_item_has_variations = true;
                }else{
                  appStore.selected_item_has_variations = false;
                }
              }
            }
          }
          // If only one item, select it
          if (Array.isArray(this.item) && this.item.length == 1) {
            appStore.selected_item = this.items[0];
            if (Array.isArray(this.items[0].colours) && this.items[0].colours.length > 1) {
              appStore.selected_item_has_variations = true;
            }else{
              appStore.selected_item_has_variations = false;
            }
          }
          this.isLoading = false;
        } catch (error) {
          console.log(error);
        }
        
      }else{
        this.items = [];
      }
      this.isLoading = false;
    }
  },
}

</script>
