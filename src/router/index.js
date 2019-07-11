import VueRouter from 'vue-router'
import Login from '@/views/login'
import Vue from 'vue'
import Home from '../views/home/index.vue'
import Welcome from '../views/welcome/neirong.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {name : 'login' , path:'/login' ,component:Login},
        {path :'/' ,component: Home , children:[{name:'welcome' , path:'/' , component :Welcome }]}
    ]
})

export default router