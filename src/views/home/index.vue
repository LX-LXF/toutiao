<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
      <div class="li" :class="{close:collapse}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-loading"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
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
              :src="avater"
              style="vertical-align:middle"
              width="30px"
              height="30px"
            />

            <b class="he">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logot()">退出登录</el-dropdown-item>
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
import eventBus from '../../views/eventBus/index.js'
export default {
  data() {
    return {
      collapse: false,
      name:'',
      avater:'',      
    }
  },
  created(){
    const user = JSON.parse(window.sessionStorage.getItem('hm73-toutiao'))
    this.name = user.name
    this.avater = user.photo
    eventBus.$on('updata' , (name)=>{
      this.name = name
    })
    eventBus.$on('update' , (photo)=>{
      this.avater = photo
    })
  },
  methods:{
    to(){
    this.collapse = !this.collapse
    },
    setting(){
      this.$router.push('/setting')
    },
    logot(){
      window.sessionStorage.removeItem('hm73-toutiao')
      this.$router.push('/login')      
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
