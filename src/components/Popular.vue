<template>
    <div>
        <div v-if="!loadingImages">
            <ul>
                <li v-for="image in images" :key="image.id">
                    <img :src="image.path" :alt="image.name" @click="outerVisible = true, currentImage = image">
                </li>
            </ul>
            <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :page-size="15"
            :total="images.length">
            </el-pagination>
            <el-dialog :visible.sync="outerVisible" class="popup">
                <img :src="currentImage.path" :alt="currentImage.name">
                <h2>{{ currentImage.name }}</h2>
                <p>{{ currentImage.description }}</p>
            </el-dialog>
        </div>
        <loading v-if="loadingImages"/>
    </div>
</template>

<script>
import axios from 'axios';
import loading from '@/components/Loading';

export default {
    name: 'New',
    data(){
        return {
            images: [],
            loadingImages: true,
            outerVisible: false,
            currentImage: {}
        }
    },
    components: {
        loading
    },
    mounted () {
        axios.get('/api/photos')
            .then(response => {
                    let id = 0;
                    response.data.data.forEach(element => {
                        if (element.popular) {
                            element.id = id;
                            id++;
                            element.path = 'http://gallery.dev.webant.ru/media/' + element.image.contentUrl;
                            this.images.push(element);
                        }
                    })
            })
            .then(()=>{
                this.loadingImages = false;
            })
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
</style>