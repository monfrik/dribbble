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
        this.$store.dispatch('CHECK_ACCESS_TOKEN')
        .then(response => {
            if (!response) {
                this.$store.dispatch('UPDATE_ACCESS_TOKEN')
                .then(response => {
                    if (!response) {
                        this.$store.dispatch('SIGNOUT')
                    }
                })
            }
        })
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
    .el-dialog__wrapper
        max-height: 100vh
        .el-dialog
            margin-top: 2vh
            max-height: 75vh
</style>
