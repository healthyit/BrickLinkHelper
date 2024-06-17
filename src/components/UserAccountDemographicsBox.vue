<template>
      <div class="box">
        <h1 class="title">Demographics</h1>
        <div class="notification is-success" v-if="is_success">Your account has been successfully updated.</div>
        <div class="notification is-danger" v-if="is_error">There was an error updating your account.</div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">UserName</label>
                    <div class="control">
                        <input class="input" type="text" :value="userData.username" readonly>
                    </div>
                </div>    
            </div>
            <div class="column">
                
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.form.name_first" >
                    </div>
                </div>   
                <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.form.phone_number">
                    </div>
                </div> 
            </div>
            <div class="column"> 
                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.form.name_last">
                    </div>
                </div>  
                <div class="field">
                    <label class="label">Country</label>
                    <div class="control">
                        <div class="select" >
                            <select v-model="form.country">
                                <option v-for="country in countries" :key="country.id" :value="country.value">{{ country.display }}</option>
                            </select>
                        </div>
                    </div>
                </div> 

            </div>
        </div>
        <button class="button is-primary" v-if="!in_progress" @click="save()">Save</button>
        <button class="button is-primary is-loading" v-if="in_progress">Save</button>
        
    </div>  
        
</template>


<script>
import { userStore } from '../store/user_store.js'
import * as UserRequests from '../requests/user_requests.js'
import { fetchConfig } from '../requests/config_requests.js'

export default {
    name: 'UserAccountDemographicsBox',
    data () {
        return {
            userStore: userStore,
            userData: userStore.state.user.data,
            in_progress: false,
            is_success: false,
            is_error: false,
            countries: [],
            form: {
                name_first: '',
                name_last: '',
                phone_number: '',
                country: '',
            }
        }
    },
    mounted() {
        this.form.name_first = userStore.state.user.data.name_first;
        this.form.name_last = userStore.state.user.data.name_last;
        if (userStore.state.user.data.settings.phone_number){
            this.form.phone_number = userStore.state.user.data.settings.phone_number;
        }
        if (userStore.state.user.data.settings.country){
            this.form.country = userStore.state.user.data.settings.country;
        }
        this.get_countries();
    },
    methods: {
        save() {
            this.in_progress = true;
            this.is_success = false;
            this.is_error = false;
            let data = {
                    name_first: this.form.name_first,
                    name_last: this.form.name_last,
                    settings: {
                        phone_number: this.form.phone_number,
                        country: this.form.country,
                    }
                };
            this.saveAPICall(data);
        },
        async saveAPICall(data) {
            let resp = await UserRequests.updateUserQuery(this.userData.id, data);
            if (resp['meta']['error_code'] === 0) {
                this.in_progress = false;
                this.is_success = true;
                this.is_error = false;
                this.userData = resp['data'];
                userStore.storeUser(resp['data']);
            } else {
                this.in_progress = false;
                this.is_error = true;
                this.is_success = false;
            }
        },
        async get_countries() {
            const response = await fetchConfig('countries');
            this.countries = response.data;
        },
    }
}
</script>