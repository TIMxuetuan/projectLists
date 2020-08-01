<template>
	<view class="big_container">
		<view class="margin_content">
			<view style="padding:10px 10px;"><u-steps :list="numList"　mode="number" :current="2"></u-steps></view>
			<view class="margin_from">
				<!--输入表单-->
				<template>
					<u-form class="uview_from" :model="model" ref="uForm">
						<u-form-item class="from_item" label="保证金金额" :border-bottom="true" label-width="150" label-position="left"
						 :label-style="labelStyle">
							<view class="lmoney">¥{{money}}</view>
						</u-form-item>
						<u-form-item class="from_item" label="请选择支付方式" :border-bottom="true" label-width="300" label-position="left"
						 :label-style="labelStyle">
							<u-radio-group v-model="type" @change="radioGroupChange">
								<view style="display: flex;margin:10px 10px;">
									<image src="../../static/img/zhi.png" style="width: 30px;height: 30px;padding-right: 10px;"></image>
									<text style="width:200px;">支付宝</text>
									<u-radio active-color="warning"  @change="radioChange" shape="circle" name="支付宝"></u-radio>
								</view>
								<u-line color="#A7A7A7" />
								<view style="display: flex;margin:10px 10px;">
									<image src="../../static/img/wei.png" style="width: 30px;height: 30px;padding-right: 10px;"></image>
									<text style="width:200px;">微信</text>
									<u-radio active-color="warning"  @change="radioChange" shape="circle" name="微信"></u-radio>									
								</view>
							</u-radio-group>
						</u-form-item>
					</u-form>					
					<view class="config_btn">
						<u-button class="uview_from_button" :custom-style="customStyle" shape="circle" type="warning" @click="saveData">立即支付</u-button>
					</view>
					<view style="text-align:left;color:#5A5A5A;padding:10px 10px;display: flex;">
					<u-radio-group style="padding-right:5px;">
						<u-radio shape="square" v-model="value"></u-radio>
					</u-radio-group> 我已阅读并同意 <text style="color:#EF744D">《物流平台入驻协议》</text>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	import Services from '../../services/app.js';
	
	export default {
		data() {
			return {
				..._data,
				money:200,
				type:'支付宝',
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 10,
				labelStyle: {
					"margin-bottom": "0",
					"height": "40rpx"
				},	
				value:true,
				customStyle: {
					// "background-color":"#A6C0FF"
				},
				numList: [{name: '注册信息'
								}, {
									name: '认证信息'
								}, {
									name: '缴纳保证金'
								}],
				btnDisabled: true
			};
		},
		methods: {
			..._methods,
			radioChange(e) {
				console.log(e);
			},
			radioGroupChange(e) {
				console.log(e);
			},
			neststep(){
				uni.navigateTo({
					url: '/pages/margin/authentication'
				});
			},		
			saveData() {
				if (!this.value) {
					this.show_toast("请先勾选协议！")
					return
				}
				
				let postObj = {
					ce_depositAmount: this.money
				};
				
				uni.showLoading({
					title: '提交中...',
					icon: "none"
				});
				Services.addDeposit(postObj).then(res => {
					if(res.Flag){
						console.log(res)
						this.show_toast("提交成功")
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 500)
					}else{
						this.show_toast(res.Content)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: auto;
	}

	.big_container {
		height: auto !important;
	}
	.margin_content {
		width: 100%;
		height: auto;
		overflow: hidden;

		.margin_from {
			margin: 40rpx 0;
			padding: 0 40rpx;

			.u-border-bottom:after {
				border-bottom: 2px solid #E9E9E9;
			}

		}
	}
	.lmoney{
		color: red;
		font-size: 18pt;
		font-weight: bold;
		text-align: center;
	}
	.uview_from {
		.u-form-item {
			padding: 0;
			margin: 20rpx 0;
		}
	}

	.from_item {
		.u-form-item--left {
			margin: 0 !important;
		}
	}

	.config_btn {
		.uview_from_button {
			width: 674rpx;
			margin: 60rpx auto 30rpx;
		}
	}
	
	
	
</style>
