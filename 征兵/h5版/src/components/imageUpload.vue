<template>
  <div class="hello">
    <!--头部上传图片模块 开始-->
    <div class="bigCase">
      <!--左边图片-->
      <div class="bigCase-imgview">
        <img src="../image/1.jpg" alt />
        <div class="bigCase-imgview-hint">选择证件照</div>
      </div>
      <!--右边文字-->
      <div class="bigCase-text">
        <p>(1)本人近期一寸彩色免冠正面证件照；不允许戴帽子、头巾、发带、墨镜；</p>
        <p>(2)照片格式大小：格式为jpg/png，不大于500k；</p>
        <p>(3)照片为红色的纯色背景；</p>
        <p>(4)此照片将用于 "预征对象登记表" 、"应征公民政治考核表" ，请按要求上传。</p>
      </div>
    </div>
    <!--头部上传图片模块 结束-->

    <!--九个子菜单模块 开始-->
    <div class="nineModule">
      <ul class="nineModule-ul">
        <li
          class="nineModule-li"
          v-for="(item,index) in nineLists"
          :key="index"
          @click="routerZimodel(item.routerValue)"
        >
          <div class="nineModule-one">
            <!--icon 和文字-->
            <div class="nineOne-left">
              <div class="nineOne-icon">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              <div>{{item.text}}</div>
            </div>
            <!--箭头icon-->
            <div class="nineOne-arrows">
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--九个子菜单模块 结束-->
  </div>
</template>

<script>
import Vue from "vue";
import { Uploader } from "vant";
Vue.use(Uploader);
import { addApply } from "../../libs/utils";
export default {
  components: {},
  name: "imageUpload",
  props: {
    msg: String
  },
  data() {
    return {
      nineLists: [
        {
          icon: "icon-banshichu2",
          text: "学校所在地",
          routerValue: 1
        },
        {
          icon: "icon-jiaoyujingli",
          text: "主要经历",
          routerValue: 2
        },
        {
          icon: "icon-jiangcheng",
          text: "奖惩情况",
          routerValue: 3
        },
        {
          icon: "icon-jiating1",
          text: "家庭成员情况",
          routerValue: 4
        },
        {
          icon: "icon-shehuiguanxi",
          text: "主要社会关系情况",
          routerValue: 5
        },
        {
          icon: "icon-jinengtechang",
          text: "特长爱好",
          routerValue: 6
        },
        {
          icon: "icon-beizhuang",
          text: "被装信息",
          routerValue: 7
        },
        {
          icon: "icon-youjidizhi",
          text: "邮寄地址",
          routerValue: 8
        },
        {
          icon: "icon-yixiangdan",
          text: "参军意向",
          routerValue: 9
        }
      ]
    };
  },
  mounted() {
    this.loginPost();
  },
  methods: {
    routerZimodel(routerValue) {
      console.log(routerValue);
      switch (routerValue) {
        case 1:
          this.$router.push({
            name: "schoolLocation",
            params: {
              data: routerValue
            }
          });
          break;
        case 2:
          this.$router.push({
            name: "mainExperience",
            params: {
              data: routerValue
            }
          });
          break;
        case 3:
          this.$router.push({
            name: "rewardPunish",
            params: {
              data: routerValue
            }
          });
          break;
        case 4:
          this.$router.push({
            name: "familyCase",
            params: {
              data: routerValue
            }
          });
          break;
        case 5:
          this.$router.push({
            name: "socialRelations",
            params: {
              data: routerValue
            }
          });
          break;
        case 6:
          this.$router.push({
            name: "specialHobby",
            params: {
              data: routerValue
            }
          });
          break;
        case 7:
          this.$router.push({
            name: "packedMessage",
            params: {
              data: routerValue
            }
          });
          break;
        case 8:
          this.$router.push({
            name: "mailingAddress",
            params: {
              data: routerValue
            }
          });
          break;
        case 9:
          this.$router.push({
            name: "joinUp",
            params: {
              data: routerValue
            }
          });
          break;

        default:
          console.log("你好");
      }
    },

    loginPost() {
      let postObj = addApply({
        idCard: "41133019820321071X",
        mphone: "15638527790",
        password: "123456"
      });
      console.log(postObj);

      this.$post(
        "/enterApi",
        // "fields[idCard]": 1123,
        // "fields[mphone]": 13607651079,
        // "fields[password]": 123123
        postObj
      ).then(res => {
        console.log(res);
      });

      
      // axios({
      //   url: "https://jzzb.keji01.com/member/o.php?url=login/login&type=1",
      //   method: "post",
      //   transformRequest: [
      //     function(data) {
      //       // 对 data 进行任意转换处理
      //       return Qs.stringify(data);
      //     }
      //   ],
      //   headers: {
      //     deviceCode: "A95ZEF1-47B5-AC90BF3"
      //   },
      //   data: {
      //     username: "admin",
      //     pwd: "admin"
      //   }
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// @media screen and (min-width: 320px) {
//   body {
//     font-size: 16px;
//   }
// }
// @media screen and (min-width: 481px) and (max-width: 640px) {
//   body {
//     font-size: 18px;
//   }
// }
// @media screen and (min-width: 641px) {
//   body {
//     font-size: 20px;
//   }
// }
　 .hello {
  width: 100%;
}
/*头部上传图片模块 开始*/
.bigCase {
  width: 21.5625rem;
  height: 8.75rem;
  margin: 0 auto;
  display: flex;
  margin-top: 1.25rem;
}
.bigCase-imgview {
  margin-right: 0.625rem;
  position: relative;
}
.bigCase-imgview img {
  width: 6.875rem;
  height: 8.75rem;
  display: block;
  border: 1px solid #a8a8a8;
  box-sizing: border-box;
}
.bigCase-imgview-hint {
  width: 100%;
  height: 1.875rem;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 6.875rem;
  left: 0;
  line-height: 1.875rem;
  color: #ffffff;
}

.bigCase-text {
  font-size: 12px;
  text-align: left;
  line-height: 1.25rem;
}
/*头部上传图片模块 结束*/

/*九个子菜单模块 开始*/
.nineModule {
  margin-top: 2rem;
}
.nineModule-li {
  // height: 3rem;
  border-top: 1px solid #eeeeee;
}
.nineModule-one {
  width: 20.9375rem;
  height: 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nineOne-left {
  font-size: 16px;
  display: flex;
  align-items: baseline;
  color: #000;
}

.nineOne-icon {
  width: 30px;
  margin-right: 0.625rem;
}
.nineOne-icon .iconfont {
  font-size: 25px;
  color: #2e87cd;
}
.nineModule-ul .nineModule-li:first-child .nineOne-icon .iconfont {
  padding-left: 7px;
}
.nineOne-arrows .iconfont {
  font-size: 18px;
  color: #2e87cd;
}
</style>
