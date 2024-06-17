<template>
    <div v-if="userStore.state.user.isLoggedIn" class="notification is-danger">
      You are already logged in. Please log out before creating a new account.
    </div>
    <div class="box theme-white" v-if="!userStore.state.user.isLoggedIn">
      <h1 class="title">Log in to the Quarry</h1>
      <form @sumbit.prevent="handleSubmit">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Email (Username) *</label>
              <div class="control">
                <input class="input" type="email" id="username" autocomplete="email" placeholder="e.g. alex@example.com" v-model="form.username"  @keyup="checkFormValid()" required>
              </div>
              <p v-if="username_invalid" class="help is-danger">This email is invalid</p>
            </div>
            <div class="field">
              <label class="label">Password *</label>
              <div class="control">
                <input class="input" type="password" id="password" autocomplete="password" placeholder="********" v-model="form.password"  @keyup="checkFormValid()" required>
              </div>
            </div>
          </div>
        </div>
        <article v-if="error" class="message is-danger">
          <div class="message-body">
            <p v-for="message in error_messages" :key="message">{{ message }}</p>
          </div>
        </article>
        <button v-if="!in_progress" type="button" class="button is-primary" id="create-button" :disabled="!form_validated" @click="handleSubmit()">Log in</button>
        <span v-if="in_progress" class="icon">
              <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
          </span> 
      </form>
    </div>
  </template>
  
<script>
  import { userStore } from '../store/user_store.js'
  import * as UserRequests from '../requests/user_requests.js'

  export default {
    name: 'LoginBox',
    data() {
      return {
        userStore: userStore,
        form: {
            username: '',
            password: '',
          },
        in_progress: false,
        error: false,
        error_messages: [],
        username_invalid: false,
        form_validated: false,
      }
    },
    mounted() {
      console.log('LoginBox');
      userStore.loadState();
    },
    methods: {

      validEmail(email) {
            // eslint-disable-next-line no-useless-escape
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
          },
      checkFormValid() {
          if (this.form.username && this.form.password ) {
            this.form_validated = true;
          } else {
            // If length of username is > 0, then check if it is a valid email
            if (this.form.username.length > 0) {
              this.username_invalid = !(this.validEmail(this.form.username));
            }else{
              this.username_invalid = false;
            }
            this.form_validated = false;
          }
      },
      async login() {
        let resp = await UserRequests.loginUserQuery(this.form.username, this.form.password);
        if (resp['meta']['error_code'] === 0) {
          this.in_progress = false;
          this.userStore.login(this.form.username, this.form.password, resp['data']['jwt'])
          this.$router.push('/');
          
      } else {
          this.in_progress = false;
          this.error = true;
          this.error_messages.push('There was an error logging you in: '+ resp['meta']['message'] +'.');
          this.error_messages.push(' Please try again or contact us for assistance.');
        }
      },
      handleSubmit() {
        this.in_progress = true;
        this.error = false;
        this.error_messages = [];
        this.login();
      },
    },
  }
  </script>
  