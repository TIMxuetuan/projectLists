<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <div class="container-content">
      <div class="experience-modal" v-for="(item,index) in bigLists" :key="index">
        <!--列表头部-->
        <div class="experience-head">
          <div class="head-title">奖惩情况</div>
          <div class="head-btn">
            <div style="color:#FF0000" @click="deleteList(this)">删除</div>
            <div style="color:#2E87CD" @click="compileExperience">编辑</div>
          </div>
        </div>
        <!--列表内容-->
        <ul>
          <li class="experience-list" v-for="(item,index) in item.smallLists" :key="index">
            <div>{{item.stateTimeTxt}}</div>
            <div>{{item.stateTimeValue}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--添加一个按钮-->
    <div class="addBtn">
      <van-button type="info" @click="addExperience">添加一个</van-button>
    </div>

    <!--删除弹窗-->
    <van-dialog
      v-model="show"
      title="确认删除吗？"
      show-cancel-button
      :overlay="true"
      :closeOnClickOverlay="true"
    ></van-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Dialog } from "vant";
Vue.use(Button, Dialog);
export default {
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true,
      bigLists: [
        {
          smallLists: [
            {
              stateTimeTxt: "奖惩名称",
              stateTimeValue: "111"
            },
            {
              stateTimeTxt: "奖惩时间",
              stateTimeValue: "2020-05-13"
            },
            {
              stateTimeTxt: "奖惩单位",
              stateTimeValue: "111"
            },
            {
              stateTimeTxt: "奖惩原因",
              stateTimeValue: "111"
            },
          ]
        }
      ],
      show: false
    };
  },
  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.push("./");
    },
     //删除
    deleteList() {
      console.log(this);
      this.show = true;
    },

    //添加
    addExperience() {
      this.$router.push({
          name:"addRewardPunish",
          params:{
              data:{
                  a:1,
                  b:"bbb",
                  c:true
              }
          }
      });
    },

    //编辑
    compileExperience() {
        console.log(this.smallLists)
      this.$router.push({
          name:"addRewardPunish",
          params:{
              data:this.smallLists
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