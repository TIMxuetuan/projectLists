let debug = 'localhost'; //production  development  localhost
let host_map = {
  localhost:'http://192.168.3.215:8083',
  development: 'http://192.168.0.77:1003',
  production: 'https://jzzb.keji01.com',
}
let host = host_map[debug];
let directory = '/lboss/';
let api=`${host}${directory}api.php?url=`;
let o_api= `${host}${directory}o.php?url=`;

let _CONFIG = {
  appid: 'wxada353b3bc133c70',
  pageSize: 20,
  host: host,
  root: `${host}${directory}`,
  api: api,
  o_api: o_api,
  cdn:'',
  uploadUrl:host+'/publics/api.php?url=upload/up',
  service:{
    host,
    root: `${host}${directory}`,
    wxLogin: `${host}/plug-in/wx/get_wxapp_openid.php`
  },
  img_url:host+'/img.php?name='
}


export {
	_CONFIG
}
