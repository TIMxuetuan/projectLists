<template>
<view class="container">
		<view class="w-panel-header" style="background: #fff;">
			<view class="w-panel-header-cell">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			</view>
			<navigator url="./funnel/funnel" class="w-panel-header-cell">
				<view class="left">
					<view>本月成交金额</view>
					<view class="money">￥{{Finished}}</view>
					<view>本月目标金额</view>
					<view class="money">￥{{Target}}</view>
					<view>本月回款金额</view>
					<view class="money">￥{{Payment}}</view>
				</view>
				<view class="right"><text class="iconfont" style="color: #ccc; font-size: 40upx;">&#xe65c;</text></view>
			</navigator>
		</view>
		<view class="w-panel">
			<navigator url="./customer/customer" class="w-panel-cell">
				<text class="iconkehu" style='color:#47A3D9'></text>
				<text class="title">
					客户
				</text>
			</navigator>
			<navigator url="./contact/contact" class="w-panel-cell">
				<text class="iconlianxiren" style="color: #FFCC00;"></text>
				<text class="title">
					联系人
				</text>
			</navigator>
			<navigator url="./chance/chance" class="w-panel-cell">
				<text class="iconjihui" style="color: #47A3D9;"></text>
				<text class="title">
					机会
				</text>
			</navigator>
			<navigator url="./contract/contract" class="w-panel-cell">
				<text class="iconyingyejianbao" style="color: #FFCC00;"></text>
				<text class="title">
					合同
				</text>
			</navigator>
			<navigator url="./activity/activity" class="w-panel-cell">
				<text class="iconhuodong" style="color: #47A3D9;"></text>
				<text class="title">
					活动
				</text>
			</navigator>
			<navigator url="./competitor/competitor" class="w-panel-cell">
				<text class="iconcompetitor_line" style="color: #FFCC00;"></text>
				<text class="title">
					竞争对手
				</text>
			</navigator>
			<navigator url="./order/order" class="w-panel-cell">
				<text class="icondingdanguanli" style="color: #47A3D9;"></text>
				<text class="title">
					订单管理
				</text>
			</navigator>
			<navigator url="./product/product" class="w-panel-cell">
				<text class="iconchanpinsheji" style="color: #FFCC00;"></text>
				<text class="title">
					产品
				</text>
			</navigator>
			<navigator url="./marketDynamic/marketDynamic" class="w-panel-cell">
				<text class="iconshichangdongtai" style="color: #47A3D9;"></text>
				<text class="title">
					市场动态
				</text>
			</navigator>
			<navigator url="./distributor/distributor" class="w-panel-cell">
				<text class="iconfenxiao" style="color: #FFCC00;"></text>
				<text class="title">
					分销商管理
				</text>
			</navigator>
			<navigator url="./dataCenter/dataCenter" class="w-panel-cell">
				<text class="iconshujuzhongxin-bian" style="color: #47A3D9;"></text>
				<text class="title">
					数据中心
				</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.min.js'
	import Services from '@/services/crm.js'
	let _self,canvaArcbar1;
	export default {
		data() {
			return {
				// ucharts
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				// 页面数据
				Finished:'0.00',
				FinishRate: '0',
				Target:'0.00',
				Payment:'0.00',
				
			}
		},
		onLoad() {
			_self = this,
			this.cWidth3=uni.upx2px(220);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(220);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(24);
			// 先渲染
			let Arcbar1={
				series:[
					{
						name:'本月完成',
						data:0,
						color:'#FFCC33'
					}
				]
			};
			_self.showArcbar("canvasArcbar1",Arcbar1);
			this.getServerData();
		},
		methods:{
			getServerData(){
				Services.Dashboard({
					haslower:1
				}).then(res =>{
					if(res.Flag){
						this.FinishRate = res.Content.FinishRate !== '--' ? res.Content.FinishRate : 0;
						this.Finished = res.Content.Finished;
						this.Target = res.Content.Target;
						this.Payment = res.Content.Payment;
						let Arcbar1={
							series:[
								{
									name:'本月完成',
									data:_self.FinishRate,
									color:'#FFCC33'
								}
							]
						};
						_self.showArcbar("canvasArcbar1",Arcbar1);
					}else{
						uni.showToast({
							title:'数据请求出错，请检查网络',
							icon:'none',
							duration:2000
						})
					}
				})
			},
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					title: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 14*_self.pixelRatio,
					},
					subtitle: {
						
						name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 12*_self.pixelRatio,
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>

	.container {
		width: 100vw;
		min-height: 100vh;
		padding: 20upx;
		box-sizing: border-box;
		background: $uni-bg-color-grey;
	}
	
	.w-panel-cell{
		&:nth-of-type(3n){
			border-right: none;
		}
	}
	.w-panel-header{
		height: 250upx;
		.w-panel-header-cell{
			flex-direction: row;
			justify-content: space-around;
			.left{

				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				.money{
					line-height: 1.5em;
					font-size: $uni-font-size-base;
					color: $uni-text-color-blue;
				}
			}
		}
	}
	
	.charts3 {
		position: absolute;
		width: 220upx;
		height: 220upx;
		background-color: #FFFFFF;
	}
</style>
