<template>
  <div v-if="model">
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--中间内容-->
    <div class="container-five">
      <ul>
        <li class="fiveLi">
          <van-field
            readonly
            clickable
            input-align="right"
            name="picker"
            v-model="model.pi_appellation_fm"
            label="称谓:"
            placeholder="请选择称谓"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </li>
        <li class="fiveLi">
          <van-field
            v-model="model.pi_fullName_fm"
            label="姓名:"
            placeholder="请填写姓名"
            input-align="right"
          />
        </li>

        <li class="fiveLi">
          <van-field
            v-model="model.pi_IDNumber_fm"
            label="身份证号:"
            placeholder="请填写身份证号"
            input-align="right"
          />
        </li>

        <li class="fiveLi">
          <van-field
            v-model="model.pi_unitPosition_fm"
            label="工作单位及职务:"
            placeholder="请填写工作单位及职务"
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
import { timeFormat, formatter, postApply, identityCard } from "../../../libs/utils";
import { Picker, Dialog, Toast } from "vant";
Vue.use(Picker, Dialog, Toast);
export default {
  name: "addFamilyCase",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      model: {
        pi_appellation_fm: "",
        pi_fullName_fm: "",
        pi_IDNumber_fm: "",
        pi_unitPosition_fm: "",
        index: 0
      },
      id: "",
      main: [],
      mainArray: [],

      leftZhi: true,
      columns: [
        "父亲",
        "母亲",
        "哥哥未结婚",
        "姐姐未出嫁",
        "弟弟未结婚",
        "妹妹未出嫁"
      ],
      showPicker: false
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

    //选择器
    onConfirm(value) {
      this.model.pi_appellation_fm = value;
      this.showPicker = false;
    },

    //点击编辑后，初始化数据
    getInfo() {
      var id = this.id;
      var model = this.main[id - 1];
      this.model = model;
    },

    //保存并跳回去
    saveData() {
      console.log(
        this.model.pi_appellation_fm,
        this.model.pi_fullName_fm,
        this.model.pi_IDNumber_fm,
        this.model.pi_unitPosition_fm
      );
      if (!this.model.pi_appellation_fm) {
        Toast("称谓不能为空");
        return;
      }
      if (!this.model.pi_fullName_fm) {
        Toast("姓名不能为空");
        return;
      }
      if (!this.model.pi_IDNumber_fm) {
        Toast("身份证号不能为空");
        return;
      }
      if (!identityCard(this.model.pi_IDNumber_fm).isPass) {
        Toast("身份证号格式错误");
        return;
      }
      if (!this.model.pi_unitPosition_fm) {
        Toast("工作单位及职务不能为空");
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
        field: "familyMembership",
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
              name: "familyCase"
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
          name: "familyCase"
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
  width: auto;
  color: #333333;
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