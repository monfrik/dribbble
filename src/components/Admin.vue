<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-form ref="form" :rules="rules" :model="form">
             <el-form-item prop="name" label="Name photo">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Description photo" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="Category photo">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="New" name="type"></el-checkbox>
                    <el-checkbox label="Popular" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-upload
            class="upload-demo file"
            ref="upload"
            action="/api/objects"
            :auto-upload="false"
            accept="image"
            :data="form.file"
            :on-change="change">
                <el-button slot="trigger" size="small" type="primary" v-model="form.file">select file</el-button>
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <el-button type="primary" @click="submitUpload()">upload</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import clientParam from '@/utils/authConfig.js'

export default {
    name: 'admin',
    data(){
        return {
            form: {
                type: [],
                popular: false,
                new: false,
                name: '',
                desc: '',
                file: {}
            },
            rules: {
                name: [
                     { required: true, message: 'Enter name image', trigger: 'blur' }
                ],
                desc: [
                     { required: true, message: 'Enter description', trigger: 'blur' }
                ],
            },
            fullscreenLoading: false
        }
    },
    methods: {
        submitUpload() {
            this.$refs.form.validate((valid) => {
                this.form.type.forEach( element => {
                    if (element == 'Popular') {
                        this.form.popular = true
                    }
                    if (element == 'New') {
                        this.form.new = true
                    }
                })
                if (!this.form.file.raw){
                    this.$notify.error({
                        title: 'Error',
                        message: 'File not loaded'
                    })
                    return false
                }
                if (!this.form.new && !this.form.popular){
                    this.$notify.error({
                        title: 'Error',
                        message: 'Category not entered'
                    })
                    return false
                }
                if (valid && (this.form.new || this.form.popular) && this.form.file.raw) {
                    this.fullscreenLoading = true
                    this.$store.dispatch('CHECK_ACCESS_TOKEN')
                    .then(response => {
                        if (!response) {
                            this.$store.dispatch('UPDATE_ACCESS_TOKEN')
                            .then(response => {
                                if (!response) {
                                    this.$store.dispatch('SIGNOUT')
                                    this.$router.push('Authorization')
                                } else {
                                    this.sendFile()
                                }
                            })
                        } else {
                            this.sendFile()
                        }
                    })
                }
            })
        },
        change(file){
            this.form.file = file
        },
        sendFile(){
            this.$store.dispatch('SEND_FILE', {
                file: this.form.file.raw, 
                name: this.form.name, 
                desc: this.form.desc, 
                newBool: this.form.new, 
                popular: this.form.popular
            })
            .then(() => {
                this.fullscreenLoading = false
                this.$message.success('image successfully added!')
                this.clearForm()
            })
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        },
        clearForm(){
            this.form.type = []
            this.form.name = ''
            this.form.desc = ''
            this.form.new = false
            this.form.popular = false
            this.form.file = {}
            this.$refs.upload.clearFiles()
        }
    }
}
</script>

<style lang="sass" scoped>
    .file
        margin-bottom: 30px
</style>