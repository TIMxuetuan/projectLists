<template>
	<view class="addDeliverGoodsAddress_wrap" :style="{'min-height':height+ 'px'}">
		<view style="border-bottom: 1px solid #A7A7A7;" class="addDeliverGoodsAddress_block">
			<view style="width: 92px;">
				收货人
			</view>
			<u-input v-model="value" :type="type" style="padding-top: 4px;" placeholderStyle="font-size:14px;" placeholder="请输入姓名"/>
		</view>
		<view style="border-bottom: 1px solid #A7A7A7;" class="addDeliverGoodsAddress_block">
			<view style="width: 92px;">
				收货人
			</view>
			<u-input v-model="value" :type="type" style="padding-top: 4px;" placeholderStyle="font-size:14px;" placeholder="请输入手机"/>
			<view>
				+86
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view style="border-bottom: 1px solid #A7A7A7;" class="addDeliverGoodsAddress_block">
			<view style="width: 92px;">
				收货人
			</view>
			<u-input v-model="value" :type="type" style="padding-top: 4px;" placeholderStyle="font-size:14px;" placeholder="省市区县、乡镇等"/>
			<view>
				+86
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view style="padding-top: 5px;border-bottom: 1px solid #A7A7A7;">
			<view style="height: 34px;line-height: 44px;font-size:14px;font-family:Source Han Sans CN;color:rgba(68,68,68,1);">
				详细地址
			</view>
			<u-input v-model="value" :types="type" style="padding-top: 4px;" height="72" placeholderStyle="font-size:14px;" placeholder="省市区县、乡镇等"/>
		</view>
		<view class="addDeliverGoodsAddress_block">
			<view style="flex:1;">
				设置默认地址
			</view>
			<view style="width: 14px;line-height: 53px;">
					<image src="../../../static/img/index/weixuanzhong.png" style="width: 14px;height: 14px;margin: auto 0;"></image>
			</view>
		</view>
		<view style="padding-top: 48px;">
			<view style="background-color: #4779F2;height: 40px;border-radius:20px;text-align: center;line-height: 40px;color: #FFFFFF;font-size:16px;font-family:Source Han Sans CN;font-weight:500;">保存</view>
			<view style="height: 15px;"></view>
			<view style="background-color: #FFFFFF;height: 40px;border-radius:20px;text-align: center;line-height: 38px;color: #444444;font-size:16px;font-family:Source Han Sans CN;font-weight:500;border:1px solid rgba(68,68,68,1);" @click="open">删除</view>
		</view>
		<u-modal v-model="show" :show-title="title" :show-cancel-button="show_button" @confirm="aaa" :title-style="{color: '#5A5A5A',padding:'10px','font-size':'14px'}" :content="content" :content-style="{'font-size':'14px',padding:'17px 0 28px 0'}" :cancel-style="{'font-size':'14px',color:'#5A5A5A'}" :confirm-style="{'font-size':'14px',color:'#000000'}">
		</u-modal>
	</view>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				height:0,
				value:'',
				type:'text',
				types:'textarea',
				show: false,
				title:true,
				show_button:true,
				content: '确定要删除该地址吗?'
			}
		},
		methods: {
			open() {
				this.show = true;
			},
			aaa(){
				console.log("000")
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
		},
	}
</script>

<style lang="scss" scoped>
	.addDeliverGoodsAddress_wrap{
		padding: 0 19px;
		.addDeliverGoodsAddress_block{
			display: flex;
			height: 53px;
			line-height: 45px;
			font-size:14px;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(68,68,68,1);
		}
	}
</style>
