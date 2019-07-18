// 注册所有组件在vue下
// 封装成插件的形式 vue.use(插件)执行插件的配置对象中install函数
import MyBread from '../components/my-bread.vue'
import MyChannel from '../components/my-channel.vue'
import MyImage from '../components/my-image.vue'
export default {
    install (Vue) {
        Vue.component(MyBread.name,MyBread)
        Vue.component(MyChannel.name,MyChannel)
        Vue.component(MyImage.name,MyImage)
    }
}