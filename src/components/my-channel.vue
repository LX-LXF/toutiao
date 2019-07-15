<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { async } from 'q';
export default {
    name:'my-channel',
    props:['value'],
  data() {
    return {
        options:[]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
        const {
            data: { data }
            } = await this.axios.get("channels");
            this.options = data.channels;
        },
        fn(value){
            this.$emit('input' , value)
        }
    }
};
</script>

<style>
</style>
