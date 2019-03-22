<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-form label-position="top" label-width="100px" :model="formData" ref="authoriation">
            <el-form-item label="login" >
                <el-input v-model="formData.login"></el-input>
            </el-form-item>
            <el-form-item  label="password">
                <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm('authoriation')">Submit</el-button>
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
            formData: {
                login: '',
                password: '',
            },
            fullscreenLoading: false
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true
                    axios.get(`/oauth/v2/token?client_id=${clientParam.id}&grant_type=password&client_secret=${clientParam.secret}&username=${this.formData.login}&password=${this.formData.password}`)
                        .then(response => {
                            localStorage.setItem('access_token',response.data.access_token)
                            localStorage.setItem('refresh_token',response.data.refresh_token)
                            this.$store.dispatch('SET_AUTHORIZED', true)
                        })
                        .then(()=>{
                            this.fullscreenLoading = false
                            this.$router.push('Admin')
                        })
                } else {
                    this.$message.error('Не правильный логин или пароль')
                    return false
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