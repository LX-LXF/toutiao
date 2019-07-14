// 注册所有组件在vue下
// 封装成插件的形式 vue.use(插件)执行插件的配置对象中install函数
import MyBread from '../components/my-bread.vue'
export default {
    install (Vue) {
        Vue.component(MyBread.name,MyBread)
    }
}