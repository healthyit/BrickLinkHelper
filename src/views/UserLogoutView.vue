<template>
  <div class="box theme-white">
    <h1>You are now logged out.</h1>
  </div>
</template>

<script>
import { userStore } from '../store/user_store.js'
export default {
  name: 'UserLogoutView',
  data() {
    return {
      userStore: userStore,
    }
  },
  mounted() {
    this.userStore.logout();
  }
}
</script>
../store/user_store.js