<template>
	<view class="container">
		<!-- top -->
		<view class="top-tabbar" >
			<view class="item" :class="{item_acitve:isTopTap==item.type}"  v-for="(item, index) in topList" :key='index' @tap='topTabbar(item.type)'>
				{{item.title}}
			</view>
		</view>
		
		<!-- 内容区域 -->
		<scroll-view scroll-y="true" class="content" :style="{ height: scrollHeight + 'px' }"  @scrolltolower='scrollBottom'>
			<view class="item" v-for="(item, index) in dataArray" :key='index' @tap="toDetail(item)">
				
				<view class="left">
					<view class="level" :style="{color:levelColor[item.Level - 1]}">{{levelTitle[item.Level - 1]}}</view>
					
				</view>
				<view class="center">
					<view class="title"><text v-if="item.Type === 1" class="badge">团</text>{{item.Content}}</view>
					<view class="time"><text class='iconfont'>&#xe664;</text><text>{{item.DateTime}}-{{item.EndTime}}</text></view>
				</view>
				<view class="right">
					<progressBar :progresstext='item.Progress' size='40px'></progressBar>
				</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</scroll-view>
		
		<!-- 底部tabbar -->
		<view class="tabbar" v-if="showTabbar">
			<view class="today" @tap="tabbarBtn('left')">
				<text class="iconfont text" :style="{ color: isTap ? '#2e87c1' : '#808080' }">&#xe62b;</text>
				<text :style="{ color: isTap ? '#2e87c1' : '#808080' }">今日工作</text>
			</view>
			<view class="future" @tap="tabbarBtn('right')">
				<text class="iconfont text" :style="{ color: isTap? '#808080' : '#2e87c1' }">&#xe630;</text>
				<text :style="{ color: isTap ? '#808080' : '#2e87c1'}">未来工作</text>
			</view>
		</view>
		<view class="addTask" @tap="addTask"><text class="iconfont text">&#xe654;</text></view>

	</view>
</template>

<script>
	import Services from '@/services/task.js';
	import util from '@/common/util.js';
	import {_data, _methods} from '@/common/public.js';
	import progressBar from '@/components/progressBar/ProgressBar.vue';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	let timer;
	export default{
		components:{
			progressBar,
			uniLoadMore
		},
		data() {
			return {
				..._data,
				// popup弹出层选项列表
				topList: [
					{title: '待办', iconfont: '&#xe631;', type: 1 },
					{title: '暂停', iconfont: '&#xe635;', type: 2 },
					{title: '完成', iconfont: '&#xe632;', type: 3 },
					{title: '存档', iconfont: '&#xe634;', type: 4 },
					{title: '监督', iconfont: '&#xe633;', type: 5 }
				],
				levelColor: ['#cccccc', '#0000ff', '#ffe348', '#ff0000'],
				levelTitle: ['Iv', 'III', 'II', 'I'],
				model:{id: 1, title: '待办任务', iconfont: '&#xe631;', type: 1 },
				isTopTap:1,
				scrollHeight:'', //给scroll-view设置一个固定高度
				isTap:true, //tabbar 判断是否选中状态
				dataArray:[], //存储页面要显示数据
				showTabbar:true,
				startDate:'',
				dataDec:'加载更多数据',
				loadingStatus:'more',
			}
		},
		onLoad(){
			
			this.isTap = true;
			// this.getBackLogData();
			this.userInfo = this.getUserInfo();
			
			this.scrollHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(190);		
		},
		onShow(){
			this.startDate = this.getDay(0);
			this.init();

			this.isTopTap == 1?this.getBackLogData():this.getTaskData();
		},
		onUnload(){
			timer = null;
		},
		methods:{
			..._methods,
			formatTime(date){
				if(date){
					let _date = date.split('T')[0];
					let sDate = _date.split('-');
					let result = parseInt(sDate[1]) + '月' +parseInt(sDate[2]) +'日';
					return result;
				}else{
					return ' ';
				}
			},
			// days为正，在今天的基础上加几天，days为负，在今天的基础上减几天 days 为0 今天
			getDay(days){
				let number = (new Date()).getTime() + days*24*60*60*1000;
				let date = util.formatTime(number,'Y-M-D');
				return date;
			},
			topTabbar(type){
				this.isTopTap = type;
			},
			tabbarBtn(option){
				if(option == 'left'){
					this.isTap = true;
					this.init();
					this.getBackLogData();
				}else{
					this.isTap = false;
					this.init();
					this.getBackLogData(); //true 获取未来任务
				}
			},
			// 初始化请求参数
			init(){
				this.page = 1;
				this.pageSize = 10;
				this.loadingStatus = 'loading';
				this.dataArray = [];
			},
			// 获取待办任务数据
			getBackLogData(){
				if(this.loadingStatus === 'noMore'){
					return;
				}
				// 判断是今日任务，还是未来任务
				this.startDate = this.isTap ?this.getDay(0):this.getDay(1);
				Services.backLogTask(this.page,this.pageSize,{
					startDate:this.startDate,
					member:this.userInfo.Id
				}).then(res =>{
					if(res.Flag){	
						
						// 数据格式化
						res.Content.forEach((item)=>{
							item.DateTime = this.formatTime(item.DateTime);
							item.EndTime = this.formatTime(item.EndTime);
						})
						this.dataArray = this.dataArray.concat(res.Content);
						this.page++ ;
						
						if(res.Content.length === 0 || res.Content.length < this.pageSize){
							this.loadingStatus = 'noMore'
						}else{
							this.loadingStatus = 'more'
						}
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
				})
			},
			// 获取其他任务数据
			getTaskData(){
		
				if(this.loadingStatus === 'noMore'){
					return;
				}
				Services.getTaskData({
					start:this.getDay(-3),
					end:this.getDay(7),
					state:this.isTopTap,
					size:this.pageSize,
					page:this.page
				}).then(res =>{
					uni.hideLoading()
					if(res.Flag){
						console.log(this.page)
						// 数据格式化
						res.Content.forEach((item)=>{
							item.DateTime = this.formatTime(item.DateTime);
							item.EndTime = this.formatTime(item.EndTime);
						})
						this.dataArray = this.dataArray.concat(res.Content);
						this.page++ ;
						
						if(res.Content.length === 0 || res.Content.length < this.pageSize){
							this.loadingStatus = 'noMore'
						}else{
							this.loadingStatus = 'more'
						}
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
				})
			},
			scrollBottom(){
				if(this.dataDec !== ('没有更多数据了' || '暂无数据')){
					this.isTopTap == 1?this.getBackLogData():this.getTaskData();
				}
				console.log('滚动',this.scrollHeight)
			},
			addTask(){
				uni.navigateTo({
					url:'./addTask/addTask'
				})
			},
			toDetail(e){
				let taskId = e.Id;
				uni.navigateTo({
					url:`./taskDetail/taskDetail?taskId=${taskId}`
				})
			}
		},
		watch:{
			// 监听顶部导航发生改变时
			isTopTap(val){
				if(val == 1){
					this.showTabbar = true;
					this.scrollHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(190);
					this.isTap = true;
					this.init();
					this.getBackLogData();
				}else{
					this.showTabbar = false;
					this.scrollHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(90);
					this.init();
					this.getTaskData();
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background: $uni-bg-color-grey;
		.top-tabbar{
			height: 90upx;
			background: #fff;
			border-bottom: 1px solid $uni-border-color-gray;
			@include custom-flex;
			justify-content: space-around;
			align-items: center;
			.item{
				color: #B7B7B7;
				font-size: $uni-font-size-lg;
				padding:15upx;
			}
			.item_acitve{
				color: $uni-text-color-blue;		
				border-bottom:1px solid $uni-text-color-blue;
			}
		}
		
		// 底部
		.tabbar{
			position: fixed;
			left: 0;
			bottom: 0;
			height: 100upx;
			width: 100vw;
			background: #fff;
			border-top: 1px solid $uni-border-color-gray;
			display: flex;
			align-items: center;
			.today,
			.future{
				flex:1;
				height: 80%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32upx;
				.iconfont{
					font-size: 36upx;
				}
				.text{
					margin-right: 15upx;
				}
			}
			.today{
				border-right: 1px solid #ebebeb;
			}
		}
		.content{
			padding: 10upx 20upx;
			box-sizing: border-box;
			.item{
				background: #fff;
				border-radius: 10upx;
				height: 150upx;
				margin-bottom: 20upx;
				// border: 1px solid $uni-border-color-gray;
				
				display: flex;
				align-items: center;
				padding: 10upx;
				box-sizing: border-box;
				overflow: hidden;
				.left{
					flex: 1;
	
					.level{
						padding: 20upx;
						width: 50upx;
						height: 50upx;
						border-radius: 50%;
						font-size: 48upx;
						@include custom-flex(center,center,row,no-wrap);
					}
				}
				.center{
					flex: 4;
					overflow: hidden;
					.title{
						font-size: $uni-font-size-lg;
						font-weight: bold;
						color: $uni-text-color;
						margin-bottom: $uni-spacing-col-base;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						.badge{
							font-size: $uni-font-size-sm;
							padding: 5upx;
							border-radius: 10upx;
							background: $uni-text-color-blue;
							color: #fff;
							overflow: hidden;
							margin-right: 10upx;
						}
					}
					.time{
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
						.iconfont{
							font-size: $uni-font-size-sm;
							color: $uni-text-color-grey;
							margin-right: 7upx;
						}
					}
					
				}
				.right{
					flex: 1;
					@include custom-flex(center,center,row,no-wrap);
				}
				
			}
			.data-dec{
				height: 100upx;
				font-size: $uni-font-size-sm;
				color: #8a8a8a;
				@include custom-flex(center,center,row,no-wrap);
			}
		}
	}
	
	
	.addTask {
		background: $uni-text-color-blue;
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
		position: fixed;
		bottom: 130upx;
		right: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 87;
		.text {
			color: #ffffff;
			font-size: 40upx;
		}
	}
	
	
	
	
</style>
