<template>
    <div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
  name: 'loading',
}
</script>

<style lang="sass" scoped>
@keyframes Loading 
    0%   
        background-color: #31196D
        transform: scale(1)
    50%  
        background-color: #ED5992
        transform: scale(1)
    100% 
        background-color: #733CE2 
        transform: scale(0.5)
div
    display: inline-block
    margin: auto
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%)
ul
    display: flex
    justify-content: space-between
    width: 85%
    padding: 0px
li
    animation-name: Loading
    animation-iteration-count: infinite
    width: 15px
    height: 15px
    animation-duration: 1.5s
    border-radius: 100%
    transition: 0.1s
li:nth-child(1)
    animation-delay: 0s
li:nth-child(2)
    animation-delay: 0.2s
li:nth-child(3)
    animation-delay: 0.4s
</style>