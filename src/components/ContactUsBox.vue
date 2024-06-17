<template>
<div class="box theme-white">
    <h1 class="title">Contact Us</h1>
    <div v-if="!submitted && !submission_error">
        <form >
        <div class="columns">
            <div class="column">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                <input class="input" type="name" id="name" placeholder="eg John" v-bind="form.name" />
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                <input class="input" type="email" id="email" autocomplete="email" v-bind="form.email"/>
                </div>
                <p class="help">You don't need to provide an email, but it helps and without it we can't contact you.'</p>
            </div>
            </div>
        </div>
            <div class="field">
                <label class="label">Message *</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Your message here" v-bind="form.message"></textarea>
                </div>
            </div>
        <button v-if="!submission_in_progress" type="button" class="button is-primary" @click="handleSubmit()">Send Message</button>
        <span v-if="submission_in_progress" class="icon">
              <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
          </span> 
        
        </form>
    </div>
    <div v-if="submitted " class="notification is-success">
        <p>Thank you for your message. We will get back to you as soon as possible.</p>
    </div>
    <div v-if="submission_error" class="notification is-danger">
      <p v-for="message in submission_error_messages" :key="message">{{ message }}</p>
    </div>
</div>
</template>

<script>
import { userStore } from '../store/user_store.js'
import * as ContactRequest from '../requests/contact_requests.js'

export default {
  name: 'ContactUsBox',
  data() {
    return {
      userStore: userStore,
      form: {
          name: '',
          email: '',
          message: '',
        },
      submitted: false,
      submission_in_progress: false,
      submission_error: false,
      submission_error_messages: []
    }
  },
  mounted() {
      userStore.loadState();
      // TODO Put name and email in form if user is logged in
      // if (userStore.state.user.isLoggedIn) {
      //   this.form.name = userStore.state.user.name;
      //   this.form.email = userStore.state.user.email;
      // }
    },
  methods: {
    handleSubmit() {
      this.submission_in_progress = true
      this.contact()
    },
    async contact() {
        let resp = await ContactRequest.sendContactForm(this.form);
        if (resp['meta']['status'] === 1) {
          this.submitted = true;
          this.submission_in_progress = false;
        } else {
          this.submission_in_progress = false;
          this.submission_error = true;
          this.submission_error_messages.push('There was an error sending you mesage: '+ resp['meta']['message'] +'.');
          this.submission_error_messages.push(' Please try again or contact us for assistance.');
        }
      },
  }
}

</script>../store/user_store.js
