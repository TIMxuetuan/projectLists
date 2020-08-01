<template>
	<view class="shop_address_wrap" :style="{'min-height':height+ 'px'}">
		<view class="shop_address_content">
			<view class="shop_address_content_block" style="border-bottom: 1px solid #E5E5E5;" @click="go_fast_location">
				<view style="height: 53px;line-height: 48px;width: 60px;">
					快速定位
				</view>
				<view style="padding-left: 21px;margin: auto 3px;">
					<image src="../../../static/img/index/dingwei.png" style="width: 14px;height: 14px;"></image>
				</view>
				<view style="flex: 1;height: 53px;line-height: 48px;">
					请选择小区、大厦或街道
				</view>
				<view style="height: 53px;line-height: 48px;">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="shop_address_content_block">
				<view style="height: 53px;line-height:48px;width: 60px;">
					详细地址
				</view>
				<view style="flex: 1;height: 53px;padding-top: 5px;padding-left: 24px;">
					<u-input v-model="value" type="text" placeholder="请填写详细地址" maxlength="999"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				height:0,
				value:""
			}
		},
		methods: {
			go_fast_location(){
				this.$u.route({
								url: 'pages/index/shop/fastLocation',
							})
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
		},
	}
</script>

<style lang="scss" scoped>
	.shop_address_wrap{
		background-color: #E5E5E5;
		font-size:14px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(68,68,68,1);
		.shop_address_content{
			background-color: #FFFFFF;
			padding: 0 19px;
			.shop_address_content_block{
				display: flex;
			}
		}
	}
</style>
