<template>
	<view class="container">
		<view class="w-card">
			<view class="item">
				<view class="left">*客户名称</view>
				<view class="right" @tap="$refs.selector1.show()">
					{{model.customer.label || '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*联系人姓名</view>
				<view class="right" @tap='showContact'>
					{{model.contact.label || '--'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*电话/手机</view>
				<view class="right">
					<input type="number" v-model="model.tel" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*收获地址</view>
				<view class="right">
					<input type="text" v-model="model.address" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*下单日期</view>
				<view class="right" >
					{{model.orderTime || '--'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*预计发货日期</view>
				<view class="right" @tap="$refs.date.show()">
					{{model.predictTime || '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">备注</view>
				<view class="right">
					<view class="right" >
						<textarea v-model="model.remark" placeholder="备注信息" style="width: 100%;" auto-height="" />
					</view>
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
				<view class="left">物流状态</view>
				<view class="right" @tap="$refs.selector3.show()">
					{{model.state.label || '请选择'}}
				</view>
			</view>
			<view class="item">
				<view class="left">*付款方式</view>
				<view class="right" @tap="$refs.selector4.show()">
					{{model.payment.label || '请选择'}}
				</view>
			</view>
		</view>
		<view class="w-card">
			<view class="product-wrap">
				<view class="title">产品</view>
				<view v-if="cur_products.length > 0" class="product"
				 v-for="(item, index) in cur_products" :key='index' @tap="del(index)">
					<text>{{item.name}}</text>
					<text>{{item.price}} × {{item.count}}</text>
				</view>
				<view class="add-product" @tap='$refs.popup.open()'>
					<text class="iconfont iconadd1"></text>	
				</view>
			</view>
			
		</view>
		<button type="primary" @tap="sendData">新建订单</button>
		
		<!-- picker -->
		<w-picker
		    v-if="tagList1.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 1)" 
		    ref="selector1" 
		    themeColor="#f00"
		    :selectList="tagList1">
		</w-picker>
		<w-picker
		    v-if="tagList2.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 2)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="tagList2">
		</w-picker>
		<w-picker
		    v-if="tagList3.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event,3)" 
		    ref="selector3" 
		    themeColor="#f00"
		    :selectList="tagList3">
		</w-picker>
		<w-picker
		    v-if="tagList4.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 4)" 
		    ref="selector4" 
		    themeColor="#f00"
		    :selectList="tagList4">
		</w-picker>
		
		<w-picker
		    mode="date" 
		    startYear="2017" 
		    endYear="2030"
		    :current="true" 
		    @confirm="onConfirm($event,5)"
		    ref="date" 
		    themeColor="#f00"
		></w-picker>
		
		<!-- unipopup -->
		<uni-popup ref="popup" :custom="true" type="bottom">
			<view class="popup-box">
				<view class="header">
					<view class="top"><text class="title">{{cur_product.name}}</text><text class="confirm" @tap="popupConfirm">确认</text></view>
					<view class="price">￥{{cur_product.price}}/{{cur_product.unit}}</view>
				</view>
				<scroll-view scroll-y="true" class="content">
					<view class="wrap">
						<view class="title">选择产品</view>
						<view class="main">
							<view class="m-item" 
							:class="{'m-item-active': p_index === index}" 
							v-for="(item, index) in productList" 
							:key='index' 
							@tap="tapItem(index)">
							{{item.name}}</view>	
						</view>
					</view>
					<view class="wrap" style="display: flex;justify-content: space-between;align-items: center;">
						<view class="title">产品数量</view>
						<view>
							<uni-number-box @change="bindChange"></uni-number-box>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import Service from "@/services/crm.js"
	import util from '@/common/util.js'
	export default {
		components:{
			wPicker,
			uniPopup,
			uniNumberBox
		},
		data() {
			return {
				model:{
					tel:'',
					address:'',
					orderTime:'',
					predictTime:'',
					remark:'',
					state:{
						label:'',
						value:'',
					},
					payment:{
						label:'支票',
						value:1,
					},
					customer:{
						label:'',
						value:'',
					},
					contact:{
						label:'',
						value:'',
					},
				},
				tagList1:[],
				tagList2:[],
				tagList3:[],
				tagId3:'',
				tagList4:[
					{label:'支票',value:1},
					{label:'现金',value:2},
					{label:'邮政汇款',value:3},
					{label:'电汇',value:4},
					{label:'网上转账',value:5},
					{label:'其他',value:6},
				], //付款方式列表
				fields:[],
				productList:[], //产品列表
				p_index:0,
				cur_product:{},
				cur_products:[],
				cur_num:1
			};
		},
		onLoad() {
			this.model.orderTime = util.getDate();
			this.getField()
			this.getTags()
			this.getCustomers()
			this.getProduct()
		},
		methods:{
			sendData(){
				if(this.model.customer.value === ''){
					uni.showModal({
						title:'提示',
						content:'客户名称必须填写',
						showCancel:false,
					})
					return;
					
				}
				if(this.model.contact.value === ''){
					uni.showModal({
						title:'提示',
						content:'客户联系人必须填写',
						showCancel:false,
					})
					return;
					
				}
				if(this.model.tel === ''){
					uni.showModal({
						title:'提示',
						content:'联系方式必须填写',
						showCancel:false,
					})
					return;	
				}
				if(this.model.address === ''){
					uni.showModal({
						title:'提示',
						content:'收货地址必须填写',
						showCancel:false,
					})
					return;	
				}
				if(this.model.orderTime === ''){
					uni.showModal({
						title:'提示',
						content:'下单日期必须填写',
						showCancel:false,
					})
					return;	
				}
				if(this.model.predictTime === ''){
					uni.showModal({
						title:'提示',
						content:'预计发货日期必须填写',
						showCancel:false,
					})
					return;	
				}
				if(this.model.payment.value === ''){
					uni.showModal({
						title:'提示',
						content:'付款方式必须填写',
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
				// 对产品列表进行拼接
				let _productArr = [];
				this.cur_products.forEach(item =>{
					let _temp = item.name + '|' + item.unit + '|' + item.price + '|' + item.count+ '|';
					_productArr.push(_temp);
				})
				let productStr = _productArr.join('^');
				
				const _postData = {
					CustName:this.model.customer.label,
					CustId:this.model.customer.value,
					ContactName:this.model.contact.label,
					ContactId:this.model.contact.value,
					Tel:this.model.tel,
					Address:this.model.address,
					Products:productStr,
					OrderDate:this.model.orderTime,
					DeliveryDate:this.model.predictTime,
					PayType:this.model.payment.value,
					Tags:this.tagId3 + '|' + this.model.state.value,
					Desc:this.model.remark,
				}
				console.log(_postData)
				Service.createOrder(_postData).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:'创建成功',
							icon:'none'
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
			},
			onConfirm(e, type){
				if(type === 1){
					this.model.customer = e.checkArr;
					this.getContact();	
				}else if(type === 2){
					this.model.contact = e.checkArr;
				}else if(type === 3){
					this.model.state = e.checkArr;
				}else if(type === 4){
					this.model.payment = e.checkArr;
				}else if(type === 5){
					this.model.predictTime = e.result;
				}
			},
			// 点击选择联系人时，要做相应判断
			showContact(){
				if(this.model.customer.label === ''){
					uni.showToast({
						title:'请先选择客户',
						icon:'none',
						duration:2000
					})
					return;
				}
				
				if(this.tagList2.length > 0){
					this.$refs.selector2.show();
				}else{
					uni.showToast({
						title:'该客户没有关联联系人',
						icon:'none',
						duration:2000
					})
				}
			},
			popupConfirm(){
				const _item = {
					name:this.cur_product.name,
					price:this.cur_product.price,
					unit:this.cur_product.unit,
					id: this.cur_product.id,
					count: this.cur_num,
				}
				
				if(this.cur_num != 0){
					if(this.cur_products.length > 0){
						let flag = false; //判断是否有重复的产品
						for(let i in this.cur_products){
							let item = this.cur_products[i];
							// 判断数组中是否有该产品，有的话直接加上相应的数量
							console.log(_item.name === item.name)
							if(_item.name === item.name){
								item.count = parseInt(item.count) + parseInt(_item.count);
								flag = true;
								break;	
							}
						}
						// flag == false 说明没有重复的产品，可以push,否则不执行
						if(!flag){
							this.cur_products.push(_item);
						}
						
					}else{
						this.cur_products.push(_item);
					}
				}
				
				this.$refs.popup.close()
				
			},
			tapItem(index){
				this.p_index = index;
				this.cur_product = this.productList[index];
			},
			bindChange(num){
				this.cur_num = num;
			},
			del(index){
				let that = this;
				
				// #ifdef  H5 || MP-WEIXIN
				uni.showModal({
					title:'提示',
					content:'确认要移除 '+ that.cur_products[index]['name'] +'?',
					success(res) {
						if (res.confirm) {
							that.cur_products.splice(index,1);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				// #endif
				
				// #ifdef  APP-PLUS
				uni.showModal({
					title:'提示',
					content:'确认要移除 '+ that.cur_products[index]['name'] +'?',
					confirmText:'取消',
					cancelText:'确认',
					success(res) {
						if (res.confirm) {
							
						} else if (res.cancel) {
							that.cur_products.splice(index,1);
						}
					}
				})
				// #endif
				
			},
			getTags(){
				const _data = {
					kw:'',
					type:9 //订单
				}
				Service.customerTag(_data).then(res =>{
					if(res.Flag){
						const _data = res.Content[0];
						this.tagId3 = _data.Id;
						this.tagList3 = _data.Items.map(item =>{
							return {
								label:item.Name,
								value:item.Id
							}
						})
						if(this.tagList3.length > 0){
							this.model.state = this.tagList3[0]
						}
					}
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
						this.tagList1 = res.Content.List.map(item =>{
							
							return {
								label: item.Name,
								value: item.Id,
							}
						})
					}
				})
			},
			getContact(){

				if(!this.model.customer.value){
					uni.showToast({
						title:'选择客户错误',
						icon:'none',
						duration:2000
					})
					return;
				}
				
				const _data = {
					id:this.model.customer.value,
					type:1
				}
				Service.getContact(_data).then(res =>{
					if(res.Flag){
						
						
						this.tagList2 = res.Content.List.map((item)=>{
							return {
								label:item.Name,
								value:item.Id
							}
						})
						// 给联系人赋初值
						if(this.tagList2.length > 0){
							this.model.contact = this.tagList2[0];
						}else{
							this.model.contact = {
								label:'--',
								value:''
							}
						}
						
						
					}else{
						uni.showToast({
							title:'请求数据失败',
							icon:'none'
						})
					}
					
				})
			},
			// 获取产品列表
			getProduct(){
				const params = {
						kw:'',
						tagid:'',
						sort:0,
						page:1,
						size:10
					}
				Service.productList(params).then(res =>{
					if(res.Flag){
						const _dataList = res.Content.List.map(item =>{
							// 拿到单位
							let _unit;
							if(item.Tags && item.Tags.length>0){
								_unit = item.Tags[0].ItemValue;
							}
							return {
								name:item.Name,
								price:item.Price, 
								unit:_unit,
								id:item.Id
							}
						})
						this.productList = _dataList
						if(this.productList.length > 0){
							this.cur_product = this.productList[0];
						}
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
				})
			},
			// 获取自定义字段
			getField(){
				let _type = 9; //type=9 订单
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
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}
.container{
	padding: 10upx 20upx 50upx;
	.w-card{
		margin-bottom: 20upx;
		.item{
			display: flex;
			padding: 20upx;
			color: #333;
			box-sizing: border-box;
			border-bottom: 1px solid $uni-border-color-gray;
			.left{
				width: 220upx;
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
.product-wrap{
	padding: 20upx;
	color: #333;
	.title{
		font-size: $uni-font-size-base;	
		color: $uni-text-color;
		padding: 10upx 0;
		border-bottom: 1px solid $uni-border-color-gray;
	}
	.product{
		display: flex;
		padding: 20upx 0;
		justify-content: space-between;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		border-bottom: 1px solid #eee;
	}
	.add-product{
		width: 100upx;
		height: 100upx;
		margin-top: 10upx;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		.iconfont{
			font-size: 60upx;
			color: #fff;
		}
	}
}

// 选择商品
.popup-box{
	background: #fff;
	padding: 20upx 0;
	color: $uni-text-color;
	border-radius: 10upx 10upx 0 0;
	.header{
		padding: 0 20upx;
		height: 150upx;
		border-bottom: 1px solid #ccc;
		.top{
			display: flex;
			padding: 20upx 0;
			justify-content: space-between;
			.title{
				font-size: 36upx;
				font-weight: bold;	
			}
			.confirm{
				font-size: 36upx;
				color: $icon-bg-primary;
			}
		}
		
		.price{
			font-size: $uni-font-size-base;
			color: $uni-text-color;
		}
	}
	.content{
		height: 500upx;
		padding: 0 20upx;
		.wrap{
			padding: 20upx 10upx;
			border-bottom: 1px solid #eee;
			.title{
				font-size: $uni-font-size-base;
				margin-bottom: 20upx;
			}
			.main{
				.m-item{
					font-size: $uni-font-size-base;
					font-weight: normal;
					padding: 10upx;
					color: #0ABB87;
					width: 50%;
					box-sizing: border-box;
				}
				.m-item-active{
					border-radius: 10upx;
					background: #10AEFF;
					color: #fff;
				}
			}
		}
	}
}

</style>
