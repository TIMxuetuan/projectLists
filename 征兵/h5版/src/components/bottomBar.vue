<template>
  <div>
    <van-tabbar route :placeholder="true">
      <van-tabbar-item replace to="/Home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Toast } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: "bottomBar",
  methods: {
    onClickLeft() {
      Toast("返回");
    }
  }
};
</script>