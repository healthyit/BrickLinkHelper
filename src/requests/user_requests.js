/**
 * User requests
 */

// const base_url = 'http://api.dev.quarry.studio:5000/'
const base_url = 'http://localhost:5000/'


// Query to get the current user
export const currentUserQuery = async () => {
    const response = await fetch(base_url + 'user/current/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}

// Query to register a new user
export const registerUserQuery = async (user) => {
    try {
        const response = await fetch(base_url + 'user/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        const data = {'meta': {'error_code': 9999}, 'data':{}}
        return data;
    }
    
    
}

// Query to login a user
export const loginUserQuery = async (username, password) => {
    const response = await fetch(base_url + 'user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': username, 'password': password}),
    });
    const data = response.json();
    return data;
}

// Query to update a user
export const updateUserQuery = async (user_id, send_data) => {
    const response = await fetch(base_url + 'user/user/'+user_id+'/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(send_data),
    });
    const resp_data = response.json();
    return resp_data;
}

// Confirm API Keys
export const confirmKeysUserQuery = async (user_id) => {
    const response = await fetch(base_url + 'user/user/'+user_id+'/confirm_keys/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        
    });
    const resp_data = response.json();
    return resp_data;
}

// Trigger Background User Inventory Sync
export const syncInventoryUserQuery = async (user_id) => {
    await fetch(base_url + 'user/user/'+user_id+'/inventory/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
}

// Trigger Background User Inventory Sync
export const getInventoryValue = async (user_id) => {
    const response = await fetch(base_url + 'user/user/'+user_id+'/inventory/value', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    return response.json();
}

// Trigger Background User Inventory Sync
export const addUpdateInventoryUserQuery = async (user_id, data) => {
    const response = await fetch(base_url + 'user/user/'+user_id+'/inventory/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    });
    const resp_data = response.json();
    return resp_data;
}



// Get Credit Transactions
export const creditTransactionsUserQuery = async (user_id, page=1) => {
    const response = await fetch(base_url + 'user/user/'+user_id+'/transactions/?type=credit&page='+page, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    const resp_data = response.json();
    return resp_data;
}

// Get Credit Transactions
export const transactionsUserQuery = async (user_id, page=1) => {
    const response = await fetch(base_url + 'user/user/'+user_id+'/transactions/?page='+page, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });
    const resp_data = response.json();
    return resp_data;
}