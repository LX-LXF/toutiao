<template>
    <div class="nmm">A <button @click="fn">传给B数据</button></div>
</template>

<script>
import eventBus from '../../src/views/eventBus/index.js'
export default {
name:'my-coma',
data() {
    return {
        aData:'A组件数据'
    }
},
methods: {
    fn(){
        eventBus.$emit('getData' , this.aData)
    }
},
}
</script>

<style>

</style>
