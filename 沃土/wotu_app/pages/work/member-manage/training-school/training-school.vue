<template>
	<view class="content">
		<view class="nav">
			<view :class="{cur:type == 0}" @tap="tabClick(0)">内部培训</view>
			<view :class="{cur:type == 1}" @tap="tabClick(1)">外部培训</view>
		</view>
		
		<view class="swiper-wrap">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<block v-for="(item, index) in swiperList" :key='index'>
					<swiper-item>
						<image :src="item.ImgUrl" mode="widthFix"></image>
					</swiper-item>
				</block>
				
			</swiper>
		</view>
		
		<view class="course-wrap">
			<view class="title">培训课程</view>
			<view class="course-content">
				<view class="item" v-for="(item, index) in dataList" :key='index'>
					<view class="left">
						<image :src="item.url" mode="aspectFill"></image>
					</view>
					<view class="center">
						<view class="course-name">{{item.name}}</view>
						<view class="training-obj">培训对象: {{item.trainingObject}}</view>
						<view class="brief">{{item.brief}}</view>
						<view class="date" v-if="item.date && item.state == 1">时间: {{item.date}}</view>
					</view>
					<view class="right">
						<view class="course-type">{{typeList[item.type - 1]}}</view>
						<view class="teacher">{{item.teacher}}</view>
						<view class="course-state">{{item.state == 0?'报名':'已报名'}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- ******************** -->
		<uni-popup ref='uniPopup'  type="top">
			<view class="popup-wrap">
				<view @click="addtrain">新增培训</view>
				<view @click="notes">我的笔记</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				type:0,
				swiperList:[
					{ImgUrl:'../../../../static/img/img1.gif'},
					{ImgUrl:'../../../../static/img/img2.jpg'},
				],
				dataList:[
					{name:'uni-app实战',trainingObject:'生产部',date:'',teacher:'王教授',brief:'学完本次课程，你就无敌了，你就是大牛',state:0,type:1,url:'http://img3.imgtn.bdimg.com/it/u=1370306076,3955339075&fm=26&gp=0.jpg'},
					{name:'uni-app实战',trainingObject:'研发部',date:'',teacher:'张教授',brief:'学完本次课程，你就无敌了，你就是大牛',state:0,type:2,url:'http://img3.imgtn.bdimg.com/it/u=1370306076,3955339075&fm=26&gp=0.jpg'},
					{name:'uni-app实战',trainingObject:'研发部前端开发人员',date:'2019-09-25',teacher:'李经理',brief:'学完本次课程，你就无敌了，你就是大牛,学完本次课程，你就无敌了，你就是大牛',state:1,type:3,url:'http://img3.imgtn.bdimg.com/it/u=1370306076,3955339075&fm=26&gp=0.jpg'}
				],
				typeList:['资料','视频','讲座']
			};
		},
		methods:{
			tabClick(type){
				this.type = type;
			},
			// 我的笔记
			notes(){
				uni.navigateTo({
					url:'./note/note'
				})
			},
			// 新增培训
			addtrain(){
				uni.navigateTo({
					url:'./add-train/add-train'
				})
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.uniPopup.open();
		}
	}
</script>

<style lang="scss">
	.content{
		.nav{
			display: flex;
			height: 90upx;
			padding: 0 20upx;
			justify-content: space-between;
			align-items: center;
			font-size: 34upx;
			view{
				width: 40%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.cur{
				color: #09B8F2;
				border-bottom: 1px solid #09B8F2;
			}
		}
		
		.swiper-wrap{
			margin-top: 20upx;
			.swiper-item{
				height: 100%;
			}
			image{
				width: 100%;
			}
		}
		
		.course-wrap{
			.title{
				font-size: 32upx;
				padding: 20upx 30upx;
			}
			.course-content{
				font-size: 24upx;
				.item{
					min-height: 150upx;
					padding: 20upx;
					border-bottom: 1px solid #ddd;
					display: flex;
					.left{
						width: 25%;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.center{
						width: 60%;
						padding: 0 20upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						view{
							margin: 4upx 0;
						}
						.course-name{
							font-size: 32upx;
						}
						.brief, .date{
							color: #aaa;
						}
						.brief{
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
					.right{
						width: 15%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.course-type{
							padding: 8upx;
							border: 1px solid #09B8F2;
							color: #09B8F2;
							border-radius: 10upx;
							text-align: center;
						}
						.teacher{
							font-size: 28upx;
						}
						.course-state{
							padding: 6upx 10upx;
							border-radius: 10upx;
							background: #09B8F2;
							color: #fff;
							text-align: center;
						}
					}
				}
			}	
		}
		.uni-popup__wrapper-box{
			padding: 0 !important;
		}
		.popup-wrap{
			// background: #2FA3DA;
			view{
				padding: 20upx 0;
				font-size: 32upx;
				border-bottom: 1px solid #ddd;
			}
		}
	}
</style>
