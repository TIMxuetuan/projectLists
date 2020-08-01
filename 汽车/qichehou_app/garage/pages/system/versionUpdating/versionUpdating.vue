<template>
	<view>
		<view class="version-updating">
			<view class="version-updating-centent">
				<image src="../../../static/img/timg.png" mode=""></image>
				<text>物流1.0</text>
			</view>
			
			<u-button class="uview_from_button" shape="circle" type="error" @click="affirmClick">检查更新</u-button>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
			};
		},
		methods:{
			..._methods,
			/*修改确认*/
			affirmClick() {
			
				let postObj = {
					Email: 'wangshenge@keji01.com',
					Password: "wsg19980607.."
				};
			
				console.log("postObj:", postObj)
				
			
				uni.switchTab({
					url: '/pages/my/my'
				});
				this.show_toast("暂时没有新版本")
				return
			
				Services.safetyLogin(postObj).then(res => {
					console.log(res)
					this.show_toast("登录成功")
					uni.switchTab({
						url: '/pages/my/my'
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.version-updating{
	padding: 100rpx 40rpx 0;
	.version-updating-centent{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 132rpx;
		image{
			width: 240rpx;
			height: 240rpx;
		}
		text{
			margin-top: 20rpx;
		}
	}
	
	.uview_from_button {
	}
}
</style>
