import { reactive } from 'vue'


export const appStore = reactive({
    state: {
        selected_category: 0,
        selected_category_name: '',
        selected_item: 0,
        selected_item_has_variations: false,
        select_colour: 0,
        item_filter: '',
        item_page: 1,
        item_page_count: 0,
        selected_account_tab: '',
        valid_account_tabs: ['Demographics', 'Bricklink', 'Preferences','Account', 'Transaction History', 'Admin'],
    },
    // setSelectedCategory(category, name) {
    //     this.state.selected_category = category;
    //     this.state.selected_category_name = name;
    // },
    // setSelectedItem(item) {
    //     this.state.selected_item = item;
    // },
    // setSelectedColour(colour) {
    //     this.state.selected_colour = colour;
    // },

    check_account_tab(selected_tab) {
            if (selected_tab === undefined) {
                this.state.selected_account_tab = 'Demographics';
            }
            if (((this.state.valid_account_tabs).includes(selected_tab))) {
                this.state.selected_account_tab = selected_tab;
            } else {
                this.state.selected_account_tab = 'Demographics';
            }
    }
})

