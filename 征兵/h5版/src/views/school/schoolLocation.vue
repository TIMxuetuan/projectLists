<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--学校所在地-->
    <div class="school-location">
      <div class="school-name">学校名称</div>
      <div class="school-site">
        <div v-if="isShowValue">{{strw}}{{school}}</div>
        <div v-else>暂无数据，请编辑数据</div>
      </div>
    </div>

    <!--编辑按钮-->
    <div class="compile-btn">
      <van-button type="info" @click="bianji">编辑</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Toast } from "vant";
Vue.use(Button, Toast);
export default {
  name: "schoolLocation",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      isShowValue:true,
      strw:"",
      school:""
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        if (res.Code == 200) {
          console.log(res.data);
          var straa = res.data.school_location;
          var str = straa.split("|");
          this.strw = str.join("-");
          this.school = "-" + res.data.school
          console.log(this.strw)
          if(this.strw == "" && this.school ==""){
            this.isShowValue = false
          }else{
            this.isShowValue = true
          }
        }else{
          Toast('请求错误');
        }
      });
    },

    onClickLeft() {
      this.$router.push("./Home");
    },
    bianji() {
      this.$router.push("./schoolBianji");
    }
  }
};
</script>
<style scoped lang="less">
.school-location {
  width: 21.56rem;
  height: 8.13rem;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin: 0.94rem auto 0;
}
.school-name {
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #eeeeee;
  background-color: #f8f8f8;
  text-align: left;
  color: #2e87cd;
  padding-left: 0.94rem;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.school-site {
  width: 100%;
  height: 89px;
  padding-left: 0.94rem;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
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