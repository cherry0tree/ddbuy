<template>
<div class="loginWrapper">
  <div class="loginBox">
    <div class="auth-form">
      <img :src="imageURL" 
            alt="">
      <van-icon name="close" 
                class="closeButton"
                @click="close"></van-icon>
      <van-tabs v-model="active"
                animated>
        <van-tab title="登录">
          <!-- 账号密码登录 -->
          <van-cell-group v-show="!isShowSMSLogin">
            <van-field v-model="login_userName"
                       required
                       clearable
                       label="账号"
                       maxlength="11"
                       placeholder="请输入手机号码"
                       >
            </van-field>
            <van-field v-model="login_password"
                       required
                       type="password"
                       label="密码"
                       placeholder="请输入登录密码">
            </van-field>
            <van-field v-model="imgCaptcha"
                       center
                       clearable
                       maxlength="4"
                       placeholder="请输入验证码">
              <img src="http://demo.itlike.com/web/xlmc/api/captcha" 
                   alt="captcha"
                   slot="button"
                   @click="getCaptcha"
                   ref="imgCaptcha">
            </van-field>
          </van-cell-group>
          <!-- 手机号快捷登录 -->
          <van-cell-group v-show="isShowSMSLogin">
            <van-field v-model="login_phone"
                       required
                       clearable
                       label="手机号码"
                       maxlength="11"
                       placeholder="请输入手机号码">
            </van-field>
            <van-field v-model="smsCaptcha"
                       center
                       clearable
                       required
                       label="验证码"
                       maxlength="6"
                       placeholder="输入短信验证码">
              <van-button v-if="!countDown"
                          slot="button"
                          size="small"
                          type="primary"
                          @click="sendVerifyCode"
                          v-model="smsCaptcha">
                验证码
              </van-button>
              <van-button v-else
                          slot="button"
                          size="small"
                          type="primary"
                          disabled=""
                          v-model="smsCaptcha">
                已发送{{countDown}}s
              </van-button>
            </van-field>
          </van-cell-group>
          <van-button type="info"
                      size="large"
                      style="margin-top:1rem"
                      @click='login'>
            登录
          </van-button>
          <div class="switchLogin" @click="switchLogin">
            {{this.isShowSMSLogin?'账号密码登录': '手机短信登录'}}
          </div>          
        </van-tab>
      </van-tabs>
    </div>
  </div>
</div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import {getPhoneCaptcha, phoneCaptchaLogin} from '../../network/index'
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      active: 0,
      timeIntervalID: 0,
      countDown: 0,                 // 验证码倒计时      
      login_userName: '',            // 用户名登录
      login_password: '',           // 用户密码
      login_phone: '',              // 手机号码登录
      imageURL: require('./../../assets/images/dashboard/login/normal.png'),

      register_userName: '',        // 注册用户名
      register_pwd: '',             // 注册密码

      isShowSMSLogin: false,         // 是否短信登录
      imgCaptcha: '',               // 图片验证码

      smsCaptcha: '',               // 短信验证码
      smsCaptchaResult: null      // 短信验证码结果
    }
  },
  computed: {
    phoneNumberRight() {
      let value = this.login_phone
      if(value > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
      }
    }
  },
  methods: {
    close(){
      this.$router.back();
    },
    //mapActions 同步用户信息
    ...mapActions(['syncuserInfo']),
    //获取短信验证码
    async sendVerifyCode() {
      this.countDown = 30;
      this.timeIntervalID = setInterval(() => {
        this.countDown--;
        if(this.countDown == 0){
          clearInterval(this.timeIntervalID);
        }
      }, 1000)
      let result = await getPhoneCaptcha()
      if(result.success_code == 200) {
        this.smsCaptchaResult = result.data.code;
        //获验证码成功
        Dialog.alert({
          title: '温馨提示',
          message: '手机验证码为' + result.data.code
        }).then(() => {
        });        
      }
    },
    switchLogin() {
      this.isShowSMSLogin = !this.isShowSMSLogin
    },
    //账号密码登录切换图片验证码
    getCaptcha() {
      let captchaEle = this.$refs.imgCaptcha;
      this.$set(captchaEle, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date());
    },
    //正则验证
    phoneRegex(number) {
      return (/[1][3,4,5,6,7,8][0-9]{9}$/.test(number))
    },
    async login() {
      if (this.isShowSMSLogin) {
        //手机验证码登录
        if(this.smsCaptcha < 7 || this.smsCaptcha != Number(this.smsCaptchaResult)) {
          //验证验证码
          Toast({
            message: '请输入正确的验证码',
            duration: 800
          });
          return;          
        } else if(this.login_phone.length < 10 || !this.phoneNumberRight) {
          //验证手机号码是否正确
          Toast({ 
            message: '请输入正确的手机号码',
            duration: 800
          })
          return;          
        }
        let ref = await phoneCaptchaLogin(this.login_phone, this.smsCaptcha);
        console.log(ref.data)
        //服务端返回数据 设置userInfo 保存到vuex和本地
        this.syncuserInfo(ref.data);
        this.$router.back();
      } else {
      //账号密码登录
        if(!this.phoneRegex(this.login_userName)) {
            Toast({
              message: '格式不正确,请输入正确的手机号码',
              duration: 800
            })
            return;          
        } else if(this.login_password.length < 1) {
            Toast({
              message: '请输入正确的密码',
              duration: 800
            });
            return;          
        } else if(this.imgCaptcha.length < 4) {
          //图片验证码 一般在服务端用session保存客户端提交表单后 由服务端判断是否正确
            Toast({
              message: '请输入正确的验证码',
              duration: 800
            });
            return;          
        }
        console.log('2222222')
        let ref = await phoneCaptchaLogin(this.login_userName, this.login_password);
        this.$router.back();
      }
    }
  }
}
</script>
<style scoped lang="less">
.loginWrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("./../../assets/images/dashboard/login/back2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .loginBox{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    opacity: 0.95;
    .auth-form{
      position: relative;
      padding: 2rem;
      background-color: #fff;
      width: 26.5rem;
      border-radius: 8px;
      box-sizing: border-box;
      max-width: 90%;
      font-size: 1.167rem;
    }
    img {
      position: absolute;
      top: 1rem;
      width: 4rem;
      left: 50%;
      transform: translate(-50%, -70%);
      z-index: 1;
      @media screen and (max-width: 320px) {
        top: 0.5rem;
        transform: translate(-50%, -40%);
        width: 5rem;
      }      
    }
    .closeButton{
      position: absolute;
      right: 1rem;
      top: 0.4rem;
    }
    .switchLogin{
      margin-top: 1rem;
      font-size: 0.78rem;
    }
  }
}
</style>