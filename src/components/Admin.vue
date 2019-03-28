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
                     { required: true, message: 'Пожалуйста, введите название', trigger: 'blur' }
                ],
                desc: [
                     { required: true, message: 'Пожалуйста, введите описание', trigger: 'blur' }
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
                        message: 'Загрузите файл'
                    });
                }
                if (!this.form.new && !this.form.popular){
                    this.$notify.error({
                        title: 'Error',
                        message: 'Введите категорию'
                    });
                }
                if (valid && (this.form.new || this.form.popular) && this.form.file.raw) {
                    this.fullscreenLoading = true
                    if (this.$store.dispatch('CHECK_ACCESS_TOKEN')){
                        this.sendFile()
                    } else {
                        if (this.$store.dispatch('UPDATE_ACCESS_TOKEN')){
                            this.sendFile()
                        } else {
                            console.log(this)
                        }
                    }
                }
            })
        },
        change(file){
            this.form.file = file
        },
        sendFile(){
            let formData = new FormData();
            formData.append('file', this.form.file.raw)
            axios.post('/api/media_objects', formData, {
                'headers': {
                    'Authorization': 'Bearer '+this.$store.getters.ACCESSTOKEN
                }
            })
            .then(response => {
                const id = response.data.id
                axios.post('/api/photos', {
                    "name": this.form.name,
                    "description": this.form.desc,
                    "new": this.form.new,
                    "popular": this.form.popular,
                    "image": `/api/media_objects/${id}`
                }, {
                    'headers': {
                        'Authorization': 'Bearer '+this.$store.getters.ACCESSTOKEN
                    }
                })
                .then(() => {
                    this.fullscreenLoading = false
                    this.$message.success('Изображение успешно добавлено!')
                    this.clearForm()
                })
            })
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
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