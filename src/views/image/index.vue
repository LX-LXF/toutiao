<template>
  <div class="index">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom: 20px;">
        <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" size="small" @click="dialogVisible=true">添加素材</el-button>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id" class="lii">
          <img :src="item.url" alt class="im" />
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="shoucang(item)"></span>
            <span class="el-icon-delete" @click="shanchu(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(window.sessionStorage.getItem("hm73-toutiao")).token
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    async getImages() {
      const {
        data: { data }
      } = await this.axios.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
    },
    search() {
      this.reqParams.page = 1;
      this.getImages();
    },
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    handleSuccess(res) {
      this.imageUrl = res.data.url;
      this.$message.success("成功");
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
        this.imageUrl = null;
      }, 1500);
    },
    async shoucang(item) {
      const {
        data: { data }
      } = await this.axios.put("user/images/" + item.id, {
        collect: !item.is_collected
      });
      this.$message.success("操作成功");
      item.is_collected = data.collect;
    },
    shanchu(id) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async() => {
          const {
            data: { data }
          } = await this.axios.delete("user/images/" + id);
          this.getImages()
          this.$message.success("删除成功");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang='less'>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.lii {
  width: 180px;
  height: 180px;
  float: left;
  border: 1px dashed #eee;
  margin-left: 92px;
  margin-bottom: 20px;
  position: relative;
}
.im {
  width: 100%;
  height: 100%;
  display: block;
}
.fot {
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
}
.el-icon-star-off {
  margin: 0 20px;
}
&.red {
  color: red;
}
</style>
