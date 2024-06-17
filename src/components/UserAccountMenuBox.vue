<template>
      <div class="box">
        <aside class="menu">
        <p class="menu-label">
            Quarry Account
        </p>
        <ul class="menu-list">
            <li v-for="tab in appStore.state.valid_account_tabs" :key="tab">
                <router-link class="navbar-item" :to="{path: '/user/account/' + tab + '/'}">
                <a v-if="tab==appStore.state.selected_account_tab" class="is-active" @click="appStore.state.selected_account_tab=tab">{{ tab }}</a>
                <a v-if="tab!=appStore.state.selected_account_tab" @click="appStore.state.selected_account_tab=tab">{{ tab }}</a>
               </router-link>
            </li>
        </ul>
        </aside>
      </div>
</template>


<script>
import { userStore } from '../store/user_store.js'
import { appStore } from '../store/app_store.js'
export default {
    name: 'UserAccountMenuBox',
    data () {
        return {
            userStore: userStore,
            appStore: appStore,
        }
    },
}
</script>