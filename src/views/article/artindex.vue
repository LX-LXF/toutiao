<template>
  <div class="artcle-con">
    <!-- 筛选容器 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选容器内容 -->
      <el-form :v-model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态: ">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道: ">
          <el-select v-model="reqParams.channel_id">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item label="时间: ">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
            <el-button  type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
       
    </el-card>
  </div>
</template>
 
<script>
import MyBread from '@/components/my-bread.vue'

export default {
  components:{MyBread},
  data() {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      options: [
        {
          id: 1,
          name: "嘿嘿"
        }
      ],
      value1:[]
    };
  }
};
</script>

<style>
.el-card {
  margin-bottom: 20px;
}
</style>
