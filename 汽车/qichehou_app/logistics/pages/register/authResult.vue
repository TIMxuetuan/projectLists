<template>
	<view>
		<view class="auth-content">
			<view style="padding:10px 10px;width:100%;">
				<u-steps :list="numList" 　mode="number" :current="1"></u-steps>
			</view>
			<view class="auth-content-title"><image :src="imgSrc" mode="" style="width: 100px;height: 100px;"></image></view>
			<view class="auth-content-money">{{resContent}}</view>
			<view class="auth-content-btn">
				<u-button :custom-style="authBtn" shape="square" type="warning" @click="netStep">{{btnText}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	export default {
		data() {
			return {	
				..._data,
				resContent:'审核成功',
				imgSrc:'../../static/img/right.png',
				btnText:'缴纳保证金',
				pageType:2,
				numList: [{
					name: '注册信息'
				}, {
					name: '认证信息'
				}, {
					name: '缴纳保证金'
				}],
				authBtn:{
					width:'400rpx',
					height:'90rpx'
				}
			};
		},
		onLoad: function (options) {
			console.log(options.type);
			if(options.type==3)
			{
				this.resContent='审核失败';
				this.imgSrc='../../static/img/wrong.png';
				this.btnText='重新提交';
				this.pageType=3;
			}
			else if(options.type==1)
			{
				this.resContent='待审核';
				this.imgSrc='../../static/img/wrong.png';
				this.btnText='重新提交';
				this.pageType=1;
			}
			
		},			
		methods:{
			..._methods,
			//跳转提现金额页面
			netStep(){
				if(this.pageType!=2)
				uni.navigateTo({
					url: '/pages/register/authentication'
				});
				else
				uni.navigateTo({
					url: '/pages/register/margin'
				});
			}
		}
	}
</script>


<style lang="scss" scoped>
.auth-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	.auth-content-title{
		font-size: 24rpx;
		margin-top: 120rpx;
	}
	.auth-content-money{
		font-size: 48rpx;
		margin-top: 60rpx;
	}
	.auth-content-btn{
		margin-top: 100rpx;
	}
}
</style>
