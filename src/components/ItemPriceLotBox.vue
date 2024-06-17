

<template>
  <div>
    <table>
      <tr>
        <td style="width:5%;">
          <button class="button is-small" @click="changeCondition(); is_updated=true;">{{ this.form.new_used }}</button>
        </td> 
        <td style="width: 20%;">
        <div class="field">
              <div class="control has-icons-left">
                  <input class="input is-small" :class="{'is-info': inventory_updated}" type="text" v-model="form.inventory" title="Inventory" readonly>
                  <span class="icon is-small is-left">
                      <i class="fa fa-cubes-stacked"></i>
                  </span>
              </div>
          </div>  
        </td> 
        <td style="width: 20%;">
        <div class="field">
              <div class="control has-icons-left">
                  <input class="input is-small" :class="{'is-danger': price_out_of_range}" type="number" v-model="form.price" title="Price" @keyup="is_updated=true;">
                  <span class="icon is-small is-left">
                      <i class="fa fa-dollar"></i>
                  </span>
              </div>
              <p class="help has-text-centered" style="font-size: 8px;margin-top: 0px;" v-if="form.new_used=='N'||form.new_used=='U'">{{ price_string }}</p>
          </div> 
        </td> 
        <td>
        <div class="field">
              <div class="control has-icons-left">
                  <input class="input  is-small" type="text" v-model="form.description" title="Description" @keyup="is_updated=true;">
                  <span class="icon is-small is-left">
                      <i class="fa fa-comment"></i>
                  </span>
              </div>
          </div> 
        </td> 
        <td style="width: 20%;">
        <div class="field">
              <div class="control has-icons-left">
                  <input class="input  is-small" type="text" v-model="form.quantity" title="Quantity to Add" @keyup="is_updated=true;">
                  <span class="icon is-small is-left">
                      <i class="fa fa-plus"></i>
                  </span>
              </div>
          </div> 
        </td> 
        <td style="width: 10%;">
        <button class="button is-small" :class="{'is-light': !is_updated, 'is-info': is_updated, 'is-loading': in_progress }" style="width: 100%;" @click="addUpdateInventoryRequest()">
            <span v-if="this.form.lot_id.length > 0">Update</span>
            <span v-if="this.form.lot_id.length < 1">Add</span>
          </button>
        </td>
      </tr>
      <tr v-if="is_error"><td colspan="6"><div class="notification is-danger m-0 p-1 pl-3 pr-3"> {{ error_message }}</div></td></tr>
    </table>
  </div> 

</template>

<style scoped>
td {
  padding-right: 2px;
  margin: 0px;
}
</style>

<script>
import { userStore } from '../store/user_store.js';
import * as UserRequests from '../requests/user_requests.js'

export default {
  name: 'ItemPriceLotBox',
  data() {
    return {
      userStore: userStore,
      userData: userStore.state.user.data,
      lot_internal: {},
      form: {
        lot_id: '',
        new_used: '',
        inventory: '',
        price: '',
        description: '',
        quantity: '',
      },
      is_updated: false,
      in_progress: false,
      inventory_updated: false,
      is_error: false,
      error_message: '',
      price_data: {
        price_min: 0,
        price_avg: 0,
        price_qty_avg: 0,
        price_max: 0,
        currency: '',
        suggested_price: 0,
        warning_low: 0,
        warning_high: 0,
      },
    }
  },
  props: {
    item: { 
      type: {
        type: Object
      }
    },
    colour: { 
      type: {
        type: Object
      }
    },
    lot: { 
      type: {
        type: Object
      }
    },
    prices: { 
      type: {
        type: Object
      }
    },
  },
  mounted() {
    // console.log('ItemPriceLotBox mounted aka One Inventory Lot');
    // console.log(this.item);
    // console.log(this.lot);
    // console.log(this.userData)
    // console.log(this.prices);
    // Set Form
    this.form.lot_id = this.lot.external_id;
    this.form.inventory = this.lot.quantity;
    this.form.price = this.lot.unit_price
    this.form.description = this.lot.description;
    this.form.quantity = '';
    this.form.new_used = this.lot.new_used;
    if (typeof this.userData.settings.default_item_condition === "undefined"){
      this.userData.settings.default_item_condition = '?';
    }
    if (this.form.new_used != 'U' && this.form.new_used != 'N') {
       if (this.userData.settings.default_item_condition.toLowerCase() == 'used'){
        this.form.new_used = 'U';
      }else if (this.userData.settings.default_item_condition.toLowerCase() == 'new'){
        this.form.new_used = 'N';
      }
    }
    // Get and show price data
    this.findRelevantPrice();
    this.findSuggestedPrice();
    this.calcAcceptableRange();
    if (this.form.lot_id.length < 1){
      this.form.price = this.price_data.suggested_price.toFixed(2);
      this.setDefaultDescription();
    }
  },
  computed: {
    is_exisiting_inventory() {
      if (this.form.lot_id.length > 0){
        return true;
      }
      return false;
    },
    price_string() {
      // Go through each price and find the new price
      if (this.price_data.currency != ''){
        return "("+this.price_data.currency+") $"+this.price_data.price_min.toFixed(2)+" - "+"$"+this.price_data.price_avg.toFixed(2)+" - $"+this.price_data.price_max.toFixed(2);
      }else{
        return "$"+this.price_data.price_min.toFixed(2)+" - "+"$"+this.price_data.price_avg.toFixed(2)+" - $"+this.price_data.price_max.toFixed(2);
      } 
    },
    price_out_of_range() {
      if (this.form.price < this.price_data.warning_low || this.form.price > this.price_data.warning_high){
        return true;
      }
      return false;
    }
  },
  methods: {
    async addUpdateInventory(data) {
            const response = await UserRequests.addUpdateInventoryUserQuery(userStore.state.user.data.id, data);
            console.log(response);
            if (response.meta.error_code == 0){
              this.form.inventory = response.data.updated_item.quantity
              this.form.quantity = '';
              this.inventory_updated = true;
              this.is_error = false;
              this.error_message = '';
              if (this.form.lot_id.length < 1) {
                  this.form.lot_id = response.data.updated_item.inventory_id.toString();
              }
              // Update User Store Inventory + value
              // Update Inventory total
            }else{
              this.is_error = true;
              if (response.meta.error_code == 1){
                this.error_message = response.meta.message;
              }else{
                this.error_message = "Failed to update inventory."
              }
            }
            this.in_progress = false;
            this.is_updated = false;
        },
    addUpdateInventoryRequest(){
      this.in_progress = true;
      let data = { 'quantity': this.form.quantity,
                   'unit_price': this.form.price,
                   'description': this.form.description};
      if (this.form.lot_id.length > 1) {
        // update data
        data['inventory_id'] = this.form.lot_id;
      }else{
        // add data
        data['item'] = {'no': this.item.external_id, 'type': this.item.type.toLowerCase()};
        if (this.colour.external_id) {
          if (this.colour.external_id.length > 0)
          data["colour_id"] = this.colour.external_id;
        }
        data["new_or_used"] = this.form.new_used;
      }
      let resp = this.addUpdateInventory(data);
      console.log('Inventory Updated:');
      console.log(resp);

    },
    changeCondition(){
      if (this.form.lot_id.length > 0){
        return;
      }
      if (this.form.new_used == 'N'){
        this.form.new_used = 'U';
      } else {
        this.form.new_used = 'N';
      }
      this.findRelevantPrice();
      this.findSuggestedPrice();
      this.calcAcceptableRange();
      if (this.form.inventory < 1 ){
        this.form.price = this.price_data.suggested_price.toFixed(2);
        this.setDefaultDescription();
      }
    },
    findRelevantPrice(){
      let ss = 'sold';
      if (this.userData.settings.base_price_off == 'selling'){
        ss = 'stock';
      }
      if (this.prices) {
        for (let i = 0; i < this.prices.length; i++) {
          if (this.prices[i].new_used == this.form.new_used && this.prices[i].sold_selling == ss){
            this.price_data.price_min = this.prices[i]['price_min'];
            this.price_data.price_avg = this.prices[i]['price_avg'];
            this.price_data.price_qty_avg = this.prices[i]['price_qty_avg'];
            this.price_data.price_max = this.prices[i]['price_max'];
            if (this.prices[i].currency != this.userData.account.settings.currency_code){
              this.price_data.currency = this.prices[i]['currency'];
            }else{
              this.price_data.currency = '';
            }
          }
        }
      }
      // console.log('Found Relevant Price Data');
      // console.log(this.price_data);
    },
    findSuggestedPrice(){
      // Check Defaults
      if (typeof this.userData.settings.price_multiplier === "undefined"){
        this.userData.settings.price_multiplier = 1;
      }
      if (typeof this.userData.settings.add_to_price === "undefined"){
        this.userData.settings.add_to_price = 0;
      }
      if (typeof this.userData.settings.warn_below === "undefined"){
        this.userData.settings.warn_below = 80;
      }
      if (typeof this.userData.settings.warn_above === "undefined"){
        this.userData.settings.warn_above = 120;
      }

      // Find Suggested price
      this.price_data.suggested_price = 0
      // TODO Confirm wording of statistic
      if (this.userData.settings.statistic == 'low'){
        this.price_data.suggested_price = parseFloat(this.price_data.price_low);
      }else if (this.userData.settings.statistic == 'high'){
        this.price_data.suggested_price = parseFloat(this.price_data.price_high);
      }else{
        this.price_data.suggested_price = parseFloat(this.price_data.price_avg);
      }
      this.price_data.suggested_price = this.price_data.suggested_price * parseFloat(this.userData.settings.price_multiplier) + parseFloat(this.userData.settings.add_to_price);
    },
    calcAcceptableRange(){
      // Calculate acceptable range
      this.price_data.warning_low =  this.price_data.suggested_price * (parseFloat(this.userData.settings.warn_below)/100);
      this.price_data.warning_high = this.price_data.suggested_price * (parseFloat(this.userData.settings.warn_above)/100);
    },
    setDefaultDescription(){
      //set to lowercase
      if (this.item.type.toLowerCase() == 'part') {
        if (typeof this.userData.settings.default_note_part !== "undefined"){
          this.form.description = this.userData.settings.default_note_part;
        }
      }else if (this.item.type.toLowerCase() == 'set'){
        if (typeof this.userData.settings.default_note_set !== "undefined"){
          this.form.description = this.userData.settings.default_note_set;
        }
      }else if (this.item.type.toLowerCase() == 'minifig'){
        if (typeof this.userData.settings.default_note_minifig !== "undefined"){
          this.form.description = this.userData.settings.default_note_minifig;
        }
      }else if (this.item.type.toLowerCase() == 'book'){
        if (typeof this.userData.settings.default_note_book !== "undefined"){
          this.form.description = this.userData.settings.default_note_book;
        }
      }else if (this.item.type.toLowerCase() == 'gear'){  
        if (typeof this.userData.settings.default_note_gear !== "undefined"){
          this.form.description = this.userData.settings.default_note_gear;
        }
      }else if (this.item.type.toLowerCase() == 'catalog'){
        if (typeof this.userData.settings.default_note_catalog !== "undefined"){
          this.form.description = this.userData.settings.default_note_catalog;
        }
      }else if (this.item.type.toLowerCase() == 'instruction'){
        if (typeof this.userData.settings.default_note_instruction !== "undefined"){
          this.form.description = this.userData.settings.default_note_instruction;
        }
      }else if (this.item.type.toLowerCase() == 'Original Box'){
        if (typeof this.userData.settings.default_note_box !== "undefined"){
          this.form.description = this.userData.settings.default_note_box;
        }
      }

    }
  },
}
</script>
