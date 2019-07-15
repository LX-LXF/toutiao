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
            <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item label="时间: ">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="changeDate"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        根据筛选条件共查询
        <b>{{total}}</b>条结果
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:60px; height:60px"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag type="success" v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="info" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
 
<script>
import { async } from "q";
export default {
  data() {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      value1: [],
      articles: [],
      total: 0
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const {
        data: { data }
      } = await this.axios.get("articles", { params: this.reqParams });
      this.articles = data.results;
      this.total = data.total_count;
    },
    changeDate(values) {
      (this.reqParams.begin_pubdate = values[0]),
        (this.reqParams.end_pubdate = values[1]);
    },
    search() {
      this.reqParams.page = 1;
      this.getArticles();
    },
    changePager(newPager) {
      this.reqParams.page = newPager;
      this.getArticles();
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.axios.delete(`articles/${id}`);
          this.getArticles();
          this.$message.success("删除成功!");
        })
        .catch(() => {});
    },
    edit(id) {
      this.$router.push({ path: "/publish", query: { id } });
    }
  }
};
</script>

<style>
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
</style>
