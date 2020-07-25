<template>
	<view class="qiun-columns">
		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
		<view class="text">
			<view>1，曲线偏高且平稳：恭喜你，成功人士的情绪处于巅峰状态。</view>
			<view>2，曲线高低起伏：请注意，这表明你的情绪波动太大，不稳定的情绪是你成功的杀手。</view>
			<view>3，曲线偏低且平稳：警示！你正处于情绪低落状态，低落的情绪是成功的障碍。</view>
		</view>
		<view>
			<uni-popup ref="popup" type="center">
				<uni-calendar :insert="true" :range='ranges' @change='changedate' />
				<button class="buttsucc" @click="closePopup">确定</button>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import daily from '@/services/daily.js';
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.min.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
	var _self;
	var canvaLineA = null;
	export default {
		components: {
			uniCalendar,
			uniPopup
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				startTime: '',
				endTime: '',
				ranges:true
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.startTime = this.fun_date(-6);
			this.endTime = this.fun_date(0);
			this.getServerData();
		},
		methods: {
			getServerData() {
				var LineA = {
					categories: [],
					series: [{
						name: '心情值(0-10)',
						data: [],
						color: '#4d759e'
					}]
				};
				uni.showLoading({
					title: '请稍后...',
					mask: true
				})
				daily.mood({
					start: this.startTime,
					end: this.endTime
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.Flag) {
						if (res.Content) {
							for (var i = 0; i < res.Content.data.length; i++) {
								LineA.categories.push(res.Content.data[i].x);
								LineA.series[0].data.push(res.Content.data[i].y);
							}
						} else {
							LineA.series[0].data = [8, 8, 8, 8, 8, 8, 8];
							for (var i = 0; i < 6; i++) {
								LineA.categories.unshift(this.fun_date(-i))
							}
						}
						_self.showLineA("canvasLineA", LineA);
					} else {
						uni.showToast({
							title: '请求失败！',
							icon: 'none'
						});
					}
				})
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					legend: false,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						rotateLabel: false
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						splitNumber: 9,
						min: 1,
						max: 10,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			onNavigationBarButtonTap() {
				this.$refs.popup.open()
			},
			changedate(e) {
				if (e.range) {
					this.startTime = e.range.begin;
					this.endTime = e.range.end;
				}
			},
			closePopup() {
				this.$refs.popup.close()
				this.getServerData();
			},
			fun_date(num) {
				var date1 = new Date();
				var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
				var date2 = new Date(date1);
				date2.setDate(date1.getDate() + num);
				var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
				return time2;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		box-sizing: border-box;
		padding-top: 30upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.text {
		font-size: 28upx;
		color: #787878;
		box-sizing: border-box;
		padding: 40upx;
	}

	.text view {
		padding: 10upx 0;
	}
</style>
