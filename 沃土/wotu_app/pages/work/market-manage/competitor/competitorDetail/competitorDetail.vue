<template>
	<view class="container">
		<view class="header">
			<view class="top">
				<view class="title" @tap="toEdit">{{model.Name || '--'}}</view>
			</view>
			<view class="options">
				<view class="tag">
					<uni-tag :text="model.compete.label" :inverted='true' type='primary' size='small' @click="$refs.selector2.show()"></uni-tag>
				</view>
		
				<!-- <navigator :url="'../../editPrincipal/editPrincipal?id=' + oId+'&moduleName=CrmOrder'" class="tag">
					<uni-tag text="负责人、跟进人" :inverted='true' type='primary' size='small'></uni-tag>
				</navigator>	 -->
			</view>
			<view class="toptab">
				<view class="item">跟踪记录</view>
			</view>
		</view>
		<view class="content">
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
		<!-- picker -->
		<w-picker
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="changeState" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
	</view>
</template>

<script>
	import Service from '@/services/crm.js'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import wPicker from '@/components/w-picker/w-picker.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import util from "@/common/util.js"
	export default {
		components:{
			uniTag,
			wPicker,
			uniLoadMore
		},
		data() {
			return {
				competitorId:'', //活动Id
				model:{},
				tagId2:'',
				tagList2:[],
				recordList:[]
			};
		},
		onLoad(options) {
			this.competitorId = options.competitorId;
			this.getRecordData();
			this.getTags()

		},
		onShow() {
			this.getData()
		},
		methods:{
			getData(){
				Service.competitorDetail(this.competitorId).then(res =>{
					if(res.Flag){						
						this.model = res.Content;
						let _tags = res.Content.Tags;

						let _obj ;
						if(_tags.length >1){
							_obj = {
								label: _tags[1].ItemValue || '--',
								value: _tags[1].ItemId || '',
							}
						}
						this.$set(this.model,'compete',_obj)
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
				})
			},
			// 获取跟踪记录数据
			getRecordData(){
				if(this.recordList.length === 0){
					this.loadingStatus = 'loading';
				}
				
				// 一次性获取全部数据
				let _sendData = {
					relid: this.competitorId,
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
			getTags(){
				Service.customerTag({
					type:6 //竞争对手
				}).then(res =>{
					if(res.Flag){
						// this.tagId1 = res.Content[0].Id;
						// this.tagList1 = res.Content[0].Items.map(item =>{
						// 	return {
						// 		label:item.Name,
						// 		value:item.Id
						// 	}
						// });
						this.tagId2 = res.Content[1].Id;
						this.tagList2 = res.Content[1].Items.map(item =>{
							return {
								label:item.Name,
								value:item.Id
							}
						});
						console.log(this.tagList2)
					}
				})
			},
			bindClick(){
				this.$refs.selector2.show();
			},
			changeState(e){
				const oldState = this.model.compete.value;
				this.model.compete = e.checkArr;
				// Service.setCompetitorState(this.competitorId,e.checkArr.value, oldState).then(res =>{
				// 	if(res.Flag){
						
				// 		uni.showToast({
				// 			title:res.Content,
				// 			icon:'none',
				// 			duration:2000
				// 		})
				// 	}else{
				// 		uni.showToast({
				// 			title:res.Content,
				// 			icon:'none',
				// 			duration:2000
				// 		})
				// 	}
				// })
			},
			toEdit(){
				const _data = {
					name:this.model.Name,
					advantage:this.model.Adv,
					disadvantaged:this.model.DisAdv,
					strategy:this.model.Strategy,
					saleAnalyze:this.model.Sale,
					marketAnalyze:this.model.Market,
					contactMsg:this.model.Link,
					desc:this.model.Description,
				}
				if(this.model.Tags.length>0){
					_data.scale = {
						label:this.model.Tags[0].ItemValue,
						value:this.model.Tags[0].ItemId,
					}
				}
				if(this.model.Tags.length>1){
					_data.compete = {
						label:this.model.Tags[1].ItemValue,
						value:this.model.Tags[1].ItemId,
					}
				}
				uni.navigateTo({
					url:'../editCompetitor/editCompetitor?competitorId=' + this.competitorId
				})
				// 先存储到本地，修改页取
				uni.setStorageSync('competitor_detail',JSON.stringify(_data));
				
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
	.header {
		position: fixed;
		top: 0;
		left: 20upx;
		right: 20upx;
		background: $uni-bg-color-grey;
		border-radius: 10upx;
		.top {
			height: 150upx;
			padding: 0 20upx;
			margin-top: 10upx;
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1px solid #eee;
	
			.title {
				// color: #fff;
				font-size: $uni-font-size-lg;
				line-height: 2em;
			}
	
			.sub {
				font-size: $uni-font-size-base;
				line-height: 2em;
				// color: #eee;
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
		.toptab {
			width: 100%;
			height: 80upx;
			background: #fff;
			border-bottom: 1px solid #eee;
			margin-top: 20upx;
	
			.item {
				color: $uni-text-color-blue;
				font-size: $uni-font-size-lg;
				padding: 15upx;
			}
		}
	}
	
	.content{
		&::before {
			content: '';
			display: block;
			height: 360upx;
		}
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
	}
}
</style>
