<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
  </div>
</template>
<script>
export default {
  name: "addRewardPunish",
  components: {
    topBar: () => import("../topBar.vue")
  },
  data() {
    return {
      leftZhi: true
    };
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>