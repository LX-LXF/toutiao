<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
      <div class="li" :class="{close:collapse}"></div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-loading"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-s-tools"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="to()"></span>
        <span class="l">江苏传智播客教育有限公司</span>
        <el-dropdown class="lol">
          <span class="el-dropdown-link">
            <img
              src="../../assets/images/avatar.jpg"
              style="vertical-align:middle"
              width="30px"
              height="30px"
            />

            <b class="he">黑马小哥</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      collapse: false      
    }
  },
  methods:{
    to(){
    this.collapse = !this.collapse
    }
  }
};
</script>

<style>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-icon-s-fold {
  font-size: 26px;
  line-height: 60px;
  vertical-align: middle;
}
.my-header {
  border-bottom: 1px solid #ddd;
}
.l {
  line-height: 18px;
  padding-left: 5px;
  vertical-align: middle;
}
.lol {
  float: right;
  margin-top: 22px;
}
.he {
  vertical-align: middle;
  padding-left: 5px;
}
.my-aside{
  background-color: #002033;
}
.li{
  width: 100%;
  height: 60px;
  background: url(../../assets/images/logo_admin.png)no-repeat center / 140px auto;
}
.close {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
</style>
