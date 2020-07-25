<template>
	<view class="container">
		<view class="item" v-for="(item, index) in dataList" :key='index' @tap='jumpTo(item.id)'>
			<view class="title">{{item.name}}</view>
			<view class="row">
				<view class="left">¥ {{item.price}}</view>
				<view class="right">{{item.owner}}</view>
			</view>
		</view>
		<uni-load-more :status="loadingStatus"></uni-load-more>
		
		<navigator url="./newProduct/newProduct" class="add-button" ><text class="iconfont text">&#xe654;</text></navigator>
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
				loadingStatus:'loading',
				// get请求参数
				params:{
					kw:'',
					tagid:'',
					sort:0,
					page:1,
					size:10
				},
				dataList:[],
			};
		},
		onPullDownRefresh() {
			this.params.page = 1;
			this.dataList = [];
			this.getDataList();
		},
		onReachBottom() {
			this.getDataList()
		},
		onShow() {
			this.getDataList()
		},
		methods:{
			getDataList(){
				// 如果page=1 且 数据列表有数据，说明数据已经请求完了，不再发起请求
				if(this.params.page === 1 && this.dataList.length > 0){
					return;
				}
				this.loadingStatus = 'loading'
				Service.productList(this.params).then(res =>{
					if(res.Flag){
						const _dataList = res.Content.List;
						const dataList = _dataList.map(item =>{
							// 拿到单位
							let _unit;
							if(item.Tags && item.Tags.length>0){
								_unit = item.Tags[0].ItemValue;
							}
							return {
								name:item.Name,
								price:item.Price + '/' + _unit,
								owner:item.Owner.Name,
								id:item.Id
							}
						})
						this.dataList = this.dataList.concat(dataList)
						// 判断数据是否没有了
						if(_dataList.length < this.params.size){
							this.loadingStatus = 'noMore'
							
						}else{
							this.loadingStatus = 'more'
							this.params.page++;
						}
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
					uni.stopPullDownRefresh()
				})
			},
			jumpTo(id){
				uni.navigateTo({
					url:'./productDetail/productDetail?productId='+id
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
	padding: 10upx 20upx;
	.item{
		padding: 20upx;
		color: $uni-text-color;
		background: #fff;
		border-bottom: 1px solid #eee;
		.title{
			font-size: $uni-font-size-lg;
			margin-bottom: 10upx;
		}
		.row{
			display: flex;
			justify-content: space-between;
			.left, .right{
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
