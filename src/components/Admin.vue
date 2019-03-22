<template>
    <div>
        <el-form ref="form">
             <el-form-item label="Name photo">
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
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button> -->
                <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <el-button type="primary" @click="submitUpload">upload</el-button>
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
                name: '',
                desc: '',
                file: {}
            }
        }
    },
    methods: {
        submitUpload() {
            let newBool = (this.form.type[0] == 'New') ? true : (this.form.type[1] == 'New') ? true : false
            let popularBool = (this.form.type[0] == 'Popular') ? true : (this.form.type[1] == 'Popular') ? true : false
            let formData = new FormData();
            formData.append('file', this.form.file.raw)
            axios.post('/api/media_objects', formData, {
                'headers': {
                    'Authorization': 'Bearer '+localStorage.getItem('access_token')
                }
            })
            .then(response => {
                const id = response.data.id
                axios.post('/api/photos', {
                    "name": this.form.name,
                    "description": this.form.desc,
                    "new": newBool,
                    "popular": popularBool,
                    "image": `/api/media_objects/${id}`
                }, {
                    'headers': {
                        'Authorization': 'Bearer '+localStorage.getItem('access_token')
                    }
                })
                .then(()=>{
                    this.$message({
                        message: 'Photo resource created',
                        type: 'success'
                    });
                })
                .catch((response)=>{
                    if (response.status == 401) {
                        axios.post('/oauth/v2/token', {
                            'client_id': clientParam.id,
                            'grant_type': 'refresh_token',
                            'refresh_token': localStorage.getItem('refresh_token'),
                            'client_secret': clientParam.secret,
                        })
                        .then((response)=>{
                            let access_token = response.data.access_token
                            localStorage.setItem('access_token', access_token)
                            let refresh_token = response.data.refresh_token
                            localStorage.setItem('refresh_token', refresh_token)
                            this.submitUpload()
                        })
                        .catch((response)=>{
                            if (response.status == 401) {
                                
                            }
                        })
                    }
                })
            })
        },
        change(file){
            this.form.file = file
        }
    }
}
</script>

<style lang="sass" scoped>
    .file
        margin-bottom: 30px
</style>