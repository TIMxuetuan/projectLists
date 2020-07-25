let debug = 'dev';
let host_map = {
  dev: 'https://jzzb.keji01.com',//http://jzzb.keji01.com,,http://192.168.3.178:1002
}
let host = host_map[debug];
let directory = '/member/';
let api=`${host}${directory}api.php?url=`;
let o_api= `${host}${directory}o.php?url=`;


let config = {
  appid: 'wxd42ee2be4acc86b0',
  pageSize: 20,
  host: host ,
  root: `${host}${directory}`,
  api: api,
  o_api: o_api,
  cdn:'',
  service:{
    host,
    root: `${host}${directory}`,
    sendsms: `${host}/plug-in/aliyun-sms/send.php?terminal=wx`,
    register: `${o_api}login/register`,
    login: `${o_api}login/login&type=1`,
    wxLogin: `${host}/plug-in/wx/get_wxapp_openid.php`,
    codeName: `${host}/plug-in/aliyun-sms/send.php`,
    getInfo: `${api}me/getInfo`,
    logout: `${api}me/logout`,
    setPassword: `${api}me/setPassword`,
    upload: `${api}personal/saveInfo`,
    getPersonalInfo: `${api}me/getPersonalInfo`,
    loginCode: `${o_api}login/login&type=2`,
    getTroops: `${api}me/getTroops`,
    getSpecialityMap: `${api}me/getSpecialityMap`,
  },

}
module.exports = config;