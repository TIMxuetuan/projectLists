<template>
	<view class="business_license_info_wrap" :style="{'min-height':height+ 'px'}">
		<view style="font-size:14px;height:34px;font-weight:500;font-family:Source Han Sans CN;color:rgba(68,68,68,1);">店铺照片</view>
		<view style="display: flex;">
			<view style="flex: 5;">
				<image src="../../../static/img/imgIcon.png" style="width: 100%;"></image>
			</view>
			<view style="flex: 1;"></view>
			<view style="flex: 5;">
				<image src="../../../static/img/imgIcon.png" style="width: 100%;"></image>
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
				
			}
		},
		methods: {
			
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
		},
	}
</script>

<style lang="scss" scoped>
	.business_license_info_wrap{
		background-color: #FFFFFF;
		padding: 15px 19px;
	}
</style>
