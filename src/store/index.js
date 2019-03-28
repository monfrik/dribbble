import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import clientParam from '@/utils/authConfig.js'

Vue.use(Vuex);

export let store = new Vuex.Store({
    state: {
        authorized: false,
        accessToken: localStorage.getItem('access_token'),
        refreshToken: localStorage.getItem('refresh_token')
    },
    getters: {
        AUTHORIZED: state => {
            return state.authorized
        },
        ACCESSTOKEN: state => {
            return state.accessToken
        },
        REFRESHTOKEN: state => {
            return state.refreshToken
        }
    },
    mutations: {
        SET_AUTHORIZED: (state, payload) => {
            state.authorized = payload
        },
        SET_ACCESS_TOKEN: (state, payload) => {
            state.accessToken = payload
        },
        SET_REFRESH_TOKEN: (state, payload) => {
            state.refreshToken = payload
        },
    },
    actions: {
        CHANGE_AUTHORIZED: (context, payload) => {
            let data
            if (payload != null) {
                data = payload
            } else {
                if (localStorage.getItem('access_token')){
                    data = true
                } else {
                    data = false
                }
            }
            context.commit('SET_AUTHORIZED', data)
        },
        CHANGE_ACCESS_TOKEN: (context, payload) => {
            let data
            if (payload != null) {
                data = payload
            } else {
                data = localStorage.getItem('access_token')
            }
            context.commit('SET_ACCESS_TOKEN', data)
        },
        CHANGE_REFRESH_TOKEN: (context, payload) => {
            let data
            if (payload != null) {
                data = payload
            } else {
                data = localStorage.getItem('refresh_token')
            }
            context.commit('SET_REFRESH_TOKEN', data)
        },
        CHECK_ACCESS_TOKEN: (context) => {
            axios.get('/api/users/current', {
                'headers': {
                    'Authorization': 'Bearer '+context.getters.accessToken
                }
            })
            .then(()=>{
                return true
            })
            .catch(response=>{
                if (response.response.status == 401) {
                    return false
                }
            })
        },
        UPDATE_ACCESS_TOKEN: (context) => {
            axios.post('/oauth/v2/token', {
                'client_id': clientParam.id,
                'grant_type': 'refresh_token',
                'refresh_token': context.getters.REFRESH_TOKEN,
                'client_secret': clientParam.secret,
            })
            .then((response)=>{
                let access_token = response.data.access_token
                let refresh_token = response.data.refresh_token
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)
                context.commit('CHANGE_ACCESS_TOKEN', access_token)
                context.commit('CHANGE_REFRESH_TOKEN', refresh_token)
                context.commit('SET_AUTHORIZED', true)
                return true
            })
            .catch(response=>{
                if (response.response.status == 401) {
                    return false
                }
            })
        }
    },
});