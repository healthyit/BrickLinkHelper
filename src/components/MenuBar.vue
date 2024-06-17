<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link  class="navbar-item" to="/">
      <img src="../assets/logo.png" width="28" height="28">
    </router-link>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">the <span class="pl-1 has-text-weight-bold is-size-4">Quarry</span></router-link>      
      <router-link class="navbar-item" to="/inventory" v-if="store.state.user.isLoggedIn">Inventory</router-link>
      <router-link class="navbar-item" to="/analytics" v-if="store.state.user.isLoggedIn">Analytics</router-link>
      <router-link class="navbar-item" to="/about">About</router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item" v-if="!valid_bricklink_keys"><a href="/user/account/Bricklink/" class="has-text-weight-semibold has-text-danger">Link to Bricklink</a></div>
      <div class="navbar-item" v-if="valid_bricklink_keys">${{ formatPrice(store.state.user.inventory_value) }}</div>
      <div class="navbar-item">
        <div class="buttons">
          <router-link v-if="!store.state.user.isLoggedIn" to="/user/register" class="button is-primary">
            <strong>Sign up</strong>
          </router-link>
          <router-link v-if="!store.state.user.isLoggedIn" to="/user/login"  class="button is-light">
            Log in
          </router-link >
          <router-link v-if="store.state.user.isLoggedIn" to="/user/logout"  class="button is-light">
            Log out
          </router-link >
          <router-link v-if="store.state.user.isLoggedIn" to="/user/account"  class="button is-light">
            <strong>Account</strong>
          </router-link >
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { userStore } from '../store/user_store.js'  
import * as UserRequests from '../requests/user_requests.js'

export default {
    name: 'MenuBar',
    data() {
      return {  
        store: userStore, 
        inventory_syncing: false,
        valid_bricklink_keys: false
        }
      },
      mounted() {
        try {
          userStore.loadState();
          if (userStore.state.user.isLoggedIn && userStore.state.user.data.settings.valid_keys == 'true') {
            this.getInventoryValue();
            this.checkInventory();
            
          }
        } catch (error) {
          console.log('Error loading user state.');
        }
        try {
          if (userStore.state.user.data.settings.valid_keys == 'true') {
            this.valid_bricklink_keys = true;
          }
        } 
        catch (error) {
          console.log('Error checking Bricklink Integration.');
        }
       
      },
      methods: {
        async syncInventory() {
            console.log("Syncing Inventory");
            let resp = await UserRequests.syncInventoryUserQuery(userStore.state.user.data.id);
            console.log("Inventory: ", resp);
            this.inventory_syncing = false;
        },
        async getInventoryValue() {
          let resp = await UserRequests.getInventoryValue(userStore.state.user.data.id);
          userStore.state.user.inventory_value = resp.data.inventory_value
          console.log("Inventory Value: ", resp);
        },
        checkInventory() {
          if (userStore.state.user.isLoggedIn){
            if (userStore.state.user.data.account.settings.inventory_last_sync && !this.inventory_syncing) {
              console.log("Last sync: [" + userStore.state.user.data.account.settings.inventory_last_sync + "]")
              let mins20 = new Date(new Date().getTime() - (20 * 60 * 1000))
              let min20str = mins20.toISOString().replace("T"," ").substring(0, 19)
              // console.log("20 Mins ago: [" + min20str + "]");
              if (min20str > userStore.state.user.data.account.settings.inventory_last_sync){
                this.inventory_syncing = true;
                this.syncInventory();
              }
            }
          }
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
      }

    }
</script>

../store/user_store.js
