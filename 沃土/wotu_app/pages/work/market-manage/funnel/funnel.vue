<template>
	<view class="funnel">
		<view class="date">
			<view @tap="$refs.range.show()">{{startDate}}<text class="iconfont iconjihua"></text></view>
		</view>
		<view class="content">
			<view class="inner">
				<view class="canvas-wrap">
					<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts"></canvas>
				</view>
				<view class="label">
					<view class="label-item" v-for="(item, index) in dataList" :key='index'>
						<text>{{item.name}}({{item.value}}%) ￥{{item.price}}</text>
					</view>
				</view>
			</view>
			<view class="total">预计总金额：￥{{totalPrice}}</view>
		</view>
		
		<!-- picker -->
		<w-picker 
		    mode="yearMonth" 
		    startYear="2010" 
		    endYear="2050"
		    :defaultVal="[0,0]" 
		    :current="true"
		    @confirm="bindTimeChange" 
		    ref="range" 
		    themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.min.js'
	import Services from '@/services/crm.js'
	import util from '@/common/util.js'
	import wPicker from '@/components/w-picker/w-picker.vue'
	let canvaFunnel, _self;
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				// ucharts配置
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				chartData: {
					series: []
				},
				// ---------
				startDate:'',
				endDate:'',
				dataList:[],
				totalPrice: 0.00,
			};
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(400); //这里要与样式的宽高对应
			this.cHeight = uni.upx2px(400);
			
			let date = new Date();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();
			this.startDate = this.getMonthDate(0);
			this.endDate = this.getMonthDate(1,this.startDate);
			this.getData();
		},
		methods: {
			// 获取当前年月或着上一个月
			getMonthDate(num, d){
				let date = new Date();
				if(d){
					date = new Date(d);
				}
				let year = parseInt(date.getFullYear());
				let month = parseInt(date.getMonth() + 1);
				if(month + num <= 0){
					month = 12 + month + num;
					year -= 1;
				}else if(month + num > 12){
					month = month + num - 12;
					year += 1;
				}else{
					month = month + num;
				}
				month = month < 10 ? '0'+ month : month;
				return year + '-' + month;
			},
			bindTimeChange(e){
				// console.log(e.detail.value)
				this.startDate = e.result;
				this.endDate = this.getMonthDate(1,this.startDate);
				this.getData();
			},
			getData(){
				Services.funnel({
					start:this.startDate + '-01',
					end: this.endDate + '-01'
				}).then(res =>{
					
					if(res.Flag){
						_self.totalPrice = 0;
						_self.dataList = [];
						const _data = res.Content.map((item) =>{
							_self.dataList.push({
								name:item.Name,
								value:item.Value,
								price:item.TotalPrice
							})
							_self.totalPrice += parseFloat(item.TotalPrice);
							return {
								"name": item.Name,
								"data": item.Value
							}
						})
						const _chartData = {
							series:_data
						}
						this.showFunnel('canvasArcbar2',_chartData);
					}else{
						uni.showToast({
							title:'请求数据失败',
							icon:'none'
						})
					}
				})
			},
			showFunnel(canvasId, chartData) {
				canvaFunnel = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'funnel',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					background: '#FFFFFF',
					legend:{
						show:false
					},
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: false,
					extra: {
						funnel: {
							border: true,
							borderWidth: 2,
							borderColor: '#FFFFFF',
						}
					},
				});
			}
		}
	}
</script>

<style lang="scss">
	.funnel {
		width: 100vw;
		min-height: 100vh;
		padding: 20upx;
		box-sizing: border-box;
		background: $uni-bg-color-grey;
		color: $uni-text-color;

		.date {
			width: 100%;
			background: #fff;
			border-radius: 10upx;
			font-size: $uni-font-size-base;
			text-align: center;
			padding: 20upx 0;

			.iconfont {
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				margin-left: 10upx;
			}
		}

		.content {
			width: 100%;
			
			background: #fff;
			border-radius: 10upx;
			overflow: hidden;
			margin-top: 20upx;
			.inner{
				display: flex;
				.canvas-wrap{
					width: 400upx;
					height: 400upx;
					.charts {
						width: 400upx;
						height: 400upx;
						background-color: #FFFFFF;
					}
				}
				.label{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					font-size: $uni-font-size-sm;
					color: $uni-text-color;
				}
			}
			.total{
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				line-height: 4em;
				margin-left: 40upx;
			}
		}
	}
</style>
