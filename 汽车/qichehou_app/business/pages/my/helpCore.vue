<template>
	<view class="container">
		<view class="common">常见问题</view>
		<view class="four-set">
			<block v-for="item in fourSetLists">
				<view class="four-set-item" @click=" ">
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</block>
		</view>
		<u-popup class="u-popup" v-model="show" mode="center" border-radius="10" width="440rpx" height="200rpx" closeable="true">
			<view class="kfNumber">客服电话：400-190910</view>
			<view class="kfTime">服务时间：08:00-21:30</view>
		</u-popup>
		<u-button :custom-style="customStyle" class="footer-fix" @click="show = true"  :hair-line="false" ><view class="icon-customerservice">联系客服</view></u-button>
		
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	export default{
		data(){
			return{
				..._data,
				fourSetLists:[
					{name:'交易下单过程中不能付款？',id:1},
					{name:'如何申请退款？',id:2},
					{name:'和卖家聊天，消息发不出去？',id:3},
					{name:'余额如何提现？',id:4},
					{name:'关于余额如何提现？我们',id:5},
				],
				show:false,
				customStyle: {
						border:'none',
						borderRadius:'0'
					}
			}
		},
		methods:{
			..._methods,
		}
	}
</script>

<style lang="scss">
	page{
		background-color: rgba(241,241,241,1);
	}
	.common{
		padding:32rpx 38rpx 10rpx 38rpx;
		font-size:14px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(90,90,90,0.70);
	}
	
	/*button样式*/
	.u-popup{
		text-align: center;
		/deep/.u-close{
			top: 14rpx !important;
			right: 14rpx !important;
		
		}
		.kfNumber{
			padding-top:64rpx;
			font-size:14px;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(236,51,51,1);
			opacity:1;
			
		}
		.kfTime{
			font-size:12px;
			margin-top:20rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(90,90,90,0.70);
			opacity:1;
		}
	}
	.footer-fix{
		/deep/.u-btn--default{
			
		}
	}
	.iconfont{
		font-size:14px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(68,68,68,1);
		opacity:1;
	}
	
</style>
