<script>
export default {
	onLaunch: function() {
		console.log(111)
		let tokenValue = uni.getStorageSync('token')||0;
		console.log(tokenValue)
		if(tokenValue == 0){
			uni.reLaunch({
			  url: '/pages/login/login'
			});
		}else{
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
	@import "./static/css/iconfont.css";
	@import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
	@import './static/css/iconfont-weapp-icon.css';

/* #endif */
</style>
