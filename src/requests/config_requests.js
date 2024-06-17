
/**
 * API To Fetch Data
 * Returns data as JSON {id: number, name: string}
 */
// const base_url = 'http://api.dev.quarry.studio:5000/'
const base_url = 'http://localhost:5000/'


export const fetchCategories = async (parent_category_id) => {
    let url = base_url + "configuration/categories/list";
    if (parent_category_id != null) {
        url = url + "?parent_category_id=" + parent_category_id;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};
    
export const fetchItems = async (category_id=0, query='', page=1) => {
    let url = base_url + "configuration/items/list";
    let filters = [];
    if (category_id != 0) {
        filters.push( "category_id=" + category_id);
    }
    if (query != '') {
        filters.push( "query=" + query);
    }
    if (page > 1) {
        filters.push( "page=" + page);
    }
    if (filters.length > 0) {
        url = url + "?" + filters.join("&");
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const fetchItem = async (item_id) => {
    let url = base_url + "/configuration/items/"+item_id+"/";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const fetchConfig = async (code) => {
    let url = base_url + "configuration/config/list?code=" + code;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const triggerItemSync = async (item_id) => {
    let url = base_url + "configuration/items/item/sync";
    if (item_id != null) {
        url = url + "?item_id=" + item_id;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const fetchConfigStatus = async () => {
    let url = base_url + "configuration/status";
    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const configSyncExchangeRates = async () => {
    let url = base_url + "configuration/exchange_rates";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const configSyncColours = async () => {
    let url = base_url + "configuration/colours/sync";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const configSyncCategories = async () => {
    let url = base_url + "configuration/categories/scrape";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

export const configSyncCategoryItems = async () => {
    let url = base_url + "configuration/items/scrape";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
};

