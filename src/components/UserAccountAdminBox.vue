<template>
      <div class="box">
        <h1 class="title">Admin Panel</h1>

        <!-- Exchange Rates ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----  -->
        <div class="columns">
            <div class="column is-one-fifth">
                <h2 class="subtitle is-3">Exchange Rates</h2>   
            </div>
            <div class="column">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Last Sync</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.exchange_rates_last_sync" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>  
            <div class="column is-one-fifth">
                <div class="control">
                    <div v-if="!exchange_rates_loading">
                        <button class="button" @click="this.sync_exchange_rates()">
                        Sync Exchange Rates
                        </button>
                    </div>
                    <div v-if="colours_loading">
                        <button class="button is-loading" disabled>
                        Sync Exchange Rates
                        </button>
                    </div>
                </div>   
            </div>  
            
        </div>

        <!-- Colour List ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----  -->
        <div class="columns">
            <div class="column is-one-fifth">
                <h2 class="subtitle is-3">Colours</h2>   
            </div>
            <div class="column">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Number Loaded</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.colours_loaded" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Last Sync</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.colours_last_sync" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>  
            <div class="column is-one-fifth">
                <div class="control">
                    <div v-if="!colours_loading">
                        <button class="button" @click="this.sync_colours()">
                        Sync Colours
                        </button>
                    </div>
                    <div v-if="colours_loading">
                        <button class="button is-loading" disabled>
                        Sync Colours
                        </button>
                    </div>
                </div>   
            </div>  
            
        </div>
        
        <!-- Category List ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----  -->
        <div class="columns">
            <div class="column is-one-fifth">
                <h2 class="subtitle is-3">Categories</h2>   
            </div>
            <div class="column">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Number Loaded</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.categories_loaded" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Last Sync</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.categories_last_sync" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>  
            <div class="column is-one-fifth">
                <div class="control">
                    <div v-if="!categories_loading">
                        <button class="button" @click="this.sync_category_list()">
                        Sync Categories
                        </button>
                    </div>
                    <div v-if="categories_loading">
                        <button class="button is-loading" disabled>
                        Sync Categories
                        </button>
                    </div>
                </div>   
            </div>     
        </div>

        <!-- Category Item List ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----  -->
        <div class="columns">
            <div class="column is-one-fifth">
                <h2 class="subtitle is-3">Items in Categories</h2>   
            </div>
            <div class="column">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Number Loaded</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.category_items_loaded" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Up to date (Older than 7 Days</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.category_items_old" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Last Sync</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" v-model="form.categories_last_sync" readonly>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>  
            <div class="column is-one-fifth">
                <div class="control">
                    <div v-if="!category_items_loading">
                        <button class="button" @click="this.sync_items_in_a_category()">
                        Get Items in a Category
                        </button>
                    </div>
                    <div v-if="category_items_loading">
                        <button class="button is-loading" disabled>
                            Get Items in a Category
                        </button>
                    </div>
                </div>   
            </div>  
            
        </div>


    </div>  
</template>


<script>
import { userStore } from '../store/user_store.js'
import { fetchConfigStatus, configSyncColours, configSyncCategories, configSyncCategoryItems, configSyncExchangeRates } from '../requests/config_requests.js'

export default {
    name: 'UserAccountAdminBox',
    data () {
        return {
            userStore: userStore,
            userData: userStore.state.user.data,
            form: {
                exchange_rates_last_sync: '',
                colours_loaded: 0,
                colours_last_sync: '',
                categories_loaded: 0,
                categories_last_sync: '',
                category_items_loaded: '',
                category_items_old: '',
                
            },
            exchange_rates_loading: false,
            colours_loading: false,
            categories_loading: false,
            category_items_loading: false,

        }
    },
    mounted() {
        this.get_config_status();
    },
    methods: {
        async get_config_status() {
            const response = await fetchConfigStatus();
            this.form.exchange_rates_last_sync = response.data.exchange_rates.last_sync;
            this.form.colours_loaded = response.data.colours.count;
            this.form.colours_last_sync = response.data.colours.last_sync;
            this.colours_loading = false;
            this.form.categories_loaded = response.data.category_items.count;
            this.form.categories_last_sync = response.data.category_list.last_sync;
            this.categories_loading = false;
            this.form.category_items_old = (response.data.category_items.count-response.data.category_items.out_of_sync) + ' of ' + response.data.category_items.count;
            this.category_items_loading = false;
        },
        async sync_exchange_rates() {
            this.exchange_rates_loading = true;
            await configSyncExchangeRates();
            this.get_config_status();
            this.exchange_rates_loading = false;
        },
        async sync_colours() {
            this.colours_loading = true;
            await configSyncColours();
            this.get_config_status();
            this.colours_loading = false;
        },
        async sync_category_list() {
            this.categories_loading = true;
            await configSyncCategories();
            this.get_config_status();
        },   
        async sync_items_in_a_category() {
            this.category_items_loading = true;
            await configSyncCategoryItems();
            this.get_config_status();
        },
    }
}
</script>