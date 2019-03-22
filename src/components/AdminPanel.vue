<template>
    <div>
        <router-link v-if="authorizedBool" to="Admin">Добавить фото</router-link>
        <router-link v-else to="Authorization">Авторизация</router-link>
    </div>
</template>

<script>
export default {
    name: 'adminpanel',
    data(){
        return {
        }
    },
    mounted() {
        this.$store.dispatch('SET_AUTHORIZED')
        this.authorized = this.$store.getters.AUTHORIZED
    },
    computed: {
        authorizedBool: {
            get: function(){return this.$store.getters.AUTHORIZED},
            set: function(){this.$store.dispatch('SET_AUTHORIZED')}
        }
    },
}
</script>

<style lang="sass" scoped>
</style>