<template>
	<view class="container">
		<view class="header">
			<view class="top">
				<view class="title" @tap="toEdit">{{contract.Name}}</view>
				<view class="sub">所属客户：{{contract.Customer.Name}}</view>
			</view>
			<view class="options" >
				<view class="tag">
					<uni-tag :text="contract.IsFollow ? '已关注' : '+关注'" :inverted='true' type='primary' size='small' @click="bindClick"></uni-tag>
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
				<!-- **************************回款计划************************************* -->
				<view class='list' v-show="current === 1">
					<view class="payPlan-item" v-for="(item, index) in payPlanList" :key="index">
						<text class="pay-name">{{item.Name}}</text>
					</view>
					<uni-load-more :status="loadingStatus"></uni-load-more>
				</view>
				<!-- **************************回款记录************************************* -->
				<view class='list' v-show="current === 2">
					<view class="payrecord-item" v-for="(item, index) in payRecordList" :key="index">

						<view class="title">{{item.Name}}</view>

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
				items: ['跟进记录','回款计划','回款记录'],
				current: 0,
				contractId:'',
				loadingStatus:'more',
				tagList:[],
				// 客户信息
				contract:{
					Name:'-',
					EstDate:'',
					Cust:{
						Name:'',
						Id:''
					}
				},
				// 四个数据列表
				recordList:[], //追踪记录数据
				payPlanList:[],  //回款计划数据
				payRecordList:[],  //回款记录数据
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
			
			this.contractId = options.contractId;
			console.log(this.contractId)
		},
		onShow() {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},3000)
			this.getContractData();
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
				if(index === 1 && this.payPlanList.length === 0){
					this.getPayPlan();
				}
				if(index === 2 && this.payRecordList.length === 0){
					this.getPayRecord();
				}
			},
			// 点击关注
			bindClick(){
				this.contract.IsFollow = !this.contract.IsFollow;
				Service.followContract(this.contractId,this.contract.IsFollow?'1':'0').then(res =>{
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
			getContractData(){
				Service.contractDetail(this.contractId).then(res =>{
					if(res.Flag){
						this.contract = res.Content;
						
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
					relid: this.contractId,
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
			// 获取回款计划数据列表
			getPayPlan(){
				
				if(this.payPlanList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				const _sendData = {
					cid: this.contractId,
					page: 1,
					size: 10000,
				}
				
				Service.payPlan(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.payPlanList = res.Content;

						
					}else{
						uni.showToast({
							title:'请求失败',
							icon: 'none'
						})
					}
					this.loadingStatus = 'noMore'
				})
			},
			// 获取回款记录数据列表
			getPayRecord(){
				
				if(this.payRecordList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				const _sendData = {
					cid: this.contractId,
					page: 1,
					size: 10000,
				}
				
				Service.payRecord(_sendData).then(res =>{
					if(res.Flag){
						// 处理返回的html标签
						this.payRecordList = res.Content;
			
						
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
				
				uni.navigateTo({
					url:'../editContract/editContract?contractId='+ this.contractId
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
			height: 100%;
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
			// **************************回款计划列表***********************************************
				.payPlan-item{
					padding: 10upx 20upx;
					background: #FFFFFF;
					border-radius: 10upx;
					margin-bottom: 20upx;
					.pay-name{
						padding: 20upx;
						color: $uni-text-color;
						font-size: $uni-font-size-base;
					}
					
				}
				// **************************回款记录列表***********************************************
				.payrecord-item{
					padding: 10upx 20upx;
					background: #FFFFFF;
					border-radius: 10upx;
					margin-bottom: 20upx;
					display: flex;
					align-items: center;
					.title{
						padding: 20upx;
						color: $uni-text-color;
						font-size: $uni-font-size-base;
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
