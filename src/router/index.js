import VueRouter from 'vue-router'
import Login from '@/views/login'
import Vue from 'vue'
import Home from '../views/home/index.vue'
import Welcome from '../views/welcome/neirong.vue'
import NotFound from '../views/404/in404.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {name : 'login' , path:'/login' ,component:Login},
        {path :'/' ,
        component: Home ,
         children:[
            {name:'welcome' , path:'/' , component :Welcome }
        ]
    },
    // 路径走到这个位置  证明没有任何程序区处理这个路径
    {path:'*' , name: '404' ,component:NotFound }
 ]
})
router.beforeEach((to , from , next) =>{
    const use = window.sessionStorage.getItem('hm73-toutiao')
    if(to.path !== '/login' && !use ) return next('/login')
    next()
})

export default router