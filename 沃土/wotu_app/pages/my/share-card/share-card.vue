<template>
	<view class="container">

		<view class="card">
			<image :src="image" mode="aspectFill"></image>
		</view>
		<view class="hint">提示：扫描此名片，可添加到联系人</view>
		<button size="mini" type="primary" style="width: 300upx;" @tap="share">一键分享</button>
	</view>
</template>

<script>
	import {_data, _methods} from '@/common/public.js'
	export default {
		data() {
			return {
				..._data,
				image:'',
			};
		},
		onLoad() {
			this.userInfo = this.getUserInfo();
			this.image = this.userInfo.QRCode;
		},
		methods:{
			..._methods,
			share(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 2,
				    imageUrl: this.image,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
						uni.showModal({
							content:'分享成功',
							showCancel:false
						})
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
						uni.showModal({
							title:'分享失败',
							content:JSON.stringify(err),
							showCancel:false
						})
				    }
				});
			},
			
		}
	}
</script>

<style lang="scss">
.container{
		width: 100%;
		min-height: 100vh;
		padding: 150upx 20upx 0 20upx;
		box-sizing: border-box;
		background: $uni-bg-color-grey;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: $uni-text-color;
		.card{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 400upx;
			height: 400upx;
			background: #fff;
			image{
				width: 80%;
				height: 80%;
			}
		}
		.hint{
			font-size: $uni-font-size-base;
			line-height: 4em;
		}
		
	}	
</style>
