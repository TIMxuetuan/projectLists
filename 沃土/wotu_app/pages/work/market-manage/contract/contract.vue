<template>
	<view class="contract">
		<scroll-view id="tab-bar" class="menu" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation='true' :scroll-into-view="scrollInto">
			<view  class="uni-tab-item" v-for="(item, index) in tabBars" :key='item.id' :id='item.id' @tap="ontabtap(item, index)">
				<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active': '']">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="content">
			
			<view class="contract-item" v-for="(item, index) in dataList" :key="index" @tap='toDetail(item.Id)'>
				<view class="row">
					<view class="title">{{item.Name}}</view>
					<view class="price">￥{{item.Price}}</view>
				</view>
				<view class="row">
					<view class="date">{{item.EndDate}}</view>
					<view class="state">{{item.State}}</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
		<navigator url="./newContract/newContract" class="addCustomer" ><text class="iconfont text">&#xe654;</text></navigator>

	</view>
</template>

<script>

	// import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import Service from '@/services/crm.js'
	import _config from '@/config.js'
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
					name: '我负责或我参与的',
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
				contract:{
					kind:2, // 客户类型（默认等于2）， 1：我关注的，2：我负责或我参与的，3：我下属负责或参与的
					kw:'', // 搜索值 ，不做搜索时，等于空
					lowers:'',  //无（默认为空）   //筛选条件（默认等于0
					page:1,
					size: 10,
				}
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.init();
			this.getData();
		},
		// 上拉刷新
		onReachBottom(){
			this.loadingStatus = 'loading'
			this.getData();
		},
		methods:{
			ontabtap(item, index){
				this.scrollInto = item.id;
				this.tabIndex = index;
				this.contract.kind = item.type;
				this.init();
				this.getData();
			},
			// page == 1 时，请求要初始化
			init(){
				this.contract.page = 1;  //请求的页数为第一页
				// loading提示
				this.loadingStatus = 'loading'
			},
			getData(){
				
				// 如果是第一页，清空数据列表
				if(this.contract.page === 1){
					this.dataList = [];  
				}
				Service.getContract(this.contract).then(res =>{
					if(res.Flag){
						const _data = res.Content.List
						this.dataList = this.dataList.concat(_data);
						this.contract.page++ ;
						
						if(res.Content.List.length === 0 || res.Content.List.length < this.contract.size){
							this.loadingStatus = 'noMore';
						}else{
							this.loadingStatus = 'more';
						}
					}else{
						uni.showToast({
							title:'请求数据失败',
							icon:'none'
						})
					}
					
				})
			},
			toDetail(contractId){
				uni.navigateTo({
					url: `./contractDetail/contractDetail?contractId=${contractId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.contract {
		width: 100%;
		min-height: 100vh;
		background: $uni-bg-color-grey;
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
			width: 100%;
			padding: 10upx 20upx;
			box-sizing: border-box;
			&:before{
				content: '';
				display: block;
				height: 100upx;
			}
			.contract-item{
				padding:20upx;
				background: #FFFFFF;
				border-radius: 10upx;
				margin-bottom: 20upx;
				.row{
					display: flex;
					justify-content: space-between;
					align-items: center;
					&:first-child{
						margin-bottom: 10upx;
					}
					.title{
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: $uni-font-size-lg;
						
					}
					.price{
						font-size: $uni-font-size-base;
						color: $uni-text-color-grey;
					}
					.state, .date{
						
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
				}
				
			}
		}
	}
	
	.menu-block{

		border-bottom: 1px solid #eee;

		padding: 10upx 0;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		.menu-item{
			padding: 20upx 0;
			width: 100%;
			.iconfont{
				font-size: $uni-font-size-base;
				color: $uni-text-color-blue;
				margin-left: 50upx;
			}
		}
	}
	.addCustomer {
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
