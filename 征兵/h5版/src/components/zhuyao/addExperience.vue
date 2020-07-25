<template>
  <div>
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间内容-->
    <div class="container-five">
      <ul>
        <!--开始时间模块-->
        <li class="fiveLi">
          <van-field
            v-model="value"
            readonly
            label="开始时间："
            placeholder="主要经历开始时间"
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
        <!--结束时间模块-->
        <li class="fiveLi endShijian">
          <van-field
            v-model="value2"
            readonly
            label="结束时间："
            placeholder="主要经历结束时间"
            input-align="right"
            @click="showPicker2 = true"
          />
          <div class="zhiJin" @click="zhijin">至今</div>
          <van-popup v-model="showPicker2" position="bottom">
            <van-datetime-picker
              v-model="currentDate2"
              type="date"
              @confirm="onConfirm2"
              @cancel="showPicker2 = false"
              :formatter="formatterType"
            />
          </van-popup>
        </li>
        <!--所在学校模块-->
        <li class="fiveLi">
          <van-field v-model="value3" label="所在学校：" placeholder="请填写所在学校" input-align="right" />
        </li>
        <!--职业模块-->
        <li class="fiveLi">
          <van-field v-model="value4" label="职业：" placeholder="请填写职业" input-align="right" />
        </li>
        <!--证明人模块-->
        <li class="fiveLi">
          <van-field v-model="value5" label="证明人：" placeholder="请填写证明人" input-align="right" />
        </li>
      </ul>
    </div>

    <!--保存按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="baocun">保存</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { timeFormat } from "../../../libs/utils";
import { formatter } from "../../../libs/utils";
export default {
  name: "addExperience",
  components: {
    topBar: () => import("../topBar.vue")
  },
  data() {
    return {
      leftZhi: true,
      //开始时间值
      value: "",
      showPicker: false,
      currentDate: new Date(),
      //结束时间值
      value2: "",
      showPicker2: false,
      currentDate2: new Date(),
      //所在学校、职业、证明人值
      value3: "",
      value4: "",
      value5: ""
    };
  },
  created() {
    console.log(this.$route.params.data);
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },

    //点击开始日期确定
    onConfirm() {
      this.value = timeFormat(this.currentDate);
      this.showPicker = false;
    },

    formatterType(type, val) {
      return formatter(type, val);
    },

    //点击结束日期确定
    onConfirm2() {
      this.value2 = timeFormat(this.currentDate2);
      this.showPicker2 = false;
    },

    //结束时间点击至今
    zhijin() {
      this.value2 = "至今";
    },

    //保存并跳回去
    baocun() {
      this.$router.push("./mainExperience");
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
</style>