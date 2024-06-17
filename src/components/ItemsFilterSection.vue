

<template>
    <div class="columns wrapper" >
        <div class="column is-two-fifths">
          <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Category</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input class="input" type="email" :value="this.appStore.selected_category_name" readonly>
                  </p>
                </div>
              </div>
            </div>

        </div>
        <div class="column is-two-fifths">
          <div class="field  is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Filter</label>
              </div>
            <div class="control has-icons-left">
              <input class="input is-success" type="text" placeholder="Search" v-model="this.filter" v-on:keyup.enter="search()">
              <span class="icon is-small is-left">
                <i class="fa fa-solid fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-one-fifth">
          <button class="button" @click="search()">Search</button>
        </div>
    </div>
</template>


<style scoped>
  .wrapper {
    width: 100%;
    margin-bottom: 10px;
  }

</style>


<script>
import { appStore } from "@/store/app_store"; 
export default {
  name: 'ItemFilter',
  data() {
    return {
      appStore: appStore,
      filter: '',
    }
  },
  computed: {
    selected_category() {
      return this.appStore.selected_category;
    },
  },
  watch: {
    selected_category() {
      this.filter = "";
    },
  },
  mounted() {
    if (this.$route.params.filter) {
      this.filter = this.$route.params.filter;
      this.appStore.item_filter = this.filter;
    }else{
      this.filter = this.appStore.item_filter;
    }
  },
  methods: {
    search() {
      this.appStore.item_filter = this.filter;
    }
  }
}

</script>
