import Vue from 'vue'
import Router from 'vue-router'
import gallery from '@/components/Gallery'
import authorization from '@/components/Authorization'
import admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '', name: 'default', component: gallery, props: {category: 'new'} },
        { path: '/New', name: 'new', component: gallery, props: {category: 'new'} },
        { path: '/Popular', name: 'popular', component: gallery, props: {category: 'popular'} },
        { path: '/Authorization', name: 'authorization', component: authorization },
        { path: '/Admin', name: 'admin', component: admin },
    ]
})