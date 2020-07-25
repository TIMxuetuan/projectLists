<template>
	<view class="container">
		<view class="w-card">
			<view class="item">
				<view class="left">*名称</view>
				<view class="right">
					<input type="text" v-model="model.name" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">*单价(元)</view>
				<view class="right">
					<input type="number" v-model="model.price" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">描述</view>
				<view class="right">
					<input type="text" v-model="model.desc" placeholder="点击填写" style="width: 100%;" />
				</view>
			</view>
			<view class="item">
				<view class="left">单位</view>
				<view class="right">
					<view class="right" @tap="$refs.selector.show()">
						{{model.unit.label || '请选择'}}
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
		<button type="primary" :disabled="disabled" @tap="sendData">确认更改</button>
		
		<w-picker
		    v-if="tagList.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm" 
		    ref="selector" 
		    themeColor="#f00"
		    :selectList="tagList">
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
					name:'',
					price:'',
					desc:'',
					unit:{
						label:'',
						value:'',
					}
				},
				tagList:[],
				tagId:'',
				fields:[],
				disabled:true
			};
		},
		onLoad(options) {
			this.productId = options.productId;
			let _data = uni.getStorageSync('product_data');
			this.model = JSON.parse(_data);
			uni.removeStorageSync('product_data')
			let unwatch = this.$watch('model',() =>{
				this.disabled = false;
				if(unwatch){
					unwatch()
				}
			},{
				deep:true
			})
			this.getField()
			this.getTags()
		},
		methods:{
			sendData(){
				if(this.model.name === ''){
					uni.showModal({
						title:'提示',
						content:'产品名称必须填写',
						showCancel:false,
					})
					return;					
				}
				if(this.model.price === ''){
					uni.showModal({
						title:'提示',
						content:'产品价格必须填写',
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
				
				const _postData = {
					Description:this.model.desc,
					Fields:fieldsStr,
					Price:this.model.price,
					Tags:this.tagId+'|'+this.model.unit.value,
					Name:this.model.name
				}
				
				Service.editProduct(_postData).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:res.Content,
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
			onConfirm(e){
				this.model.unit = e.checkArr;
			},
			getTags(){
				const _data = {
					kw:'',
					type:10 //产品
				}
				Service.customerTag(_data).then(res =>{
					if(res.Flag){
						const _data = res.Content[0];
						this.tagId = _data.Id;
						this.tagList = _data.Items.map(item =>{
							return {
								label:item.Name,
								value:item.Id
							}
						})
						console.log(this.tagList)
					}
				})
			},
			// 获取自定义字段
			getField(){
				let _type = 10; //type=10 产品
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
	padding: 10upx 20upx;
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
</style>
