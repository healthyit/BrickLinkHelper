import { reactive } from 'vue'
import VueJwtDecode from 'vue-jwt-decode'

export const userStore = reactive({
    state: {
        user: {
            data: {},
            isLoggedIn: false,
            inventory_value: -1,
            token: null,
        }
    },
    loadState() {
        if (this.state.user.token == null) {
            const token = localStorage.getItem('token');
            if (token) {
                this.state.user.token = token;
                this.state.user.data = VueJwtDecode.decode(token);
                this.state.user.isLoggedIn = true;
            }
        }
    },
    storeUser(user) {
        this.state.user.data = user;
        if (user['jwt']) {
            this.state.user.token = user['jwt'];
            localStorage.setItem('token', user['jwt']);
        }
    },
    login(username, password, jwt) {
        if (username.length > 0 && password.length > 0) {
            this.state.user.isLoggedIn = true;
            this.state.user.token = jwt;
            localStorage.setItem('token', jwt);
            this.state.user.data = VueJwtDecode.decode(jwt);
        }else{
            this.state.user.isLoggedIn = false;
        }
    },
    logout() {
        localStorage.removeItem('token');
        this.state.user = {
            id: 0,
            username: '',
            email: '',
            token: '',
            isLoggedIn: false,
        };
    },

})

