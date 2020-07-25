<template>
	<view class="container">
		<form @submit="formSubmit">
	
			<textarea class="uni-textarea" name='feedback' placeholder="反馈意见" auto-height />


			<button type="primary" formType="submit">提交反馈</button>

		</form>
	</view>
</template>

<script>
	import {_data, _methods} from '@/common/public.js'
	import Services from '@/services/user.js'
	export default {
		data() {
			return {
				..._data
			};
		},
		onLoad() {
			this.userInfo = this.getUserInfo();
		},
		 methods: {
			..._methods,
			formSubmit(e) {
				let val = e.detail.value.feedback;
				console.log(val)
				if(val == ''){
					uni.showToast({
						title:'反馈内容不能为空！',
						icon:'none'
					})
					return;
				}
				let postData = {
					Email: this.userInfo.Email,
					Category: '',
					Content: val,
					Id: this.userInfo.Id
				}
				// 发起请求
				Services.feedback(postData).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}else{
						uni.showToast({
							title:'请求错误',
							icon:'none'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
.container{
	background: $uni-bg-color-grey;
	padding: 30upx 20upx;
	box-sizing: border-box;
	min-height: 100vh;
	font-size: $uni-font-size-lg;
	.uni-textarea{
		width: 100%;
		box-sizing: border-box;
		min-height: 300upx;
		border-radius: 10upx;
		background: #fff;
		border: 1px solid $uni-border-color;
		padding: 20upx;
	}
	button{
		margin-top: 30upx;
	}
}
</style>
