<template>
      <div class="box">
        <h1 class="title">Bricklink Account</h1>
        <div class="notification is-success" v-if="is_success">Your account has been successfully updated.</div>
        <div class="notification is-danger" v-if="is_error">There was an error updating your account.</div>
        <div class="content">
            In order for us to interact with your Bricklink account we need API access to update your inventory via the tool. Instructions on how to do get API keys from Bricklink can be found <a href="https://www.bricklink.com/v2/api/register_consumer.page" target="_blank">https://www.bricklink.com/v2/api/welcome.page</a>. Once you have your consumer key and secret, please enter them below. These are like usernames and passwords for your account. We take their security seriously and are stored encrpted. Event with these key there is opnly a limited set of things that can be done and we don;t have an access to your account details payment etc. A list of what can be done can be found here: <a href="https://www.bricklink.com/v3/api.page" target="_blank">https://www.bricklink.com/v3/api.page</a>.
        </div>
        <form>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Consumer Key</label>
                    <div class="control">
                        <input class="input" type="text" v-model="this.form.consumer_key">
                    </div>
                </div>    
                <div class="field">
                    <label class="label">Consumer Secret</label>
                    <div class="control">
                        <input class="input" type="password" v-model="this.form.consumer_secret">
                    </div>
                </div> 
                <div class="field" v-if="!in_progress">
                    <div class="control">
                        <button class="button is-primary"  style="width:240px;" @click="save()">Confirm Keys and Save</button>
                    </div>
                </div>
                <div class="field" v-if="in_progress">
                    <div class="control">
                        <button class="button is-primary is-loading"  style="width:240px;">Confirm Keys and Save</button>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Access Token Value</label>
                    <div class="control">
                        <input class="input" type="text" v-model="form.token_key">
                    </div>
                </div>    
                <div class="field">
                    <label class="label">Access Token Secret</label>
                    <div class="control">
                        <input class="input" type="password" v-model="form.token_secret">
                    </div>
                </div> 
                <div class="field">
                    <div class="control" v-if="keys_saved && in_validation">
                        <button class="button is-light is-loading" style="width:240px;" disabled>Unconfirmed</button>
                    </div>
                    <div class="control"  v-if="!in_validation && is_valid">
                        <button class="button is-success" style="width:240px;" disabled>Confirmed</button>
                    </div>
                    <div class="control"  v-if="!in_validation && !is_valid">
                        <button class="button is-danger" style="width:240px;" disabled>Key Invalid</button>
                    </div>
                </div>
            </div>
        </div>
        </form>
      </div>
      
</template>


<script>
import { userStore } from '../store/user_store.js'
import * as UserRequests from '../requests/user_requests.js'

export default {
    name: 'UserAccountBrickLinkBox',
    data () {
        return {
            userStore: userStore,
            in_progress: false,
            in_validation: false,
            keys_saved: false,
            is_success: false,
            is_error: false,
            is_valid: false,
            form: {
                consumer_key: '',
                consumer_secret: '',
                token_key: '',
                token_secret: '',
            }
        }
    },
    mounted() {
        this.form.consumer_key = userStore.state.user.data.settings.consumer_key;
        this.form.token_key = userStore.state.user.data.settings.token_key;
        if (userStore.state.user.data.settings.valid_keys == 'true') {
            this.is_valid = true;
        }
    },
    methods: {
        save() {
            this.in_progress = true;
            this.is_success = false;
            this.is_error = false;
            this.in_validation = false;
            this.is_valid = false;
            
            let data = {
                    settings: {
                        consumer_key: this.form.consumer_key,
                        consumer_secret: this.form.consumer_secret,
                        token_key: this.form.token_key,
                        token_secret: this.form.token_secret,
                    }
                };
            this.saveAPICall(data);
        },
        async saveAPICall(data) {
            let resp = await UserRequests.updateUserQuery(userStore.state.user.data.id, data);
            if (resp['meta']['error_code'] === 0) {
                this.in_progress = false;
                this.is_success = true;
                this.is_error = false;
                userStore.state.user.data = resp['data'];
                userStore.storeUser(resp['data']);
                this.in_validation = true;
                this.is_valid = false;
                this.keys_saved = true;
                this.confirmAPICall()
            } else {
                this.in_progress = false;
                this.is_error = true;
                this.is_success = false;
            }
        },
        async confirmAPICall() {
            console.log('confirmAPICall');
            let resp = await UserRequests.confirmKeysUserQuery(userStore.state.user.data.id);
            if (resp['meta']['error_code'] === 0) {
                this.in_validation = false;
                this.is_valid = true;
                this.userData = resp['data'];
                userStore.storeUser(resp['data']);
                this.syncInventory();
            } else {
                this.in_validation = false;
                this.is_valid = false;
            }
        },
        async syncInventory() {
            console.log('syncInventory');
            await UserRequests.syncInventoryUserQuery(userStore.state.user.data.id);
        }
    },
}
</script>