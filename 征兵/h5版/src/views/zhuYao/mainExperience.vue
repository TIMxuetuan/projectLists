<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--中间情况内容-->
    <allCase
      :TableHeader="TableHeader"
      :bigLists="bigLists"
      :methodList="methodList"
      :allJingli="allJingli"
      :show="show"
      :isDelete="isDelete"
      :isCompile="isCompile"
      @deleteList="deleteList"
      @compileExperience="compileExperience"
      @confirm="confirm"
      @cancel="cancel"
      @manageAddClick="manageAddClick"
    ></allCase>
    <!--添加一个按钮-->
    <div class="addBtn">
      <van-button type="info" @click="addExperience">添加一个</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Dialog, Toast } from "vant";
import getApi from "../../request/api";
import { postApply, chaifen } from "../../../libs/utils";
Vue.use(Button, Dialog, Toast);
export default {
  name: "mainExperience",
  components: {
    topBar: () => import("../../components/topBar"),
    allCase: () => import("../../components/allCase")
  },
  data() {
    return {
      leftZhi: true,
      allJingli: "主要经历",
      res: {},
      TableHeader: [
        { type: "pi_time_start_me", label: "开始时间" },
        { type: "pi_time_end_me", label: "结束时间" },
        { type: "pi_unit_me", label: "所在学校或单位" },
        { type: "pi_occupation_me", label: "职业" },
        { type: "pi_witness_me", label: "证明人" }
      ],
      bigLists: [],
      deleteIndex: "",
      methodList: [
        "pi_time_start_me",
        "pi_time_end_me",
        "pi_unit_me",
        "pi_occupation_me",
        "pi_witness_me"
      ],
      show: false,
      isCompile: true,
      isDelete: true
    };
  },
  mounted() {
    this.getDatas();
  },

  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.push("./Home");
    },

    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        if (res.Code == 200) {
          this.res = res.data.mainExperience;
          this.chuLiDatas();
        } else {
          Toast("请求错误");
        }
      });
    },

    //处理数据
    chuLiDatas() {
      console.log(this.res);
      this.bigLists = chaifen(this.res);
      console.log(this.bigLists);
    },

    //添加 类型为1
    addExperience() {
      var index = ''
      console.log(index)
      console.log(this.bigLists)
      this.$router.push({
        name: "addExperience",
        params: {
          index: JSON.stringify(index),
          main: JSON.stringify(this.bigLists),
        }
      });
    },

    //编辑  类型为2
    compileExperience(item) {
      console.log(item);
      console.log(this.bigLists);
      this.$router.push({
        name: "addExperience",
        params: {
          index: JSON.stringify(item.index),
          main: JSON.stringify(this.bigLists),
        }
      });
    },

    //删除
    deleteList(item) {
      console.log(item);
      this.deleteIndex = item.index;
      this.show = true;
    },

    //删除弹窗 确定按钮
    confirm() {
      var index = this.deleteIndex;
      var main = this.bigLists;
      main.splice(index - 1, 1);
      console.log(main);

      for (var i = 0; i < main.length; i++) {
        var _data = main[i];
        _data["index"] = i + 1;
      }
      var main = JSON.stringify(main);
      console.log(main);

       var model = postApply({
          field: "mainExperience",
          info: main
        });

      this.$post("/submitApi", model).then(res => {
        console.log(res);
        if (res.Flag) {
          Toast("删除成功");
          this.getDatas();
        } else {
          Toast(res.Content);
        }
      });

      this.manageAddClick();
    },

    //删除弹窗 取消按钮
    cancel() {
      this.manageAddClick();
    },

    //关闭删除弹窗
    manageAddClick(val) {
      this.show = val;
    }
  }
};
</script>
<style scoped lang="less">
.addBtn {
  width: 345px;
  height: 55px;
  margin: 0 auto 20px;
}
.addBtn /deep/ .van-button {
  width: 345px;
  height: 55px;
  font-size: 16px;
  background-color: #2e87cd;
  font-weight: bold;
}
</style>