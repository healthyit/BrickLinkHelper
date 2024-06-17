<template>
      <div class="box">
        <h1 class="title">Preferences</h1>
        <div class="notification is-success" v-if="is_success">Your account has been successfully updated.</div>
        <div class="notification is-danger" v-if="is_error">There was an error updating your account.</div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Default Item Condition</label>
                    <div class="control">
                        <div class="select">
                            <select style="width:240px;" v-model="form.default_item_condition">
                                <option>Used</option>
                                <option>New</option>
                            </select>
                        </div>
                    </div>
                </div>  
                <div class="field">
                    <label class="label">Default Retain Items in Inventory on 0 Quanitity</label>
                    <div class="control">
                        <div class="select">
                            <select style="width:240px;" v-model="form.is_retain">
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Default Currency</label>
                    <div class="control">
                        <div class="select" >
                            <select style="width:240px;" v-model="form.default_currency">
                                <option v-for="currency in currencies" :key="currency.id" :value="currency.value">{{ currency.display }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Add to Stockroom</label>
                    <div class="control">
                        <div class="select">
                            <select style="width:240px;" v-model="form.is_stock_room">
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <h2 class="title is-5">Price Algorithum</h2>
        <div class="content">
            In order to try and help suggest a price for items the below allow you to define a rule for how to price items. This is used in the price suggestion tool.
        </div>        
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Base price off</label>
                    <div class="control">
                        <div class="select">
                            <select style="width:160px;" v-model="form.base_price_off">
                                <option>Items Sold</option>
                                <option>Items for Sale</option>
                            </select>
                        </div>
                    </div>
                </div>   
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Statistic</label>
                    <div class="control">
                        <div class="select">
                            <select style="width:160px;" v-model="form.statistic">
                                <option>Highest</option>
                                <option>Quantity Average</option>
                                <option>Average</option>
                                <option>Lowest</option>
                            </select>
                        </div>
                    </div>
                </div>   
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Price Multiplier</label>
                    <div class="control">
                        <input class="input" type="number" v-model="form.price_multiplier" style="width:160px;">
                    </div>
                </div> 
            </div>
            <div class="column"> 
                <div class="field">
                    <label class="label">Add to Price</label>
                    <div class="control has-icons-left" style="width:160px;">
                        <input class="input" type="number" v-model="form.add_to_price" style="width:160px;">
                        <span class="icon is-small is-left">
                            <i class="fas fa-dollar-sign"></i>
                        </span>
                    </div>
                </div>  
            </div>
        </div>
        <div class="content">
            With these when if you don't have a price set for an item the system will try and suggest a price based on the above rules. aka The <span class="tag">Average</span> price of <span class="tag">Sold</span> items times <span class="tag">Price Multipler</span> plus <span class="tag">Add to Price</span> eg $10 * 1.05 + $0.02 = $10.52
        </div>
        <h2 class="title is-5">Price Warnings</h2>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Warn me when price goes below my ideal by (percent)</label>
                    <div class="control has-icons-right" style="width:160px;">
                        <input class="input" type="number" v-model="form.warn_below" style="width:160px;" placeholder="80" min="0" max="200">
                        <span class="icon is-small is-right">
                            <i class="fa fa-percent"></i>
                        </span>
                        <p class="help is-danger" v-if="form.warn_below<0 || form.warn_below> 200">Percentage should be between 0 and 200</p>
                    </div>
                </div>  
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Warn me when price goes above my ideal by (percent)</label>
                    <div class="control has-icons-right" style="width:160px;">
                        <input class="input" type="number" v-model="form.warn_above" style="width:160px;" placeholder="120" min="0" max="200">
                        <span class="icon is-small is-right">
                            <i class="fa fa-percent"></i>
                        </span>
                        <p class="help is-danger" v-if="form.warn_above<0 || form.warn_above> 200">Percentage should be between 0 and 200</p>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="title is-5">Default Item Notes</h2>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Part Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_part">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Set Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_set">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Instruction Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_instruction">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Minifigure Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_minifigure">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6"  style="width:240px;">Default Box Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_box">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Catalog Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_catalog">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Gear Note</label>
            <input class="input  is-fullwidth" type="text" v-model="form.default_note_gear">
        </div>
        <div class="field is-horizontal">
            <label class="label pr-6" style="width:240px;">Default Book Note</label>
            <input class="input is-fullwidth" type="text" v-model="form.default_note_book">
        </div>
        <button class="button is-primary" v-if="!in_progress" style="width:240px;" @click="save();">Save Preferences</button>
        <button class="button is-primary is-loading" v-if="in_progress" style="width:240px;">Save Preferences</button>
        
    </div>  
        
</template>


<script>
import { userStore } from '../store/user_store.js'
import * as UserRequests from '../requests/user_requests.js'
import { fetchConfig } from '@/requests/config_requests.js';

export default {
    name: 'UserAccountPreferencesBox',
    data () {
        return {
            userStore: userStore,
            userData: userStore.state.user.data,
            in_progress: false,
            is_success: false,
            is_error: false,
            currencies: [],
            form: {
                default_item_condition: '',
                default_currency: '',
                base_price_off: '',
                statistic: '',
                price_multiplier: '',
                add_to_price: '',
                warn_below: '',
                warn_above: '',
                default_note_part: '',
                is_retain: 'False',
                is_stock_room: 'False'
            }
        }
    },
    mounted() {
        this.form.default_item_condition = userStore.state.user.data.settings.default_item_condition;
        this.form.default_currency = userStore.state.user.data.settings.default_currency;
        this.form.base_price_off = userStore.state.user.data.settings.base_price_off;
        this.form.statistic = userStore.state.user.data.settings.statistic;
        this.form.price_multiplier = userStore.state.user.data.settings.price_multiplier;
        this.form.add_to_price = userStore.state.user.data.settings.add_to_price;
        this.form.warn_below = userStore.state.user.data.settings.warn_below;
        this.form.warn_above = userStore.state.user.data.settings.warn_above;
        this.form.default_note_part = userStore.state.user.data.settings.default_note_part;
        this.form.default_note_set = userStore.state.user.data.settings.default_note_set;
        this.form.default_note_instruction = userStore.state.user.data.settings.default_note_instruction;
        this.form.default_note_minifigure = userStore.state.user.data.settings.default_note_minifigure;
        this.form.default_note_box = userStore.state.user.data.settings.default_note_box;
        this.form.default_note_catalog = userStore.state.user.data.settings.default_note_catalog;
        this.form.default_note_gear = userStore.state.user.data.settings.default_note_gear;
        this.form.default_note_book = userStore.state.user.data.settings.default_note_book;
        
        this.get_currencies();

    },
    methods: {
        save() {
            this.in_progress = true;
            this.is_success = false;
            this.is_error = false;
            let data = {
                    settings: {
                        default_item_condition: this.form.default_item_condition,
                        default_currency: this.form.default_currency,
                        base_price_off: this.form.base_price_off,
                        statistic: this.form.statistic,
                        price_multiplier: this.form.price_multiplier,
                        add_to_price: this.form.add_to_price,
                        warn_below: this.form.warn_below,
                        warn_above: this.form.warn_above,
                        default_note_part: this.form.default_note_part,
                        default_note_set: this.form.default_note_set,
                        default_note_instruction: this.form.default_note_instruction,
                        default_note_minifigure: this.form.default_note_minifigure,
                        default_note_box: this.form.default_note_box,
                        default_note_catalog: this.form.default_note_catalog,
                        default_note_gear: this.form.default_note_gear,
                        default_note_book: this.form.default_note_book,
                    },
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
        async get_currencies() {
            const response = await fetchConfig('currencies');
            this.currencies = response.data;
        },
    }
}
</script>