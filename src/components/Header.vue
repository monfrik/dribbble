<template>
    <header>
        <logo/>
        <Nav/>
    </header>
</template>

<script>
import logo from '@/components/Logo';
import Nav from '@/components/Nav';

export default {
  name: 'Header',
  components: {
    logo,
    Nav
  }
}
</script>

<style lang="sass" scoped>
    header
        padding: 30px 24px 0px 24px
        display: flex
        justify-content: space-between
</style>