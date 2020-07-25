<template>
	<view class="page-loading-wrap" v-if="show">
		<view class="page-loading">
			<image src="/static/images/zz.png" class="an-rotation page-loading-rotation"></image>
			<image src="/static/images/zzz.png" class="page-loading-inner"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'page-loading',
		props: {
			show:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.page-loading-wrap{
		background-color: #ffffff;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.page-loading{
		position: relative;
		width: 130upx;
		height: 130upx;
		
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.page-loading-rotation{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.page-loading-inner{
		width: 56upx;
		height: 56upx;
	}
	
	@keyframes Rotation{
		from {transform: rotate(0deg);}
		to {transform: rotate(360deg);}
	}

	.an-rotation{
		transform: rotate(360deg);
		animation: Rotation 2s linear infinite;
	}
</style>
