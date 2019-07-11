<template>
  <div class="login-coment">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form status-icon ref="loginForm" :model="loginForm" :rules="loginRulse">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
        <el-link type="primary" :underline="false">用户协议</el-link>和
        <el-link type="primary" :underline="false">隐私条款</el-link>
        <el-form-item>
          <el-button class="boxx" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { GlobSync } from 'glob';
export default {
  data() {
    const checkMobile = (rule, value, callback) =>{
      console.log(123123)
      if(/^1[3-9]\d{9}$/.test(value)) {
         callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      checked: true,

      loginForm: {
        mobile: "",
        code: ""
      },
      loginRulse: {
        mobile: [
          { required: true, message: "给我把手机号填上", trigger: "blur" },
          {validator:checkMobile, trigger: "blur" },
        ],
        code: [
          { required: true, message: "给我把验证码填上", trigger: "blur" },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.axios
          .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations' , this.loginForm)
          .then(res => {
            const data = res.data
            this.$router.push('/')
          })
          .catch(err =>{
              this.$message.err('用户名或密码错误')            
          })
        }
      });
    }
  }
};
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
    .boxx {
      width: 100%;
      margin-top: 30px;
    }
  }
}
.el-checkbox {
  margin-right: 10px;
}
</style>
