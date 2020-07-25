<template>
	<view class="container">
		<view class="content" v-if="showView">
			<view class="item" v-for="(item, index) in dataArray" :key='index'>
				<view class="left">{{item.Date}}</view>
				<view class="right">
					<view class="icon-box">
						<text class="iconfont" v-if="item.Icon == 28">&#xe64e;</text>
						<text class="iconfont" v-else>&#xe654;</text>
					</view>
					<view class="msg">
						<view class="m-time">{{item.Time}}</view>
						<view class="m-content">{{item.Content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="loading"><text @tap="loadMore">{{loadingText}}</text></view>
	</view>
</template>

<script>
import Services from '@/services/task.js';
import {_data, _methods} from '@/common/public.js';
import util from '@/common/util.js';
let timer = null;
export default{
	data(){
		return {
			..._data,
			taskId:'',
			dataArray:[],
			nodata:false,
			showView:true,
			loadingText:'加载中...'
		}
	},
	onLoad(option) {	
		this.taskId = option.taskId;
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		let self = this;
		this.getDataList();
		
	},
	// 只有内容超出页面高度时，才能触发
	onReachBottom(){
		this.getMoreDataList();
	},
	methods: {
		getDataList() {
			this.page = 1;
			Services.taskDynamic(this.page,{
				id:this.taskId
			}).then(res =>{
				this.page++;	//页码加一
				let _dataArray = res.Content;
				_dataArray.forEach((item, i)=>{
					item.Content = item.Content.replace(/(@team#)/g,'');
					item.Date = this.dateFormat(item.DateTime, true);
					item.Time = this.dateFormat(item.DateTime, false);
				})
				this.dataArray = _dataArray;
				uni.stopPullDownRefresh();
				this.loadingText = '加载更多';
			})
		},
		// 加载更多数据
		getMoreDataList(){
			// 判断，如果数据加载完成，直接返回，不会再发起请求
			if(this.loadingText != '' && this.loadingText != '加载更多'){
				return false;
			}
			let self = this;
			
			Services.taskDynamic(this.page,{
				id:this.taskId
			}).then(res =>{
				// 加载到数据
				this.loadingText = '';
				if(res.Content.length === 0){
					  self.loadingText = '已加载全部';
					  return false;
				 }
				this.page++;
				// 加工数据
				let _dataArray = res.Content;
				_dataArray.forEach((item, i)=>{
					item.Content = item.Content.replace(/(@team#)/g,'');
					item.Date = this.dateFormat(item.DateTime, true);
					item.Time = this.dateFormat(item.DateTime, false);
				})
				
				this.dataArray = this.dataArray.concat(_dataArray);
				this.loadingText = '加载更多';
			})
		},
		// srcDate 源日期， 
		dateFormat(srcDate, isDate){
			// 可以返回两种时间格式  一 08/12 周一  二 09:21
			srcDate = srcDate.split('.')[0];			
			let date = new Date(srcDate);
			let weeks = ['周日','周一','周二','周三','周四','周五','周六']
			let week = date.getDay();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let hour = date.getHours();
			let minute = date.getMinutes();
			month = month < 10 ? '0'+month :month;
			day = day < 10 ? '0'+day :day;
			hour = hour < 10 ? '0'+hour :hour;
			minute = minute < 10 ? '0'+minute :minute;
			if(isDate){
				return month + '/' + day + ' ' + weeks[week];
			}else{
				return hour + ':' + minute;
			}
		},
		loadMore(){
			this.getMoreDataList();
		}
	},
}
</script>

<style lang="scss">
	.content{
		background-color: #fff;
		padding:30upx 20upx 0 20upx;
		border-bottom: 1px solid #eee;
	}
	.loading{
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
	.item{
		width: 100%;
		display: flex;
		color: #999;
		.left{
			flex: 1;
			font-size: 28upx;
			padding: 0 50upx 0 20upx;
		}
		.right{
			flex: 5;
			box-sizing: border-box;
			position: relative;
			border-left: 1px solid #ccc;
			padding: 0 20upx 50upx 50upx;
			.icon-box{
				position: absolute;
				left: -20upx;
				top: 20upx;
				width: 40upx;
				height: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20upx;
				background: #2e87c1;
				.iconfont{
					color: #fff;
					font-size: 20upx;
				}
			}
			.msg{
				width: 450upx;
				border: 1px solid #eee;
				background: #f5f5f5;
				padding: 10upx;
				border-radius: 10upx;
				
				.m-time{
					margin-bottom: 8upx;
					font-size: 28upx;
				}
				.m-content{
					font-size: 28upx;
					word-wrap:break-word;
				}
			}
		}
	}
</style>
