<template>
	<view>
		<view class="addbank-card">
			<u-form :model="form" ref="uForm">
				<u-form-item label="持卡人" label-width="160">
					<u-input v-model="form.name" placeholder="请输入持卡人姓名" />
				</u-form-item>
				<u-form-item label="银行卡" label-width="160">
					<u-input v-model="form.intro" type="number" placeholder="请输入持卡人本人银行卡号" />
				</u-form-item>
			</u-form>

			<view class="addbank-card-name">
				<block v-if="form.intro == '' ? false : true">
					<image src="../../../static/img/My/工商银行.png" mode=""></image>
					<text>中国工商银行储蓄卡</text>
				</block>
			</view>
			<view class="addbank-card-btn">
				<u-button @click="tomywallet" shape="circle" type="error" :disabled=" (form.name == '' || form.intro == '') ?  true : false ">下一步</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
				},
				isShowBtn: true
			};
		},
		methods: {
			tomywallet() {
				uni.navigateTo({
					url: '/pages/my/verifyCardMessage/verifyCardMessage'
				});
			}
		}
	}
</script>


<style lang="scss" scoped>
	.addbank-card {
		padding: 20px 20rpx;
		background-color: #fff;

		.addbank-card-btn {
			margin-top: 30rpx;
		}

		.addbank-card-name {
			height: 40rpx;
			margin: 12rpx 0 0 0;
			display: flex;
			align-items: center;
			line-height: 40rpx;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 6rpx;
			}
		}
	}
</style>
