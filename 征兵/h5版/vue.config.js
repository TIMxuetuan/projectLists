module.exports = {
    publicPath: "/",
    outputDir: "dist", // 构建输出目录
    assetsDir: "assets", // 静态资源目录 (js, css, img, fonts)
    devServer: {
        proxy: { 
            //登录接口 手机密码登录
            '/enterApi': {
                target: "https://jzzb.keji01.com/member/o.php?url=login/login&type=1",
                changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/enterApi': ''
                }
            },
            
            //登录接口2 手机验证码登录 
            '/enterApi2': { 
                target: "https://jzzb.keji01.com/member/o.php?url=login/login&type=2",
                changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/enterApi2': ''
                }
            },

            //用户注册  
            '/userRegister': {
                target: "https://jzzb.keji01.com/member/o.php?url=login/register",
                changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/userRegister': ''
                }
            },

            //修改密码  
            '/setPassword': {
                target: "https://jzzb.keji01.com/member/api.php?url=me/setPassword",
                changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/setPassword': ''
                }
            },


            '/loginApi': {
                target: "https://www.effmaster.com",
                changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/loginApi': ''
                }
            },

            //获取数据
            "/getApi": {
                target: "https://jzzb.keji01.com/member/api.php?url=me/getPersonalInfo",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/getApi": "" }
            },
            //提交数据
            "/submitApi": {
                target: "https://jzzb.keji01.com//member/api.php?url=personal/saveInfo",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/submitApi": "" }
            },

            //获取其他选择器数据  
            "/getSelector": {
                target: "https://jzzb.keji01.com/member/api.php?url=me/getSpecialityMap",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/getSelector": "" }
            },

            //发送验证码 
            "/sendCode": {
                target: "https://jzzb.keji01.com/plug-in/aliyun-sms/send.php",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/sendCode": "" }
            },


            //图片先上传服务器
            "/uploadServer": {
                target: 'https://jzzb.keji01.com/plug-in/action_webuploader/fileupload2.php?t=' + new Date().getTime(),
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/uploadServer": "" }
            },


            //上传头像 
            "/uploadImage": {
                target: "https://jzzb.keji01.com/member/api.php?url=personal/saveInfo",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/sendCode": "" }
            },
        }
    }
}
