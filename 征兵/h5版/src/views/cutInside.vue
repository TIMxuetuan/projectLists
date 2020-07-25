<template>
  <div>
    <!--头部tab-->
    <topBar :leftZhi="leftZhi" @onClickLeft="onClickLeft"></topBar>

    <!--内容 -->
    <div class="conrainer">
      <div v-if="isBtnShow" class="zidingyi">
        <div class="xianKuang">
          <van-uploader class="centerClick" :after-read="onRead" accept="image/*">
            <van-button type="primary">请选择图片</van-button>
          </van-uploader>
        </div>
      </div>
      <div class="wrapper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          :fixed="option.fixed"
          canScale
          :centerBox="true"
        ></vueCropper>
      </div>
    </div>
    <div class="upload-btn">
      <div v-if="twoBtnShow" class="bottom-btn">
        <van-uploader :after-read="onRead" accept="image/*">
          <van-button type="primary">选择图片</van-button>
        </van-uploader>
        <van-button type="primary" @click="uploadCropImg">上传图片</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Button, Uploader, Toast } from "vant";
Vue.use(Dialog, Button, Uploader, Toast);

import { VueCropper } from "vue-cropper";

import { addApply, postApply, chaifen } from "../../libs/utils";

export default {
  components: {
    topBar: () => import("../components/topBar"),
    VueCropper
  },
  data() {
    return {
      leftZhi: true,
      imgFile: "",
      user_picture: "../image/jiao.png",
      previews: {},
      option: {
        img: "../image/jiao.png", //裁切图片的地址
        outputSize: 0.6, //裁剪生成图片的质量 0.1-1
        full: false, //是否输出原图比例的截图
        outputType: "png", //裁剪生成图片的格式
        canMove: true, //图片是否允许滚轮缩放
        fixedBox: true, //固定截图框大小 不允许改变
        original: false, //上传图片按照原始比例渲染
        canMoveBox: false, //截图框能否拖动
        canMove: true, // 上传图片是否可以移动
        autoCropWidth: 180,
        autoCropHeight: 252,
        autoCrop: true, //是否默认生成截图框
        // 开启宽度和高度比例
        fixed: false
        // fixedNumber: [1, 1]
      },
      results: "",
      isBtnShow: true,
      twoBtnShow: false,
      previewsList: {}
    };
  },
  created() {},

  methods: {
    //返回上一层
    onClickLeft() {
      this.$router.push("./Home");
    },

    //选择上传图片
    onRead(file) {
      var that = this;
      console.log(file);

      let cropperImg = URL.createObjectURL(file.file); 
      console.log(cropperImg);
      that.option.img = cropperImg;
      that.results = cropperImg;
      that.isBtnShow = false;
      that.twoBtnShow = true;
    },

    // 上传剪切后用户的头像图片
    uploadCropImg() {
      console.log(3333);
      var aLink = document.createElement("a");
      aLink.download = "demo";

      // 隐藏裁剪图片弹窗
      this.$refs.cropper.getCropBlob(data => {
        console.log("data", data);
        let dataImg = URL.createObjectURL(data);
        dataImg = dataImg.split("blob:")[1] + '.png'
        // aLink.href = dataImg;
        // console.log(aLink.href);
        // aLink.click();
        console.log(dataImg);
        let postObj = postApply({
          filePath: dataImg,
          name: "file"
        });
        console.log(postObj)

        this.$post("/uploadServer", postObj).then(res => {
          console.log(res);
          if (res.Flag) {
            this.$router.push({
              name: "Home"
            });
            Toast(res.Content);
          } else {
            Toast(res.Content);
          }
        });
        return;

        // let postObj = postApply({
        //   field: "head",
        //   info: dataImg
        // });
        // console.log(postObj);
        // this.$post("/uploadImage", postObj).then(res => {
        //   console.log(res);
        //   if (res.Flag) {
        //     this.$router.push({
        //       name: "Home"
        //     });
        //     Toast(res.Content);
        //   } else {
        //     Toast(res.Content);
        //   }
        // });
      });
    },

    //左下选择图片
    selectCropImg() {
      this.onRead(file);
    }
  }
};
</script>

<style lang="less" scoped>
.conrainer {
  position: relative;
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   align-items: center;
  //   justify-content: center;
  height: 550px;
}

.zidingyi {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.xianKuang {
  width: 180px;
  height: 252px;
  border: 1px solid #39f;
  background-color: #2e2e2e;
  position: absolute;
  left: 50%;
  margin-left: -90px;
  top: 50%;
  margin-top: -126px;
}

.centerClick {
  width: 120px;
  height: 40px;
  position: absolute;
  border-radius: 2px;
  color: #ffffff;
  left: 50%;
  margin-left: -60px;
  top: 50%;
  margin-top: -20px;
  text-align: center;
}

.centerClick .van-button {
  width: 120px;
  height: 40px;
  line-height: 40px;
}

.van-button--primary {
  background-color: #1989fa;
  border: 1px solid #1989fa;
}

.wrapper {
  position: fixed;
  width: 100%;
  top: 65px;
  height: calc(100% - 115px);
}
.vue-cropper {
  background-color: rgba(0, 0, 0, 0.9);
  background-image: none !important;
}

.upload-btn {
  height: 50px;
  background-color: #000;
}

.bottom-btn {
  display: flex;
  justify-content: space-between;
  padding: 12px 10px 0;
  .van-button {
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
}
</style>