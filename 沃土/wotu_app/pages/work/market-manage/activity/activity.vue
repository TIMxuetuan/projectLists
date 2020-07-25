<template>
	<view class="container">
		<scroll-view id="tab-bar" class="menu" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation='true' :scroll-into-view="scrollInto">
			<view  class="uni-tab-item" v-for="(item, index) in tabBars" :key='item.id' :id='item.id' @tap="ontabtap(item, index)">
				<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active': '']">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="content">
			<view class="item" v-for="(item, index) in dataList" :key="index" @tap='jumpTo(item.Id)'>
				<view class="title">{{item.Name}}</view>
				<view class="state">{{item.State}}</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
		<!-- 新建按钮 -->
		<navigator url="./newActivity/newActivity" class="add-button" ><text class="iconfont text">&#xe654;</text></navigator>
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				tabBars: [{
					id: "tab01",
					name: '我关注的',
					type:1   //type值对应的，不能错
				}, {
					id: "tab02",
					name: '我负责或参与的',
					type:2
				}, {
					id: "tab03",
					name: '我下属负责或参与的',
					type:3
				}],
				scrollInto:'',
				tabIndex:1,
				dataList:[],
				loadingStatus:'more',
				// 发送请求的参数
				params:{
					kind:2, //客户类型（默认等于2）， 1：我关注的，2：我负责或我参与的，3：我下属负责或参与的
					kw:'',
					page:1,
					size:10,
					lowers:''
				}
			};
		},
		onShow() {
			this.dataList = [];
			this.params.page = 1;
			this.getDataList();
		},
		// 上拉刷新
		onReachBottom(){
			console.log(11)
			this.getDataList();
		},
		methods:{
			ontabtap(item, index){
				this.scrollInto = item.id;
				this.tabIndex = index;
				this.params.kind = item.type;
				// 切换类型，dataList要清空，页数也要从1开始
				this.dataList = [];
				this.params.page = 1;
				this.getDataList()
			},
			getDataList(){
				// 请求时，开启loading
				this.loadingStatus = 'loading'
				Service.activity(this.params).then(res =>{
					if(res.Flag){
						
						const _data = res.Content.List;
						this.dataList = this.dataList.concat(_data);
						this.params.page++;
						// 请求成功，判断数据是否请求完了
						if(res.Content.List.length < this.params.size){
						
							this.loadingStatus = 'noMore';
						}else{
						
							this.loadingStatus = 'more';							
						}
					}else{
						uni.showToast({
							title:'请检查网络连接',
							icon:'none'
						})
					}
				})
			},
			jumpTo(actId){
				uni.navigateTo({
					url:'./activityDetail/activityDetail?actId='+actId
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}
.container{
	box-sizing: border-box;
	min-height: 100vh;
	.menu{
		white-space: nowrap;
		height: 100upx;
		background: #fff;
		border-bottom: 1px solid #eee;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		view{
			display: inline-block;
			padding: 0 20upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 36upx;
			.uni-tab-item-title {
				color: #333;
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
				flex-wrap: nowrap;
				/* #ifndef APP-PLUS */
				white-space: nowrap;
				/* #endif */
			}
			.uni-tab-item-title-active {
				color: #007AFF;
			}
		}
	}
	.content{
		padding:0 20upx;
		margin-top: 100upx;
		.item{
			background: #FFFFFF;
			padding: 20upx;
			margin-bottom: 20upx;
			color: $uni-text-color;
			.title{
				font-size: $uni-font-size-lg;	
				line-height: 2em;
			}
			.state{
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
		}
	}
	// 新建按钮
	.add-button {
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
}
</style>
