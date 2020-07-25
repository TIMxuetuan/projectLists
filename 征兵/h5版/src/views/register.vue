<template>
  <div>
    <!--填写表单-->
    <div class="fillFrom">
      <!--地区选择器-->
      <div class="liStyles">
        <van-field
          readonly
          :border="false"
          clickable
          name="picker"
          v-model="value"
          placeholder="请选择所在行政区*"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            value-key="className"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>

      <!--姓名-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="userName" clearable placeholder="请输入真实姓名*" />
        </van-cell-group>
      </div>

      <!--身份证号-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="userCard" type="digit" clearable placeholder="请输入身份证号*" />
        </van-cell-group>
      </div>

      <!--手机号-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="userPhone" type="tel" clearable placeholder="请输入手机号*" />
        </van-cell-group>
      </div>

      <!--验证码-->
      <div class="liStyles authCode">
        <van-field v-model="sms" center type="digit" clearable placeholder="请输入验证码*" />
        <div>
          <van-button plain @click="sendCode" :disabled="smsFlag" type="info">{{sendTime}}</van-button>
        </div>
      </div>

      <!--家庭号码-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="familyNumber" type="tel" clearable placeholder="请输入家庭号码(选填)" />
        </van-cell-group>
      </div>

      <!--密码-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="userPassword" type="password" clearable placeholder="请输入密码*" />
        </van-cell-group>
      </div>

      <!--确认密码-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="affirmUserPassword" type="password" clearable placeholder="请确认密码*" />
        </van-cell-group>
      </div>
    </div>

    <!--按钮-->
    <div class="twoBtn">
      <div class="oneButton">
        <van-button @click="sumbitClick" type="info">立即提交</van-button>
      </div>
      <div class="twoButton">
        <van-button @click="toLogin" type="info">已有账号，立即登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Field, Picker, Button, Toast } from "vant";
Vue.use(Field, Picker, Button, Toast);
import {
  addApply,
  postApply,
  identityCard,
  checkPhone,
  checkTelephone
} from "../../libs/utils";

export default {
  data() {
    return {
      //选择器属性
      value: "",
      valueCode:'',
      columns: [
        { id: 410102, className: "中原区（高新区）" },
        { id: 410103, className: "二七区" },
        { id: 410104, className: "管城区（经开区）" },
        { id: 410105, className: "金水区（郑东新区）" },
        { id: 410106, className: "上街区" },
        { id: 410108, className: "惠济区" },
        { id: 410122, className: "中牟县" },
        { id: 410181, className: "巩义市" },
        { id: 410182, className: "荥阳市" },
        { id: 410183, className: "新密市" },
        { id: 410184, className: "新郑市（航空港区）" },
        { id: 410185, className: "登封市" }
      ],
      showPicker: false,

      userName: "王",
      userCard: "410526199806185330",
      userPhone: "18237203633",
      sms: "",
      familyNumber: "",
      userPassword: "123456",
      affirmUserPassword: "123456",

      //获取验证码属性
      smsFlag: false,
      sendTime: "获取验证码",
      snsMsgWait: 60
    };
  },
  methods: {
    //地区选择器事件
    onConfirm(value) {
      console.log(value);
      this.value = value.className;
      this.valueCode = value.id;
      this.showPicker = false;
    },

    //获取验证码
    sendCode() {
      if (!this.userPhone) {
        Toast("手机号不能为空");
        return;
      }
      if (!checkPhone(this.userPhone)) {
        Toast("手机号格式错误！");
        return;
      }
      this.smsFlag = true;
      // 60秒后重新获取验证码
      let postObj = postApply({
        type: "reg",
        mphone: this.userPhone
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
          this.sendTime = this.snsMsgWait + "秒后重发";
          this.snsMsgWait = this.snsMsgWait - 1;
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
    },

    //注册提交
    sumbitClick() {
      if (!this.valueCode) {
        Toast("所在行政区不能为空");
        return;
      }
      if (!this.userName) {
        Toast("真实姓名不能为空");
        return;
      }
      if (!this.userCard) {
        Toast("身份证号不能为空");
        return;
      }
      if (!identityCard(this.userCard).isPass) {
        Toast("身份证号格式错误");
        return;
      }
      if (!this.userPhone) {
        Toast("手机号不能为空");
        return;
      }
      if (!checkPhone(this.userPhone)) {
        Toast("手机号格式错误！");
        return;
      }
      if (!this.sms) {
        Toast("验证码不能为空");
        return;
      }
      if (!this.userPassword) {
        Toast("密码不能为空");
        return;
      }
      if (this.affirmUserPassword != this.userPassword) {
        Toast("两次密码不一致");
        return;
      }
      let postObj = addApply({
        code_type: "reg",
        username: this.userName,
        idCard: this.userCard,
        mphone: this.userPhone,
        vCode: this.sms,
        familyPhone: this.familyNumber,
        password: this.userPassword,
        location_code: this.valueCode,
        face: "",
        wxuserinfo: "",
        deviceinfo: ""
      });
      console.log(postObj) 
       this.$post("/userRegister", postObj).then(res => {
        console.log(res);
        if (res.Flag) {
          Toast(res.Content);
        }else{
            Toast(res.Content);
        }
      });
    },

    //去登陆页面
    toLogin() {
      this.$router.push({
        name: "userLogin"
      });
    }
  }
};
</script>
<style scoped lang="less">
.fillFrom {
  margin: 30px 0 0 0;
  padding: 0 15px;
  .van-cell {
    border: 1px solid #e4e4e4;
    font-size: 14px;
  }
  .liStyles {
    margin-bottom: 15px;
  }
}

.authCode {
  display: flex;
  justify-content: space-between;
  .van-cell {
    width: 200px;
  }
  .van-cell:not(:last-child)::after {
    border: none;
  }
  .van-button {
    width: 120px;
  }
}

.twoBtn {
  .van-button {
    width: 345px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 5px;
    font-weight: 500;
  }
  .oneButton {
    margin-bottom: 20px;
    .van-button {
      background-color: #2e87cd;
    }
  }
  .twoButton {
    .van-button {
      border: 1px solid #2e87cd;
      background-color: #fff;
      color: #2e87cd;
    }
  }
}
</style>