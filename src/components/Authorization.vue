<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-form label-position="top" label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item prop="login" label="login" >
                <el-input v-model="form.login"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm()">Submit</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import clientParam from '@/utils/authConfig.js'

export default {
    name: 'authoriation',
    data(){
        return {
            form: {
                login: '',
                password: '',
            },
            rules: {
                login: [
                     { required: true, message: 'Пожалуйста введите логин', trigger: 'blur' }
                ],
                password: [
                     { required: true, message: 'Пожалуйста введите пароль', trigger: 'blur' }
                ],
            },
            fullscreenLoading: false
        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true
                    axios.get(`/oauth/v2/token`, {
                        params: {
                            client_id: clientParam.id,
                            grant_type: 'password',
                            client_secret: clientParam.secret,
                            username: this.form.login,
                            password: this.form.password
                        }
                    })
                    .then(response => {
                        let access_token = response.data.access_token
                        let refresh_token = response.data.refresh_token
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('refresh_token', refresh_token)

                        this.$store.dispatch('CHANGE_AUTHORIZED', true)
                        this.$store.dispatch('CHANGE_ACCESS_TOKEN', access_token)
                        this.$store.dispatch('CHANGE_REFRESH_TOKEN', refresh_token)

                        this.$router.push('Admin')

                        this.$message.success('Добро пожаловать, '+this.form.login+'!')

                        this.fullscreenLoading = false
                    })
                    .catch(() => {
                        this.$message.error('Не правильный логин или пароль')
                        this.fullscreenLoading = false
                    })
                }
            });
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    }
}
</script>

<style lang="sass" scoped>
</style>