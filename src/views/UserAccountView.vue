<template>
  <div v-if="!userStore.state.user.isLoggedIn" class="notification is-danger">
    Account details only visable when logged in..
  </div>
  <div v-else>
    <UserAccountBox />
  </div>
  
</template>


<script>
import { userStore } from '../store/user_store.js'
import UserAccountBox from '@/components/UserAccountBox.vue'

export default {
    name: 'UserAccountView',
    components: {
      UserAccountBox,
    },
    data () {
        return {
            userStore: userStore,
        }
    },
    
  }
</script>