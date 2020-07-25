<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--中间情况内容-->
    <allCase
      :bigLists="bigLists"
      :allJingli="allJingli"
      :show="show"
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
import { Button, Dialog } from "vant";
Vue.use(Button, Dialog);
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
      bigLists: [
        {
          smallLists: [
            {
              stateTimeTxt: "开始时间",
              stateTimeValue: "2020-5-13"
            },
            {
              stateTimeTxt: "结束时间",
              stateTimeValue: "至今"
            },
            {
              stateTimeTxt: "所在学校或单位",
              stateTimeValue: "111"
            },
            {
              stateTimeTxt: "职业",
              stateTimeValue: "111"
            },
            {
              stateTimeTxt: "证明人",
              stateTimeValue: "111"
            }
          ]
        }
      ],
      show: false
    };
  },
  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.push("./");
    },

    //删除
    deleteList() {
      this.show = true;
    },

    //添加
    addExperience() {
      this.$router.push({
        name: "addExperience",
        params: {
          data: {
            a: 1,
            b: "bbb",
            c: true
          }
        }
      });
    },

    //编辑
    compileExperience() {
      console.log(this.smallLists);
      this.$router.push({
        name: "addExperience",
        params: {
          data: this.smallLists
        }
      });
    },

    //删除弹窗 确定按钮
    confirm() {
      this.manageAddClick();
    },

    //删除弹窗 取消按钮
    cancel() {
      this.manageAddClick();
    },

    manageAddClick(val) {
      console.log(val);
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