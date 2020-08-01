<template>
	<view class="container">
		<!--输入表单-->
			<u-form class="uview_from" :model="model" ref="uForm">
				<u-form-item class="from_item" label="持卡人">
					<u-input v-model="model.name" placeholder="请输入持卡人姓名" />
				</u-form-item>
				<u-form-item class="from_item" label="银行卡" v-if="model.cardNumber.length>=6">
					<u-input v-model="model.card" />
				</u-form-item>
				<u-form-item class="from_item" label="卡号">
					<u-input v-model="model.cardNumber" placeholder="请输入银行卡卡号" type="number"/>
				</u-form-item>
				<u-form-item class="from_item" label="手机号" v-if="model.cardNumber.length>=6">
					<u-input v-model="model.mphone" placeholder="请输入银行预留手机号"type="number" />
				</u-form-item>
				
				<u-button :custom-style="customStyle" shape="circle" >同意协议并验证</u-button>
			</u-form>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '@/common/public.js'
	import Services from '@/services/app.js';
	export default {
		data() {
			return {
				model:{
					name:'',
					card:'工商银行',
					cardNumber:'',
					phone:'',
					
				},
				//按钮样式
				customStyle: {
					backgroundColor:'#4779F2',
					color:'#fff',
					fontSzie:14,
					marginTop:'76rpx'
				},
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding:0 38upx;
	}
	.uview_from{
		/deep/.u-form-item--left{
			width:100rpx!important;
			flex:none !important;
			margin:0 auto !important;
			margin-right:10rpx !important;
		}
	}
	
</style>
