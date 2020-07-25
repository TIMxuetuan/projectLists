const config = require('../config');
const util  = getApp().util;
const Services = {
    //轮播图请求地址  /index.php?url=slide/index
    swichPhoto(data){
        return util._post(`${config.host}/index.php?url=slide/index`,data)
    },

    // 发送验证码
    sendCode(data){
        return util._post(`${config.host}/plug-in/aliyun-sms/send.php`,data)
    },
    // 注册
    register(data){
        return util._post(`${config.host}/member/o.php?url=login/register`,data)
    },

    //获得历史缴费记录
    paymentRecords(data){
        return util._post(`${config.host}/member/api.php?url=index/payment_record`,data)
    },

    //开启安全防护设置密码
    setPassword(data){
        return util._post(`${config.host}/member/api.php?url=member/set_password`,data)
    },

    //修改手机号
    amendPhone(data){
        return util._post(`${config.host}/member/api.php?url=member/edit_phone`,data)
    },

    //安全防护登录
    safetyLogin(data){
        return util._post(`${config.host}/member/o.php?url=login/login&type=app`,data)
    },

    //修改单个信息
    changeUserInfo(data){
        return util._post(`${config.host}/member/api.php?url=member/upField`,data)
    },

    //承诺书
    textBooks(data){
        return util._post(`${config.host}/member/api.php?url=member/commitment`,data)
    },

    //党组织
    partyOrganization(data){
        return util._post(`${config.host}/index.php?url=party/index`,data)
    },

    //我的--获取用户信息
    getUserInformation(data){
        return util._post(`${config.host}/member/index.php?url=member/getMe`,data)
    },

    

}
module.exports = Services;