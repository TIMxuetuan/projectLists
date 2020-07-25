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
            v-model="model.hat"
            label="帽子:"
            placeholder="请选择帽子"
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
            readonly
            clickable
            input-align="right"
            name="picker"
            v-model="model.clothes"
            label="衣服:"
            placeholder="请选择衣服"
            @click="showPicker2 = true"
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
          <van-field
            readonly
            clickable
            input-align="right"
            name="picker"
            v-model="model.shoes"
            label="鞋子:"
            placeholder="请选择鞋子"
            @click="showPicker3 = true"
          />
          <van-popup v-model="showPicker3" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns3"
              @confirm="onConfirm3"
              @cancel="showPicker3 = false"
            />
          </van-popup>
        </li>
      </ul>
    </div>

    <!--保存按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="saveData">保存</van-button>
    </div>

    <!--参考信息-->
    <div class="can-kao">
      <div class="canKao-title">参考信息!!!</div>
      <div class="canKao-content">
        <p>1、帽子信息实例 “54”， (头围54厘米)</p>
        <p>2、衣服信息实例 “165/92/80”， (身高/胸围/腰围，单位cm)</p>
        <p>2、鞋子信息实例 “235/37”， (脚长(mm)/码号)</p>
        <div class="xiangxi" @click="xiangClick">详细信息 > ></div>
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
  name: "compilePackedMessage",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      model: {
        hat: "",
        clothes: "",
        shoes: ""
      },
      //帽子
      columns: [
        { id: 54, text: "54" },
        { id: 55, text: "55" },
        { id: 56, text: "56" },
        { id: 57, text: "57" },
        { id: 58, text: "58" },
        { id: 59, text: "59" },
        { id: 60, text: "60" },
        { id: 61, text: "61" },
        { id: 62, text: "62" },
        { id: 63, text: "63" },
        { id: 64, text: "64" },
        { id: 65, text: "65" }
      ],
      showPicker: false,
      //衣服
      columns2: [
        { id: "165以下", text: "165以下" },
        { id: "165/84/70", text: "165/84/70" },
        { id: "165/88/74", text: "165/88/74" },
        { id: "165/92/80", text: "165/92/80" },
        { id: "165/96/86", text: "165/96/86" },
        { id: "165/100/92", text: "165/100/92" },
        { id: "165/104/98", text: "165/104/98" },
        { id: "170/88/74", text: "170/88/74" },
        { id: "170/92/80", text: "170/92/80" },
        { id: "170/96/86", text: "170/96/86" },
        { id: "170/100/92", text: "170/100/92" },
        { id: "170/104/98", text: "170/104/98" },
        { id: "170/108/104", text: "170/108/104" },
        { id: "175/88/74", text: "175/88/74" },
        { id: "175/92/80", text: "175/92/80" },
        { id: "175/96/86", text: "175/96/86" },
        { id: "175/100/92", text: "175/100/92" },
        { id: "175/104/98", text: "175/104/98" },
        { id: "175/108/104", text: "175/108/104" },
        { id: "180/92/80", text: "180/92/80" },
        { id: "180/96/86", text: "180/96/86" },
        { id: "180/100/92", text: "180/100/92" },
        { id: "180/104/98", text: "180/104/98" },
        { id: "180/108/104", text: "180/108/104" },
        { id: "185/96/86", text: "185/96/86" },
        { id: "185/100/92", text: "185/100/92" },
        { id: "185/104/98", text: "185/104/98" },
        { id: "185/108/104", text: "185/108/104" },
        { id: "190/96/86", text: "190/96/86" },
        { id: "190/100/92", text: "190/100/92" },
        { id: "190/104/98", text: "190/104/98" },
        { id: "190/108/104", text: "190/108/104" },
        { id: "190以上", text: "190以上" }
      ],
      showPicker2: false,
      //鞋子
      columns3: [
        { id: "230/36", text: "230/36" },
        { id: "235/37", text: "235/37" },
        { id: "240/38", text: "240/38" },
        { id: "245/39", text: "245/39" },
        { id: "250/40", text: "250/40" },
        { id: "255/41", text: "255/41" },
        { id: "260/42", text: "260/42" },
        { id: "265/43", text: "265/43" },
        { id: "270/44", text: "270/44" },
        { id: "275/45", text: "275/45" },
        { id: "280/46", text: "280/46" },
        { id: "285/47", text: "285/47" },
        { id: "290/48", text: "290/48" }
      ],
      showPicker3: false
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.push({
        name: "packedMessage"
      });
    },

    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        console.log(res);
        if (res.Flag) {
          this.model = res.data;
        } else {
          Toast("请求错误");
        }
      });
    },

    //保存并跳回去
    saveData() {
      console.log(this.model);
      let data = JSON.stringify({
        hat: this.model.hat,
        clothes: this.model.clothes,
        shoes: this.model.shoes
      });
      console.log(data);

      let submitData = postApply({
        field: "clothing",
        info: data
      });

      this.$post("/submitApi", submitData).then(res => {
        if (res.Flag) {
          Toast("保存成功");
          this.$router.push({
            name: "packedMessage"
          });
        } else {
          Toast(res.Content);
        }
      });
    },

    //选择帽子
    onConfirm(value) {
      console.log(value);
      this.model.hat = value.text;
      this.showPicker = false;
    },
    //选择衣服
    onConfirm2(value) {
      this.model.clothes = value.text;
      this.showPicker2 = false;
    },
    //选择鞋子
    onConfirm3(value) {
      this.model.shoes = value.text;
      this.showPicker3 = false;
    },

    xiangClick() {
      this.$router.push({
        name: "packedDetailed"
      });
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

//参考信息
.can-kao {
  width: 345px;
  height: 220px;
  background-color: #92ffeb;
  margin: 15px auto 0;
  overflow: hidden;
  padding: 0 15px;
}
.canKao-title {
  font-size: 17px;
  color: #000000;
  font-weight: 900;
  margin: 10px 0 0;
  text-align: left;
}
.canKao-content {
  margin-top: 20px;
  text-align: left;
  font-size: 16px;
  color: #000000;
  font-weight: 500;
}
.canKao-content p {
  line-height: 2;
}
.xiangxi {
  color: #2e87cd;
  text-decoration: none;
  border-bottom: 1px solid #2e87cd; /* #ccc换成链度接的颜色问 */
  display: inline-block;
  padding-bottom: 3px; /*这里设置你要空的距答离*/
}
</style>