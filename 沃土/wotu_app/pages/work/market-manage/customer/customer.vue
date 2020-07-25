<template>
	<view class="customer">
		<scroll-view id="tab-bar" class="menu" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation='true' :scroll-into-view="scrollInto">
			<view  class="uni-tab-item" v-for="(item, index) in tabBars" :key='item.id' :id='item.id' @tap="ontabtap(item, index)">
				<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active': '']">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="content">
			<!-- <view class="search-wrap">
				<view class="search">
					<text class="iconfont">&#xe628;</text>
					<input type="text" v-model="search" placeholder="请输入搜索内容" />
				</view>
				<view class="search-btn">搜索</view>
			</view> -->
			<uni-search-bar @confirm="search" @input="input" @cancel='cancel' />
			<view class="item" v-for='(item, index) in dataList' :key='index' @tap="toDetail(item.id)">
				<view class="company">{{item.name}}</view>
				<view class="state">{{item.state}}</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
		<navigator url="./newCustomer/newCustomer" class="addCustomer" ><text class="iconfont text">&#xe654;</text></navigator>
		<!-- uni-popup -->
		<uni-popup2 ref="popup" type="top">
			<view class="menu-block">
				<view class="menu-item" @click="cFilter('sort',0)">按更新时间<text v-show="customer.sort === 0" class="iconfont">&#xe6b4;</text></view>
				<view class="menu-item" @click="cFilter('sort',1)">按创建时间<text v-show="customer.sort === 1" class="iconfont">&#xe6b4;</text></view>
				<view class="menu-item" @click="cFilter('sort',2)">按公司名称<text v-show="customer.sort === 2" class="iconfont">&#xe6b4;</text></view>
			</view>
			<view style="font-size: 32upx; margin-top: 10upx;">客户筛选</view>
			<scroll-view scroll-y="true" class="menu-block scroll-height">
				<view class="menu-item" @click="cFilter('tagids','')">全部客户<text v-show="customer.tagids === ''" class="iconfont">&#xe6b4;</text></view>
				<view class="menu-item" v-for="(item, index) in stateTagList" :key="index" @click="cFilter('tagids',item.Id)">{{item.Name}}<text v-show="customer.tagids === item.Id" class="iconfont">&#xe6b4;</text></view>	
			</scroll-view>
		</uni-popup2>

	</view>
</template>

<script>

	import uniPopup2 from "@/components/uni-popup2.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import Service from '@/services/crm.js'
	export default {
		components:{
			uniPopup2,
			uniSearchBar,
			uniLoadMore
		},
		data() {
			return {
				tabBars: [{
					id: "tab01",
					name: '我负责或参与的',
					type:2   //type值对应的，不能错
				}, {
					id: "tab02",
					name: '公海客户',
					type:4
				}, {
					id: "tab03",
					name: '我关注的',
					type:1
				}, {
					id: "tab04",
					name: '我下属负责或参与的',
					type:3
				}],
				scrollInto:'',
				tabIndex:0,
				dataList:[],
				loadingStatus:'more',
				customer:{
					kind:2, // 客户类型（默认等于2）， 1：我关注的，2：我负责或参与的，3：我下属负责或参与的，4：公海客户
					kw:'', // 搜索值 ，不做搜索时，等于空
					tagids:'',  //筛选客户（默认等于空）：示例：tagids=5571077f2f749a2738b1d600（客户标签中获取）
					sort: 0,   //筛选条件（默认等于0）：0：按更新时间，1：按创建时间，2：按公司名称
					page:1,
					size: 10,
				},
				stateTagList:[]
			};
		},
		onLoad() {
			
			this.getTags();
		},
		onShow() {
			this.init();
			this.getData();
		},
		onNavigationBarButtonTap() {
			this.$refs.popup.open();
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
				this.customer.kind = item.type;
				this.customer.sort = 0;
				this.customer.tagids = '';
				this.init();
				this.getData();
			},
			// page == 1 时，请求要初始化
			init(){
				this.customer.page = 1;  //请求的页数为第一页
				// loading提示
				this.loadingStatus = 'loading'
			},
			getData(){
				
				// 如果是第一页，情况数据列表
				if(this.customer.page === 1){
					this.dataList = [];  
				}
				Service.customer(this.customer).then(res =>{
					if(res.Flag){
						
						const _data = res.Content.List.map((item)=>{
							return {
								name:item.Name,
								state:item.State.Name,
								id:item.Id
							}
						})
						this.dataList = this.dataList.concat(_data);
						this.customer.page++ ;
						
						if(res.Content.List.length === 0 || res.Content.List.length < this.customer.size){
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
			getTags(){
				Service.customerTag({
					type:1
				}).then(res =>{
					if(res.Flag){
						this.stateTagList = res.Content[0].Items;
						// 存入本地,其他页面直接用,不用再做请求
						uni.setStorageSync('customer_state_tags',JSON.stringify(res.Content[0]))
						uni.setStorageSync('customer_level_tags',JSON.stringify(res.Content[1]))
					}
				})
			},
			search(e){
				this.customer.kw = e.value;
				this.init();
				this.getData();
				console.log(JSON.stringify(this.customer))
			},
			input(e){
				
			},
			cancel(){
				this.customer.kw = '';
				this.init();
				this.getData();
			},
			cFilter(type, id){
				// 分类筛选
				if(type === 'sort'){
					this.customer.sort = id;
				}
				// 客户筛选
				if(type === 'tagids'){
					this.customer.tagids = id;
				}
				this.init();
				this.getData();
				this.$refs.popup.close();
			},
			toDetail(customerId){
				console.log(customerId);
				uni.navigateTo({
					url: `./customerDetail/customerDetail?customerId=${customerId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.customer {
		width: 100%;
		min-height: 100vh;
		overflow: auto;
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
			margin-top: 100upx;
			// .search-wrap{
			// 	display: flex;
			// 	align-items: center;
			// 	font-size: $uni-font-size-base;
			// 	height: 80upx;
			// 	.search{
			// 		flex: 1;
			// 		background: yellow;
			// 		display: flex;
			// 		align-items: center;
			// 		justify-content: center;
			// 		background: #EDEAE9;
			// 		border-radius: 10upx;
			// 		input{
			// 			flex: 1;
						
			// 		}
			// 		.iconfont{
			// 			color: $uni-text-color-grey;
			// 			font-size: $uni-font-size-base;
			// 			margin: 0 20upx;
			// 		}
			// 	}
			// 	.search-btn{
			// 		margin: 0 30upx;
			// 	}
				
			// }
			
			.item{
				padding: 30upx 20upx;
				background: #FFFFFF;
				border-bottom: 1px solid $uni-border-color-gray;
				.company{
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					margin-bottom: 15upx;
				}
				.state{
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
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
	
	.scroll-height{
		height: 250upx;
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
