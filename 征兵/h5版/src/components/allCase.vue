<template>
  <div>
    <div class="container-content">
      <div class="experience-modal" v-for="(item,key) in bigLists" :key="key">
        <!--列表头部-->
        <div class="experience-head">
          <div class="head-title">{{allJingli}}</div>
          <div class="head-btn">
            <div style="color:#FF0000" @click="deleteList(item)" v-if="isDelete">删除</div>
            <div style="color:#2E87CD" @click="compileExperience(item)" v-if="isCompile">编辑</div>
          </div>
        </div>
        <!--列表内容-->
        <ul>
          <li class="experience-list" v-for="(items,index) in TableHeader" :key="index">
            <div>{{items.label}}</div>
            <div v-if="methodList.indexOf(items.type) != -1">
              <div>{{item[items.type]}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--删除弹窗-->
    <van-dialog
      v-model="isStart"
      title="确认删除吗？"
      show-cancel-button
      :overlay="true"
      :closeOnClickOverlay="true"
      @confirm="confirm"
      @cancel="cancel"
      @manageAddClick="manageAddClick"
    ></van-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  props: {
    //表头数据
    TableHeader: {
      type: Array
    },
    //需要数据key值
    methodList: {
      type: Array
    },
    //内容数据
    bigLists: {
      type: Array
    },
    //左上方标题
    allJingli: {
      type: String
    },
    //是否显示删除弹窗
    show: {
      type: Boolean,
      default: false
    },
    //是否开启删除
    isDelete: {
      type: Boolean,
      default: true
    },
    //是否开启编辑
    isCompile: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isStart: {
      get() {
        return this.show;
      },
      set(val) {
        this.manageAddClick(val);
      }
    }
  },
  methods: {
    //删除
    deleteList(item) {
      this.$emit("deleteList",item);
    },
    //编辑
    compileExperience(item) {
      console.log(item)
      this.$emit("compileExperience",item);
    },
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
    //关闭 添加弹窗
    manageAddClick(val) {
      this.$emit("manageAddClick", val);
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
</style>