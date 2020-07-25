let debug = 'production'; //production  development
let host_map = {
  development: 'http://192.168.3.132:2002',
  production: 'https://party.keji01.com',
}
let host = host_map[debug];
let directory = '/member/';
let api=`${host}${directory}api.php?url=`;
let o_api= `${host}${directory}o.php?url=`;

let config = {
  appid: 'wxada353b3bc133c70',
  pageSize: 20,
  host: host ,
  root: `${host}${directory}`,
  api: api,
  o_api: o_api,
  cdn:'',
  service:{
    host,
    root: `${host}${directory}`,
    wxLogin: `${host}/plug-in/wx/get_wxapp_openid.php`
  },

}
module.exports = config;