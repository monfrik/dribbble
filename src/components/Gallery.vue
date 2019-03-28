<template>
    <div>
        <div v-if="!loadingImages">
            <ul>
                <li v-for="image in images" :key="image.id">
                    <img :src="'http://gallery.dev.webant.ru/media/'+image.image.contentUrl" :alt="image.name" @click="outerVisible = true, currentImage = image">
                </li>
            </ul>
            <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :page-size="pageCount"
            :current-page.sync="currentPage"
            :total="totalItems"
            @current-change="changePage()"
            >
            </el-pagination>
            <el-dialog :visible.sync="outerVisible" class="popup" v-if="outerVisible">
                <img :src="'http://gallery.dev.webant.ru/media/'+currentImage.image.contentUrl" :alt="currentImage.name">
                <h2>{{ currentImage.name }}</h2>
                <p>{{ currentImage.description }}</p>
            </el-dialog>
        </div>
        <loading v-if="loadingImages"/>
    </div>
</template>

<script>
import axios from 'axios'
import loading from '@/components/Loading'
export default {
    name: 'Gallery',
    data(){
        return {
            images: [],
            totalItems: 0,
            loadingImages: true,
            outerVisible: false,
            currentImage: {},
            pageCount: 15,
            currentPage : 1,
        }
    },
    props: {
        category: {
            type: String,
            default: 'news'
        }
    },
    components: {
        loading
    },
    mounted () {
        this.changePage()
    },
    methods: {
        changePage(){
            this.loadingImages = true
            this.currentPage = 1
            axios.get(`/api/photos?${this.category}=true&page=${this.currentPage}&limit=15`)
            .then(response => {
                if (!this.totalItems) {
                    this.totalItems = response.data.totalItems
                }
                this.images = response.data.data
            })
            .then(()=>{
                this.loadingImages = false
            })
        }
    },
    watch: {
        category : function () {
           this.changePage()
        }
    }
}
</script>

<style lang="sass" scoped>
    ul
        display: flex
        justify-content: flex-start
        flex-wrap: wrap
        padding-left: 0
        li
            width: 18%
            margin: 1%
            overflow: hidden
            border-radius: 7px
            box-shadow: 0px 0px 5px #C5C5C5
            padding-top: 180px
            position: relative
            img
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                object-fit: cover
                cursor: pointer
    .popup
        width: 100%
        border-radius: 4px
        img
            display: block
            width: 98%
            margin: auto
            height: auto
        h2
            color: #2F1767
            font-size: 18px
            font-weight: 400
            margin-top: 16px
        p
            color: #606266
            font-size: 14px
            margin-top: 20px
    .pagination
        margin: 36px auto 0 auto
        display: table
    .el-pagination.is-background .el-pager li:not(.disabled).active
        background-color: red
</style>