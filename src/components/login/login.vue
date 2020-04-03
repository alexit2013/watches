<template>
  <div class="container-login-one">
    <div class="login-container-top">
      <span class="span1">Your
        <span class="span2">Smart Assistant
          <span class="span3">|</span>
          <span>手表进销存管理系统</span>
        </span>
      </span>
    </div>
    <div style="display: flex;justify-content: space-between;">
      <div class="login-bottom">
        <div class="every-img">
          <div>
            <div class="bottom-img" @click="qrCodeImg1">
              <img src="../../assets/imgs/qrCode.png" />
            </div>
            <div class="bottom-text">
              <span>IOS下载</span>
            </div>
          </div>
          <div ref="qrcode1" style="position: absolute;left: 110%;bottom: 10px;display: none;z-index: 999;">
            <img src="../../assets/imgs/ios.png" style="width: 130px; height: 130px;" />
          </div>
        </div>
        <div class="every-img">
          <div>
            <div class="bottom-img" @click="qrCodeImg2">
              <img src="../../assets/imgs/qrCode.png" />
            </div>
            <div class="bottom-text">
              <span>安卓下载</span>
            </div>
          </div>
          <div ref="qrcode2" style="position: absolute;left: 110%;bottom: 10px;display: none;z-index: 999;">
            <img src="../../assets/imgs/android.png" style="width: 130px; height: 130px;" />
          </div>
        </div>
        <!-- <div class="every-img">
          <div>
            <div class="bottom-img" @click="closeQr">
              <img src="../../assets/imgs/link.png" />
            </div>
            <div class="bottom-text">
              <span>IOS安装方法</span>
            </div>
          </div>
        </div> -->
        <div class="every-img">
          <div>
            <div class="bottom-img" @click="closeQr">
              <a href="https://hk.wistechx.cn/app/WatchEx/down/Printer.zip">
                <img src="../../assets/imgs/link.png" />
              </a>
            </div>
            <div class="bottom-text">
              <span style="white-space: pre-wrap;">网页版打印机驱动程序及安装说明</span>
            </div>
          </div>
        </div>
      </div>
      <div class="login-container" @keydown="keyLogin()">
        <div class="containter-center">
          <div style="width: 75%;height: auto;margin: 0 auto;">
            <div class="login-top">
              <div>
                <span class="top-span">Scientific</span>
              </div>
              <div>
                <span class="top-span">Management</span>
              </div>
              <div style="margin-top: 20px;">
                <span class="top-span-login top-span">登录</span>
              </div>
            </div>
            <div class="login-form">
              <div class="username" id="user">
                <span><img :src="usernameImg" /></span>
                <input class="user-input" type="text" v-model="loginForm.user" placeholder="请输入用户名"
                  autofocus="autofocus" prefix-icon="el-icon-s-custom" tabindex="1" auto-complete="on"
                  @focus="usernameFocus($event)" @blur="usernameBlur($event)" />
              </div>
              <div class="password" id="psw">
                <span><img :src="passwordImg" /></span>
                <input class="pass-input" type="password" v-model="loginForm.psw" placeholder="请输入密码"
                  prefix-icon="el-icon-lock" tabindex="2" auto-complete="on" @focus="passwordFocus($event)"
                  @blur="passwordBlur($event)" />
              </div>
            </div>
            <div class="login-button">
              <button @click="handleLogin" class="loginBtn">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 40px;"></div>
  </div>
</template>
<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          user: "",
          psw: ""
        },
        usernameImg: require('../../assets/imgs/user1.png'),
        passwordImg: require('../../assets/imgs/psw1.png'),
        iosInput: 'http',
        printInput: 'https://www.zcool.com.cn/',
      }
    },
    beforeRouteEnter: (to, from, next) => {
      // 组件内守卫
      // 已登录状态回到登录状态，即 登出
      next(vm => {
        vm.$store.dispatch('setRole', null)
      })
    },
    methods: {
      // 二维码下载功能
      qrCodeImg1() {
        this.$refs.qrcode2.style.display = 'none';
        if (this.$refs.qrcode1.style.display == 'none') {
          this.$refs.qrcode1.style.display = 'block';
        } else if (this.$refs.qrcode1.style.display == 'block') {
          this.$refs.qrcode1.style.display = 'none';
        }
      },
      qrCodeImg2() {
        this.$refs.qrcode1.style.display = 'none';
        if (this.$refs.qrcode2.style.display == 'none') {
          this.$refs.qrcode2.style.display = 'block';
        } else if (this.$refs.qrcode2.style.display == 'block') {
          this.$refs.qrcode2.style.display = 'none';
        }
      },
      closeQr() {
        this.$refs.qrcode1.style.display = 'none';
        this.$refs.qrcode2.style.display = 'none';
      },
      // 登录
      handleLogin(loginForm) {
        if (this.loginForm.user == "" || this.loginForm.psw == "") {
          this.$message.warning({
            message: "用户名或密码不能为空 !",
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/UserLogin', {
            'user': this.loginForm.user,
            'psw': this.loginForm.psw
          }).then((res) => {
            console.log('登陆成功啦');
            console.log(res)
            this.$message.success({
              message: '登陆成功',
              showClose: true,
              duration: 2000
            });
            // 将用户昵称、用户角色和token放入sessionStorage
            sessionStorage.setItem('nick', res.data.nick);
            console.log(sessionStorage.getItem('nick'));
            sessionStorage.setItem('role', res.data.role);
            sessionStorage.setItem('token', res.data.token);
            console.log(sessionStorage.getItem('token'));
            sessionStorage.setItem('peerFlag', res.data.PeerFlag);
            sessionStorage.setItem('marketPriceFlag', res.data.MarketPriceFlag);
            // 将用户昵称、用户角色及token放入vuex
            this.$store.dispatch('setNick', res.data.nick);
            this.$store.dispatch('setRole', res.data.role);
            this.$store.dispatch('setToken', res.data.token);
            this.$store.dispatch('setPeerFlag', res.data.PeerFlag);
            this.$store.dispatch('setMarketPriceFlag', res.data.MarketPriceFlag);
            console.log(this.$store.state.isLogin);
            this.$router.push('/home');
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          }).catch((err) => {
            this.$message.error({
              // "啊偶，登录失败，请检查用户名或密码输入是否正确"
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
            this.$store.dispatch('setRole', null);
            this.loginForm.password = "";
            console.log(err);
            console.log('fffffffff');
          })
        }

      },
      usernameFocus(e) {
        this.usernameImg = require('../../assets/imgs/user-1.png');
        let user = document.getElementById("user");
        e.target.style.color = "#2e4d65";
        user.style.borderBottom = "2px solid #2e4d65";
      },
      usernameBlur(e) {
        this.usernameImg = require('../../assets/imgs/user1.png');
        let user = document.getElementById("user");
        e.target.style.color = "#c8c8c8";
        user.style.borderBottom = "2px solid #c8c8c8";
      },
      passwordFocus(e) {
        this.passwordImg = require('../../assets/imgs/psw-1.png');
        let psw = document.getElementById("psw");
        e.target.style.color = "#2e4d65";
        psw.style.borderBottom = "2px solid #2e4d65";
      },
      passwordBlur(e) {
        this.passwordImg = require('../../assets/imgs/psw1.png');
        let psw = document.getElementById("psw");
        e.target.style.color = "#c8c8c8";
        psw.style.borderBottom = "2px solid #c8c8c8";
      },
      // 回车键登录
      keyLogin() {
        if (event.keyCode == 13) {
          this.handleLogin();
        }
      }
    },
  }

</script>
<style lang="scss" scoped>
  $height: 40px;

  .container-login-one {
    height: auto;
    background: url('../../assets/imgs/background.png') no-repeat;
  }

  .login-container-top {
    padding-top: 80px;
    margin-left: 5%;

    .span1 {
      font-style: italic;
      font-size: 30px;
      color: #fff;

      .span2 {
        font-weight: bold;

        .span3 {
          margin: 0 20px;
        }
      }
    }
  }

  .login-container {
    height: auto;
    margin-top: 80px;
    margin-right: 15%;

    .containter-center {
      padding: 60px 0;
      background-color: #fff;
      border-radius: 3px;
    }

    .login-top {

      .top-span {
        font-weight: bold;
        line-height: 60px;
        color: #2e4d65;
      }

      .top-span-login {
        color: #000;
      }
    }

    .login-form {
      width: 100%;
      margin: 50px 0;

      .username {
        width: 100%;
        padding-bottom: 10px;
        display: flex;
        border-bottom: 2px solid #c8c8c8;
      }

      .user-input,
      .pass-input {
        width: 80%;
        height: $height;
        padding-left: 20px;
        border: 0;
        background: 0;
        outline: none;
        font-size: 24px;
        color: #c8c8c8;
      }

      .password {
        width: 100%;
        margin-top: 40px;
        padding-bottom: 10px;
        display: flex;
        border-bottom: 2px solid #c8c8c8;
      }
    }

    .login-button {
      width: 100%;
      margin: 70px 0 30px 0;

      .loginBtn {
        width: 100%;
        height: 80px;
        font-size: 26px;
        color: #fff;
        background-color: #2e4d65;
        border: 0;
        outline: none;
        border-radius: 50px;
        cursor: pointer;
      }
    }
  }

  .login-bottom {
    margin-top: 120px;
    margin-left: 7%;

    .every-img {
      margin-top: 20px;
      position: relative;
      display: flex;
      text-align: center;
      z-index: 1;

      .bottom-img {
        width: 72px;
        height: 72px;
        line-height: 95px;
        background-color: #7b91a7;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
      }

      .bottom-text {
        width: 72px;
        text-align: center;
        margin-top: 10px;
        color: #ccc;
        font-size: 14px;
      }
    }
  }


  .input-focus {
    border-bottom: 1px solid #2e4d65;
    color: #2e4d65;
  }

  .input-onblur {
    border-bottom: 1px solid #c8c8c8;
    color: #c8c8c8;
  }

  @media screen and (min-width: 1401px) {
    .login-container {
      width: 28%;
    }

    .top-span {
      font-size: 45px;
    }

    .top-span-login {
      font-size: 36px;
    }
  }

  @media screen and (min-width: 1201px) and (max-width: 1400px) {
    .login-container {
      width: 39%;
    }

    .top-span {
      font-size: 30px;
    }

    .top-span-login {
      font-size: 30px;
    }
  }

  @media screen and (max-width: 1200px) {
    .login-container {
      width: 45%;
    }

    .top-span {
      font-size: 30px;
    }

    .top-span-login {
      font-size: 30px;
    }
  }

</style>
<style lang="scss">
  input:-internal-autofill-selected {
    background-color: transparent !important;
    background-image: none !important;
    color: -internal-light-dark-color(black, white) !important;
  }

</style>
