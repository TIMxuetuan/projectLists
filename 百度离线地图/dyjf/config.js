let ENV = "dev";
const host_map = {
  dev: 'http://192.168.3.128:82/',       //开发环境
  production: 'https://jsqyy.keji01.com' //线上环境
}

const Config = {
  appid: 'wx31449e12142ae2ed',
  host: host_map[ENV],
}

module.exports = Config;