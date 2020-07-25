<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>
    <!--中间内容-->
    <div class="packed-detailed">
        <ul>
            <li>
                <div class="detailedTitle">1、帽子</div>
                <div class="detailedContent">测量方法：使用软尺绕前额发根至枕骨下方2CM一周和绕眉骨至枕骨一周，去测量结果的最大值为最终测量头尾尺码</div>
                <div class="tupian"><img src="../../image/tou.png" alt=""></div>
            </li>
            <li>
                <div class="detailedTitle">2、衣服</div>
                <div class="detailedContent">示例身高165cm选择衣服范围正负不超过3cm，腰围100cm范围正负不超过3cm，胸围92cm范围正负不超过3cm。胸围、腰围测量方法比较普遍在这里就不再详细介绍</div>
            </li>
            <li>
                <div class="detailedTitle">3、鞋子</div>
                <div class="detailedContent">测量方法：测量时必须采取的正确姿势(1)双腿平行站立 (勿坐！勿蹲！) (2)体重均分在双脚上，从大拇指一直到脚后跟的最尾部称之为脚长也就是你选择鞋码的大小</div>
                <div class="tupian"><img src="../../image/jiao.png" alt=""></div>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "packedDetailed",
  components: {
    topBar: () => import("../../components/topBar")
  },
  data() {
    return {
      leftZhi: true
    };
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.push({
        name: "compilePackedMessage"
      });
    }
  }
};
</script>
<style scoped lang="less">
.packed-detailed {
  width: 345px;
  margin: 20px auto 0;
}
.packed-detailed li{
  margin-bottom: 15px;
}
.detailedTitle{
    background-color: #2E87CD;
    height: 45px;
    color: #ffffff;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
}
.detailedContent{
    padding: 0 5px 0 15px;
    margin: 10px 0 20px;
    text-indent:2em;
    text-align: left;
    font-size: 14px;
    color: #000;
    line-height: 2;
}
.tupian img{
  width: 200px;
  height: 150px;
}
</style>