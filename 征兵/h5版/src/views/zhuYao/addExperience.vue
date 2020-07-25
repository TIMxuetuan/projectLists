<template>
  <div v-if="model">
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间内容-->
    <div class="container-five">
      <ul>
        <!--开始时间模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_time_start_me"
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
            v-model="model.pi_time_end_me"
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
          <van-field
            v-model="model.pi_unit_me"
            label="所在学校："
            placeholder="请填写所在学校"
            input-align="right"
          />
        </li>
        <!--职业模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_occupation_me"
            label="职业："
            placeholder="请填写职业"
            input-align="right"
          />
        </li>
        <!--证明人模块-->
        <li class="fiveLi">
          <van-field
            v-model="model.pi_witness_me"
            label="证明人："
            placeholder="请填写证明人"
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
  name: "addExperience",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      model: {
        pi_time_start_me: "",
        pi_time_end_me: "",
        pi_unit_me: "",
        pi_occupation_me: "",
        pi_witness_me: "",
        index: 0
      },
      id: "",
      main: [],
      mainArray: [],
      leftZhi: true,
      //开始时间值
      showPicker: false,
      currentDate: new Date(),
      //结束时间值
      showPicker2: false,
      currentDate2: new Date()
    };
  },
  mounted() {
    this.id = JSON.parse(this.$route.params.index);
    this.main = JSON.parse(this.$route.params.main);
    console.log(this.id);
    console.log(this.main);

    if (this.main != []) {
      this.mainArray = this.mainArray.concat(this.main);
      console.log(this.mainArray);
    }

    if (this.id != "") {
      this.getInfo();
    }
  },
  methods: {
    //点击编辑后，初始化数据
    getInfo() {
      var id = this.id;
      var model = this.main[id - 1];
      this.model = model;
      console.log(this.model);
    },

    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },

    //点击开始日期确定
    onConfirm() {
      this.model.pi_time_start_me = timeFormat(this.currentDate);
      this.showPicker = false;
    },

    formatterType(type, val) {
      return formatter(type, val);
    },

    //点击结束日期确定
    onConfirm2() {
      this.model.pi_time_end_me = timeFormat(this.currentDate2);
      console.log();
      this.showPicker2 = false;
    },

    //结束时间点击至今
    zhijin() {
      this.model.pi_time_end_me = "至今";
    },

 

    //保存并跳回去
    saveData() {
      if (!this.model.pi_time_start_me) {
        Toast("开始时间不能为空");
        return;
      }
      if (!this.model.pi_time_end_me) {
        Toast("结束时间不能为空");
        return;
      }
      if (!this.model.pi_unit_me) {
        Toast("所在学校不能为空");
        return;
      }
      if (!this.model.pi_occupation_me) {
        Toast("职业不能为空");
        return;
      }
      if (!this.model.pi_witness_me) {
        Toast("证明人不能为空");
        return;
      }

      var id = this.id;
      var mainArray = this.mainArray;
      console.log(mainArray);
      if (id == "") {
        mainArray.push(this.model);

        for (var i = 0; i < mainArray.length; i++) {
          var _data = mainArray[i];
          _data["index"] = i + 1;
        }
      }

      console.log("dd", _data, mainArray);

      let submitData = postApply({
        field: "mainExperience",
        info: JSON.stringify(mainArray)
      });

      this.$post("/submitApi", submitData).then(res => {
        console.log(res);
        if (res.Flag) {
          Toast("保存成功");
          if (!id) {
            Dialog.confirm({
              title: "是否继续添加",
              beforeClose: this.beforeClose
            });
          } else {
            this.$router.push({
              name: "mainExperience"
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
            'pi_time_start_me': '',
            'pi_time_end_me': '',
            'pi_unit_me': '',
            'pi_occupation_me': '',
            'pi_witness_me': '',
            'index':'',
          };
        setTimeout(done, 1000);
      } else {
        done();
        this.$router.push({
          name: "mainExperience"
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