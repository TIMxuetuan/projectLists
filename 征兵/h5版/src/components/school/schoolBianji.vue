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
import { Popup, Field, Area, Button, Toast  } from "vant";
import areaList from "../../assets/area/area.js";
Vue.use(Popup, Field, Area, Button, Toast );

export default {
  components: {
    topBar: () => import("../topBar.vue")
  },
  data() {
    return {
      value: "",
      showArea: false,
      areaList, // 数据格式见 Area 组件文档
      value2: "",
      leftZhi: true
    };
  },
  methods: {
    //保存并跳回去
    baocun() {
      console.log(this.value);
      console.log(this.value2);
      Toast('保存成功');
      this.$router.push("./schoolLocation");
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

.container /deep/ .van-toast--text{
    min-width: 2rem !important;
}

</style>