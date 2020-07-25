import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant'; 


axios.defaults.timeout = 5000; //响应时间

//配置请求头

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.defaults.baseURL = ""; //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
    config => {
      //在发送请求之前做某件事
      if (config.method === "post") {
        // config.data = QS.stringify(config.data);
      }
      return config;
    },
    error => {
      console.log("错误的传参");
      return Promise.reject(error);
    }
  );
  
  //返回状态判断(添加响应拦截器)
  axios.interceptors.response.use(
    res => {
      //对响应数据做些事
      if (res.data.ResponseStatus == 401) {
        // _this.$router.push("/login")
        // localStorage.setItem("token", "");
        // localStorage.setItem("userInfo", "");
      }
      localStorage.setItem("timeout", Date.now() + 1000 * 60 * 30);
      return res;
    },
    error => {
      console.log("网络异常");
      return Promise.reject(error);
    }
  );
  
  //返回一个Promise(发送post请求)
  export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
      // 在此位置配置请求头目的在于对每次的请求都调用一次token，以防止token失效
      // axios.defaults.headers.common["token"] = localStorage.getItem("token");
      axios
        .post(url, params)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err.data);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  }
  ////返回一个Promise(发送get请求)
  export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
      // axios.defaults.headers.common["token"] = localStorage.getItem("token");
      axios
        .get(url, { params: param })
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err.data);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  }
  export default {
    fetchPost,
    fetchGet,
  };
  