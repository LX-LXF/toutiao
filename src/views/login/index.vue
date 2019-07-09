<template>
  <div class="login-coment">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
        <el-link type="primary" :underline="false">用户协议</el-link>和
        <el-link type="primary" :underline="false">隐私条款</el-link>
        <el-form-item>
          <el-button  class="boxx" type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.login-coment {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 460px;
    height: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
    .boxx{
        width: 100%;
        margin-top: 30px;
    }
  }
}
.el-checkbox {
  margin-right: 10px;
}
</style>
