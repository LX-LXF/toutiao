import VueRouter from 'vue-router'
import Login from '@/views/login'
import Vue from 'vue'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {name : 'login' , path:'/login' ,component:Login}
    ]
})

export default router