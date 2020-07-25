<template>
  <div>
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
            v-model="model.volunteer1"
            label="第一志愿:"
            placeholder="请选择第一志愿*"
            @click="showPickerClick"
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
            readonly
            clickable
            input-align="right"
            name="picker"
            v-model="model.volunteer2"
            label="第二志愿:"
            placeholder="请选择第二志愿*"
            @click="showPickerClick2"
          />
          <van-popup v-model="showPicker2" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns2"
              @confirm="onConfirm2"
              @cancel="showPicker2 = false"
            />
          </van-popup>
        </li>
        <li class="fiveLi">
          <van-field name="switch" label="接受祖国挑选" input-align="right">
            <template #input>
              <van-switch v-model="switchChecked" @change="switchChange" size="24" />
            </template>
          </van-field>
        </li>
      </ul>
    </div>

    <!--保存按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="saveData">保存</van-button>
    </div>

    <!--参考信息-->
    <div class="can-kao">
      <div class="canKao-title">温馨提示!!!</div>
      <div class="canKao-content">
        <p>*志愿选项目前只是展示效果，不能当做真是的志愿选择，当可以选择真实的志愿时，会通知大家。</p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import getApi from "../../request/api";
import { postApply, chaifen } from "../../../libs/utils";
import { Picker, Toast } from "vant";

Vue.use(Picker, Toast);
export default {
  name: "compileJoinUp",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      model: {
        volunteer1: "",
        volunteer2: ""
      },
      //第一志愿
      columns: ["陆军北京卫戍区", "陆军77集团军"],
      oneShowPicker: true,
      showPicker: false,
      //第二志愿
      columns2: ["陆军北京卫戍区", "陆军77集团军"],
      oneShowPicker2: true,
      showPicker2: false,
      //接受祖国挑选
      switchChecked: false
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
        if (res.Flag) {
          this.model = res.data;
          console.log(this.model);
          if (res.data.volunteer3 == 1) {
            this.switchChecked = true;
            this.oneShowPicker = false;
            this.oneShowPicker2 = false;
          } 
        } else {
          Toast("请求错误");
        }
      });
    },

    //保存并跳回去
    saveData() {
      if (this.switchChecked) {
      } else {
        if (!this.model.volunteer1) {
          Toast("第一志愿不能为空");
          return;
        }
        if (!this.model.volunteer2) {
          Toast("第二志愿不能为空");
          return;
        }
      }

      let obj = {
        volunteer1: this.model.volunteer1,
        volunteer2: this.model.volunteer2,
        volunteer3: this.model.volunteer3
      };

      let submitData = postApply({
        field: "volunteer",
        info: JSON.stringify(obj)
      });

      this.$post("/submitApi", submitData).then(res => {
        if (res.Flag) {
          Toast("保存成功");
          this.$router.push({
            name: "joinUp"
          });
        } else {
          Toast(res.Content);
        }
      });
    },

    //选择第一志愿
    onConfirm(value) {
      this.model.volunteer1 = value;
      this.showPicker = false;
    },
    //选择第二志愿
    onConfirm2(value) {
      this.model.volunteer2 = value;
      this.showPicker2 = false;
    },

    showPickerClick() {
      this.showPicker = this.oneShowPicker;
    },
    showPickerClick2() {
      this.showPicker2 = this.oneShowPicker2;
    },

    //开关切换
    switchChange() {
      if (this.switchChecked) {
        Toast("选择此选项将不能选择志愿");
        this.oneShowPicker = false;
        this.oneShowPicker2 = false;
        this.model.volunteer1 = "";
        this.model.volunteer2 = "";
        this.model.volunteer3 = 1;
      } else {
        this.oneShowPicker = true;
        this.oneShowPicker2 = true;
        this.model.volunteer3 = 0;
      }
    }
  }
};
</script>
<style scoped lang="less">
.container-five {
  width: 345px;
  margin: 20px auto 0;
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

//参考信息
.can-kao {
  width: 345px;
  height: 120px;
  background-color: #92ffeb;
  margin: 15px auto 0;
  overflow: hidden;
}
.canKao-title {
  font-size: 17px;
  color: #000000;
  font-weight: 900;
  margin: 10px 0 0;
  text-align: left;
  padding-left: 10px;
}
.canKao-content {
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
  color: #000000;
  font-weight: 500;
  padding: 0 15px;
}
.canKao-content p {
  line-height: 1.5;
}
</style>