<template>
    <div class="tt">
        <p>头部</p>
        <p class="context">
            <!-- 插槽中有东西就是备用内容 -->
            <slot name="con"  :test="testName"></slot>
        </p>
        <p>底部<slot name="fot"></slot></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testName:'组件内部数据'
        }
    },
}
</script>

<style>
/* <my-test>
         <template v-slot:con="scope">内容2 {{scope.test}}</template>
         <template slot="fot">底部2</template>
      </my-test> */
</style>
