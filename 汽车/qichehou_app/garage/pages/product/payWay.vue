<template>
	<view>
		<!--头部内容-->
		<view>
			<view class="head-module">
				<view class="status_bar">
					<!-- 这里是状态栏 -->
				</view>
				<view class="head_title">
					<view class="head_title-icon" @click="backClick">
						<u-icon name="arrow-left" size="40"></u-icon>
					</view>
					<view class="head_title-center">
						支付方式
					</view>
					<view style="width: 40rpx;"></view>
				</view>
			</view>
		</view>
		
		<!--内容-->
		<view class="pay-wap">
			<!--钱数-->
			<view class="pay-wap-price">
				<text>￥</text>
				<text style="font-size: 80rpx;">2449.16</text>
			</view>
			
			<!--选择支付方式-->
			<view class="cancel-cause">
				<view class="cancel-cause-text">选择支付方式</view>
				<view class="cancel-cause-radio">
					<u-radio-group v-model="radioValue" class="radio-group">
						<view class="radio-item" v-for="(item, index) in list">
							<view class="pay-wap-more">
								<image :src="item.imageUrl" mode=""></image>
								<text>{{item.text}}</text>
							</view>
							<u-radio @change="radioChange(item)" shape="circle" active-color="#EC3333" :key="index" :name="item.name" :disabled="item.disabled"></u-radio>
						</view>
					</u-radio-group>
				</view>
			</view>
			
			<!--新增地址按钮 固定-->
			<view class="addAddressBtn">
				<u-button shape="circle" type="error" :custom-style="addAddressStyle" @click="gotoaddAddress">
					立即支付
				</u-button>
			</view>
			
		</view>
		
		
		
		<!--删除模态框-->
		<u-modal v-model="deleteShow" :content="content" :show-cancel-button='true' @cancel='cancel' @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	import Services from '../../services/app.js';
	export default {
		data() {
			return {
				//是否显示删除弹窗
				deleteShow: false,
				content:'确定要取消支付吗？',
				
				//单选框组的属性
				list: [{
						name: 1,
						disabled: false,
						text:'余额支付(当前余额300.00）',
						imageUrl:'../../static/img/product/yue.png'
					},
					{
						name: 2,
						disabled: false,
						text:'微信支付',
						imageUrl:'../../static/img/product/weixin.png'
					},
					{
						name: 3,
						disabled: false,
						text:'支付宝支付',
						imageUrl:'../../static/img/product/zhifubao.png'
					},
					{
						name: 4,
						disabled: false,
						text:'郑州民生银行(0788)',
						imageUrl:'../../static/img/product/bankcar.png'
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radioValue: 1,
				radioItem:'', //选中的内容
				
				//立即支付按钮
				addAddressStyle: {
					width: '674rpx',
					height: '80rpx',
				},
			};
		},
		methods:{
			..._methods,
			
			// 选中某个单选框时，由radio时触发
			radioChange(item) {
				console.log(item);
				this.radioValue = item.name
				this.radioItem = item
			},
			
			//返回上一个页面
			backClick(){
				var that = this
				that.deleteShow = true
			},
			
			//删除确认弹窗 取消事件
			cancel(){
				this.deleteShow =false
			},
			
			//删除确认弹窗 确定事件
			confirm() {
				uni.navigateBack({
				    delta: 1
				});
			},
			
			//立即支付
			gotoaddAddress(){
				if(this.radioValue == ''){
					this.show_toast("请选择一种支付方式")
					return
				}
				uni.navigateTo({
					url: '/pages/product/payResult'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		position: relative;
		height: 100%;
	}
	//自定义头部样式
	.head-module {
		width: 100%;
		height: 150rpx;
		padding: 0 20rpx;
	
		.head_title {
			text-align: center;
			height: 65rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.head_title-center{
			font-size: 24rpx;
		}
	}
	
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	
	//中间内容
	.pay-wap{
		padding: 120rpx 40rpx 0;
		
		.pay-wap-price{
			text-align: center;
			font-size: 48rpx;
			color: #EC3333;
			font-weight:bold;
		}
	}
	
	//选择支付方式
	.cancel-cause {
		margin: 120rpx 0 0;
		font-size: 28rpx;
		.cancel-cause-text {
			margin-bottom: 50rpx;
			color: #5A5A5A;
		}
	
		.cancel-cause-radio {
			.radio-item{
				width: 670rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
			}
		}
		
		.pay-wap-more{
			display: flex;
			align-items: center;
			
			image{
				width: 60rpx;
				height: 60rpx;
				margin-right: 24rpx;
			}
		}
		
	}
	
	.addAddressBtn{
		margin-top: 100rpx;
	}

</style>
