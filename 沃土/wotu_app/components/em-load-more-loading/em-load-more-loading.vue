<template>
	<view class="load-more-loading-wrap" v-show="loading">
		<view class="load-more-loading">
			<image src="/static/img/zz.png" class="an-rotation load-more-loading-rotation"></image>
			<!-- <image src="/static/images/zzz.png" class="load-more-loading-inner"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'em-load-more-loading',
		props: {
			loading:{
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
	.load-more-loading-wrap{
		/*
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		*/
		width: 750upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.load-more-loading{
		position: relative;
		width: 78upx;
		height:78upx;
		
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.load-more-loading-rotation{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.load-more-loading-inner{
		width: 34upx;
		height: 34upx;
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