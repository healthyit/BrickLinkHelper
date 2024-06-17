

<template>

  <div class="mt-4">
  <nav class="pagination" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li v-for="page in page_list" :key="page.page" @click="appStore.item_page=page.page">
        <a v-if="!page.is_elip && page.page==appStore.item_page" class="pagination-link is-current" aria-label="{{ page.label }}" >{{ page.page }}</a>
        <a v-if="!page.is_elip && page.page!=appStore.item_page" class="pagination-link " aria-label="{{ page.label }}" >{{ page.page }}</a>
        <span v-if="page.is_elip" class="pagination-ellipsis">&hellip;</span>
      </li>
      
    </ul>
  </nav>
</div>

</template>

<style scoped>
  div {
    display: flex;
    justify-content: center;
  }
</style>

<script>
import { appStore } from "@/store/app_store"; 

export default {
  name: 'ItemPaginationSection',
  data() {
    return {
      appStore: appStore,
      page_list: []
    }
  },
  computed: {
    selected_page() {
      return this.appStore.item_page;
    },
    page_count() {
      return this.appStore.item_page_count;
    },

  },
  mounted() {
    this.initialize();
  },
  watch: {
    selected_page() {
      this.initialize();
    },
    page_count() {
      this.initialize();
    }
  },
  methods: {
    initialize() {
      this.page_list = [];
      let min = appStore.item_page - 5;
      if (min < 1) {
        min = 1;
      }
      let max = min + 9;
      if (max > appStore.item_page_count) {
        max = appStore.item_page_count;
      }
      if (min > 1) {
        this.page_list.push({page: 1, label: 'Page 1', is_elip: false});
      }
      if (min > 2) {
        this.page_list.push({page: min - 1, label: '...', is_elip: true});
      }
      for (let i = min; i <= max; i++) {
        this.page_list.push({page: i, label: 'Page ' + i, is_elip: false});
      }
      if (max < (appStore.item_page_count - 1)) {
        this.page_list.push({page: max + 1, label: '...', is_elip: true});
      }
      if (max < appStore.item_page_count) {
        this.page_list.push({page: appStore.item_page_count, label: 'Page ' + appStore.item_page_count, is_elip: false});
      }
    },
    changePage(page) {
      console.log('changePage: ' + page);
    }
  }
}
</script>
