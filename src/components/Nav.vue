<template>
    <div>
        <ul>
            <li v-for="item in pages" :key="item.id">
                <router-link :to="{path: item.name}" active-class="active">{{ item.name }}</router-link>
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
          ]
      }
  },
  methods: {
      greet: function(name){
          alert('Ты нажал на ' + name);
      } 
  }
}
</script>

<style lang="sass" scoped>
    div
        width: 80%
        border: 2px solid transparent
        border-bottom-color: #E4E7ED
        padding-left: 2%
        ul
            display: flex
            li:not(:first-child)
                margin-left: 50px
            a
                color: #8C8C8C
                &.active
                    color: #ED5992
                    position: relative
                    &::before
                        content: ''
                        position: absolute
                        display: block
                        width: 160%
                        left: -30%
                        height: 2.5px
                        background-color: #ED5992
                        bottom: -13px
</style>