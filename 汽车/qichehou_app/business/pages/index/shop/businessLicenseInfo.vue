<template>
	<view class="business_license_info_wrap" :style="{'min-height':height+ 'px'}">
		<view style="font-size:14px;height:34px;font-weight:500;font-family:Source Han Sans CN;color:rgba(68,68,68,1);">营业执照信息</view>
		<view>
			<image src="" style="width: 100%;"></image>
			<view style="height: 20px;"></view>
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
