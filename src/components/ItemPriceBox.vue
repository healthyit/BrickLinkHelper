

<template>
  <table>
    <tr>
      <td style="width: 16px;vertical-align: bottom; padding-right: 2px;">
        <button class="button is-small" style="margin-bottom: 12px;" @click="addRow()">+</button>
      </td>
      <td>
        <div v-for="inv in lot" :key="inv">
          <ItemPriceLotBox :item="item" :colour="colour" :lot="inv" :prices="prices"/>
        </div>
      </td>
  </tr>
</table>
  
  
</template>

<script>
import { userStore } from '../store/user_store.js'
import ItemPriceLotBox from "./ItemPriceLotBox.vue";

export default {
  name: 'ItemPriceBox',
  components: {
    ItemPriceLotBox,
  },
  data() {
    return {
      lot: [],
      prices: [],
      userStore: userStore,
      
    }
  },
  props: {
    item: { 
      type: {
        type: Object
      },
    },
    colour: { 
      type: {
        type: Object
      },
    },
  },
  watch: {
    item: {
      handler: function(){
        this.find_lot();
      },
    },
    colour: {
      handler: function(){
        this.find_lot();
      },
    }
  },
  mounted() {
    this.find_lot();
  },
  methods: {
    find_lot() {
      if (this.colour){
        // passed Colour
        this.prices = this.colour.prices; 
        if (this.colour.inventory.length > 0){
          this.lot = this.colour.inventory;
        }else{
          this.lot = [{'external_id': '', 'new_used': '', 'inventory': '', 'price': '', 'note': '', 'quantity': ''}];
        }           
      }else{
        // Not passed Colour
        if (this.item.colours && this.item.colours.length == 1){
          this.lot = this.item.colours[0].inventory;
          this.prices = this.item.colours[0].prices;
        }else{
          this.lot = this.item.inventory;
          this.prices = this.item.prices;
        }
        if (this.lot.length == 0){
          this.lot = [{'external_id': '', 'new_used': '', 'inventory': '', 'price': '', 'note': '', 'quantity': ''}];
        }
      }
    },
    addRow() {
      this.lot.push({'external_id': '', 'new_used': '', 'inventory': '', 'price': '', 'note': '', 'quantity': ''});
    },
  },
  
}
</script>
