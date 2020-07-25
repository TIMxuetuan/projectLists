<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间内容-->
    <div class="dihzi-two">
      <div class="twoinput">
        <van-field
          readonly
          clickable
          name="area"
          v-model="send_address"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
      </div>

      <!--详细地址-->
      <div class="twoinput">
        <van-cell-group>
          <van-field v-model="send" placeholder="请输入详细地址*" />
        </van-cell-group>
      </div>
      <!--联系人电话-->
      <div class="twoinput">
        <van-cell-group>
          <van-field v-model="model.send_phone" placeholder="请输入联系人电话*" />
        </van-cell-group>
      </div>
      <!--联系人姓名-->
      <div class="twoinput">
        <van-cell-group>
          <van-field v-model="model.send_name" placeholder="请输入联系人姓名*" />
        </van-cell-group>
      </div>
    </div>
    <!--编辑按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="saveData">保存</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import getApi from "../../request/api";
import { postApply, chaifen, checkPhone } from "../../../libs/utils";
import { Popup, Field, Area, Button, Toast } from "vant";
import areaList from "../../assets/area/area.js";
Vue.use(Popup, Field, Area, Button, Toast);

export default {
  name: "compileMailingAddress",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      model: {
        send_address: "",
        send_phone: "",
        send_name: "",
        address: ""
      },
      send_address:"",
      send: "",
      showArea: false,
      areaList // 数据格式见 Area 组件文档
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },

    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        console.log(res);
        if (res.Flag) {
          this.model = res.data;
          console.log(this.model);
          this.send_address = this.model.send_address.split(",");
          console.log(this.send_address);
          var address =
            this.send_address[0] +
            "," +
            this.send_address[1] +
            "," +
            this.send_address[2];
          var send = this.send_address[3];
          this.send_address = address;
          this.send = send;
        } else {
          Toast("请求错误");
        }
      });
    },

    //地区选择
    onConfirm(values) {
      console.log(values);
      this.send_address = values.map(item => item.name).join(",");
      this.showArea = false;
    },

    //保存并跳回去
    saveData() {
      if (!this.send_address) {
        Toast("省市区不能为空");
        return;
      }
      if (!this.send) {
        Toast("详细地址不能为空");
        return;
      }
      if (!this.model.send_phone) {
        Toast("联系人电话不能为空");
        return;
      }
      if (!checkPhone(this.model.send_phone)) {
        Toast('手机号格式错误！')
        return
      }
      if (!this.model.send_name) {
        Toast("联系人姓名不能为空");
        return;
      }
      console.log(this.model);
      console.log(this.send_address);
      let obj = {
        send_address: this.send_address + "," + this.send,
        send_phone: this.model.send_phone,
        send_name: this.model.send_name
      };
      console.log(obj);

      let submitData = postApply({
        field: "address",
        info: JSON.stringify(obj)
      });

      this.$post("/submitApi", submitData).then(res => {
        if (res.Flag) {
          Toast("保存成功");
          this.$router.push({
            name: "mailingAddress"
          });
        } else {
          Toast(res.Content);
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.dihzi-two {
  width: 345px;
  margin: 20px auto 0;
}

.twoinput {
  margin-bottom: 10px;
}
.twoinput /deep/ .van-cell {
  border: 1px solid #e4e4e4;
}
.compile-btn {
  width: 345px;
  height: 45px;
  margin: 30px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.compile-btn /deep/ .van-button {
  width: 345px;
  height: 45px;
  font-size: 18px;
  background-color: #2e87cd;
}

.container /deep/ .van-toast--text {
  min-width: 2rem !important;
}
</style>