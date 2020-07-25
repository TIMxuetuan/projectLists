<template>
	<view class="container">
		<view class="w-card">
			<view class="item" style="align-items: center;">
				<view class="left">头像</view>
				<view class="right">
					<image :src="model.Profile.Avatar?model.Profile.Avatar:'../../../../../static/img/default-head.png'" style="width:80upx; height: 80upx; border-radius: 50%;" mode="aspectFill"></image>
				</view>
			</view>
			<view class="item">
				<view class="left">姓名(必填)</view>
				<view class="right">
					<input type="text" v-model="model.Name" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">性别</view>
				<view class="right">
					<radio-group style="display: flex;" @change="radioChange">
						<label style="display: flex;margin-right: 20upx;">
							<view>
								<radio value="1" checked />
							</view>
							<view>男</view>
						</label>
						<label style="display: flex;">
							<view>
								<radio value="2"  />
							</view>
							<view>女</view>
						</label>
					
					</radio-group>
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">公司</view>
				<view class="right">
					<input type="text" v-model="model.Com" placeholder="点击输入" style="width: 100%;" focus=""/>
				</view>
			</view>
			<view class="item">
				<view class="left">部门</view>
				<view class="right">
					<input type="text" v-model="model.Depart" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
			<view class="item">
				<view class="left">职位</view>
				<view class="right">
					<input type="text" v-model="model.Job" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
			<view class="item">
				<view class="left">地址</view>
				<view class="right">
					<input type="text" v-model="model.Profile.Address" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
			
			<view class="item">
				<view class="left">备注</view>
				<view class="right">
					<textarea v-model="model.remark" placeholder="请输入备注信息" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">手机</view>
				<view class="right">
					<input type="text" v-model="model.Link.Mobile" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
			<view class="item">
				<view class="left">邮箱</view>
				<view class="right">
					<input type="text" v-model="model.Link.Email" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
			<view class="item">
				<view class="left">传真</view>
				<view class="right">
					<input type="text" v-model="model.Link.Fax" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
			<view class="item">
				<view class="left">QQ</view>
				<view class="right">
					<input type="text" v-model="model.Link.Qq" placeholder="点击输入" style="width: 100%;"/>
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">关联客户</view>
				<view class="right" @tap="$refs.selector3.show()">
					{{model.Cust.Name?model.Cust.Name:'请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">角色关系</view>
				<view class="right" @tap="$refs.selector1.show()">
					{{model.tag_relation.label}}
				</view>
			</view>
			<view class="item">
				<view class="left">亲密程度</view>
				<view class="right" @tap="$refs.selector2.show()">
					{{model.tag_intimacy.label}}
				</view>
			</view>
			
		</view>
		<button type="primary" @tap="sendData">确认修改</button>
		<!-- picker  选择标签  角色关系-->
		<w-picker 
		    v-if="tagList1.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 0)" 
		    ref="selector1" 
		    themeColor="#f00"
		    :selectList="tagList1">
		</w-picker>
		
		<!-- picker  选择标签 亲密程度-->
		<w-picker 
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 1)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
		<!-- picker  选择标签 客户-->
		<w-picker 
		    v-if="customerList.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 2)" 
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
					// 关联客户 这里不定义的话，页面渲染会有问题
					Cust:{
						Name:'',
						Id:'',
					},
					//亲密程度
					tag_intimacy:{
						label:'',
						value:'',
					}, 
					// 角色关系
					tag_relation: {
						label:'',
						value:'',
					},
					Link:{
						Mobile:'',
						Email:'',
						Fax:'',
						Qq:'',
					},
					Profile:{
						Sex:'',
						Avatar:'',
						Address:'',
						Birthday:'',
					}
				},
				tagId1:'',
				tagId2:'',
				tagList1:[],
				tagList2:[],
				customerList:[]
			};
		},
		onLoad(options) {
			this.contactId = options.contactId;
			uni.showLoading({
				title:'请求中',
				mask:true
			})
			timer = setTimeout(() =>{
				uni.hideLoading()
			},3000)
			this.getData()
			this.getCustomers()
			this.getStorage()
		},
		onUnload() {
			timer = null;
		},
		methods:{
			getData(){
				Service.contactDetail(this.contactId).then(res =>{
					if(res.Flag){
						
						
						// 合并对象
						this.model = Object.assign(this.model, res.Content)
						console.log(this.model)
						if(res.Content.Tags.length > 0){
							this.model.tag_relation = {
								label:res.Content.Tags[0].ItemValue,
								value:res.Content.Tags[0].ItemId
							}
							
						}
						if(res.Content.Tags.length > 1){
							this.model.tag_intimacy = {
								label:res.Content.Tags[1].ItemValue,
								value:res.Content.Tags[1].ItemId
							}
						}
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
			getStorage(){
				let _tags;
				// 获取本地存储的标签数据,并格式化
				_tags = JSON.parse(uni.getStorageSync('customer_relation_tags'));
				this.tagList1 = _tags.Items.map(item =>{
					return {
						label: item.Name,
						value: item.Id
					}
				})
				this.tagId1 = _tags.Id;		//这个Id是一个类的标签Id(角色关系)
				this.model.tag_relation = this.tagList1[0] //设置默认值
						
				// 获取本地存储的标签数据,并格式化
				_tags = JSON.parse(uni.getStorageSync('customer_intimacy_tags'));
				this.tagList2 = _tags.Items.map(item =>{
					return {
						label: item.Name,
						value: item.Id
					}
				})
				this.tagId2 = _tags.Id;		//这个Id是一个类的标签Id(亲密程度)
				this.model.tag_intimacy = this.tagList2[0] //设置默认值
			},
			onConfirm(e, type){
				if(type === 0){
					this.model.tag_relation = e.checkArr;
				}
				if(type === 1){
					this.model.tag_intimacy = e.checkArr;
				}
				if(type === 2){
					console.log(e.checkArr)
					
					this.model.Cust.Name = e.checkArr.label;
					this.model.Cust.Id = e.checkArr.value;
				}
			},
			radioChange(e) {
				this.model.Profile.Sex = e.detail.value;
			},
			sendData(){
				if(this.model.Name === ''){
					uni.showModal({
						title:'提示',
						content:'联系人姓名必须填写',
						showCancel:false,
					})
					return;
				
				}

				let _postData = {
					id:this.contactId,
					QQ:this.model.Link.Qq,
					Email:this.model.Link.Email,
					Address:this.model.Profile.Address,
					Sex:this.model.Profile.Sex,
					JobName:this.model.Job,
					Birthday: this.model.Profile.Birth,
					Mobile:this.model.Link.Mobile,
					Avatar:this.model.Profile.Avatar,
					DepartName:this.model.Depart,
					Name:this.model.Name,
					Remark:this.model.Remark,
					Tags:this.tagId1+'|'+this.model.tag_relation.value+'^'+this.tagId2+'|'+this.model.tag_intimacy.value,
					Weixin:this.model.Link.Weixin,
					CustId:this.model.Cust.Id,
					ComName: this.model.Cust.Name,
					Hobby:this.model.Profile.Hobby,
					Tel:this.model.Link.Tel,
					ComName:this.model.Com,
					Fax:this.model.Link.Fax,
					Weibo:this.model.Link.Weibo,
				}

				Service.editContact(this.contactId,_postData).then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:'修改成功',
							icon:'none',
							duration:2000
						})
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none',
							duration:2000
						})
					}
				})
			
			}
		}
	}
</script>

<style lang="scss">
.container{
	min-height: 100vh;
	padding: 10upx 20upx 50upx;
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
