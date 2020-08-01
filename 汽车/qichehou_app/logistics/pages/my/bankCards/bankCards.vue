<template>
	<view class="bankcards-content">
		<block v-for="item in bankCardLists">
			<view class="bank-cards" @click="cardClick">

			</view>
		</block>

	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	export default {
		data() {
			return {
			..._data,
			bankCardLists:[
				{}
			]
			};
		},
		methods:{
		..._methods,
			cardClick(){
				uni.navigateTo({
					url: '/pages/my/balance/balance'
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
	.bankcards-content {
		padding: 0 20rpx;
		overflow: hidden;
	}

	.bank-cards {
		width: 710rpx;
		height: 290rpx;
		background-color: #FF450D;
		margin-top: 20rpx;
	}
</style>
