<template>
	<view class="contact">
		<scroll-view id="tab-bar" class="menu" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation='true' :scroll-into-view="scrollInto">
			<view  class="uni-tab-item" v-for="(item, index) in tabBars" :key='item.id' :id='item.id' @tap="ontabtap(item, index)">
				<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active': '']">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="content">
			
			<!-- <uni-search-bar @confirm="search" @input="input" @cancel='cancel' /> -->
			<view class="item" v-for='(item, index) in dataList' :key='index' @tap="toDetail(item.id)">
				<view class="avatar">
					<image :src="item.avatar?item.avatar:'../../../../static/img/default-head.png'" mode="aspectFill"></image>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
		<navigator url="./newContact/newContact" class="addCustomer" ><text class="iconfont text">&#xe654;</text></navigator>

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
					name: '我的联系人',
					type:1   //type值对应的，不能错
				}, {
					id: "tab02",
					name: '我下属的联系人',
					type:2
				}, {
					id: "tab03",
					name: '共享给我的',
					type:3
				}],
				scrollInto:'',
				tabIndex:0,
				dataList:[],
				loadingStatus:'more',
				contact:{
					kind:1, // 客户类型（默认等于1）， 1：我的联系人，2：我下属的联系人，3：共享给我的
					kw:'', // 搜索值 ，不做搜索时，等于空
					lowers:'',  //无（默认为空）
					sort: 0,   //筛选条件（默认等于0
					page:1,
					size: 10,
				}
			};
		},
		onLoad() {
			this.getTags();
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
				this.contact.kind = item.type;
				this.init();
				this.getData();
			},
			// page == 1 时，请求要初始化
			init(){
				this.contact.page = 1;  //请求的页数为第一页
				// loading提示
				this.loadingStatus = 'loading'
			},
			getData(){
				
				// 如果是第一页，清空数据列表
				if(this.contact.page === 1){
					this.dataList = [];  
				}
				Service.getContact(this.contact).then(res =>{
					if(res.Flag){
						
						const _data = res.Content.List.map((item)=>{
							return {
								name:item.Name,
								Avatar:item.Avatar.indexOf('/Backbone/') > -1 ? _config.api_path + item.Avatar : item.Avatar,
								id:item.Id
							}
						})
						this.dataList = this.dataList.concat(_data);
						this.contact.page++ ;
						
						if(res.Content.List.length === 0 || res.Content.List.length < this.contact.size){
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
					type:2 //联系人
				}).then(res =>{
					if(res.Flag){
						// 存入本地,其他页面直接用,不用再做请求
						uni.setStorageSync('customer_relation_tags',JSON.stringify(res.Content[0]))
						uni.setStorageSync('customer_intimacy_tags',JSON.stringify(res.Content[1]))
					}
				})
			},
			toDetail(contactId){
				uni.navigateTo({
					url: `./contactDetail/contactDetail?contactId=${contactId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
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
			
			.item{
				padding: 20upx;
				margin-bottom: 20upx;
				background: #FFFFFF;
				// border-bottom: 1px solid $uni-border-color-gray;
				border-radius: 10upx;
				display: flex;
				align-items: center;
				.avatar{
					margin-right: 30upx;
					image{
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}
				}
				.name{
					font-size: $uni-font-size-base;
					color: $uni-text-color;
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
