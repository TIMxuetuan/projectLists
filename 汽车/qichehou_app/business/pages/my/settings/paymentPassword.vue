<template>
	<view class="container">
		<view class="password">
			<view class="title">请输入支付密码</view>
			<u-message-input :mode="mode" :maxlength="maxlength"  :breathe="false" :dot-fill="true" @change="change" @finish="finish"></u-message-input>
		</view>
		<view class="password">
			<view class="title title-B">请再次输入支付密码</view>
			<u-message-input :mode="mode" :maxlength="maxlength"  :breathe="false" :dot-fill="true"></u-message-input>
		</view>
		
		<view class="config_btn">
			<u-button :custom-style="customStyle" shape="circle"  @click="user_register">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				maxlength:6,
				mode:'box',
				customStyle: {
					backgroundColor:'#4779F2',
					color:'#fff'
				},
			}
		},
		methods:{
			change(e) {
				console.log('内容改变，当前值为：' + e);
			},
			finish(e) {
				console.log('输入结束，当前值为：' + e);
			},
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding:0 38rpx;
	}
	.password{
		/deep/.u-char-flex{
			margin-top:40rpx;
			justify-content: space-between;
			.u-char-item{
				margin:0 auto;
			}
		}
		.title{
			margin-top:40rpx;
			font-size:14px;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(68,68,68,1);
			opacity:1;
		}
		.title-B{
			margin-top: 70rpx;
		}
	}
	
	.config_btn {
		margin: 100rpx auto 30rpx;
	}
</style>
