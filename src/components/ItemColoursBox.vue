<template>
  <div class="box item-box">
    <h1 class="title">{{ item_data.name }}</h1>
    <div class="notification is-danger" v-if="user_preferences_warn_level==2">
      We can help suggest prices for you. Why not set your <a href="/user/account/Preferences/">price preference</a> in the settings?
    </div>
    
    <div class="scroll-box">
      <div class="mb-2" v-for="colour in item_data.colours" :key="colour.id">
        <div class="block pl-2 pt-1 pb-1 mt-0 mb-1" :style="'background-color: #'+colour.rgb_code+';'" :title="colour.name" >{{ colour.name }} </div>
        <ItemPriceBox :item="item_data" :colour="colour" />
      </div>
    </div>
    <div class="notification is-warning" v-if="user_preferences_warn_level==1">
      We can help suggest prices for you. Why not set your <a href="/user/account/Preferences/">price preference</a> in the settings?
      <div v-if="(user_preferences_message.length > 1)" class="is-size-7"><br>{{ user_preferences_message }}</div>
    </div>
  </div>
</template>

<style scoped>
.item-box {
  min-height: 86vh;
}
.scroll-box {
  height: 74vh;
  overflow-y: auto;
}
</style>

<script>
import { appStore } from "@/store/app_store";
import ItemPriceBox from "./ItemPriceBox.vue";
import { userStore } from '../store/user_store.js';

export default {
  name: 'ItemColoursBox',
  components: {
    ItemPriceBox,
  },
  data() {
    return {
      isLoading: true,
      appStore: appStore,
      userStore: userStore,
      userData: userStore.state.user.data,
      item_data: {},
      user_preferences_warn_level: 0,
      user_preferences_message: "",
    }
  },
  computed: {
    selected_item() {
      return this.appStore.selected_item;
    }
  },
  watch: {
    selected_item() {
      this.item_data = this.appStore.selected_item;
    }
  },
  mounted() {
    this.item_data = this.appStore.selected_item;
    this.areUserPreferencesSet();
  },
  methods: {
    areUserPreferencesSet(){
      if (this.userData.settings.default_item_condition.toLowerCase() != 'new' && this.userData.settings.default_item_condition.toLowerCase() != 'used'){
        this.user_preferences_warn_level = 2;
        this.user_preferences_message = 'If you set your default item condition, we can show you a price range for this item.';
        console.log(this.userData.settings.default_item_condition.toLowerCase());
        return;
      }
      if (parseFloat(this.userData.settings.warn_below) < 1 || parseFloat(this.userData.settings.warn_above) < 1){
        this.user_preferences_warn_level = 1;
        this.user_preferences_message = "If you set your default price range, we can warn you when prices are to high or low.\n";
      }
      console.log("PM: "+(this.userData.settings.add_to_price ));
      if (parseFloat(this.userData.settings.price_multiplier) == 0 || 
          this.userData.settings.add_to_price == 'undefined' ||
          this.userData.settings.statistic == ''){
        this.user_preferences_warn_level = 1;
        this.user_preferences_message = this.user_preferences_message + "If you set your Price Algorithum, we can customise your price suggestions.\n";
      }
    }
  }
}

</script>