<script>
import app from '@/services/app.js'	
export default {
	onLaunch: function() {
		//plus.navigator.setStatusBarBackground("#FF0000")
		//plus.navigator.setStatusBarStyle('light');
	},
	onShow: function() {
		// 授权位置信息
		// uni.authorize({
		//     scope: 'scope.userLocation',
		//     success() {
		//         uni.getLocation()
		//     }
		// })
	
		
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */ 
@import './static/css/icon.scss';
page{
	min-height: 100vh;
}
</style>