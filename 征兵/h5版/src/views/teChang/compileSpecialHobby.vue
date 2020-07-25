<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间情况内容-->
    <div class="compile-special">
      <van-checkbox-group class="compileSpecial-ul" v-model="result" ref="checkboxGroup">
        <van-checkbox
          class="compileSpecial-li"
          :name="item.name"
          v-for="(item,index) in techangList"
          :key="index"
          :disabled="disabled"
          ref="checkboxes"
          @click="childsClick(item,index)"
        >
          <div class="compileSpecial-name">{{item.value}}</div>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <!--保存按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="saveData">保存</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import getApi from "../../request/api";
import { postApply, chaifen } from "../../../libs/utils";
import { Checkbox, CheckboxGroup, Picker, Dialog, Toast } from "vant";
Vue.use(Checkbox, CheckboxGroup, Picker, Dialog, Toast);
export default {
  name: "compileSpecialHobby",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png",
      techangList: [],
      result: [],
      disabled: false,
      model: []
    };
  },
  mounted() {
    this.getSpecialityMap();
    // this.getDatas();
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },

    getData() {
      var model = JSON.parse(this.$route.params.model);
      var arr = [];
      for (var i = 0; i < model.length; i++) {
        console.log(model[i].name);
        arr.push(model[i].name);
      }
      this.result = arr
    },

    //获得特长列表
    getSpecialityMap() {
      this.$get("/getSelector").then(res => {
        if (res.Flag) {
          let array = [];
          for (let key in res.speciality) {
            array.push({ name: key, value: res.speciality[key] });
          }
          this.techangList = array;
          console.log(this.techangList);
          this.getData();
        }
      });
    },

    //保存并跳回去
    saveData() {
      console.log(this.result);
      if (this.result.length == 0) {
        Toast("至少选择一项");
        return;
      }

      console.log(this.result);
      let submitData = postApply({
        field: "speciality",
        info: this.result
      });

      this.$post("/submitApi", submitData).then(res => {
        if (res.Flag) {
          Toast("保存成功");
          this.$router.push({
            name: "specialHobby"
          });
        } else {
          Toast(res.Content);
        }
      });
    },

    //子选项点击后，无选项取消选中
    childsClick(item, index) {
      console.log(this.result)
      if (item.name == 1) {
        this.$refs.checkboxGroup.toggleAll(false);
        if (this.result.length == 0) {
          this.$refs.checkboxes[item.name - 1].toggle(true);
        }
      } else {
        if (this.result.length == 0) {
          this.$refs.checkboxes[item.name - 1].toggle(true);
        }

        if (this.result.length > 0) {
          console.log(this.$refs.checkboxes[1]);
          this.$refs.checkboxes[0].toggle(false);
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.compile-special {
  width: 345px;
  margin: 10px auto 0;
}
.compileSpecial-ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.compileSpecial-li {
  width: 100px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #7e7e7e;
  border-radius: 4px;
  margin: 0 11px 10px 0;
}
.compileSpecial-li .van-icon {
  font-size: 20px;
  color: #1abf5b;
}
.compileSpecial-name {
  font-size: 16px;
  color: #333333;
}

//自定义icon样式
.compile-special /deep/ .van-checkbox__icon .van-icon {
  border: transparent;
  width: 1.25rem;
}
.compile-special /deep/ .van-checkbox__icon--checked .van-icon {
  width: 1.25rem;
  font-size: 20px;
  color: #1abf5b;
  background-color: transparent;
  line-height: normal;
}
///////
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
.compileSpecial-ul /deep/ .van-checkbox__label {
  margin-left: 5px;
}
</style>