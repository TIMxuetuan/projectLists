<template>
	<view>
		<u-tabs class="tabs" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="container" v-for="(item,index) in dataList" :key="index">
			<view class="order" @click="jump()">
				<view class="order-title">
					<view class="order-text"><text class="icon-malls-fill"></text>{{item.text}}</view>
					<view class="order-status">{{item.status}}</view>
				</view>
				<view class="order-image">
					<view class="order-image-list">
						<image :src="data"  v-for="(data,index) in item.imageList" :key="index"></image>
					</view>
					<view class="order-detail">
						<view class="order-detail-money">￥{{item.money}}</view>
						<view class="order-detail-number">共{{item.number}}件</view>
					</view>
					<view class="icon-arrow-right"></view>
				</view>
				
				<view class="order-choice" v-if="item.type==1">
					<u-button class="custom-style" size="medium" @click="user_login">取消订单</u-button>
				</view>
				<view class="order-choice" v-if="item.type==2">
					<u-button class="custom-style" size="medium" @click="user_login">删除订单</u-button>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js'
	import Services from '../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				list: [
					{name: '全部',value:1}, 
					{name: '待付款',value:2}, 
					{name: '待发货',value:3}, 
					{name: '待收货',value:4}, 
					{name: '退款/售后',value:5},
					],
				current: 0,
				dataList:[
					{'text':'郑州金牛汽修厂','status':'待付款',imageList:['/static/img/imgIcon.png','/static/img/imgIcon.png','/static/img/imgIcon.png'],
					'number':3,'money':512.00,'type':1},
					{'text':'郑州金牛汽修厂','status':'交易关闭',imageList:['/static/img/imgIcon.png','/static/img/imgIcon.png','/static/img/imgIcon.png'],
					'number':3,'money':512.00,'type':2},
					{'text':'郑州金牛汽修厂','status':'待收货',imageList:['/static/img/imgIcon.png','/static/img/imgIcon.png','/static/img/imgIcon.png'],
					'number':3,'money':512.00,'type':3}
				]
			};
		},
		methods:{
			..._methods,
			change(index) {
				console.log(index,'index')
				this.current = index;
			},
			jump(e){
				console.log(e);
				uni.navigateTo({
					url:'/pages/order/orderDetailsRefund'
				})
			}
		},
		onShow(){
			Services.getOrder().then(res=>{
				console.log(res,'res')
			})
		}
	}
</script>

<style lang="scss">
	page{
		background-color:#f1f1f1;
	}
	.tabs{
		.u-tab-item{
			font-size:14px !important;
		}
	}
	.order{
		margin-top:20rpx;
		padding:30rpx 38rpx;
		background-color: #fff;
		border-radius:8rpx;
		&-title{
			display: flex;
			justify-content: space-between;
			font-size:14px;
			opacity:1;
		}
		&-text{
			font-weight:500;
			color:rgba(0,0,0,1);
			display: flex;
			align-items: center;
		}
		&-status{
			font-weight:400;
			color:rgba(239,116,77,1);
		}
		&-image{
			margin-top:30rpx;
			display: flex;
			align-items: center;
			image{
				width:130rpx;
				height:130rpx;
				margin-right:20rpx;
			}
		}
		&-detail{
			margin-left:110rpx;
			color:#000;
			text-align: right;
			opacity:1
		}
		&-detail-money{
			margin-top: 34rpx;
			color:rgba(0,0,0,1);
			opacity:1;
			font-size:14px;
		}
		&-detail-number{
			margin-top:10rpx;
			font-size:10px;
			font-weight:400;
			line-height:17px;
			color:rgba(90,90,90,0.70);
			
		}
		&-choice{
			margin-top: 30rpx;
			height:84rpx;
			line-height:84rpx;
			text-align: right;
			.custom-style{
				/deep/.u-size-medium{
					width:170rpx;
					height:60rpx;
					border-radius: 10rpx;
					font-size:14px;
					font-weight:400;
					opacity:1;
					color:rgba(68,68,68,1);
				}
				/deep/.u-hairline-border::after{
					border:1px solid rgba(90,90,90,0.5);
				}
			}
			
		}
	}
	

		
	.icon-malls-fill{
		font-size:14px;
		margin-right:10rpx;
	}
	.icon-arrow{
		font-size:18px;
		margin-left:20rpx;
	}
	
</style>
