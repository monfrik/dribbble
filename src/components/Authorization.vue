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
// import axios from 'axios'
import clientParam from '@/utils/authConfig.js'
import { error } from 'util';

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
                     { required: true, message: 'Enter login', trigger: 'blur' }
                ],
                password: [
                     { required: true, message: 'Enter password', trigger: 'blur' }
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
                    this.$store.dispatch('AUTHORIZATION', {
                        client_id: clientParam.id,
                        grant_type: 'password',
                        client_secret: clientParam.secret,
                        username: this.form.login,
                        password: this.form.password
                    })
                    .then(response => {
                        this.$router.push('Admin')

                        this.$message.success('Welcome '+this.form.login+'!')

                        this.fullscreenLoading = false
                    })
                    .catch(() => {
                        this.$message.error('Incorrect login or password')
                        this.fullscreenLoading = false
                    })
                }
            })
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        }
    }
}
</script>

<style lang="sass" scoped>
</style>