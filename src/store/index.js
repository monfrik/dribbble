import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import clientParam from '@/utils/authConfig.js'

Vue.use(Vuex)

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
        ACCESS_TOKEN: state => {
            return state.accessToken
        },
        REFRESH_TOKEN: state => {
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
        CHANGE_TOKEN: (context, params) => {
            let data
            if (params.data != null) {
                data = params.data
            } else {
                data = localStorage.getItem(`${params.type}_token`)
            }
            context.commit(`SET_${params.type.toUpperCase()}_TOKEN`, data)
        },
        CHECK_ACCESS_TOKEN: (context) => {
            return axios.get('/api/users/current', {
                'headers': {
                    'Authorization': 'Bearer '+context.getters.ACCESS_TOKEN
                }
            })
            .then(()=>{
                context.commit('SET_AUTHORIZED', true)
                return true
            })
            .catch(response=>{
                if (response.response.status == 401) {
                    context.commit('SET_AUTHORIZED', false)
                    return false
                }
            })
        },
        UPDATE_ACCESS_TOKEN: (context) => {
            return axios.post('/oauth/v2/token', {
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
                context.commit('SET_ACCESS_TOKEN', access_token)
                context.commit('SET_REFRESH_TOKEN', refresh_token)
                context.commit('SET_AUTHORIZED', true)
                return true
            })
            .catch(()=>{
                return false
            })
        },
        SIGNOUT: (context) => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')

            context.commit('SET_AUTHORIZED', false)
            context.commit('SET_ACCESS_TOKEN', '')
            context.commit('SET_REFRESH_TOKEN', '')
        },
        GET_PHOTOS: (context, params) => {
            return axios.get('/api/photos',{
                params: {
                    [params.category]: true,
                    page: params.currentPage,
                    limit: params.limit
                }
            })
            .then(response => {
                return {
                    images: response.data.data,
                    totalItems: response.data.totalItems
                }
            })  
        },
        SEND_FILE: (context, params) => {
            let formData = new FormData()
            formData.append('file', params.file)
            return axios.post('/api/media_objects', formData, {
                'headers': {
                    'Authorization': 'Bearer '+context.getters.ACCESS_TOKEN
                }
            })
            .then(response => {
                const id = response.data.id
                return axios.post('/api/photos', {
                    "name": params.name,
                    "description": params.desc,
                    "new": params.newBool,
                    "popular": params.popular,
                    "image": `/api/media_objects/${id}`
                }, {
                    'headers': {
                        'Authorization': 'Bearer '+context.getters.ACCESS_TOKEN
                    }
                })
            })
        },
        AUTHORIZATION: (context, parametrs) => {
            return axios.get(`/oauth/v2/token`, {
                params: {
                    client_id: parametrs.client_id,
                    grant_type: parametrs.grant_type,
                    client_secret: parametrs.client_secret,
                    username: parametrs.username,
                    password: parametrs.password
                }
            })
            .then(response => {
                let access_token = response.data.access_token
                let refresh_token = response.data.refresh_token
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)

                context.dispatch('CHANGE_AUTHORIZED', true)
                context.dispatch('CHANGE_TOKEN', {
                    type: 'access', 
                    data: access_token
                })
                context.dispatch('CHANGE_TOKEN', {
                    type: 'refresh', 
                    data: refresh_token
                })
            })
            .catch(() => {
                throw new Error
            })
        }
    },
})