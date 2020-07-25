
import Vue from "vue";
// import axios from "../src/request/http"
import axios from 'axios'; // 引入axios
// Vue.prototype.$post = axios.fetchPost;
// Vue.prototype.$get = axios.fetchGet;
//时间值格式化
export function timeFormat(val) {
  // 时间格式化 2019-09-08
  var target = "";
  let year = val.getFullYear(); //年
  let month = val.getMonth() + 1; //月
  let day = val.getDate(); //日
  let hour = val.getHours(); //时
  let minute = val.getMinutes(); //分
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (day >= 1 && day <= 9) {
    day = `0${day}`;
  }
  if (hour >= 0 && hour <= 9) {
    hour = `0${hour}`;
  }
  if (minute >= 0 && minute <= 9) {
    minute = `0${minute}`;
  }
  target = `${year}-${month}-${day}`;
  return target
}

//时间组件上加 年月日字符
export function formatter(type, val) {
  if (type === "year") {
    return `${val}年`;
  } else if (type === "month") {
    return `${val}月`;
  } else if (type === "day") {
    return `${val}日`;
  }
  return val;
}

//传输格式转换
export function addApply(obj) {
  console.log(obj)
  let params = new URLSearchParams();
  for (let key in obj) {
    params.append("fields[" + key + "]", obj[key]);
  }
  return params
}


//post 传输数据转换
export function postApply(obj) {
  let params = new URLSearchParams();
  for (let key in obj) {
    params.append(key, obj[key]);
  }
  return params;
}

//获得数据（先不用）
export function getData() {
  var resList = "111"
  axios({
    method: "get",
    url: "/getApi",
  }).then(res => {
    resList = res
    console.log(resList);
  });
  return resList
}

//转换获得的数据进行截取并转为对象数组之类的
export function chaifen (str) {
  let main = []
  if (str != '') {
    var strarr = str.split("|");
    for (var i = 0; i < strarr.length; i++) {
      var stra = strarr[i].split("#");
      var chafen = {};
      for (var j = 0; j < stra.length; j++) {
        var dicArray = stra[j].split(":");
        chafen[dicArray[0]] = dicArray[1];
      }
      main.push(chafen);
      console.log(main)
    }
  }
  return main;
}

//校验身份证
export function identityCard(identitycard){
  //身份证号前两位代表区域
  var city = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江 ",
    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
    41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
    50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
    71: "台湾",
    81: "香港", 82: "澳门",
    91: "国外 "
  };
  var code = identitycard
  //身份证格式正则表达式
  var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
  var errorMess = "";//错误提示信息
  var isPass = true;//身份证验证是否通过（true通过、false未通过）

  //如果身份证不满足格式正则表达式
  if (!code || !idCardReg.test(code)) {
    errorMess = "您输入的身份证号格式有误！";
    isPass = false;
  }

  //区域数组中不包含需验证的身份证前两位
  else if (!city[code.substr(0, 2)]) {
    errorMess = "您输入的身份证地址编码有误！";
    isPass = false;
  }
  else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        errorMess = "您输入的身份证号不存在！";
        isPass = false;
      }
    }
  }
  var returnParam = {
    'errorMess': errorMess,
    'isPass': isPass
  }
  return returnParam;
}


//手机号码验证
export function checkPhone(phone) {
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    return false;
  } else {
    return true;
  }
}


//电话号码验证  
export function checkTelephone(phone) {
  if (!(/^(\+86)?1[3456789]\d{9}$/.test(phone)) && !(/^(1[3456789]\d{9})$/.test(phone)) && !(/^(\d{3,4}-)\d{7,8}$/.test(phone))) {
    return false;
  } else {
    return true;
  }
}
