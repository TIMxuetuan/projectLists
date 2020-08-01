<template>
	<view class="deliver_goods_address_wrap" :style="{'min-height':height+ 'px'}">
		<view class="deliver_goods_address_block" v-for="(item,i) in list" :key="i" :style="{'border-top':i?'1px solid #A7A7A7':''}" v-if="state==1">
			<view class="deliver_goods_address_txt">
				<view class="deliver_goods_address_txt_top">
					<view style="width: 62px;">张三</view>
					<view style="95px">18519818888</view>
					<view style="width:36px;height:16px;background:rgba(239,116,77,1);margin: 0 10px;color:rgba(255,255,255,1);font-size:12px;line-height:16px;text-align: center;">默认</view>
				</view>
				<view class="deliver_goods_address_txt_xia">
					{{item.txt}}
				</view>
			</view>
			<view style="padding-left: 28px;width: 48px;margin: auto 0;" @click="go_addDeliverGoodsAddress">
				<image src="../../../static/img/index/bianji.png" style="height: 20px;width: 20px;"></image>
			</view>
		</view>
		<view v-if="state==0">
			<view style="padding-top: 93px;width: 81px;height:174px;margin: 0 auto;">
				<image src="../../../static/img/index/coordinates_fill.png" style="width: 81px;height: 81px;"></image>
			</view>
			<view style="font-size:14px;height:54px;line-height: 34px;font-family:Source Han Sans CN;font-weight:400;color:rgba(90,90,90,0.55);text-align: center;padding-bottom: 20px;">
				你还没有设置发货地址
			</view>
			<view style="font-size:14px;font-family:Source Han Sans CN;color:rgba(255,255,255,1);width:200px;height:40px;margin: 0 auto;background:rgba(71,121,242,1);border-radius:20px;text-align: center;line-height: 40px;" @click="go_addDeliverGoodsAddress">
				创建发货地址
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
						txt:"河南生郑州市金水区农业路71号中州国际饭店2楼 河南智业科技"
					},
					{
						txt:"河南生郑州市金水区农业路71号中州国际饭店2楼 河南智业科技"
					},
					{
						txt:"河南生郑州市金水区农业路71号中州国际饭店2楼 河南智业科技"
					}
				],
				state:0
			}
		},
		methods: {
			go_addDeliverGoodsAddress(){
				this.$u.route({
								url: 'pages/index/shop/addDeliverGoodsAddress',
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
	.deliver_goods_address_wrap{
		background-color: #FFFFFF;
		padding: 0 19px;
		.deliver_goods_address_block{
			padding: 15px 0;
			display: flex;
			.deliver_goods_address_txt{
				.deliver_goods_address_txt_top{
					display: flex;
					font-size:14px;
					line-height: 16px;
					font-family:Source Han Sans CN;
					font-weight:400;
					height: 24px;
					color:rgba(68,68,68,1);
				}
			}
		}
	}
</style>
