<template>
	<view class="overhidden">
		<view class="nav_wrap">
			<!-- <view class="seachwrap">
				<text class="icon-search"></text>
				<input class="input" type="text" value="" placeholder="请输入关键字进行查询" />
			</view> -->
			<view class="navwrap">
				<text>智业科技 >技术部 </text>
			</view>
		</view>
		<view class="peoplelist" style="border: none;">
			<!-- 通知 -->
			<!-- <view class="inform">
				<view>
					<text>当前部门还没有设置主管</text>
					<text>主要用于审批 考勤等</text>
				</view>
				<text class="icon-icon1"></text>
			</view> -->
			<view class="foldwrap">
				<!-- <view class="foldlist" v-for="(item,index) in list" :key="index">
					<view class="foldlistview" @click="rotateright(index)">
						<text>技术部(5)</text>
						<text class="icon-icon1" :class="item.stys==0?'rotu':'norotu'"></text>
					</view>
					<view class="childerlist" v-if="item.stys==0">
						<view class="peoplelistcount">
							<image src="../../../../static/img/qa.png"></image>
							<text>王老板</text>
							<text class="adminitext">超级管理员</text>
						</view>
						<view class="peoplelistcount">
							<image src="../../../../static/img/qa.png"></image>
							<text>王老板</text>
							<text class="adminitext">超级管理员</text>
						</view>
					</view>
				</view> -->
				<uni-collapse class="foldlist" @change="change" v-for="(item,index) in list" :key="index">
					<uni-collapse-item ref="add" title="技术部(5)" :show-animation="true" :open="false">
						<view class="childerlist">
							<view class="">
								<radio-group @change="radioChange">
									<label class="uni-radio-group">
										<view class="peoplelistcount radiowrap">
											<radio :value="item.value" />
											<image src="/static/img/release.png"></image>
											<text>王老板</text>
										</view>
									</label>
									<label class="uni-radio-group">
										<view class="peoplelistcount radiowrap">
											<radio :value="item.value" />
											<image src="/static/logo.png"></image>
											<text>王老板</text>
										</view>
									</label>
								</radio-group>

							</view>

						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<view class="butt">确定</view>
	</view>
</template>

<script>
	import {
		uniCollapse,
		uniCollapseItem
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				list: [{
					stys: 1
				}, {
					stys: 1
				}],
			}
		},
		components: {
			uniCollapse,
			uniCollapseItem
		},
		methods: {


		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	.seachwrap {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		text-align: center;
		width: 600upx;
		height: 66upx;
		border-radius: 50px;
		margin: 30upx auto;
		margin-bottom: 20upx;
		font-size: 28upx;
		color: #101010;
		background-color: rgba(185, 173, 173, 0.13);
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
		padding: 0 30upx;
	}

	.seachwrap input {
		display: inline-block !important;
		width: 450upx !important;
		height: 60upx !important;
		font-size: 28upx !important;
		text-align: left;
		margin-left: 20upx;
	}

	.navwrap {
		font-size: 28upx;
		color: #707070;
		box-sizing: border-box;
		padding-bottom: 20upx;
		padding-top: 20upx;
		width: 600upx;
		margin: 0 auto;
	}

	.navwrap text {
		display: inline-block;
		margin-right: 10upx;
	}

	.nav_wrap,
	.peoplelist {
		border-bottom: 20upx solid #F6F6F6;

		.inform {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: #707070;
			background: rgba(238, 238, 202, 1);
			box-sizing: border-box;
			padding: 10upx 20upx;

			view {
				width: 400upx;
			}

			view text {
				display: block;
			}

			view text:nth-child(2) {
				font-size: 24upx;
			}

			.icon-icon1 {
				font-size: 28upx;
				color: #101010;
			}
		}

	}

	.peoplelistcount {
		border-bottom: 1rpx solid #eee;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 10upx 30upx;
		font-size: 28upx;
		color: #101010;
	}

	.peoplelistcount image {
		display: inline-block;
		box-sizing: border-box;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
		margin: 10upx;
		margin-right: 20upx;
	}

	.adminitext {
		margin-left: 20upx;
		display: inline-block;
		color: #09B8F2;
		box-sizing: border-box;
		border: 1upx solid #09B8F2;
		border-radius: 12upx;
		padding: 0 6upx;
	}

	.seachwrap text {
		font-size: 40upx;
		color: #666;
	}

	.foldwrap {
		box-sizing: border-box;
		padding: 0 0upx;
		font-size: 28upx;
		color: #101010;

		.foldlist .foldlistview {
			box-sizing: border-box;
			padding: 30upx 0px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.foldlist {
			// border-bottom: 1upx solid #BBBBBB;
		}

		.peoplelistcount:last-child {
			// border: none;
		}

		.foldlist:last-child {
			border: none;
		}

		.foldlist .icon-icon1 {
			font-size: 28upx;
			color: #101010;
		}

		.rotu {
			transform: rotate(90deg);
			transition: 0.3s;
			transform-origin: center center;
			transform: rotate(90deg);
		}

		.norotu {
			transform: rotate(90deg);
			transition: 0.3s;
			transform-origin: center center;
			transform: rotate(0deg);
		}
	}

	.footerwrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		position: fixed;
		bottom: 0upx;
		width: 100%;
		border-top: 1rpx solid rgba(187, 187, 187, 0.53);
		font-size: 32upx;
		color: #09B8F2;

		text {
			display: inline-block;
			width: 50%;
			text-align: center;
			box-sizing: border-box;
			padding: 30upx 0upx;

		}
	}

	.footerwrap text:nth-child(1) {
		border-right: 1upx solid rgba(187, 187, 187, 1);
	}

	uni-page-body {
		height: auto !important;
		min-height: auto !important;
	}

	.radiowrap {
		display: flex;
		align-items: center;
	}

	.uni-radio-group {
		padding: 0upx !important;
	}

	.butt {
	display: block;
	width: 90%;
	font-size: 30upx;
	color: #fff;
	background: #09B8F2;
	text-align: center;
	padding: 30upx 0px;
	border-radius: 12upx;
	margin: 50upx auto;
	}
</style>
