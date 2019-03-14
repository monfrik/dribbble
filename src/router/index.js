import Vue from 'vue'
import Router from 'vue-router'
import New from '@/components/New'
import Popular from '@/components/Popular'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/New', name: 'new', component: New },
        { path: '/Popular', name: 'popular', component: Popular }
    ]
})