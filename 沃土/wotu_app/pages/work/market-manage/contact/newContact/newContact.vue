<template>
	<view class="container">
		<view class="w-card">
			<view class="item" style="align-items: center;">
				<view class="left">头像</view>
				<view class="right">
					<image :src="model.avatar" style="width:80upx; height: 80upx; border-radius: 50%;" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">姓名(必填)</view>
				<view class="right">
					<input type="text" v-model="model.name" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">职位</view>
				<view class="right">
					<input type="text" v-model="model.duty" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">部门</view>
				<view class="right">
					<input type="text" v-model="model.department" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">公司</view>
				<view class="right">
					<input type="text" v-model="model.company" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">手机</view>
				<view class="right">
					<input type="text"  v-model="model.phone"  placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">客户名称</view>
				<view class="right" @tap="$refs.selector3.show()">
					{{model.customer.label ? model.customer.label : '请选择'}}
				</view>
			</view>
			
		</view>

		<view class="w-card">
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
			<view class="item">
				<view class="left">备注</view>
				<view class="right">
					<textarea v-model="model.remark" placeholder="请输入备注信息" style="width: 100%;" :auto-height="true" />
				</view>
			</view>
			
		</view>
		<view class="w-card">
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
		<button type="primary" @tap="sendData">添加</button>
		
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
	import wPicker from "@/components/w-picker/w-picker.vue"
	import Service from "@/services/crm.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				model:{
					avatar:'../../../../../static/img/default-head.png', //默认头像
					name:'',
					duty:'',
					department:'',
					company:'',
					phone: '',
					tel:'',
					fax:'',
					email:'',
					weibo:'',
					weixin:'',
					qq:'',
					gender:1,
					hobby:'',
					address:'',
					remark:'',
					birthday:'',
					customer:{
						label: '',
						value: '',
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
					}
				},
				tagId1:'',
				tagId2:'',
				tagList1:[],
				tagList2:[],
				customerList:[]
			};
		},
		onLoad() {
			
			this.getStorage();
			this.getCustomers();
		},
		methods:{
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
					this.model.customer = e.checkArr;
				}
			},
			radioChange(e) {
				this.model.gender = e.detail.value;
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
			sendData(){
				if(this.model.name === ''){
					uni.showModal({
						title:'提示',
						content:'联系人姓名必须填写',
						showCancel:false,
					})
					return;
	
				}
				
				
				let _postData = {
					QQ:this.model.qq,
					Email:this.model.email,
					Address:this.model.address,
					Sex:this.model.gender,
					JobName:this.model.duty,
					Birthday: this.model.birthday,
					Mobile:this.model.phone,
					Avatar:this.model.avatar,
					DepartName:this.model.department,
					Name:this.model.name,
					Remark:this.model.remark,
					Tags:this.tagId1+'|'+this.model.tag_relation.value+'^'+this.tagId2+'|'+this.model.tag_intimacy.value,
					Weixin:this.model.weixin,
					CustId:this.model.customer.value,
					ComName: this.model.customer.label,
					Hobby:this.model.hobby,
					Tel:this.model.tel,
					ComName:this.model.company,
					Fax:this.model.fax,
					Weibo:this.model.weibo,
				}
				Service.createContact(_postData).then(res =>{
					if(res.Flag){
						
						uni.showToast({
							title:res.Content,
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
	width: 100vw;
	min-height: 100vh;
	padding: 10upx 20upx;
	box-sizing: border-box;
	background: $uni-bg-color-grey;
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
