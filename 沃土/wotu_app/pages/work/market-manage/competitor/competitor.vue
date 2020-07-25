<template>
	<view class="container">
		<view class="item" v-for="(item, index) in dataList" :key="index" @tap='jumpTo(item.id)'>
			<view class="title">{{item.name}}</view>
			<view class="tag">{{item.tag}}</view>
		</view>
		<uni-load-more :status="loadingStatus"></uni-load-more>
		<!-- 新建按钮 -->
		<navigator url="./newCompetitor/newCompetitor" class="add-button" ><text class="iconfont text">&#xe654;</text></navigator>
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
				dataList:[],
				loadingStatus:'more',
				// 发送请求的参数
				params:{
					kw:'',
					page:1,
					size:10,
					tagid:'',
					sort:0
				}
			};
		},
		onShow() {
			this.params.page = 1;
			this.dataList = [];
			this.getDataList()
		},
		// 上拉刷新
		onReachBottom(){
			this.getDataList();
		},
		methods:{
			getDataList(){

				// 请求时，开启loading
				this.loadingStatus = 'loading'
				Service.competitor(this.params).then(res =>{
					if(res.Flag){
						
						const _data = res.Content.List.map(item =>{
							let _tag;
							if(item.Tags.length>1){
								_tag = item.Tags[1].ItemValue;
							}
							return {
								name:item.Name,
								tag: _tag || '--',
								id:item.Id
							}
						});
						this.dataList = this.dataList.concat(_data);
						this.params.page++;
						// 请求成功，判断数据是否请求完了
						if(res.Content.List.length === 0 || res.Content.List.length < this.params.size){
							// 如果已经请求完了，数据加载的状态设置为'已加载全部数据'
							this.loadingStatus = 'noMore';
						}else{
							// 如果没有请求完，数据加载的状态设置为'加载更多数据'
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
			jumpTo(id){
				uni.navigateTo({
					url:'./competitorDetail/competitorDetail?competitorId='+id
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
	padding: 20upx;
	.item{
		background: #FFFFFF;
		padding: 20upx;
		border-radius: 10upx;
		margin-bottom: 20upx;
		color: $uni-text-color;
		.title{
			font-size: $uni-font-size-lg;	
			line-height: 2em;
		}
		.tag{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
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
