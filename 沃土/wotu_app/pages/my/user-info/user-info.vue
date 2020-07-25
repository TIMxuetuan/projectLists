<template>
	<view class="container">
		<view class="w-card header">
			<image :src="header" mode="aspectFill"></image>
			<view class="user-name">{{model.Name}}</view>
			<view class="iconfont" @tap='changeHeader'>&#xe9d9;</view>
		</view>
		<view class="w-card item">
			<view class="left">职务：</view>
			<view class="right"><input type="text" :value="model.Position" disabled></view>
		</view>
		<view class="w-card item">
			<view class="left">职责：</view>
			<view class="right"><input type="text" v-model="model.Description"></view>
		</view>
		<view class="w-card item">
			<view class="left">手机：</view>
			<view class="right"><input type="text" v-model="model.PhoneNumber"></view>
		</view>
		<view class="w-card item">
			<view class="left">电话：</view>
			<view class="right"><input type="text" v-model="model.TelPhone"></view>
		</view>
		<view class="w-card item">
			<view class="left">邮箱：</view>
			<view class="right"><input type="text" v-model="model.Email"></view>
		</view>
		<button type="primary" :disabled="!isChanged" @tap='changeUserInfo'>确认修改</button>
	</view>
</template>

<script>
	import Services from '@/services/user.js'
	import {_data, _methods} from '@/common/public.js'
	import config from '@/config.js'
	let timer, self;
	export default {
		data() {
			return {
				..._data,
				header:'',
				config: {},
				isChanged: false,
				model:this.getUserInfo()
			};
		},
		onLoad() {
			self = this;
			this.userInfo = this.getUserInfo();
			this.header = this.userInfo.Header.indexOf('/Backbone/')>-1 ? config.api_path + this.userInfo.Header : this.userInfo.Header;
			this._config = config;
		},
		onUnload() {
			timer = null;
		},
		methods:{
			..._methods,
			changeUserInfo(){
				let postData = {
					Description: this.model.Description,
					Position: this.model.Position,
					TelPhone: this.model.TelPhone,
					PhoneNumber: this.model.PhoneNumber,
					Id: this.model.Id,
					Name: this.model.Name
				}
				
				Services.changeUserInfo(postData).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
						// 禁用按钮
						this.isChanged = false;
						// 修改成功时，更新本地存储
						uni.setStorageSync('userInfo', JSON.stringify(this.model));
					}else{
						uni.showToast({
							title:'修改失败',
							icon:'none'
						})
					}
				})
			},
			changeHeader(){
				uni.chooseImage({
				    success: (res) => {
				        const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title:'上传中...'
						})
				        uni.uploadFile({
				        	url: `${config.api_path}api/${self.userInfo.Key}/Member/UpLoadHead/${self.userInfo.Id}`,
				        	filePath: res.tempFilePaths[0],
				        	name: '头像',
				        	fileType:'image',
				        	success: (uploadFileRes) => {
				        		let _json = JSON.parse(uploadFileRes.data);
				        		if (typeof _json.Flag != 'undefined') {
				        			uni.showModal({
				        				title: '提示',
				        				content: _json.Content,
										showCancel:false
				        			});
				        		}
				        		if (_json.Flag) {
				        			self.userInfo.Header = _json.Id;
									self.header = _json.Id;
				        			uni.setStorageSync('userInfo', JSON.stringify(self.userInfo));
									uni.showToast({
										title:'上传成功',
										icon:'none'
									})
				        		}
				        		uni.hideLoading();
				        	}
				        })	;
				    }
				});
			}
		},
		watch:{
			// 如果modle的属性改变了，修改按钮才可以点击
			model:{
				handler(val){
					this.isChanged = true;
				},
				deep:true	
			}
		}
	}
</script>

<style lang="scss">
.container{
	padding: 20upx;
	box-sizing: border-box;
	min-height: 100vh;
	color: $uni-text-color;
	background: $uni-bg-color-grey;
	.header{
		display: flex;
		padding: 30upx 20upx;
		align-items: center;
		margin-bottom: 20upx;
		image{
			width: 100upx;
			height: 100upx;
			border-radius: 10upx;
			overflow: hidden;
		}
		.user-name{
			font-size: $uni-font-size-lg;
			margin-left: 40upx;
		}
		.iconfont{
			margin-left: auto;
			padding: 20upx;
			font-size: 40upx;
		}
	}
	.item{
		display: flex;
		align-items: center;
		height: 80upx;
		padding: 0 20upx;
		color: $uni-text-color;
		box-sizing: border-box;
		margin-bottom: 20upx;
		.left{
			width: 120upx;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
		}
		.right{
			flex: 1;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}
	}
}

</style>
