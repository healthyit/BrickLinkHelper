<template>
<div class="columns">
    <div class="column is-one-fifth">
        <UserAccountMenuBox />        
    </div>
    <div class="column is-four-fifths">
        <UserAccountDemographicsBox v-if="appStore.state.selected_account_tab=='Demographics'"/>    
        <UserAccountBricklinkBox v-if="appStore.state.selected_account_tab=='Bricklink'"/>    
        <UserAccountPreferencesBox v-if="appStore.state.selected_account_tab=='Preferences'"/>    
        <UserAccountAccountBox v-if="appStore.state.selected_account_tab=='Account'"/>    
        <UserAccountTransactionBox v-if="appStore.state.selected_account_tab=='Transaction History'"/>    
        <UserAccountAdminBox v-if="appStore.state.selected_account_tab=='Admin'"/>    
    </div>
</div>    
</template>


<script>
import { userStore } from '../store/user_store.js'
import { appStore} from '../store/app_store.js'
import UserAccountMenuBox from '@/components/UserAccountMenuBox.vue'
import UserAccountDemographicsBox from '@/components/UserAccountDemographicsBox.vue'
import UserAccountBricklinkBox from '@/components/UserAccountBricklinkBox.vue'
import UserAccountPreferencesBox from '@/components/UserAccountPreferencesBox.vue'
import UserAccountAccountBox from '@/components/UserAccountAccountBox.vue'
import UserAccountTransactionBox from '@/components/UserAccountTransactionBox.vue'
import UserAccountAdminBox from '@/components/UserAccountAdminBox.vue'

export default {
    name: 'UserAccountBox',
    components: {
        UserAccountMenuBox,
        UserAccountDemographicsBox,
        UserAccountBricklinkBox,
        UserAccountPreferencesBox,
        UserAccountAccountBox,
        UserAccountTransactionBox,
        UserAccountAdminBox,
    },
    data () {
        return {
            userStore: userStore,
            appStore: appStore,
        }
    },
    mounted() {
        appStore.check_account_tab(this.$route.params.tab)
    },
    
}
</script>