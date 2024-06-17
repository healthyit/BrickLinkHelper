<template>
  
  <div v-if="userStore.state.user.isLoggedIn" class="notification is-danger">
    You are already logged in. Please log out before creating a new account.
  </div>
  <div v-if="registration_success" class="notification is-success">
    Your account is being created. Please check you emails for an account confirmation link to complete registration.
  </div>
  <div class="box theme-white" v-if="!userStore.state.user.isLoggedIn && !registration_success">
    <h1 class="title">Create an account</h1>
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
              <input class="input" type="password" id="password" autocomplete="new-password" placeholder="********" v-model="form.password"  @keyup="checkFormValid()" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm Password *</label>
            <div class="control">
              <input class="input" type="password" id="password_confirm" autocomplete="new-password" placeholder="********" v-model="form.password_confirm"  @keyup="checkFormValid()" required>
            </div>
            <p v-if="password_confirm_invalid" class="help is-danger">Confirm password does not match</p>
          </div>
          <label class="checkbox">
            <input type="checkbox" v-model="form.tac" id="tac" @change="checkFormValid()" required>
            I agree to the <router-link to="/termsandconditions">terms and conditions</router-link>
          </label>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" id="name_first" autocomplete="given-name" placeholder="e.g. Alex" v-model="form.name_first">
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" type="text" id="name_last" autocomplete="family-name" placeholder="e.g. Smith" v-model="form.name_last">
            </div>
          </div>
          <div class="field">
            <label class="label">Country</label>
            <div class="select">
              <select id="country"  v-model="form.country" autocomplete="country">
                <option v-for="country in countries" :value="country.value" :key="country.value">{{ country.name }}</option>
              </select>
            </div>
          </div>
        </div>  
      </div>
      <article v-if="registration_error" class="message is-danger">
        <div class="message-body">
          <p v-for="message in registration_error_messages" :key="message">{{ message }}</p>
        </div>
      </article>
      <button v-if="registration_in_progress == false" type="button" class="button is-primary" id="create-button" :disabled="!form_validated" @click="handleSubmit()">Create Account</button>
    </form>
  </div>
</template>



<script>
import { userStore } from '../store/user_store.js'
import * as UserRequest from '../requests/user_requests.js'

  
  export default {
    name: 'UserRegisterView',
    methods: {
      validEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      },
      checkFormValid() {
        if (this.form.username && this.form.password && this.form.password_confirm && this.form.tac) {
          this.form_validated = true;
        } else {
          // If length of username is > 0, then check if it is a valid email
          if (this.form.username.length > 0) {
            this.username_invalid = !(this.validEmail(this.form.username));
          }else{
            this.username_invalid = false;
          }
          if (this.form.password_confirm.length > 0  && this.form.password !== this.form.password_confirm) {
            this.password_confirm_invalid = true;
          } else {
            this.password_confirm_invalid = false;
          }
          this.form_validated = false;
        }
      },
      async register() {
        let resp = await UserRequest.registerUserQuery(this.form);
        console.log(resp);
        if (resp.meta.error_code === 0) {
          this.registration_in_progress = false;
          this.registration_success = true;
        } else {
          this.registration_in_progress = false;
          this.registration_error = true;
          this.registration_error_messages.push('There was an error creating your account: '+ resp.error_message +'.');
          this.registration_error_messages.push(' Please try again or contact us for assistance.');

        }
      },
      handleSubmit() {
        this.registration_in_progress = true;
        this.registration_error = false;
        this.registration_error_messages = [];
        
        if (this.validEmail(this.form.username)) {
          this.registration_error = false;
        } else {
          this.registration_error = true;
          this.registration_error_messages.push('You have entered an invalid email address.');
        }
        if (this.form.password !== this.form.password_confirm) {
          this.registration_error = true;
          this.registration_error_messages.push('Password and confirm password must match.'); 
        }
        if (this.registration_error) {
          this.registration_error_messages.push('Please correct the above errors and try again.');
          this.registration_in_progress = false;
          return;
        }
        this.register();
        


        // this.$router.push({ path: '/' })

        // this.$store.dispatch('userRegister', this.form).then(() => {
        //   this.$router.push('/user/login');
        // }).catch((error) => {
        //   this.login_error = true;
        //   this.login_error_message = error.response.data.message;
        // });
      }
    },
    // End Methods
    data() {
      return {  
        userStore: userStore, 
        form: {
          username: '',
          password: '',
          password_confirm: '',
          name_first: '',
          name_last: '',
          country: '',
          tac: false,
        },
        registration_in_progress: false,
        registration_error: false,
        registration_error_messages: [],
        registration_success: false,
        username_invalid: false,
        password_confirm_invalid: false,
        form_validated: false,
        countries: [
            {value: "AR", name: "Argentina"},
            {value: "AM", name: "Armenia"},
            {value: "AU", name: "Australia"},
            {value: "AT", name: "Austria"},
            {value: "BH", name: "Bahrain"},
            {value: "BY", name: "Belarus"},
            {value: "BE", name: "Belgium"},
            {value: "BA", name: "Bosnia and Herzegovina"},
            {value: "BR", name: "Brazil"},
            {value: "BN", name: "Brunei"},
            {value: "BG", name: "Bulgaria"},
            {value: "CA", name: "Canada"},
            {value: "CL", name: "Chile"},
            {value: "CN", name: "China"},
            {value: "CO", name: "Colombia"},
            {value: "CR", name: "Costa Rica"},
            {value: "HR", name: "Croatia"},
            {value: "CY", name: "Cyprus"},
            {value: "CZ", name: "Czech Republic"},
            {value: "DK", name: "Denmark"},
            {value: "EC", name: "Ecuador"},
            {value: "EG", name: "Egypt"},
            {value: "SV", name: "El Salvador"},
            {value: "EE", name: "Estonia"},
            {value: "FI", name: "Finland"},
            {value: "FR", name: "France"},
            {value: "GE", name: "Georgia"},
            {value: "DE", name: "Germany"},
            {value: "GR", name: "Greece"},
            {value: "HK", name: "Hong Kong"},
            {value: "HU", name: "Hungary"},
            {value: "IS", name: "Iceland"},
            {value: "IN", name: "India"},
            {value: "ID", name: "Indonesia"},
            {value: "IE", name: "Ireland"},
            {value: "IL", name: "Israel"},
            {value: "IT", name: "Italy"},
            {value: "JP", name: "Japan"},
            {value: "KZ", name: "Kazakhstan"},
            {value: "KG", name: "Kyrgyzstan"},
            {value: "LV", name: "Latvia"},
            {value: "LB", name: "Lebanon"},
            {value: "LT", name: "Lithuania"},
            {value: "LU", name: "Luxembourg"},
            {value: "MO", name: "Macau"},
            {value: "MK", name: "Macedonia"},
            {value: "MY", name: "Malaysia"},
            {value: "MT", name: "Malta"},
            {value: "MX", name: "Mexico"},
            {value: "MD", name: "Moldova"},
            {value: "MC", name: "Monaco"},
            {value: "MA", name: "Morocco"},
            {value: "NL", name: "Netherlands"},
            {value: "NZ", name: "New Zealand"},
            {value: "NO", name: "Norway"},
            {value: "OM", name: "Oman"},
            {value: "PK", name: "Pakistan"},
            {value: "PE", name: "Peru"},
            {value: "PH", name: "Philippines"},
            {value: "PL", name: "Poland"},
            {value: "PT", name: "Portugal"},
            {value: "QA", name: "Qatar"},
            {value: "RO", name: "Romania"},
            {value: "RU", name: "Russia"},
            {value: "SM", name: "San Marino"},
            {value: "SA", name: "Saudi Arabia"},
            {value: "RS", name: "Serbia"},
            {value: "SG", name: "Singapore"},
            {value: "SK", name: "Slovakia"},
            {value: "SI", name: "Slovenia"},
            {value: "ZA", name: "South Africa"},
            {value: "KR", name: "South Korea"},
            {value: "ES", name: "Spain"},
            {value: "LK", name: "Sri Lanka"},
            {value: "SE", name: "Sweden"},
            {value: "CH", name: "Switzerland"},
            {value: "TW", name: "Taiwan"},
            {value: "TH", name: "Thailand"},
            {value: "TR", name: "Turkey"},
            {value: "UA", name: "Ukraine"},
            {value: "AE", name: "United Arab Emirates"},
            {value: "UK", name: "United Kingdom"},
            {value: "US", name: "USA"},
            {value: "VE", name: "Venezuela"},
            {value: "VN", name: "Vietnam"},
        ]
      }
    }
    // End Data
  }
</script>../store/user_store.js