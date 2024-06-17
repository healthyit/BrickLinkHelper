<template>
    <div class="box">
        <h1 class="title">Account</h1>
        <h2 class="subtitle">Top up your account</h2>
        
        <div class="columns">
            <div class="column">
                <div class="field is-horizontal">
                    <label class="label pr-6">Amount </label>
                    <div class="control has-icons-left">
                        <input class="input" type="text" v-model="this.form.amount">
                        <span class="icon is-small is-left">
                                <i class="fas fa-dollar-sign"></i>
                            </span>
                    </div>
                </div>    
            </div>
            <div class="column">
                <div class="field is-horizontal">
                    <div class="control">
                        <button class="button is-primary" @click="topUp()">Top Up Via PayPal</button>
                    </div>
                </div>   
            </div>
        </div>
        <h1 class="title">Transaction Summary</h1>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                <th>Date</th>
                <th style="width:60%;">Description</th>
                <th style="text-align: right;">Amount</th>
                <th style="text-align: right;">Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in this.creditTransactions" :key="transaction.id">
                <td>{{ transaction.posted_dt_tm }}</td>
                <td>{{ transaction.description }}</td>
                <td style="text-align: right;">${{ parseFloat(transaction.amount).toFixed(5) }}</td>
                <td style="text-align: right;">${{ parseFloat(transaction.running_balance).toFixed(5) }}</td>
                </tr>
            </tbody>    
        </table>
        <div>
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                <li v-for="page in page_list" :key="page.page" @click="this.page=page.page">
                    <a v-if="!page.is_elip && page.page==this.page" class="pagination-link is-current" aria-label="{{ page.label }}" >{{ page.page }}</a>
                    <a v-if="!page.is_elip && page.page!=this.page" class="pagination-link " aria-label="{{ page.label }}" >{{ page.page }}</a>
                    <span v-if="page.is_elip" class="pagination-ellipsis">&hellip;</span>
                </li>
                
                </ul>
            </nav>
        </div>


    </div>
</template>


<script>
import { userStore } from '../store/user_store.js'
import * as UserRequests from '../requests/user_requests.js'

export default {
    name: 'UserAccountAccountBox',
    data () {
        return {
            form: {
                amount: 10.00
            },
            
            userStore: userStore,
            creditTransactions: [],
            page: 1,
            maxPages: 1,
            page_list: []
        }
    },    
    mounted() {
        this.refreshPageList()
        this.loadCreditTransactions()
    },
    methods: {
        async loadCreditTransactions() {
            // get credit transactions
            let resp = await UserRequests.creditTransactionsUserQuery(userStore.state.user.data.id, this.page)
            if (resp['meta']['error_code'] === 0) {
                this.creditTransactions = resp['data']
                this.page = resp['meta']['page']
                this.maxPages = resp['meta']['max_pages']
                this.refreshPageList()
            }else{
                console.log('API error:' + resp['meta']['code'] + " - " + resp['meta']['error_message'])
            }
        },
        refreshPageList(){
            this.page_list = [];
            let min = this.page - 5;
            if (min < 1) {
                min = 1;
            }
            let max = min + 9;
            if (max > this.maxPages) {
                max = this.maxPages
            }
            if (min > 1) {
                this.page_list.push({page: 1, label: 'Page 1', is_elip: false});
            }
            if (min > 2) {
                this.page_list.push({page: min - 1, label: '...', is_elip: true});
            }
            for (let i = min; i <= max; i++) {
                this.page_list.push({page: i, label: 'Page ' + i, is_elip: false});
            }
            if (max < (this.maxPages - 1)) {
                this.page_list.push({page: max + 1, label: '...', is_elip: true});
            }
            if (max < this.maxPages) {
                this.page_list.push({page: this.maxPages, label: 'Page ' + this.maxPages, is_elip: false});
            }
        },
    }
}
</script>