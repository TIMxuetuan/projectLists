import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  /*登录*/
  {
    path: "/",
    name: "userLogin",
    component: () =>
      import("../views/userLogin.vue")
  },
  /*注册*/
  {
    path: "/register",
    name: "register",
    component: () =>
      import("../views/register.vue")
  },
  //修改密码
  {
    path: "/changePassword",
    name: "changePassword",
    component: () =>
      import("../views/changePassword.vue")
  },
  /*首页*/
  {
    path: "/Home",
    name: "Home",
    component: () =>
      import("../views/Home.vue")
  },
  /*上传头像页面*/
  {
    path: "/cutInside",
    name: "cutInside",
    component: () =>
      import("../views/cutInside.vue")
  },
  /*我的*/
  {
    path: "/mine",
    name: "Mine",
    component: () =>
      import("../views/Mine.vue")
  },
  /*学校所在地*/
  {
    path: "/schoolLocation",
    name: "schoolLocation",
    component: () =>
      import("../views/school/schoolLocation.vue")
  },
  {
    path: "/schoolBianji",
    name: "schoolBianji",
    component: () =>
      import("../views/school/schoolBianji.vue")
  },
  /*主要经历*/
  {
    path: "/mainExperience",
    name: "mainExperience",
    component: () =>
      import("../views/zhuYao/mainExperience.vue")
  },
  {
    path: "/addExperience/:index/:main",
    name: "addExperience",
    component: () =>
      import("../views/zhuYao/addExperience.vue")
  },
  /*奖罚情况*/
  {
    path: "/rewardPunish",
    name: "rewardPunish",
    component: () =>
      import("../views/jiangFa/rewardPunish.vue")
  },
  {
    path: "/addRewardPunish/:index/:main",
    name: "addRewardPunish",
    component: () =>
      import("../views/jiangFa/addRewardPunish.vue")
  },
  /*家庭成员情况*/
  {
    path: "/familyCase",
    name: "familyCase",
    component: () =>
      import("../views/jiaTing/familyCase.vue")
  },
  {
    path: "/addFamilyCase/:index/:main",
    name: "addFamilyCase",
    component: () =>
      import("../views/jiaTing/addFamilyCase.vue")
  },
  /*主要社会关系情况*/
  {
    path: "/socialRelations",
    name: "socialRelations",
    component: () =>
      import("../views/sheHui/socialRelations.vue")
  },
  {
    path: "/addSocialRelations/:index/:main",
    name: "addSocialRelations",
    component: () =>
      import("../views/sheHui/addSocialRelations.vue")
  },
  /*特长爱好*/
  {
    path: "/specialHobby",
    name: "specialHobby",
    component: () =>
      import("../views/teChang/specialHobby.vue")
  },
  {
    path: "/compileSpecialHobby/:model",
    name: "compileSpecialHobby",
    component: () =>
      import("../views/teChang/compileSpecialHobby.vue")
  },
  /*被装信息*/
  {
    path: "/packedMessage",
    name: "packedMessage",
    component: () =>
      import("../views/beiZhuang/packedMessage.vue")
  },
  {
    path: "/compilePackedMessage",
    name: "compilePackedMessage",
    component: () =>
      import("../views/beiZhuang/compilePackedMessage.vue")
  },
  {
    path: "/packedDetailed",
    name: "packedDetailed",
    component: () =>
      import("../views/beiZhuang/packedDetailed.vue")
  },
  /*邮寄地址*/
  {
    path: "/mailingAddress",
    name: "mailingAddress",
    component: () =>
      import("../views/youJi/mailingAddress.vue")
  },
  {
    path: "/compileMailingAddress",
    name: "compileMailingAddress",
    component: () =>
      import("../views/youJi/compileMailingAddress.vue")
  },
  /*参军意向*/
  {
    path: "/joinUp",
    name: "joinUp",
    component: () =>
      import("../views/canJun/joinUp.vue")
  },
  {
    path: "/compileJoinUp",
    name: "compileJoinUp",
    component: () =>
      import("../views/canJun/compileJoinUp.vue")
  },
  
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
