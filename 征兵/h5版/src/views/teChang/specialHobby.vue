<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间情况内容-->
    <div class="container-content">
      <div class="experience-modal">
        <!--列表头部-->
        <div class="experience-head">
          <div class="head-title">特长爱好</div>
        </div>
        <!--列表内容-->
        <ul class="techang-ul">
          <li class="experience-list" v-for="(item,index) in model" :key="index">
            <div>
              <i class="iconfont icon-biaoji"></i>
            </div>
            <div>{{item.value}}</div>
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
import getApi from "../../request/api";
import { postApply, chaifen } from "../../../libs/utils";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "specialHobby",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      techangList: [],
      model: [
        {
          name:"",
          value:""
        }
      ]
    };
  },
  mounted() {
    this.getSpecialityMap();
  },
  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.push("./Home");
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
          this.getDatas();
        }
      });
    },

    //获得数据
    getDatas() {
      this.$get("/getApi").then(res => {
        console.log(res);
        if (res.Flag) {
          var list = [];
          list = res.data.speciality.split(",");
          console.log(list);
          console.log(this.techangList);
          var arr = []
          for (var i = 0; i < list.length; i++) {
            var list1 = list[i];
            console.log(list1)
            arr.push(this.techangList[list1-1]);
            console.log(arr)
          }
          this.model = arr
        } else {
          Toast("请求错误");
        }
      });
    },

    //编辑
    addExperience() {
      this.$router.push({
        name: "compileSpecialHobby",
        params: {
          model: JSON.stringify(this.model)
        }
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
.techang-ul {
  width: 270px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 auto;
}
.experience-list {
  width: 90px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.techang-ul .iconfont {
  font-size: 20px;
  color: #1abf5b;
}
.addBtn {
  width: 345px;
  height: 55px;
  margin: 0 auto 20px;
}
.addBtn /deep/ .van-button {
  width: 345px;
  height: 55px;
  font-size: 16px;
  background-color: #2e87cd;
  font-weight: bold;
}
</style>