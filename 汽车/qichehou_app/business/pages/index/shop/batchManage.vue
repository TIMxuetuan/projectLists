<template>
	<view class="batch_manage_wrap" :style="{'min-height':height+ 'px'}">
		<view :class="i==0?'batch_manage_blocks':'batch_manage_block'" v-for="(item,i) in list" :key="i">
			<view class="batch_manage_block_img">
				<image src="../../../static/img/imgIcon.png" style="width: 135px;height: 135px;"></image>
			</view>
			<view style="padding-left: 9px; flex-direction: column;display: flex;">
				<view style="font-size:14px;font-family:Source Han Sans CN;font-weight:400;line-height:20px;color:rgba(0,0,0,1);">
					{{item.txt}}
				</view>
				<view style="flex: 1;color: #EC3333;font-size:25px;line-height: 70px;font-weight:500;">
					<span style="font-size:14px;font-family:Source Han Sans CN;font-weight:400;">￥</span> 520
				</view>
				<view class="" style="display: flex;font-size:12px;font-family:Source Han Sans CN;font-weight:400;color: #000000;">
					<view class="">
						销量：5
					</view>
					<view style="width: 12px;"></view>
					<view class="">
						库存：15
					</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 48px;">
			
		</view>
		<view class="batch_manage_bottom">
			<view class="" style="height: 42px;text-align: center;flex: 1;padding-top: 10px;line-height: 42px;">
				删除
			</view>
			<view style="width: 1px;background-color: #A7A7A7;"></view>
			<view class="" style="height: 42px;text-align: center;flex: 1;padding-top: 10px;line-height: 42px;">
				追加分类
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
				list:[
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					},
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					},
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					},
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					},
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					},
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					},
					{
						txt:"佳通轮胎155R12C 花纹VAN600 正品三包全套"
					}
				]
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
	.batch_manage_block{
		margin: 5px 19px;
		padding: 10px 0;
		display: flex;
		border-top: 1px solid #F1F1F1;
		.batch_manage_block_img{
			width: 135px;
			height: 135px;
		}
	}
	.batch_manage_blocks{
		margin: 0 10px;
		padding: 10px 0;
		display: flex;
		.batch_manage_block_img{
			width: 135px;
			height: 135px;
		}
	}
	.batch_manage_bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #F1F1F1;
		height: 57px;
		display: flex;
		padding: 5px 0;
	}
</style>
