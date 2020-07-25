<template>
	<view class="container">
		<button type="primary" @click="checkIsSupportSoterAuthentication">检查支持的认证方式</button>
		<button type="primary" @click="checkIsSoterEnrolledInDeviceFingerPrint">检查是否录入指纹</button>
		<button type="primary" @click="checkIsSoterEnrolledInDeviceFaceID">检查是否录入FaceID</button>
		<button type="primary" @click="startSoterAuthenticationFingerPrint">开始指纹认证</button>
		<button type="primary" @click="startSoterAuthenticationFaceID">开始FaceID认证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			 checkIsSupportSoterAuthentication() {
				uni.checkIsSupportSoterAuthentication({
					success(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					},
					fail(err) {
						uni.showToast({
							title:JSON.stringify(err),
							icon:'none'
						})
					},
					complete(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					}
				})
			},
			checkIsSoterEnrolledInDeviceFingerPrint() {
				uni.checkIsSoterEnrolledInDevice({
					checkAuthMode: 'fingerPrint',
					success(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					},
					fail(err) {
						uni.showToast({
							title:JSON.stringify(err),
							icon:'none'
						})
					},
					complete(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					}
				})
			},
			checkIsSoterEnrolledInDeviceFaceID() {
				uni.checkIsSoterEnrolledInDevice({
					checkAuthMode: 'facial',
					success(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					},
					fail(err) {
						uni.showToast({
							title:JSON.stringify(err),
							icon:'none'
						})
					},
					complete(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					}
				})
			},
			startSoterAuthenticationFingerPrint() {
				uni.startSoterAuthentication({
					requestAuthModes: ['fingerPrint'],
					challenge: '123456',
					authContent: '请用指纹解锁',
					success(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					},
					fail(err) {
						uni.showToast({
							title:JSON.stringify(err),
							icon:'none'
						})
					},
					complete(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					}
				})
			},
			startSoterAuthenticationFaceID() {
				uni.startSoterAuthentication({
					requestAuthModes: ['facial'],
					challenge: '123456',
					authContent: '请用FaceID解锁',
					success(res) {
						uni.showToast({
							title:JSON.stringify(res),
							icon:'none'
						})
					},
					fail(err) {
						uni.showToast({
							title:JSON.stringify(err),
							icon:'none'
						})
					},
					complete(res) {
						uni.showToast({
							title:JSON.stringify(res),
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
	padding: 0 20upx;
	button{
		margin-bottom: 20upx;
	}
}
</style>
