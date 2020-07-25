<template>
	<view class="chance">
		<scroll-view id="tab-bar" class="menu" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation='true' :scroll-into-view="scrollInto">
			<view  class="uni-tab-item" v-for="(item, index) in tabBars" :key='item.id' :id='item.id' @tap="ontabtap(item, index)">
				<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active': '']">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="content">
			
			<view class="chance-item" v-for="(item, index) in dataList" :key='index' @tap='toDetail(item.Id)'>
				<view class="top">
					<view class="top1">
						<view class="title" >{{item.Name}}</view>
						<view class="tag">
							<uni-tag :text="item.Stage.Name" type='primary' :circle="true" size="small"></uni-tag>
						</view>
					</view>
					<view class="top2"><view class="date">{{item.CreateDate}}</view></view>
				</view>
				<view class="chance-content">
					<view>销售金额：￥{{item.Price}}</view>
					<view>客户：{{item.Cust.Name}}</view>
					<view>预计签单日期：{{item.EstDate}}</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
		<navigator url="./newChance/newChance" class="addCustomer" ><text class="iconfont text">&#xe654;</text></navigator>

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
					name: '我的机会',
					type:2
				}, {
					id: "tab03",
					name: '下属机会',
					type:3
				}, {
					id: "tab04",
					name: '我审核的机会',
					type:4
				}, {
					id: "tab05",
					name: '作废的机会',
					type:5
				}],
				scrollInto:'',
				tabIndex:1,
				dataList:[],
				loadingStatus:'more',
				chance:{
					kind:2, // 客户类型（默认等于2）， 1：我关注的，2：我的机会，3：下属机会，4：我审核的机会，5：作废的机会
					kw:'', // 搜索值 ，不做搜索时，等于空
					lowers:'',  //无（默认为空）
					stage:'',
					startdate:'',
					enddate:'',
					sort: 0,   //筛选条件（默认等于0
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
				this.chance.kind = item.type;
				this.init();
				this.getData();
			},
			// page == 1 时，请求要初始化
			init(){
				this.chance.page = 1;  //请求的页数为第一页
				// loading提示
				this.loadingStatus = 'loading'
			},
			getData(){
				
				// 如果是第一页，清空数据列表
				if(this.chance.page === 1){
					this.dataList = [];  
				}
				Service.getChance(this.chance).then(res =>{
					if(res.Flag){
						const _data = res.Content.List
						this.dataList = this.dataList.concat(_data);
						this.chance.page++ ;
						
						if(res.Content.List.length === 0 || res.Content.List.length < this.chance.size){
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
			
			toDetail(chanceId){
				uni.navigateTo({
					url: `./chanceDetail/chanceDetail?chanceId=${chanceId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.chance {
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
			
			.chance-item{
				padding: 10upx 20upx;
				background: #FFFFFF;
				border-radius: 10upx;
				margin-bottom: 20upx;
				.top{
					margin-bottom: 30upx;
					.top1{
						display: flex;
						justify-content: space-between;
						.title{
							flex: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: $uni-font-size-lg;
						}
					}
					.top2{
						.date{
							color: $uni-text-color-grey;
							font-size: $uni-font-size-sm;
						}
					}
				}
				.chance-content{
					font-size: $uni-font-size-sm;
					line-height: 1.5em;
					color: #666;
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
