<template>
    <div>
        <ul>
            <li v-for="item in pages" :key="item.id">
                <router-link :to="{path: item.name}" v-bind:class="{ active: activePage==item.name }" @click.native="changeActivePage(item.name)">{{ item.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    data(){
        return {
            pages: [
                {  name: 'New', id: 0},
                {  name: 'Popular', id: 1}
            ],
            activePage: 'New'
        }
    },
    methods: {
        changeActivePage(name){
            this.activePage = name
        }
    }
}
</script>

<style lang="sass" scoped>
    div
        width: 65%
        border: 2px solid transparent
        border-bottom-color: #E4E7ED
        padding-left: 2%
        ul
            display: flex
            li:not(:first-child)
                margin-left: 50px
            a
                color: #8C8C8C
                position: relative
                &:hover
                    color: #ED5992
                &.active
                    color: #ED5992
                    &::before
                        content: ''
                        position: absolute
                        display: block
                        width: 160%
                        left: -30%
                        height: 2.5px
                        background-color: #ED5992
                        bottom: -65%
</style>