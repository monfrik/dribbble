<template>
    <div>
        <ul v-if="!loadingImages">
            <li v-for="image in images" :key="image.id">
                <img :src="image.path" :alt="image.name" @click="outerVisible = true, currentImage = image">
            </li>
        </ul>
        <el-dialog title="Outer Dialog" :visible.sync="outerVisible">
            <img :src="currentImage.path" :alt="currentImage.name">
            <h2>{{ currentImage.name }}</h2>
            <p>{{ currentImage.description }}</p>
        </el-dialog>
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
</style>