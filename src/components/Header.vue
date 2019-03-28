<template>
    <header>
        <logo/>
        <Nav/>
        <adminpanel/>
    </header>
</template>

<script>
import logo from '@/components/Logo'
import Nav from '@/components/Nav'
import adminpanel from '@/components/AdminPanel'

export default {
  name: 'Header',
  components: {
    logo,
    Nav,
    adminpanel
  }
}
</script>

<style lang="sass" scoped>
    header
        padding: 30px 24px 0px 24px
        margin: auto
        display: flex
        max-width: 90vw
        justify-content: space-between
</style>