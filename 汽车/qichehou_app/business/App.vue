<script>
	import {
		_data,
		_methods,
		util
	} from '@/common/public.js';
	import Services from '@/services/app.js';
	export default {

		onLaunch: function(e) {
			let tokenValue = uni.getStorageSync('token') || 0;
			console.log(tokenValue)
			if (tokenValue == 0) {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			} else {
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
	@import "uview-ui/index.scss";
	@import 'static/ly.scss';
	@import "./static/css/iconfont.css";
</style>
