<template>
  <div class="container">
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <div class="dihzi-two">
      <div class="twoinput">
        <van-field
          readonly
          clickable
          name="area"
          :value="value"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
      </div>
      <div class="twoinput">
        <van-cell-group>
          <van-field v-model="value2" placeholder="请输入学校名称" />
        </van-cell-group>
      </div>
      <div></div>
    </div>
    <!--编辑按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="baocun">保存</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup, Field, Area, Button, Toast } from "vant";
import areaList from "../../assets/area/area.js";
import { postApply } from "../../../libs/utils";
Vue.use(Popup, Field, Area, Button, Toast);

export default {
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      res: [],
      value: "",
      showArea: false,
      areaList, // 数据格式见 Area 组件文档
      value2: "",
      leftZhi: true
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        if (res.Flag) {
          this.res = res;
          this.chuLiDatas();
        } else {
          Toast("请求错误");
        }
      });
    },

    //处理数据
    chuLiDatas() {
      console.log(this.res);
      this.value = this.res.data.school_location.split("|").join(",");
      this.value2 = this.res.data.school;
    },

    

    //保存并跳回去
    baocun() {
      let value = this.value.split(",");

      let infoData = postApply({
        field: "school",
        info: JSON.stringify({
          P1: value[0],
          C1: value[1],
          A1: value[2],
          school: this.value2
        })
      });

      console.log(infoData);

      if (!this.value) {
        Toast("地区不能为空");
        return;
      }
      if (!this.value2) {
        Toast("学校名称不能为空");
        return;
      }

      this.$post("/submitApi", infoData).then(res => {
        console.log(res);
        if (res.Flag) {
          Toast("保存成功");
          this.$router.push("./schoolLocation");
        } else {
          Toast(res.Content);
        }
      });

      // this.$axios({
      //   method: "post",
      //   url: "/submitApi",
      //   data: infoData,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //地区选择
    onConfirm(values) {
      console.log(values);
      this.value = values.map(item => item.name).join(",");
      this.showArea = false;
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
  margin-bottom: 20px;
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