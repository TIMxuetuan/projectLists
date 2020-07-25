<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--填写表单-->
    <div class="fillFrom">
      <!--密码-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="userPassword" type="password" clearable placeholder="请输入新密码" />
        </van-cell-group>
      </div>

      <!--确认密码-->
      <div class="liStyles">
        <van-cell-group>
          <van-field v-model="affirmUserPassword" type="password" clearable placeholder="请确认密码" />
        </van-cell-group>
      </div>
    </div>

    <!--按钮-->
    <div class="twoBtn">
      <van-button @click="sumbitClick" type="info">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Field, Button, Toast } from "vant";
Vue.use(Field, Button, Toast);
import { addApply, postApply } from "../../libs/utils";
export default {
  components: {
    topBar: () => import("../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      userPassword: "",
      affirmUserPassword: ""
    };
  },
  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.push("./Mine");
    },

    sumbitClick() {
      if (!this.userPassword) {
        Toast("密码不能为空");
        return;
      }
      if (this.affirmUserPassword != this.userPassword) {
        Toast("两次密码不一致");
        return;
      }
       let postObj = postApply({
          password: this.userPassword,
        repassword: this.affirmUserPassword
        });
     
      console.log(postObj)
      this.$post("/setPassword",postObj).then(res=>{
          console.log(res)
          if(res.Code == 202){
              localStorage.setItem("userInfo", "");
              this.$router.push({
                  name:"userLogin"
              })
              Toast(res.Content);
          }else{
              Toast(res.Content);
          }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.fillFrom {
  margin: 30px 0 30px 0;
  padding: 0 15px;
  .van-cell {
    border: 1px solid #e4e4e4;
    font-size: 14px;
  }
  .liStyles {
    margin-bottom: 15px;
  }
}

.twoBtn {
  .van-button {
    width: 345px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 500;
  }
  .oneButton {
    .van-button {
      background-color: #2e87cd;
    }
  }
}
</style>