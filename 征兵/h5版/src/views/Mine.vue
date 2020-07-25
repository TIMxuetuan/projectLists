<template>
  <div class="about">
    <!--头部tab-->
    <topBar :leftZhi="leftZhi"></topBar>

    <div class="contant">
      <!--头像模块 开始-->
      <div class="headPhoto">
        <div class="imgName">
          <div class="imgName-image">
            <img :src="userInfo.m_face" alt />
          </div>
          <div class="imgName-name">{{userInfo.m_name}}</div>
        </div>
      </div>
      <!--头像模块 结束-->

      <!--信息模块 开始-->
      <div class="user-detailed">
        <ul>
          <li>
            <div class="detailed-bao">
              <div class="nineOne-left">
                <div class="nineOne-icon">
                  <i class="iconfont icon-iLinkapp-"></i>
                </div>
                <div>手机号</div>
              </div>
              <div class="detailed-right">{{userInfo.m_mphone}}</div>
            </div>
          </li>
          <li>
            <div class="detailed-bao">
              <div class="nineOne-left">
                <div class="nineOne-icon">
                  <i class="iconfont icon-xingming"></i>
                </div>
                <div>真实姓名</div>
              </div>
              <div class="detailed-right">{{userInfo.m_name}}</div>
            </div>
          </li>
          <li>
            <div class="detailed-bao cardStyle">
              <div class="nineOne-left">
                <div class="nineOne-icon">
                  <i class="iconfont icon-credentials_icon"></i>
                </div>
                <div>身份证号</div>
              </div>
              <div class="detailed-right">{{userInfo.m_idCard}}</div>
            </div>
          </li>
          <li @click="changePassword">
            <div class="detailed-bao">
              <div class="nineOne-left">
                <div class="nineOne-icon">
                  <i class="iconfont icon-xiugaimima"></i>
                </div>
                <div>修改密码</div>
              </div>
              <!--箭头icon-->
              <div class="nineOne-arrows">
                <i class="iconfont icon-arrow-right"></i>
              </div>
            </div>
          </li>
          <li @click="quitLogin">
            <div class="detailed-bao">
              <div class="nineOne-left">
                <div class="nineOne-icon">
                  <i class="iconfont icon-tuichu"></i>
                </div>
                <div>退出登录</div>
              </div>
              <!--箭头icon-->
              <div class="nineOne-arrows">
                <i class="iconfont icon-arrow-right"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--信息模块 结束-->
    </div>

    <!--底部tab-->
    <bottomBar></bottomBar>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  components: {
    topBar: () => import("../components/topBar.vue"),
    bottomBar: () => import("../components/bottomBar.vue")
  },
  data() {
    return {
      leftZhi: false,
      userInfo:{}
    };
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    //获得数据
    getUserInfo(){
      this.userInfo =  JSON.parse(localStorage.getItem("userInfo")) 
      console.log(this.userInfo)
    },

    //退出登录
    quitLogin() {
      Dialog.confirm({
        message: "确认要退出登录吗"
      })
        .then(() => {
          // on confirm
          localStorage.setItem("userInfo", "");
          this.$router.push({
            name: "userLogin"
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    //修改密码
    changePassword() {
      this.$router.push({
        name: "changePassword"
      });
    }
  }
};
</script>
<style scoped>
.about {
  background-color: #f1f1f1;
}
.contant {
  padding: 20px 0;
}

/*头像模块 开始*/
.headPhoto {
  width: 21.5625rem;
  height: 12.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}
.imgName {
  width: 11.5625rem;
  height: 8.125rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.imgName-image img {
  width: 5.3125rem;
  height: 5.3125rem;
  border-radius: 50%;
  border: 1px solid #378ccf;
}
.imgName-name {
  font-size: 20px;
  color: #378ccf;
  font-weight: 500;
}
/*头像模块 结束*/

/*信息模块 开始*/
.user-detailed {
  width: 21.5625rem;
  background-color: #ffffff;
  margin: 1.25rem auto 0;
}
.user-detailed li {
  width: 100%;
  height: 4.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
.detailed-bao {
  width: 19.0625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nineOne-left {
  width: 120px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #000;
}
.nineOne-icon {
  width: 35px;
  margin-right: 5px;
}
.nineOne-icon .iconfont {
  font-size: 22px;
  color: #2e87cd;
}

.cardStyle .nineOne-icon .iconfont {
  font-size: 16px;
  color: #2e87cd;
}

.detailed-right {
  font-size: 16px;
  font-weight: 500;
}
.nineOne-arrows .iconfont {
  font-size: 18px;
  color: #2e87cd;
}
</style>
