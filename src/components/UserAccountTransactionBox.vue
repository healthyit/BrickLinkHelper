<template>
    <div class="box">
        <h1 class="title">Transaction Summary</h1>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th style="text-align: right;">Value Change</th>
                <th style="text-align: right;">Amount</th>
                <th style="text-align: right;">Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in this.transactions" :key="transaction.id">
                <td>{{ transaction.posted_dt_tm }}</td>
                <td>{{ transaction.description }}</td>
                <td>{{ formatCase(transaction.type) }}</td>
                <td style="text-align: right;"><span v-if="transaction.amount< 0">${{ parseFloat(-transaction.amount/0.015).toFixed(2) }}</span></td>
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
    name: 'UserAccountTransactionBox',
    data () {
        return {
            userStore: userStore,
            transactions: [],
            page: 1,
            maxPages: 1,
            page_list: []
        }
    },    
    mounted() {
        this.refreshPageList()
        this.loadTransactions()
    },
    methods: {
        async loadTransactions() {
            // get credit transactions
            let resp = await UserRequests.transactionsUserQuery(userStore.state.user.data.id, this.page)
            if (resp['meta']['error_code'] === 0) {
                this.transactions = resp['data']
                this.page = resp['meta']['page']
                this.maxPages = resp['meta']['max_pages']
                this.refreshPageList()
            }else{
                console.log('API error:' + resp['meta']['code'] + " - " + resp['meta']['error_message'])
            }
        },
        formatCase(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
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