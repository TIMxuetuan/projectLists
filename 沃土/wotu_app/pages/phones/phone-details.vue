<template>
	<view class="content">
		<scroll-view scroll-y class="data-list">
			<view class="w-card head-message">
				<view class="head-portrait"><image :src="model.Header? model.Header: '../../static/img/default-head.png'"></image></view>
				<view class="head-r">
					<text class="name">{{model.Name}}</text>
					<text class="email">{{model.Email}}</text>
				</view>
			</view>

			<view class="em-list w-card list-space-between">
				<view class="item">
					<view class="start h">职务</view>
					<view class="end color-light">{{model.Position}}</view>
				</view>

				<view class="item">
					<view class="start h">签名</view>
					<view class="end color-light">{{model.Signature || '无'}}</view>
				</view>

				<view class="item">
					<view class="start h">电话</view>
					<view class="end color-light" @longpress='clipBoard(model.Telphone)'>{{model.Telphone || '无'}}</view>
				</view>

				<view class="item">
					<view class="start h">手机</view>
					<view class="end color-light" @longpress='clipBoard(model.PhoneNumber)'>{{model.PhoneNumber|| '无'}}</view>
				</view>

				<view class="item">
					<view class="start h">企业邮箱</view>
					<view class="end color-light" @longpress='clipBoard(model.Email)'>{{model.Email}}</view>
				</view>

				<view class="item" style="border: none;">
					<view class="start h">介绍:</view>
				</view>
				<view class="introduce">
					{{model.Description}}
				</view>
				
				
			</view>
		</scroll-view>
		<view class="navigation">
			<view class="phone" @tap="call(model.PhoneNumber)">
				<text class="iconfont">&#xe65d;</text>
				<text>打电话</text>
			</view>
			<view class="message" @tap='sendMsg'>
				<text class="iconfont">&#xe72e;</text>
				<text>发短信</text>
			</view>
			<view class="chat" @tap='share'>
				<text class="iconfont">&#xe61a;</text>
				<text>分享到微信</text>
			</view>
		</view>
	</view>
</template>

<script>
import { _data, _methods } from '@/common/public.js';
import Services from '@/services/phoneNumber.js';
export default {
	name: 'phone-details',
	props: {
		phones: Object
	},
	data() {
		return {
			uid:'',
			model:{},
			userInfo:{},
		};
	},
	onLoad(e) {
		this.uid = e.uid;
		this.getDetail();
		this.userInfo = this.getUserInfo();
	},
	onShareAppMessage(res){
		if (res.from === 'menu') {// 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title:'个人信息',
			path:'/pages/phones/phone-details'
		}
	},

	methods: {
		..._methods,
		getDetail() {
			Services.memberDetail(this.uid).then((res)=>{
				console.log(res)
					if(!res.Header){
						res.Header = '';
					}
					if(!res.Position){
						res.Position = '无';
					}
					if(!res.Description){
						res.Description = '';
					}
					this.model = res;
				})
		},
		call(phone) {
			uni.makePhoneCall({
				phoneNumber:phone
			});
		},
		sendMsg(){
			uni.showToast({
				title:'不要急,功能正在开发中',
				icon: 'none'
			})
		},
		share(){
			uni.share({
			    provider: "weixin",
			    scene: "WXSceneSession",
			    type: 2,
			    imageUrl: this.userInfo.QRCode,
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
		// 复制到剪贴板
		clipBoard(msg){
			uni.vibrateShort({
			    success: function () {
			        console.log('success');
			    }
			});
			if(msg){
				uni.setClipboardData({
					data:msg
				})
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	background: $uni-bg-color-grey;
	padding: 0 20upx;
	box-sizing: border-box;
	color: $uni-text-color;
}
.w-card{
	margin-bottom: 20upx;
}
.data-list {
	height: 93vh;
}
.em-list {
	padding: 0 20upx;
	.item{
		font-size: $uni-font-size-lg;
	}
}

.list-space-between{
	.item{
		padding: 30upx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		.color-light{
			color: #787878;
		}
	}
}

.head-message {
	height: 300upx;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	.head-portrait {
		width: 170upx;
		height: 170upx;
		border: 1px solid #888;
		background: #fff;
		border-radius: 50%;
	}
	.head-portrait image{
		width: 170upx;
		height: 170upx;
		border-radius: 50%;
	}
	.head-r {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 20upx;
		margin-top: 15upx;
	}
	.name {
		font-size: 36upx;
	}
	.email {
		margin-top: 10upx;
		color: #888;
	}
}
.introduce{
	background:#fff;
	width:100%;
	color:#787878;
	font-size:28upx;
	box-sizing: border-box;
	padding: 10upx 20upx;
	
}
.navigation {
	width: 100vw;
	height: 7vh;
	border: 1px solid #eee;
	background: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	.phone,
	.message,
	.chat {
		width: calc(100% / 3);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #eee;
		font-size: 28upx;
		.iconfont{
			font-size: 32upx;
			margin-right: 7upx;
		}
	}
}
</style>
