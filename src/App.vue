<template>
  <div id="app">
    <Header/>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'app',
  components: {
    Header
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
</style>
