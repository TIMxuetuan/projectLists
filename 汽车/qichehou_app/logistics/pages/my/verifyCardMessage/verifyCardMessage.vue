<template>
	<view>
		<view class="verifcard-message">
			<u-form :model="model" ref="uForm">
				<u-form-item label="持卡人" label-width="100">
					<u-input v-model="model.name" placeholder="请输入本人姓名" :disabled="true" :custom-style='disabledInput'/>
				</u-form-item>
				<u-form-item label="银行卡" label-width="100">
					<u-input v-model="model.intro" placeholder="请输入本人银行卡" :disabled="true" :custom-style='disabledInput'/>
				</u-form-item>
				<u-form-item label="卡号" label-width="100">
					<u-input v-model="model.cardNumber" placeholder="请输入银行卡卡号" :disabled="true" :custom-style='disabledInput'/>
				</u-form-item>
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="info-circle" label="手机号" label-width="100">
					<u-input placeholder="银行卡预留手机号" v-model="model.phone" type="number"></u-input>
				</u-form-item>
			</u-form>
			<view class="see-user-deal">
				查看用户协议
			</view>
			<view class="addbank-card-btn">
				<u-button @click="gotoAuthCode" type="primary" :disabled=" model.phone == '' ?  true : false ">同意协议并验证</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '../@/common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				model:{
					name: '彭于晏',
					intro: '中国工商银行储蓄卡',
					cardNumber:'6215 5902 0001 8392 848',
					phone:'18237203633'
				},
				disabledInput:{
					color:'#D2D2D2'
				}
			};
		},
		methods:{
			..._methods,
			gotoAuthCode(){
				if (!this.model.phone) {
					this.show_toast("手机号不能为空")
					return
				}
				if (!this.checkPhone(this.model.phone)) {
					this.show_toast("手机号格式不正确")
					return
				}
				uni.navigateTo({
					url: '/pages/my/phoneAuthCode/phoneAuthCode?mphone=' + this.model.phone
				});
				
			}
		}
	}
</script>

<style>
	page {
		background-color: rgba(238, 238, 238, 1);
	}
</style>

<style lang="scss" scoped>
.verifcard-message{
	padding: 20px 20rpx;
	background-color: #fff;
	.see-user-deal{
		margin-top: 30rpx;
		color: #7C7C7C;
	}
	.addbank-card-btn{
		margin-top: 40rpx;
	}
}
</style>
