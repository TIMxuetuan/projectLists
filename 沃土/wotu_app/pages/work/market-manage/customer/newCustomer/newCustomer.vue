<template>
	<view class="container">
		<view class="w-card">
			<view class="item">
				<view class="left">客户logo</view>
				<view class="right">
					添加
				</view>
			</view>
		</view>
		<view class="w-card">

			<view class="item">
				<view class="left">简称(必填)</view>
				<view class="right">
					<input type="text" v-model="model.shortName" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">全称</view>
				<view class="right">
					<input type="text" v-model="model.fullName" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">客户编号</view>
				<view class="right">
					<input type="text" v-model="model.customerNo" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">地址</view>
				<view class="right">
					<input type="text" @input='bindInput' @blur="tips = []" v-model="model.address"  placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item" style="background: #f8f8f8;" v-if='tips.length > 0'>
				<scroll-view class="tips" :scroll-y="true">
					<view class="tip" v-for="(item, index) in tips" :key='index' @tap='selectAddress(item)'>
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="item">
				<view class="left">网址</view>
				<view class="right">
					<input type="text" v-model="model.website" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">介绍</view>
				<view class="right">
					<textarea v-model="model.description" placeholder="请输入公司介绍" style="width: 100%;" :auto-height="true" />
					</view>
			</view>
		</view>
		<!-- 这块内容是客户自定义字段 -->
		<view class="w-card">
			<view class="item" v-for="(item, index) in fields" :key='index'>
				<view class="left">{{item.name}}</view>
				<view class="right">
					<input type="text" v-model="item.value"  placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			
		</view>
		<view class="w-card">
			<view class="item">
				<view class="left">客户状态</view>
				<view class="right" @tap="$refs.selector1.show()">
					{{model.tag_state.label}}
				</view>
			</view>
			<view class="item">
				<view class="left">客户分级</view>
				<view class="right" @tap="$refs.selector2.show()">
					{{model.tag_level.label}}
				</view>
			</view>
			
		</view>
		<button type="primary" @tap="sendData">添加</button>
		
		<!-- picker  选择标签-->
		<w-picker 
		    v-if="tagList1.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event,0)" 
		    ref="selector1" 
		    themeColor="#f00"
		    :selectList="tagList1">
		</w-picker>
		<!-- picker  选择标签-->
		<w-picker 
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event,1)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import Service from "@/services/crm.js"
	import amapFile from "@/js_sdk/js-amap/amap-wx.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				model:{
					logo:'',
					shortName:'',
					fullName:'',
					customerNo:'',
					address:'',
					website:'',
					tel:'',
					lng:'',
					lat:'',
					description:'',
					tag_state: {
						label:'',
						value:'',
					},
					tag_level: {
						label:'',
						value:'',
					}
				},
				tagId1:'',
				tagId2:'',
				tagList1:[],
				tagList2:[],
				tips:[],
				fields:[], //客户自定义字段
			};
		},
		onLoad() {
			// 获取客户自定义的字段
			this.getField();
			// 获取本地存储的标签数据,并格式化
			let _tags;
			_tags = JSON.parse(uni.getStorageSync('customer_state_tags'));
			this.tagList1 = _tags.Items.map(item =>{
				return {
					label: item.Name,
					value: item.Id
				}
			})
			this.tagId1 = _tags.Id;    //这个Id是一个类的标签Id(客户状态)
			this.model.tag_state = this.tagList1[9] //设置默认值
			// 获取本地存储的标签数据,并格式化
			_tags = JSON.parse(uni.getStorageSync('customer_level_tags'));
			this.tagList2 = _tags.Items.map(item =>{
				return {
					label: item.Name,
					value: item.Id
				}
			})
			this.tagId2 = _tags.Id;		//这个Id是一个类的标签Id(客户级别)
			this.model.tag_level = this.tagList2[0] //设置默认值
		
		},
		methods:{
			onConfirm(e,type){
				if(type === 0){
					this.model.tag_state = e.checkArr;
				}
				if(type === 1){
					this.model.tag_level = e.checkArr;
				}
			},
			// 获取客户自定义字段
			getField(){
				let _type = 1; //type=1 客户
				Service.getField(_type).then(res =>{
					if(res.Flag){
						
						this.fields = res.Content.map((item, index) =>{
							return {
								name:item.Name,
								id: item.Id,
								isRequired: true,
								value: '' //添加一个属性
							}
						})
					}
				})
			},
			bindInput(e){
			    let that = this;
				let key = '';
			
				key = '2c7439091b55700b1eaebadda5c73239';
		
				
				// // #ifdef  APP-PLUS
				// key = '3c22ee25b7f2560c536c02b18248f789';
				// // #endif
			    let keywords = e.detail.value; 
			    let myAmapFun = new amapFile.AMapWX({key: key});
			    myAmapFun.getInputtips({
			      keywords: keywords,
			      location: '',
			      success: function(data){
			        if(data && data.tips){
						that.tips = data.tips;
			        }
			
			      }
			    })
			 },
			selectAddress(item){
				this.model.address = item.name;
				if(item.location){
					this.model.lng = item.location.split(',')[0];
					this.model.lat = item.location.split(',')[1];
				}
	
				this.tips = [];
			},
			sendData(){
				if(this.model.shortName === ''){
					uni.showModal({
						title:'提示',
						content:'客户简称必须填写',
						showCancel:false,
					})
					return;
	
				}
				
				// 对客户自定义字段的数据进行拼接处理
				let fieldsData = [];
				this.fields.forEach(item =>{
					
					let _temp = item.id + "|" +item.name + "|" +item.value;
					fieldsData.push(_temp);
					// 判断下是否必填
					if(item.isRequired && item.value === ''){
						uni.showModal({
							title:'提示',
							content:item.name + '不能为空',
							showCancel:false
						})
						return; 
					}
				})
				let fieldsStr = fieldsData.join('^');
				
				let _postData = {
					FullName:this.model.fullName,
					ShortName:this.model.shortName,
					webApplogo:'',
					Logo:this.model.logo,
					LinkUser:'',
					Fields: fieldsStr,
					CustomerNo:this.model.customerNo,
					Address:this.model.address,
					Lng:this.model.lng,
					Lat:this.model.lat,
					Website:this.model.website,
					// 客户状态总的Id | 客户状态Id ^ 客户级别总的Id | 客户级别Id
					Tags:this.tagId1+'|'+this.model.tag_state.value+'^'+this.tagId2+'|'+this.model.tag_level.value,
					Description:this.model.description
				}
				Service.createCustomer(_postData).then(res =>{
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

.tips{
	display: flex;
	flex-direction: column;
	height: 250upx;
	background: #fff;
	.tip{
		padding: 20upx;
		border-bottom: 1px solid #eee;
		&:last-child{
			border: none;
		}
	}
}
</style>
