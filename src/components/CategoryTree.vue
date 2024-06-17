<template>
      <ul class="menu-list is-medium">
          <span v-if="isLoading" class="icon">
              <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
          </span> 
          
          <li v-for="category in categories" :key="category.id" >  
            <span v-if="category.id== this.appStore.selected_category" v-focus></span>
            <a :class="[ category.id== this.appStore.selected_category ? 'is-active' : '' ]"  @click="selectCategory(category)">
            <span class="cust-icon-icon-shell">
              <!-- <img v-if="!expanded[category.id] && category.has_children" src="../assets/fontawesome/svgs/solid/caret-right.svg" class="cust-list-icon" @click="expanded[category.id]=!expanded[category.id]"/> -->
              <span class="icon" v-if="!expanded[category.id] && category.has_children" >
                <i class="fa fa-solid fa-caret-right" @click="toggleCategory(category); "></i>
              </span>
              <span class="icon" v-if="expanded[category.id] && category.has_children" >
                <i class="fa fa-solid fa-caret-down" @click="toggleCategory(category)"></i>
              </span>
              <img v-if="!category.has_children" class="cust-list-icon" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="/>
            </span>
              <span>{{category.name}}</span></a>
              <CategoryTree v-if="expanded[category.id]" :parent_category_id="category.id"/>
          </li>
      </ul>
</template>

<style>

.cust-list-icon-shell {
  width: 40px;
  height: 20px;
  padding-right: 20px;
  display: inline-block;
}
.cust-list-icon {
  width: 20px;
  height: 20px;
}

</style>

<script>
import { fetchCategories } from "../requests/config_requests";
import { appStore } from "@/store/app_store"; 


export default {
  name: 'CategoryTree',
  props: {
    parent_category_id: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      appStore: appStore,
      categories: [],
      expanded: {},
      isLoading: true
    }
  },
  mounted() {
    console.log("CategoryTree mounted");
    this.initialize();
  },
  methods: {
    async initialize() {
      
      this.isLoading = true;
      // Load expanded categories from local storage
      this.expanded = JSON.parse(localStorage.expanded || '{}');
      // Load selected category from local storage
      this.selectedCategory = (JSON.parse(localStorage.selectedCategory || '{}')).id;
      // Load category tree from API
      try {
        if (this.parent_category_id == 0) {
          const response = await fetchCategories();
          this.categories = response.data;
        } else {
          const response = await fetchCategories(this.parent_category_id);
          this.categories = response.data;
        }
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    toggleCategory(category) {
      if (category.parent_category_id === null) {
        
        if (this.expanded[category.id]) {
          this.expanded = {};  
        } else {
          this.expanded = {};
          this.expanded[category.id] = true;
        }
      }else{
        this.expanded[category.id] = !this.expanded[category.id];
      }
      localStorage.expanded = JSON.stringify(this.expanded);
    },
    selectCategory(category) {
      this.appStore.selected_category = category.id
      this.appStore.selected_category_name = category.name;
      this.appStore.selected_item = {};
      this.appStore.selected_item_has_variations = false;
    }
  }
}

</script>
../fetch/config_requests