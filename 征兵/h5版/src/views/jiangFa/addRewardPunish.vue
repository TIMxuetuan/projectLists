<template>
  <div v-if="model">
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--中间内容-->
    <div class="container-five">
      <ul>
        <!--奖惩名称模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_name_rp"
            label="奖惩名称："
            placeholder="请填写奖惩名称"
            input-align="right"
          />
        </li>
        <!--奖惩时间模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_time_rp"
            readonly
            label="奖惩时间："
            placeholder="主要奖惩时间"
            input-align="right"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :formatter="formatterType"
            />
          </van-popup>
        </li>

        <!--奖惩单位模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_unit_rp"
            label="奖惩单位："
            placeholder="请填写奖惩单位"
            input-align="right"
          />
        </li>
        <!--奖惩原因模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_reasons_rp"
            label="奖惩原因："
            placeholder="请填写奖惩原因"
            input-align="right"
          />
        </li>
      </ul>
    </div>

    <!--保存按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="saveData">保存</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { timeFormat, formatter, postApply } from "../../../libs/utils";
import { Dialog, Toast } from "vant";
Vue.use(Dialog, Toast);
export default {
  name: "addRewardPunish",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      model: {
        pi_name_rp: "",
        pi_time_rp: "",
        pi_unit_rp: "",
        pi_reasons_rp: "",
        index: 0
      },
      id: "",
      main: [],
      mainArray: [],

      leftZhi: true,
      //奖惩时间值
      showPicker: false,
      currentDate: new Date()
    };
  },
  mounted() {
    this.id = JSON.parse(this.$route.params.index);
    this.main = JSON.parse(this.$route.params.main);

    if (this.main != []) {
      this.mainArray = this.mainArray.concat(this.main);
      console.log(this.mainArray);
    }

    if (this.id != "") {
      this.getInfo();
    }
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },

    //点击开始日期确定
    onConfirm() {
      this.model.pi_time_rp = timeFormat(this.currentDate);
      this.showPicker = false;
    },

    formatterType(type, val) {
      return formatter(type, val);
    },

    //点击编辑后，初始化数据
    getInfo() {
      var id = this.id;
      var model = this.main[id - 1];
      this.model = model;
    },

    //保存并跳回去
    saveData() {
      if (!this.model.pi_name_rp) {
        Toast("奖惩名称不能为空");
        return;
      }
      if (!this.model.pi_time_rp) {
        Toast("奖惩时间不能为空");
        return;
      }
      if (!this.model.pi_unit_rp) {
        Toast("奖惩单位不能为空");
        return;
      }
      if (!this.model.pi_reasons_rp) {
        Toast("奖惩原因不能为空");
        return;
      }

      var id = this.id;
      var mainArray = this.mainArray;
      if (id == "") {
        mainArray.push(this.model);

        for (var i = 0; i < mainArray.length; i++) {
          var _data = mainArray[i];
          _data["index"] = i + 1;
        }
      }

      let submitData = postApply({
        field: "rewardsPunishments",
        info: JSON.stringify(mainArray)
      });

      this.$post("/submitApi", submitData).then(res => {
        if (res.Flag) {
          Toast("保存成功");
          if (!id) {
            Dialog.confirm({
              title: "是否继续添加",
              beforeClose: this.beforeClose
            });
          } else {
            this.$router.push({
              name: "rewardPunish"
            });
          }
        } else {
          Toast(res.Content);
        }
      });
    },
    //保存后是否继续添加
    beforeClose(action, done) {
      if (action === "confirm") {
        this.model = {
          pi_name_rp: "",
          pi_time_rp: "",
          pi_unit_rp: "",
          pi_reasons_rp: "",
          index: 0
        };
        setTimeout(done, 500);
      } else {
        done();
        this.$router.push({
          name: "rewardPunish"
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.container-five {
  width: 345px;
  margin: 10px auto 0;
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.fiveLi {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #eeeeee;
}

.fiveLi /deep/ .van-cell {
  padding: 0;
}
.fiveLi /deep/ .van-field__label {
  text-align: left;
}
.endShijian /deep/ .van-cell {
  width: 82%;
}
.zhiJin {
  width: 40px;
  height: 40px;
  background-color: #dddddd;
  margin-right: 5px;
  line-height: 40px;
  font-size: 14px;
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
.van-cell:not(:last-child)::after {
  display: none;
}
</style>