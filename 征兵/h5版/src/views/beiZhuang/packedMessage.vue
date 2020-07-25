<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--中间情况内容-->
    <div class="container-content">
      <div class="experience-modal">
        <!--列表头部-->
        <div class="experience-head">
          <div class="head-title">{{allJingli}}</div>
        </div>
        <!--列表内容-->
        <ul>
          <li class="experience-list">
            <div>帽子</div>
              <div>{{bigLists.hat}}</div>
          </li>
          <li class="experience-list">
            <div>衣服</div>
              <div>{{bigLists.clothes}}</div>
          </li>
          <li class="experience-list">
            <div>鞋子</div>
              <div>{{bigLists.shoes}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--编辑按钮-->
    <div class="addBtn">
      <van-button type="info" @click="addExperience">编辑</van-button>
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
  name: "packedMessage",
  components: {
    topBar: () => import("../../components/topBar"),
  },
  data() {
    return {
      leftZhi: true,
      allJingli: "被装信息",
      res: {},
      bigLists: {},
      deleteIndex: "",
      show: false,
      isCompile: false,
      isDelete: false
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
          this.res = res.data;
          this.chuLiDatas();
        } else {
          Toast("请求错误");
        }
      });
    },

    //处理数据
    chuLiDatas() {
      console.log(this.res);
      this.bigLists = this.res;
      console.log(this.bigLists);
    },

    //编辑
    addExperience() {
      this.$router.push({
        name: "compilePackedMessage",
        params: {}
      });
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
  height: 45px;
  font-size: 16px;
  background-color: #2e87cd;
  font-weight: bold;
}

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
</style>