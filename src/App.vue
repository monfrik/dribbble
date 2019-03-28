<template>
  <div id="app">
    <Header/>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'app',
    components: {
        Header
    },
    async mounted(){
        let res = await this.$store.dispatch('CHECK_ACCESS_TOKEN')
        console.log(res)
        console.log(this.$store.getters.AUTHORIZED)
        // .then((response)=>{
        //     console.log(response)
        // })
        // if (!this.$store.dispatch('CHECK_ACCESS_TOKEN')){
        //     console.log('2')
        //     if(!this.$store.dispatch('UPDATE_ACCESS_TOKEN')){
        //         console.log('3')
        //     }
        // }
    }
}
</script>

<style lang="sass">
    @font-face
        font-family: acrom
        src: url(./assets/fonts/Acrom-Regular.ttf)
    html
        font-family: 'acrom'
    *
        margin: 0
    ul
        list-style: none
    a
        text-decoration: none
    .main
        margin: 47px 47px 60px 47px
        min-height: 80vh
        position: relative
    .el-pagination.is-background .el-pager li:not(.disabled).active
        background-color: #ED5992
    .el-pagination.is-background .el-pager li:hover:not(.active)
        color: #ED5992
</style>
