<template>
  <div>
    <div class="loginTop">
      <div class="imagestyle">
        <i class="iconfont icon-jingzhun"></i>
      </div>
      <div class="loginTop-title">精准征兵大数据辅助决策系统</div>
    </div>

    <!--登录表单-->
    <div class="loginFrom">
      <van-cell-group>
        <van-field
          v-model="card"
          ref="checkbox"
          :autofocus="false"
          left-icon="idcard"
          @focus="focusClick"
          readonly
          placeholder="身份证号"
        />
        <van-number-keyboard
          :show="show"
          extra-key="X"
          close-button-text="完成"
          @blur="show = false"
          v-model="card"
        />

        <div class="blackBorder"></div>

        <van-field v-model="tel" clearable type="tel" left-icon="smile-o" placeholder="手机号" />

        <div class="blackBorder"></div>

        <div v-if="primary">
          <van-field
            v-model="password"
            type="password"
            clearable
            left-icon="music-o"
            placeholder="密码"
          />
        </div>

        <div v-else class="phoneCode">
          <div>
            <van-field v-model="sms" left-icon="music-o" center clearable placeholder="请输入短信验证码">
              <template #button>
                <van-button
                  size="small"
                  plain
                  type="info"
                  @click="sendCode"
                  :disabled="smsFlag"
                >{{sendTime}}</van-button>
              </template>
            </van-field>
          </div>
        </div>

        <div class="blackBorder"></div>
      </van-cell-group>
    </div>

    <div style="margin-top:20px">
      <van-button @click="userLoginClick" color="#2E87CD" type="info">登录</van-button>
    </div>

    <div style="margin:20px 0">
      <van-button plain color="#2E87CD" type="info" @click="registerClick">注册</van-button>
    </div>

    <!-- <div class="bottonTwo">
      <van-button
        class="bottonTwo-btn"
        :type="primary == true ? 'primary':'default'"
        :style="{'color':primary == true ? '':'#1989fa'}"
        @click="passwordClick"
      >密码登录</van-button>
      <van-button
        class="bottonTwo-btn"
        :type="primary == false ? 'primary':'default'"
        :style="{'color':primary == false ? '':'#1989fa'}"
        @click="phoneCodeClick"
      >手机验证码登录</van-button>
    </div>-->
  </div>
</template>
<script>
import Vue from "vue";
import { Field, Button, Toast, NumberKeyboard } from "vant";
Vue.use(Field, NumberKeyboard);
import {
  addApply,
  postApply,
  identityCard,
  checkPhone
} from "../../libs/utils";
export default {
  data() {
    return {
      card: "410526199806185330",
      tel: "18237203633",
      password: "",
      sms: "",
      primary: true,
      //获取验证码属性
      smsFlag: false,
      sendTime: "获取验证码",
      snsMsgWait: 60,
      show: false
    };
  },
  methods: {
    focusClick() {
      this.show = true;
      // this.$refs.checkbox.blur();
    },

    //注册按钮
    registerClick() {
      this.$router.push({
        name: "register"
      });
    },

    //登录
    userLoginClick() {
      if (!this.card) {
        Toast("身份证号不能为空");
        return;
      }
      if (!identityCard(this.card).isPass) {
        Toast("身份证号格式错误");
        return;
      }
      if (!this.tel) {
        Toast("手机号不能为空");
        return;
      }
      if (!checkPhone(this.tel)) {
        Toast("手机号格式错误！");
        return;
      }
      /*当用户选择 手机密码登录时  primary为true；  选择手机验证码时，primary为false*/
      if (this.primary == true) {
        if (!this.password) {
          Toast("密码不能为空");
          return;
        }
        console.log("这是密码登录");
        let postObj = addApply({
          idCard: this.card,
          mphone: this.tel,
          password: this.password
        });
        console.log(postObj);
        this.$post("/enterApi", postObj).then(res => {
          console.log(res);
          if (res.Flag) {
            console.log(res.userInfo);
            localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
            this.$router.push({
              name: "Home"
            });
          }
        });
      } else {
        if (!this.sms) {
          Toast("验证码不能为空");
          return;
        }
        console.log("这是验证码登录");
        let postObj = addApply({
          code_type: "authentication",
          idCard: this.card,
          mphone: this.tel,
          vCode: this.sms,
          wxuserinfo: "",
          deviceinfo: ""
          //   wxuserinfo: JSON.stringify(wxuserInfo),
          //   deviceinfo: JSON.stringify(this.data.deviceinfo)
        });
        console.log(postObj);
        this.$post("/enterApi2", postObj).then(res => {
          console.log(res);
          if (res.Flag) {
            console.log(res.userInfo);
            localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
            this.$router.push({
              name: "Home"
            });
          }
        });
      }
    },

    //切换为密码登录
    passwordClick() {
      this.primary = true;
    },

    //切换为手机验证码登录
    phoneCodeClick() {
      this.primary = false;
    },

    //获取验证码
    sendCode() {
      if (!this.tel) {
        Toast("手机号不能为空");
        return;
      }
      if (!checkPhone(this.tel)) {
        Toast("手机号格式错误！");
        return;
      }
      this.smsFlag = true;
      // 60秒后重新获取验证码
      let postObj = postApply({
        type: "authentication",
        mphone: this.tel
      });
      console.log("smsFlag", this.smsFlag, postObj);
      this.$post("/sendCode", postObj).then(res => {
        console.log(res);
        if (res.Code) {
          Toast(res.Message);
        }
      });
      var inter = setInterval(
        function() {
          this.sendColor = "#cccccc";
          (this.sendTime = this.snsMsgWait + "秒后重发"),
            (this.snsMsgWait = this.snsMsgWait - 1);
          if (this.snsMsgWait < 0) {
            clearInterval(inter);
            this.sendTime = "重新获取验证码";
            this.snsMsgWait = 60;
            this.smsFlag = false;
          }
        }.bind(this),
        1000
      );
      console.log(66666);
    }
  }
};
</script>
<style scoped lang="less">
.loginTop {
  width: 100%;
  height: 170px;
  background-color: #2e87cd;
  overflow: hidden;
}

.imagestyle {
  margin: 20px auto;
  .iconfont{
    font-size: 65px;
    color: #fff;
  }
}


.loginTop-title {
  text-align: center;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
}

.loginFrom {
  height: 150px;
  margin: 50px 0 10px 0;
  padding: 0 15px;
}

.van-cell {
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
}

.van-cell::after {
  border-bottom: 0px solid red;
}

.van-hairline--top-bottom::after {
  border-width: 0;
}

[class*="van-hairline"]::after {
  border-bottom: 0px solid #e4e4e4;
}

.blackBorder {
  width: 313px;
  margin-left: 15px;
  border-bottom: 1px solid #e4e4e4;
}

.loginFrom /deep/ .van-field__left-icon .van-icon {
  color: #1989fa;
}

.van-button {
  width: 313px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

.bottonTwo {
  width: 313px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.bottonTwo .van-button {
  width: 150px;
  font-size: 16px;
}

// .bottonTwo-btn {
//   color: #1989fa;
// }

.phoneCode /deep/ .van-button {
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  font-size: 14px;
}

.phoneCode /deep/ .van-field__button {
  padding: 0;
}
</style>