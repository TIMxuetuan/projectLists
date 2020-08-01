<template>
	<view>
		<view class="addbank-card">
			<u-form :model="form" ref="uForm">
				<u-form-item label="持卡人" label-width="100">
					<u-input v-model="form.name" placeholder="请输入本人姓名" />
				</u-form-item>
				<u-form-item label="银行卡" label-width="100">
					<u-input v-model="form.intro" type="number" placeholder="点击输入您本人的银行卡号"/>
				</u-form-item>
			</u-form>
			<block v-if="form.intro == '' ? false : true">
				<view class="addbank-card-name">
					<image src="" mode=""></image>
					<text>中国工商银行储蓄卡</text>
				</view>
			</block>
			<view class="addbank-card-btn">
				<u-button @click="tomywallet" type="primary" :disabled=" (form.name == '' || form.intro == '') ?  true : false ">下一步</u-button>
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
				form: {
					name: '',
					intro: '',
				},
				isShowBtn:true
			};
		},
		methods: {
		..._methods,
			tomywallet() {
				uni.navigateTo({
					url: '/pages/my/verifyCardMessage/verifyCardMessage'
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
	.addbank-card {
		padding: 20px 20rpx;
		background-color: #fff;
		.addbank-card-btn{
			margin-top: 30rpx;
		}
		.addbank-card-name{
			margin: 20rpx 0 0 100rpx;
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				border: 1px solid #000;
				margin-right: 10rpx;
			}
		}
	}
</style>
