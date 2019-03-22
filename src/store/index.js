import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export let store = new Vuex.Store({
    state: {
        authorized: localStorage.getItem('access_token') ? true : false,
        login: '',
        password: ''
    },
    getters: {
        AUTHORIZED: state => {
            return state.authorized
        }
    },
    mutations: {
        SET_AUTHORIZED: (state, payload) => {
            state.authorized = payload
        }
    },
    actions: {
        SET_AUTHORIZED: (context, payload = '') => {
            if (payload != '') {
                let data = payload
                context.commit('SET_AUTHORIZED', data)
            } else {
                let data = localStorage.getItem('access_token') ? true : false
                context.commit('SET_AUTHORIZED', data)
            }
        }
    },
});