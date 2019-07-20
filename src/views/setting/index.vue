<template>
  <div class="ioi">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号">{{userForm.id}}</el-form-item>
            <el-form-item label="手机">{{userForm.mobile}}</el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="userForm.intro" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <p style="text-align:center">修改头像</p>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from "../../views/eventBus/index.js";
export default {
  data() {
    return {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(window.sessionStorage.getItem("hm73-toutiao")).token
      },
      userForm: {
        data: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const {
        data: { data }
      } = await this.axios.get("user/profile");
      this.userForm = data;
    },
    async updateUser() {
      const {
        data: { data }
      } = await this.axios.patch("user/profile", {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      });
      this.$message.success("修改用户信息成功");
      eventBus.$emit("updata", data.name);
      const localUser = JSON.parse(
        window.sessionStorage.getItem("hm73-toutiao")
      );
      localUser.name = data.name;
      window.sessionStorage.setItem("hm73-toutiao", JSON.stringify(localUser));
    },
    upload(data) {
        const formData = new FormData()
        formData.append('photo' ,data.file)
        this.axios.patch('user/photo' , formData).then(res =>{
            this.userForm.photo = res.data.data.photo
            eventBus.$emit('update' , res.data.data.photo)
            const localUser = JSON.parse(
        window.sessionStorage.getItem("hm73-toutiao")
      );
      localUser.photo = res.data.data.photo
      window.sessionStorage.setItem("hm73-toutiao", JSON.stringify(localUser));
            
        })
    },
  }
};
</script>

<style>
</style>
