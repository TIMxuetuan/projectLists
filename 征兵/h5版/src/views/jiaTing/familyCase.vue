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
  name: "familyCase",
  components: {
    topBar: () => import("../../components/topBar"),
    allCase: () => import("../../components/allCase")
  },
  data() {
    return {
      leftZhi: true,
      allJingli: "家庭成员情况",
      res: {},
      TableHeader: [
        { type: "pi_appellation_fm", label: "称谓" },
        { type: "pi_fullName_fm", label: "姓名" },
        { type: "pi_IDNumber_fm", label: "身份证号" },
        { type: "pi_unitPosition_fm", label: "工作单位及职务" }
      ],
      bigLists: [],
      deleteIndex: "",
      methodList: [
        "pi_appellation_fm",
        "pi_fullName_fm",
        "pi_IDNumber_fm",
        "pi_unitPosition_fm"
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
        console.log(res);
        if (res.Flag) {
          this.res = res.data.familyMembership;
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
      var index = "";
      console.log(index);
      console.log(this.bigLists);
      this.$router.push({
        name: "addFamilyCase",
        params: {
          index: JSON.stringify(index),
          main: JSON.stringify(this.bigLists)
        }
      });
    },

    //编辑  类型为2
    compileExperience(item) {
      console.log(item);
      console.log(this.bigLists);
      this.$router.push({
        name: "addFamilyCase",
        params: {
          index: JSON.stringify(item.index),
          main: JSON.stringify(this.bigLists)
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
        field: "familyMembership",
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
.container-content {
  width: 345px;
  margin: 10px auto 0;
}
.experience-modal {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  margin-bottom: 20px;
}

/*列表头部样式*/
.experience-head {
  height: 35px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 10px;
}
.head-title {
  font-size: 16px;
  color: #2e87cd;
  font-weight: bold;
}
.head-btn {
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
}

/*列表内容*/
.experience-list {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 10px;
  font-size: 14px;
  color: #333333;
  border-top: 1px solid #eeeeee;
}

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