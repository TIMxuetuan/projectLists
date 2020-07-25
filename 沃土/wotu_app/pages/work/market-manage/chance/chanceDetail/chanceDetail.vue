<template>
	<view class="container">
		<view class="header">
			<view class="top">
				<view class="title" @tap="toEdit">{{chance.Name}}</view>
				<view class="sub">所属客户：{{chance.Cust.Name}}</view>
				<view class="sub">预计签单日期：{{chance.EstDate}}</view>
			</view>
			<view class="options">
				<view class="tag" >
					<uni-tag :text="chance.IsFollow ? '已关注' : '+关注'" :inverted='true' type='primary' size='small' @click="bindClick"></uni-tag>
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
				<!-- **************************联系人************************************* -->
				<view class='list' v-show="current === 1">
					<view class="contact-item" v-for="(item, index) in contactList" :key="index">
						<image :src="item.Avatar" mode="aspectFill"></image>
						<text class="person">{{item.Name}}</text>
					</view>
					<uni-load-more :status="loadingStatus"></uni-load-more>
				</view>
				<!-- **************************合同************************************* -->
				<view class='list' v-show="current === 2">
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
				items: ['跟进记录','联系人','合同'],
				current: 0,
				chanceId:'',
				loadingStatus:'more',
				tagList:[],
				// 客户信息
				chance:{
					Name:'-',
					IsFollow:false,
					EstDate:'',
					Cust:{
						Name:'',
						Id:''
					}
				},
				// 四个数据列表
				recordList:[], //追踪记录数据
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
			
			this.chanceId = options.chanceId;
			console.log(this.chanceId)
		},
		onShow() {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},3000)
			this.getChanceData();
			this.getRecordData();
		},
		onUnload() {
			timer = null;
		},
		onNavigationBarButtonTap() {
			this.$refs.uniPopup.open();
		},
		methods:{
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if(index === 0 && this.recordList.length === 0){
					this.getRecordData();
				}
				if(index === 1 && this.contactList.length === 0){
					this.getContactData();
				}
				if(index === 2 && this.contractList.length === 0){
					this.getContractData();
				}
			},
			// 点击关注
			bindClick(){
				this.chance.IsFollow = !this.chance.IsFollow;
				Service.followChance(this.chanceId,this.chance.IsFollow?'1':'0').then(res =>{
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
			getChanceData(){
				Service.chanceDetail(this.chanceId).then(res =>{
					if(res.Flag){
						this.chance = res.Content;
						
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
					relid: this.chanceId,
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
			// 获取客户联系人数据列表
			getContactData(){
				
				if(this.contactList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					id: this.chanceId,
					type: 3,
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
					id: this.chanceId,
					type: 3,
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
				const _data = {
					id: this.chance.Id,
					name:this.chance.Name,
					price:this.chance.Price,
					findTime:this.chance.FindDate,
					predictTime:this.chance.EstDate,
					demand:this.chance.Text,
					description: this.chance.Desc,
					customer:{
						label:this.chance.Cust.Name,
						value:this.chance.Cust.Id,
					},
					saleStage:{
						label:this.chance.Stage.Name,
						value:this.chance.Stage.Id,
					},
					chanceSource:{
						label:this.chance.Tags.length>0 ? this.chance.Tags[0].ItemValue : '',
						value:this.chance.Tags.length>0 ? this.chance.Tags[0].ItemId : '',
					},
					chanceType:{
						label:this.chance.Tags.length>1 ? this.chance.Tags[1].ItemValue : '',
						value:this.chance.Tags.length>1 ? this.chance.Tags[0].ItemId : '',
					},
				}
				uni.navigateTo({
					url:'../editChance/editChance?model='+ JSON.stringify(_data)
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
	width: 100%;
	padding: 0 20upx;
	box-sizing: border-box;
	background: $uni-bg-color-grey;
	height: 100vh;
	overflow: hidden;
	color: $uni-text-color;
	.header{
		margin-bottom: 20upx;
		border-radius: 10upx;
		.top{
			height: 150upx;
			padding: 20upx;
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1px solid #eee;
			margin-top: 10upx;
			.title{
				font-size: $uni-font-size-lg;
				line-height: 2em;
			}
			.sub{
				font-size: $uni-font-size-base;
				line-height: 2em;
				color: #999;
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
		height: calc(100vh - 300upx);
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
