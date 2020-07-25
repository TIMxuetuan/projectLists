<template>
  <div>
    <div class="topBar">
      <van-nav-bar
        title="征兵"
        :left-arrow="leftZhi"
        @click-left="onClickLeft"
        :placeholder="true"
        fixed
      />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";

Vue.use(NavBar);
export default {
  name: "topBar",
  props: {
    leftZhi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods:{
      onClickLeft(){
          this.$emit("onClickLeft")
      }
  }
};
</script>
<style scoped lang="less">
.topBar /deep/ .van-nav-bar {
  height: 4.0625rem;
  background-color: #000000;
}
.topBar /deep/ .van-nav-bar__title {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}
.topBar /deep/ .van-nav-bar .van-icon{
    color: #ffffff;
    font-size: 1.25rem;
}

.topBar /deep/ .van-hairline--bottom::after{
  border-bottom-width: 0;
}

</style>