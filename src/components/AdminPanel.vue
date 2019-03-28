<template>
    <div>
        <div v-if="authorizedBool" class="admin">
            <router-link v-if="authorizedBool" to="Admin">Add image</router-link>
            <a @click="signOut()">Log out</a>
        </div>
        <router-link v-else to="Authorization">Authorization</router-link>
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
        a
            cursor: pointer
            white-space: nowrap
            color: #8C8C8C
            &:hover
                color: #ED5992
            &:nth-child(2)
                margin-left: 10%
</style>