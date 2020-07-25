<template>
	<view class="container">
		<view class="w-panel-header" style="background: #fff;">
			<view class="w-panel-header-cell">
				<view class="hint"><text class="iconfont" style="color: #FFCC00;">&#xe7ed;</text><text>上午08:30之前打卡</text></view>
				<view class="hint"><text class="iconfont" style="color: #99CCFF;">&#xe667;</text><text>下午18:00之后打卡</text></view>
			</view>
			<view @tap="clockIn" class="w-panel-header-cell">
				<text class="icondianji" style='color:#538FEF'></text>
				<text class="title" style="color: #333; font-size: 28upx;">
					打卡
				</text>
			</view>
		</view>
		<view class="w-panel">
			<navigator url="./attendance/attendance" class="w-panel-cell">
				<text class="iconkaoqin1" style='color:#47A3D9'></text>
				<text class="title">
					考勤
				</text>
			</navigator>
			<navigator url="./task/task" class="w-panel-cell">
				<text class="iconrenwu1" style="color: #FFCC00;"></text>
				<text class="title">
					任务
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconshenpi1" style="color: #47A3D9;"></text>
				<text class="title">
					审批
				</text>
			</navigator>
			<navigator url="./daily/daily" class="w-panel-cell">
				<text class="iconribao" style="color: #FFCC00;"></text>
				<text class="title">
					日报
				</text>
			</navigator>
			<navigator url="./report/report" class="w-panel-cell">
				<text class="iconyingyejianbao" style="color: #47A3D9;"></text>
				<text class="title">
					简报
				</text>
			</navigator>
			<navigator url="./mood/mood" class="w-panel-cell">
				<text class="iconqingxu" style="color: #FFCC00;"></text>
				<text class="title">
					心情
				</text>
			</navigator>
			<navigator url="./establish/establish" class="w-panel-cell">
				<text class="iconzuzhijiagou" style="color: #47A3D9;"></text>
				<text class="title">
					组织架构
				</text>
			</navigator>
			<navigator url="./stations/stations" class="w-panel-cell">
				<text class="icongangweitiaoyan" style="color: #FFCC00;"></text>
				<text class="title">
					岗位说明
				</text>
			</navigator>
			<navigator url="./training-school/training-school" class="w-panel-cell">
				<text class="iconpeixun-" style="color: #47A3D9;"></text>
				<text class="title">
					培训学院
				</text>
			</navigator>
			<navigator url="./care/care" class="w-panel-cell">
				<text class="iconkehuguanhuai_icon" style="color: #FFCC00;"></text>
				<text class="title">
					员工关怀
				</text>
			</navigator>
			<navigator url="./meeting/meeting" class="w-panel-cell">
				<text class="iconpeixun" style="color: #47A3D9;"></text>
				<text class="title">
					会议助手
				</text>
			</navigator>
		</view>
	</view>

</template>

<script>
	import Services from '@/services/attendance.js';
	import app from '@/services/app.js';
	import {
		_data,
		_methods
	} from '@/common/public.js';
	export default {
		data() {
			return {
				..._data,
				appIp: '',
				IMEI: '',
				address: '',
				location: '',
			}
		},
		onLoad() {
			// 进入当前页面，先授权，防止点击打卡时提示授权
			this.getLocation();
		},
		onUnload() {
		},
		methods: {
			..._methods,
			// 打卡
			
			async clockIn() {
				uni.showLoading({
					title:'打卡中...',
					mask:true
				})
				
				// 获取手机IMEI
				this.IMEI = this.getUuid();
				// 获取经纬度
				const _location = await this.getLocation();
				console.log('_location',_location);
				// 根据经纬度，获取手机ip和详细地址
				await this.getAddress(_location);
				console.log('this.appIp',this.appIp,this.address);
				// 发起打卡请求
				this.sendData();
			},
			getLocation() {
				let self = this;
				//  获取经纬度
				return new Promise(function(resolve, reject) {
					uni.getLocation({
						// type: 'wgs84',
						type: 'gcj02',
						//geocode: true,
						success(res) {
							self.location = res.latitude + ',' + res.longitude;
							// 这个数据只是做下一步请求时用的
							const _loc = {
								latitude: res.latitude,
								longitude: res.longitude
							}
							console.log('获取位置成功',_loc)
							resolve(_loc);
						},
						fail() {
							uni.showToast({
								title:'获取位置信息失败',
								icon:'none'
							})
						},
						complete: function (err) {     
						}
					})
				})
			},
			// 获取ip和地址
			getAddress(_location) {
				// .then()默认返回一个新的promise,value = undefined(因为没有then中没有返回值)
				return app.getAddress(_location).then(res => {
					this.appIp = res.ip;
					this.address = res.result.formatted_address;
				})
			},
			// 执行打卡
			sendData() {
				const postData = {
					Address: this.address,
					Ip: this.appIp,
					IMEI: this.IMEI,
					// Coords:'34.7863292,113.6733645'
					Coords: this.location
				};
				console.log(postData)
				Services.clockIn(postData)
					.then(res => {
						console.log('签到-clockIn',res)
						uni.hideLoading();
						if (res.Flag) {
							uni.showToast({
								title: res.Content.Text.length ? res.Content.Text : '您已经签过到了',
								icon: 'none',
								duration: 3000
							});
						} else {
							uni.showToast({
								title:'打卡失败',
								icon:'none',
								duration:2000
							})
						}
					})
			},

		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		padding: 10upx 20upx;
		box-sizing: border-box;
		min-height: 100vh;
		background: $uni-bg-color-grey;
	}

	.hint {
		color: #708090;
		font-size: $uni-font-size-base;
		line-height: 1.8em;

		.iconfont {
			font-size: $uni-font-size-lg;
			margin-right: 10upx;
		}
	}
</style>
