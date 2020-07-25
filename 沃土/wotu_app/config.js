/*
* 自定义配置
*/
let _CONFIG = {
	debug:false,
	app_name:'沃土工业协同“智”造系统',
	api_path:'https://www.effmaster.com/',
	cdn:'http://cdn.keji01.com'
}
if(_CONFIG.debug){
	_CONFIG.api_path = 'http://192.168.0.95:8000/';
}
module.exports = _CONFIG