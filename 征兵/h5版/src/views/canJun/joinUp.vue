<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间内容-->
    <div class="container-content">
      <div class="experience-modal">
        <!--列表头部-->
        <div class="experience-head">
          <div class="head-title">参军意向</div>
        </div>
        <!--列表内容-->
        <div v-if="emailInfo">
          <div class="experience-list" v-if="toInfo">
            <div>第一志愿：{{model.volunteer1}}</div>
            <div>第二志愿：{{model.volunteer2}}</div>
          </div>
          <div class="experience-list" v-else>
            <div>接受祖国挑选</div>
          </div>
        </div>
        <div v-else style="margin:20px 0">暂无数据请添加</div>
      </div>
    </div>
    <!--编辑按钮-->
    <div class="addBtn">
      <van-button type="info" @click="addExperience">编辑</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "joinUp",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      emailInfo: false,
      toInfo: false,
      bigLists: {},
      model: {
        volunteer1: "",
        volunteer2: "",
        volunteer3: ""
      }
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.push("./Home");
    },

    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        console.log(res.data);
        if (res.Flag) {
          this.model = res.data;
          if (res.data.volunteer3 == "1") {
            this.toInfo = false;
          } else {
            this.toInfo = true;
          }
          if (
            res.data.volunteer3 != "" ||
            res.data.volunteer2 != "" ||
            res.data.volunteer1 != ""
          ) {
            this.emailInfo = true;
          }
          console.log(this.model);
        } else {
          Toast("请求错误");
        }
      });
    },

    //编辑
    addExperience() {
      this.$router.push({
        name: "compileJoinUp",
        params: {}
      });
    }
  }
};
</script>
<style scoped lang="less">
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
  margin: 30px 0 20px;
  padding: 0 20px 0 10px;
  font-size: 16px;
  color: #000000;
  text-align: left;
}
.experience-list div {
  margin-bottom: 10px;
}

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
</style>