<template>
    <div>
        <div v-if="authorizedBool" class="admin">
            <router-link v-if="authorizedBool" to="Admin">Добавить фото</router-link>
            <a @click="signOut()">Выйти</a>
        </div>
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
    mounted(){
        this.$store.dispatch('CHANGE_AUTHORIZED')
    },
    computed: {
        authorizedBool: {
            get: function(){return this.$store.getters.AUTHORIZED},
            set: function(payload){this.$store.dispatch('CHANGE_AUTHORIZED', payload)}
        }
    },
    methods: {
        signOut(){
            this.authorizedBool = false
            this.$store.dispatch('SIGNOUT')
            this.$router.push('Authorization')
        }
    }
}
</script>

<style lang="sass" scoped>
    .admin
        display: flex
        flex-direction: column
    a
        cursor: pointer
</style>