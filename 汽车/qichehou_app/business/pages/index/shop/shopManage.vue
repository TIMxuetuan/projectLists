<template>
	<view class="shop_manage_wrap" :style="{'min-height':height+ 'px'}">
		<view style="padding: 5px 19px 0 19px;height: 41px;line-height: 36px;font-size:16px;font-family:Source Han Sans CN;font-weight:400;">
			基本资料
		</view>
		<view class="basic_data">
			<view class="basic_data_block" @click="shop_logo_show(0)">
				<view style="line-height: 72px;padding-top: 5px;">
					店铺logo
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 72px;padding: 5px 0;">
					<image src="../../../static/img/imgIcon.png" style="width: 62px;height: 62px;"></image>
				</view>
				<u-icon name="arrow-right" style="padding-left: 6px;"></u-icon>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;">
				<view style="height: 55px;line-height: 55px;">
					店铺名称
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;color:rgba(90,90,90,0.55);" >
					郑州公牛汽修厂
				</view>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;">
				<view style="height: 55px;line-height: 55px;">
					主营品类
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;">
					轮胎、油品
				</view>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;">
				<view style="height: 55px;line-height: 55px;">
					主营品牌
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;">
					佳通、TRW、英孚
				</view>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;" @click="go_shop_address">
				<view style="height: 55px;line-height: 55px;">
					店铺地址
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;">
					郑州市金水区南四环48号
				</view>
				<u-icon name="arrow-right" style="padding-left: 6px;"></u-icon>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;">
				<view style="height: 55px;line-height: 55px;">
					客服电话
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;color:rgba(90,90,90,0.55);">
					13111111111
				</view>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;" @click="deliverGoodsAddress">
				<view style="height: 55px;line-height: 55px;">
					发货地址设置
				</view>
				<view style="flex: 1;"></view>
				<u-icon name="arrow-right" style="padding-left: 6px;"></u-icon>
			</view>
		</view>
		<view style="padding: 0 19px 0 19px;height: 41px;line-height: 41px;font-size:16px;font-family:Source Han Sans CN;font-weight:400;">
			认证信息
		</view>
		<view class="basic_data">
			<view class="basic_data_block" @click="go_businessLicenseInfo">
				<view style="height: 55px;line-height: 55px;">
					营业执照
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;">
					<span style="color: #1296DB;">已认证</span>
				</view>
				<u-icon name="arrow-right" style="padding-left: 6px;"></u-icon>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;" @click="go_identityId">
				<view style="height: 55px;line-height: 55px;">
					身份认证
				</view>
				<view style="flex: 1;"></view>
				<view style="height: 55px;line-height: 55px;">
					<span style="color: #1296DB;">已认证</span>
				</view>
				<u-icon name="arrow-right" style="padding-left: 6px;"></u-icon>
			</view>
			<view class="basic_data_block" style="border-top: 1px solid #A7A7A7;" @click="go_shopPhoto">
				<view style="height: 55px;line-height: 55px;">
					店铺照片
				</view>
				<view style="flex: 1;"></view>
				<u-icon name="arrow-right" style="padding-left: 6px;"></u-icon>
			</view>
		</view>
		<u-popup v-model="logoShow" mode="bottom">
			<view style="background-color: #F1F1F1;color: #4779F2;font-size:16px;">
				<view style="height: 53px;line-height: 52px;text-align: center;border-bottom: 1px solid #A7A7A7;background-color: #FFFFFF;">
					拍照
				</view>
				<view style="height: 52px;line-height: 52px;text-align: center;background-color: #FFFFFF;">
					从手机相册选择
				</view>
				<view style="height: 53px;line-height: 53px;text-align: center;" @click="shop_logo_show(1)">
					取消
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Services from '../../../services/app.js';
	export default {
		components: {
	
		},
		data() {
			return {
				height:0,
				logoShow:false,
				info:{}
			}
		},
		methods: {
			shop_logo_show(data){
				if(data==0){
					this.logoShow = true
				}else if(data==1){
					this.logoShow = false
				}
			},
			go_shop_address(){
				this.$u.route({
								url: 'pages/index/shop/shopAddress',
							})
			},
			deliverGoodsAddress(){
				this.$u.route({
								url: 'pages/index/shop/deliverGoodsAddress',
							})
			},
			go_businessLicenseInfo(){
				this.$u.route({
								url: 'pages/index/shop/businessLicenseInfo',
							})
			},
			go_identityId(){
				this.$u.route({
								url: 'pages/index/shop/identityId',
							})
			},
			go_shopPhoto(){
				this.$u.route({
								url: 'pages/index/shop/shopPhoto',
							})
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
			Services.gte_businessInfo().then(res => {
				console.log("店铺基本信息1111")
				console.log(res.Data)
				this.info = res.Data
			})
		},
	}
</script>

<style lang="scss" scoped>
	.shop_manage_wrap{
		background-color: #F1F1F1;
		.basic_data{
			background-color: #FFFFFF;
			padding: 0 19px;
			font-size:14px;
			font-family:Source Han Sans CN;
			font-weight:400;
			.basic_data_block{
				display: flex;
			}
		}
	}
</style>
