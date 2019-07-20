<template>
  <div class="drwlen">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.comment_status"
              type="success"
              size="mini"
              @click="togglo(scope.row)"
            >打开评论</el-button>
            <el-button v-else type="danger" size="mini" @click="togglo(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        :page-size="resParams.per_page"
        :current-page="resParams.page"
        @current-change="page"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      resParams: {
        page: 1,
        per_page: 20,
        response_type: "comment"
      },
      total: 0
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    page(newpage) {
      this.resParams.page = newpage;
      this.getComments();
    },
    async getComments() {
      const {
        data: { data }
      } = await this.axios.get("articles", { params: this.resParams });
      this.comments = data.results;
      this.total = data.total_count;
    },
    togglo(row) {
      const text1 = "确认要打开评论吗";
      const text2 = "确认要关闭评论吗 , 关闭后用户无法对改文章进行评论";
      this.$confirm(row.comment_status ? text2 : text1, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.axios.put("comments/status?article_id=" + row.id, {
            allow_comment: !row.comment_status
          });
          this.$message.success("修改状态成功");
          row.comment_status = data.allow_comment;
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>
