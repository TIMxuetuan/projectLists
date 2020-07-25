<template>
	<view class="container">
		<view class="header">
			<view class="top" @tap="toEdit">
				<view class="avatar"><image :src="customer.Logo" mode="aspectFill"></image></view>
				<view class="title">{{customer.ShortName}}</view>
			</view>
			<view class="options">
				<!-- 获取完客户才能关注 -->
				<view class="tag" v-if="customer.IsHighSea">
					<uni-tag text="获取" :inverted='true' type='primary' size='small' @click="getCustomer"></uni-tag>
				</view>
				<view class="tag" v-else>
					<uni-tag :text="customer.IsFollow ? '已关注' : '+关注'" :inverted='true' type='primary' size='small' @click="bindClick"></uni-tag>
				</view>
				<view class="tag">
					<uni-tag :text="tag_state.label?tag_state.label:'无状态'" type='success' size="small" @click="$refs.selector.show()"></uni-tag>
				</view>
			</view>
		</view>
		<view class="content">
			
			<view class="top-tab" >
				<view class="item" :class="{item_acitve:current==index}"  v-for="(item, index) in items" :key='index' @tap='onClickItem(index)'>
					{{item}}
				</view>
			</view>
			<scroll-view class="scroll-box" :scroll-y="true">
				<!-- **************************跟踪记录************************************* -->
				<view class='list' v-show="current === 0">
					<view class="record-item" v-for="(item, index) in recordList" :key='index'>
						<view class="tags" v-if="item.Tags.length > 0">
							<block v-for="(tag, i) in item.Tags" :key='i'>
								<uni-tag :text="tag.Name" type='primary' :circle="true" size="small"></uni-tag>
							</block>
						</view>
						<view class="text">
							<!-- 后台返回有html标签，通过富文本解析 -->
							<rich-text :nodes="item.Text"></rich-text>
						</view>
						<view class="info">
							<text class="user">{{item.CreatorName}}</text>
							<text class="time">{{item.Date}}</text>
						</view>
					</view>
					<uni-load-more :status="loadingStatus"></uni-load-more>
				</view>
				<!-- **************************机会************************************* -->
				<view class='list' v-show="current === 1">
					<view class="chance-item" v-for="(item, index) in chanceList" :key='index'>
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
				<!-- **************************联系人************************************* -->
				<view class='list' v-show="current === 2">
					<view class="contact-item" v-for="(item, index) in contactList" :key="index">
						<image :src="item.Avatar" mode="aspectFill"></image>
						<text class="person">{{item.Name}}</text>
					</view>
					<uni-load-more :status="loadingStatus"></uni-load-more>
				</view>
				<!-- **************************合同************************************* -->
				<view class='list' v-show="current === 3">
					<view class="contract-item" v-for="(item, index) in contractList" :key="index">
						<view class="inner">
							<view class="title">{{item.Name}}</view>
							<view class="price">￥{{item.Price}}</view>
						</view>
						<view class="state">{{item.State}}</view>
					</view>
					<uni-load-more :status="loadingStatus"></uni-load-more>
				</view>
			</scroll-view>
		</view>
		
		<!-- picker  选择标签-->
		<w-picker 
		    v-if="tagList.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm" 
		    ref="selector" 
		    themeColor="#f00"
		    :selectList="tagList">
		</w-picker>
		<!-- 更多操作 -->
		<uni-popup ref='uniPopup' :custom="true" type="top">
			<view class="pop-item" @tap='menuClick(1)'><text class="iconadd"></text><text class="txt">新建签约机会</text></view>
			<view class="pop-item" @tap='menuClick(2)'><text class="iconadd"></text><text class="txt">新建联系人</text></view>
			<view class="pop-item" @tap='menuClick(3)'><text class="iconadd"></text><text class="txt">新建合同</text></view>
		</uni-popup>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import util from "@/common/util.js"
	import _config from "@/config.js"
	import Service from "@/services/crm.js"
	let timer;
	let fields = []; //页面传值时用到
	export default {
		components:{
			uniTag,
			uniLoadMore,
			wPicker,
			uniPopup
		},
		data() {
			return {
				items: ['跟进记录','签约机会','联系人','合同'],
				current: 0,
				customerId:'',
				loadingStatus:'more',
				tagList:[],
				// 客户信息
				customer:{},
				tag_state: {
					label:'',
					value:'',
				},
				tag_level: {
					label:'',
					value:'',
				},
				// 四个数据列表
				recordList:[], //追踪记录数据
				chanceList:[],  //签约机会数据
				contactList:[],  //联系人数据
				contractList:[],  //合同数据
			};
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},3000)
			
			this.customerId = options.customerId;
			
			// 获取本地存储的标签数据,并格式化
			let _tags = JSON.parse(uni.getStorageSync('customer_state_tags'));
			this.tagList = _tags.Items.map(item =>{
				return {
					label: item.Name,
					value: item.Id
				}
			})
		},
		onShow() {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},3000)
			this.getCustomerData();
			this.getRecordData();
		},
		onUnload() {
			timer = null;
		},
		onNavigationBarButtonTap() {
			// this.$refs.uniPopup.open();
		},
		methods:{
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if(index === 0 && this.recordList.length === 0){
					this.getRecordData();
				}
				if(index === 1 && this.chanceList.length === 0){
					this.getChanceData();
				}
				if(index === 2 && this.contactList.length === 0){
					this.getContactData();
				}
				if(index === 3 && this.contractList.length === 0){
					this.getContractData();
				}
			},
			getCustomer(){
				Service.getCustomer(this.customerId).then(res =>{
					if(res.Flag){
						this.customer.IsHighSea = false;
						uni.showToast({
							title:res.Content,
							icon:'none',
							position: 'bottom'
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				})
			},
			// 点击关注
			bindClick(){
				this.customer.IsFollow = !this.customer.IsFollow;
				Service.follow(this.customerId,this.customer.IsFollow?'1':'0').then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
							icon:'none',
							position: 'bottom'
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				})
			},
			getCustomerData(){
				Service.customerDetail(this.customerId).then(res =>{
					if(res.Flag){
						this.customer = res.Content;
						// 如果没有logo设置默认图片
						this.customer.Logo = this.customer.Logo || '../../../../../static/img/default-head.png'
						
						if(this.customer.Tags.length > 0){
							this.tag_state = {
								label: this.customer.Tags[0].ItemValue || '获取标签失败',
								value: this.customer.Tags[0].ItemId
							}
						}
						if(this.customer.Tags.length > 1){
							this.tag_level = {
								label: this.customer.Tags[1].ItemValue || '获取标签失败',
								value: this.customer.Tags[1].ItemId
							}
						}
						
						if(this.customer.Fields.length > 0){
							fields = this.customer.Fields.map(item =>{
								return {
									name: item.Name,
									id: item.Id,
									value: item.Value
								}
							})
						}	
					}else{
						uni.showToast({
							title:'请求出错',
							icon:'none'
						})
					}
					uni.hideLoading();
				})
			},
			// 获取跟踪记录数据
			getRecordData(){
				if(this.recordList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					relid: this.customerId,
					kw: '',
					page: 1,
					size: 10000,
				}
				Service.record(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.recordList = res.Content.List;
						this.recordList.forEach((item) =>{
							item.Text = item.Text.replace(/<th/g, "<td");
							let _time = (new Date(item.Date)).getTime();
							item.Date = util.formatTime(_time, 'Y-M-D h:s:m');
						})
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
				})
			},
		// 获取机会数据
			getChanceData(){
				
				if(this.chanceList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					custid: this.customerId,
					page: 1,
					size: 10000,
				}
				
				Service.Chance(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.chanceList = res.Content.List;
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
				})
			},
			// 获取客户联系人数据列表
			getContactData(){
				
				if(this.contactList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					id: this.customerId,
					type: 1,
					page: 1,
					size: 10000,
				}
				
				Service.Contact(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.contactList = res.Content.List;
						this.contactList.forEach((item) =>{
							item.Avatar = item.Avatar.indexOf('/Backbone/')>-1?_config.api_path + item.Avatar :item.Avatar;
						})
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
				})
			},
			// 获取合同数据列表
			getContractData(){
				
				if(this.contractList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					id: this.customerId,
					type: 1,
					page: 1,
					size: 10000,
				}
				
				Service.Contract(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.contractList = res.Content.List;
					
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
				})
			},
			onConfirm(e){
				console.log(e);
				let oldTag = this.tag_state;
				this.tag_state = e.checkArr;
				Service.SetState(this.customerId,this.tag_state.value,oldTag.value).then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
						this.getRecordData();
					}else{
						uni.showToast({
							title:'操作失败',
							icon:'none'
						})
					}
				})
			},
			menuClick(type){
				let self = this;
				this.$refs.uniPopup.close();
				// 新建签约机会
				if(type == 1){
					
				}
				// 新建联系人
				if(type == 2){

				}
				// 新建合同
				if(type == 3){

				}
			},
			toEdit(){
				
				let _data = {
					customerId:this.customerId,
					shortName: this.customer.ShortName,
					fullName: this.customer.FullName,
					customerNo: this.customer.CustNo,
					address: this.customer.Address,
					website: this.customer.Website,
					description: this.customer.Desc,
					Logo: this.customer.Logo,
					tag_state: this.customer.tag_state,
					tag_level: this.customer.tag_level
				}
				uni.navigateTo({
					url:'../editCustomer/editCustomer?customer=' + JSON.stringify(_data)+'&fields='+JSON.stringify(fields)
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
	padding: 0 20upx;
	height: 100vh;
	overflow: hidden;
	color: $uni-text-color;
	.header{
		margin-top: 10upx;
		margin-bottom: 20upx;
		border-radius: 10upx;
		overflow: hidden;
		.top{
			height: 150upx;
			padding: 0 20upx;
			background: #fff;
			display: flex;
			.avatar{
				width: 150upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid #eee;
				image{
					width: 120upx;
					height: 120upx;
					border-radius: 20upx;
				}
			}
			.title{
				display: flex;
				align-items: center;
				font-size: $uni-font-size-lg;
				line-height: 2em;
				
			}
		}
		.options{
			height: 80upx;
			display: flex;
			align-items: center;
			padding: 0 20upx;
			background: #fff;
			.tag{
				margin-right: 50upx;
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
	.content{
		height: calc(100vh - 260upx);
		box-sizing: border-box;
		background: $uni-bg-color-grey;
		flex-direction: column;
		.top-tab{
			width: 100%;
			height: 80upx;
			background: #fff;
			border-bottom: 1px solid #eee;
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
				// border-bottom:1px solid $uni-text-color-blue;
			}
		}
		.scroll-box{
			height: calc(100% - 80upx);
			box-sizing: border-box;
			.list{
				padding-top: 10upx;
		// **************************跟踪记录列表***********************************************
				.record-item{
					padding: 10upx 20upx;
					background: #FFFFFF;
					border-radius: 10upx;
					margin-bottom: 20upx;
					.tags{
						height: 50upx;
						@include custom-flex(flex-start, center)
					}
					.text{
						color: $uni-text-color;
						font-size: $uni-font-size-base;
						padding: 20upx 0;
					}
					.info{
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
						.user{
							margin-right: 30upx;
						}
					}
				}
			// **************************机会列表***********************************************
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
				// **************************联系人列表***********************************************
				.contact-item{
					padding: 10upx 20upx;
					background: #FFFFFF;
					border-radius: 10upx;
					margin-bottom: 20upx;
					display: flex;
					align-items: center;
					image{
						width: $uni-img-size-lg;
						height: $uni-img-size-lg;
						border-radius: 50%;
						margin-right: 30upx;
					}
				}
				// **************************合同列表***********************************************
				.contract-item{
					padding: 10upx 20upx;
					background: #FFFFFF;
					border-radius: 10upx;
					margin-bottom: 20upx;
					.inner{
						display: flex;
						justify-content: space-between;
						align-items: center;
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
					}
					.state{
						display: flex;
						justify-content: flex-end;
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
				}
			}
		}
	}
	
	.pop-item{
		border-bottom:1px solid $uni-border-color;
		font-size: $uni-font-size-lg;
		padding: 20upx 0;
		background: #fff;
		[class^='icon']{
			font-size: $uni-font-size-lg;
			color: $uni-text-color-blue;
			margin-right: 10upx;
			margin-left: 30upx;
		}
		.txt{
			color: $uni-text-color;
			font-size: $uni-font-size-base;
		}
	}
}
</style>
