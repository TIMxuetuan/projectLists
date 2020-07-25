<template>
	<view class="container">
		<view class="w-panel header">
			<view class="row">
				<view class="profile">
					<image :src="model.Profile.Avatar?model.Profile.Avatar:'../../../../../static/img/default-head.png'" mode="aspectFill"></image>
					<text>{{model.Name}}</text>
				</view>
				<view class="options">
					<view>
						<uni-tag inverted size='small' type="primary" @click='changeTag' :text="uniTag"></uni-tag>
					</view>
					<navigator :url="'../editContact/editContact?contactId='+ contactId" class="edit">
						<text class="iconfont iconzhongmingming"></text>
					</navigator>
				</view>
			</view>
			<view class="row" style="margin-top: 20upx;">
				<text v-if="model.Cust.Name" class="iconfont iconzhengque" style="font-size: 36upx; color: #CCCC33; margin-right: 10upx;"></text>
				<text v-if="model.Cust.Name" style="color: #999;">已关联到客户'{{model.Cust.Name}}'</text>
				<text v-else style="color: #999;">未关联客户</text>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">公司</view>
				<view class="right">
					{{model.Com}}
				</view>
			</view>
			<view class="item">
				<view class="left">部门</view>
				<view class="right">
					{{model.Depart}}
				</view>
			</view>
			<view class="item">
				<view class="left">职位</view>
				<view class="right">
					{{model.Job}}
				</view>
			</view>
			<view class="item">
				<view class="left">地址</view>
				<view class="right">
					{{model.Profile.Address}}
				</view>
			</view>
			
			<view class="item">
				<view class="left">性别</view>
				<view class="right">
					<text v-if='model.Profile.Sex === 1'>先生</text>
					<text v-if='model.Profile.Sex === 2'>女士</text>
					<text v-if='model.Profile.Sex === 0'>不知道唉</text>
				</view>
			</view>
			<view class="item">
				<view class="left">备注</view>
				<view class="right">
					{{model.Remark}}
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">手机</view>
				<view class="right">
					{{model.Link.Mobile}}
				</view>
			</view>
			<view class="item">
				<view class="left">邮箱</view>
				<view class="right">
					{{model.Link.Email}}
				</view>
			</view>
			<view class="item">
				<view class="left">传真</view>
				<view class="right">
					{{model.Link.Fax}}
				</view>
			</view>
			<view class="item">
				<view class="left">QQ</view>
				<view class="right">
					{{model.Link.Qq}}
				</view>
			</view>
		</view>
		<view class="w-card" v-if='model.Tags.length > 0'>
			<view class="item" v-for="(item, index) in model.Tags" :key='index'>
				<view class="left">{{item.TagName}}</view>
				<view class="right">
					{{item.ItemValue}}
				</view>
			</view>
		</view>
		<!-- picker  选择标签 客户-->
		<w-picker 
		    v-if="customerList.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm" 
		    ref="selector3" 
		    themeColor="#f00"
		    :selectList="customerList">
		</w-picker>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import Service from '@/services/crm.js'
	let timer;
	export default {
		components:{
			uniTag
		},
		data() {
			return {
				contactId:'',
				model:{
					Name:'',
					Com:'',
					Job:'',
					Remark:'',
					Depart:'',
					Link:{
						Mobile:'',
						Email:'',
						Fax:'',
						Qq:'',
					},
					Profile:{
						sex:'',
						Avatar:'',
						Address:'',
					}
				},
				uniTag:'关联客户',
				customerList:[],
			};
		},
		onLoad(options) {
			this.contactId = options.contactId;
			this.getCustomers()
		},
		onShow() {
			uni.showLoading({
				title:'请求中',
				mask:true
			})
			timer = setTimeout(() =>{
				uni.hideLoading()
			},3000)
			this.getData()
		},
		onUnload() {
			timer = null;
		},
		methods:{
			getData(){
				Service.contactDetail(this.contactId).then(res =>{
					if(res.Flag){
						
						this.model = res.Content;
						this.uniTag = this.model.Cust.Name ? '取消关联' :'添加关联客户'
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
					uni.hideLoading()
				})
			},
			// 选择客户时列表
			getCustomers(){
				const _data = {
					kind: 2,
					kw: '',
					tagids: '',
					sort: 0,
					page:1,
					size:100,
				}
				Service.customer(_data).then(res =>{
					if(res.Flag){
						this.customerList = res.Content.List.map(item =>{
							
							return {
								label: item.Name,
								value: item.Id,
							}
						})
					}
				})
			},
			changeTag(){
				if(this.uniTag === '添加关联客户'){
					this.$refs.selector3.show();
					
				}else{
					uni.showLoading({
						title:'请求中',
						mask:true
					})
					timer = setTimeout(() =>{
						uni.hideLoading()
					},3000)
					// 参数为空，表示取消关联
					Service.setAssociate(this.contactId,{}).then(res =>{
						if(res.Flag){
							
							uni.showToast({
								title:res.Content,
								icon:"none"
							})
							this.getData()
						}else{
							uni.showToast({
								title:res.Content,
								icon:"none"
							})
						}
					})

				}
			},
			onConfirm(e){
				const customerId = e.checkArr.value;
				console.log(e.checkArr.label,e.checkArr.value)
				uni.showLoading({
					title:'请求中',
					mask:true
				})
				timer = setTimeout(() =>{
					uni.hideLoading()
				},3000)
				// 参数为空，表示取消关联
				Service.setAssociate(this.contactId,{
					"": customerId
				}).then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
							icon:"none"
						})
						this.getData()
					}else{
						uni.showToast({
							title:res.Content,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.container{
	width: 100vw;
	min-height: 100vh;
	padding: 10upx 20upx;
	box-sizing: border-box;
	background: $uni-bg-color-grey;
	color: $uni-text-color;
	font-size: $uni-font-size-base;
	.header{
		background: #fff;
		padding: 20upx;
		margin-bottom: 20upx;
		.row{
			width: 100%;
			display: flex;
			align-items: center;
			.profile{
				width: 300upx;
				display: flex;
				align-items: center;
				font-size: $uni-font-size-lg;
				font-weight: bold;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin-right: 50upx;
				}
			}
			.options{
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.iconfont{
					font-size: 36upx;
					color: #999;
					margin-left: 40upx;
				}
			}
		}
	}
	
	.w-card{
		margin-bottom: 20upx;
		.item{
			display: flex;
			padding: 20upx;
			color: #333;
			box-sizing: border-box;
			border-bottom: 1px solid $uni-border-color-gray;
			.left{
				width: 200upx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
			}
			.right{
				flex: 1;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				display: flex;
				justify-content: flex-end;
				.iconfont{
					font-size: 36upx;
					color: #B7B7B7;
				}
			}
			&:last-child{
				border: none;
			}
		}
	}
}
</style>
