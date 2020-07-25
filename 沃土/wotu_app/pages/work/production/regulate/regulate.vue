<template>
	<view class="regulate">
		<view class="seachwrap" v-if="val=='订单管理'">
			<view class="seachwrapchilder">
				<text class="iconsearch"></text>
				<input type="text" @input="seach" placeholder="输入关键字搜索" />
				<text @click="getorder">搜索</text>
			</view>
		</view>
		<view>
			<view class="orderswrap" v-if="val=='订单管理'">
				<view class="orderview orderviewone">
					<view @click="allorder">{{alldata}}
						<image src="../../../../static/img/down.png" class="iconarrowright" />
					</view>
				</view>
				<view class="orderview">
					<view @click="statustab">{{status}}
						<image src="../../../../static/img/down.png" class="iconarrowright" />
					</view>
				</view>
			</view>
			<view class="orderswrap" v-if="val=='效绩统计'">
				<view class="orderview orderviewone">
					<view>统计人员</view>
				</view>
				<view class="orderview" @click="chageTime">
					<view style="color: #1296DB;">{{m}}月</view>
				</view>
			</view>
		</view>
		<uni-popup ref='uniPopup' type="top">
			<view class="popup-wrap">
				<view @click="order('订单管理')">订单管理</view>
				<view @click="order('效绩统计')">效绩统计</view>
			</view>
		</uni-popup>

		<uni-popup ref='allorder' type="bottom">
			<view class="allorderlist">
				<text>订单筛选</text>
				<text @click="closelist">取消</text>
			</view>
			<view class="ordercount">
				<view @click="clickorder('全部订单',1)">全部订单</view>
				<view @click="clickorder('加急订单',0)">加急订单</view>
				<view @click="clickorder('普通订单',-1)">普通订单</view>
			</view>
		</uni-popup>
		<uni-popup ref='completed' type="bottom">
			<view class="allorderlist">
				<text>状态筛选</text>
				<text @click="closelist">取消</text>
			</view>
			<view class="ordercount">
				<view @click="completed('全部状态',-1)">全部状态</view>
				<view @click="completed('待完成'),0">待完成</view>
				<view @click="completed('已完成',1)">已完成</view>
				<view @click="completed('已驳回',2)">已驳回</view>
			</view>
		</uni-popup>
		<scroll-view scroll-y="true" @scrolltolower='loadmore' lower-threshold="lowerThreshold" scroll-with-animation="true">
			<view class="datawrap" v-for="(list,index) in  listArr" :key='index' v-if="val=='订单管理'">
				<view class="datawrap-left">
					<view class="datawrap-title">{{list.Title}}</view>
					<view class="datawrap-code">{{list.Sid}}</view>
					<view class="datawrap-time">{{list.StartTime}}-{{list.EndTime}}</view>
				</view>
				<view>
					<cmd-progress :width="30" type="circle" :percent="list.rate"></cmd-progress>
				</view>
			</view>

			<view class="performance-wrap" v-if="val=='效绩统计'">
				<view class="performance" v-for="(data,index) in perList" :key='index'>
					<text>{{data.MemberName}}</text>
					<text>逾期比例 {{data.MemberOrderNum}}</text>
				</view>
			</view>
		</scroll-view>
		<!-- 无订单 -->
		<view class="nonewrap" v-show="None">
			<image src="../../../../static/img/nothing.png" mode="widthFix"></image>
		</view>
		<uni-popup ref="popup" type="center">
			<uni-calendar :insert="true" :range='ranges' @change='changedate' />
			<button class="buttsucc" @click="closePopup">确定</button>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import production from '@/services/production.js';
	import util from '@/common/util.js'
	import {
		_data,
		_methods
	} from '@/common/public.js';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				..._data,
				val: '订单管理',
				alldata: '全部订单',
				status: '全部状态',
				isurgentval: 1,
				resultval: -1,
				listArr: [],
				inputval: '',
				perList: [],
				None: true,
				ranges: true,
				startTime: util.getDate(),
				endTime: util.getDate(),
				Time: '',
				m: '10'
			};
		},
		onLoad() {
			this.getorder();
			console.log(this.date);
		},
		methods: {
			// 订单切换
			order(val) {
				uni.setNavigationBarTitle({
					title: val,
				});
				if (val == '效绩统计') {
					this.statistics();
				} else {
					this.getorder();
				}
				this.$refs.uniPopup.close();
				this.val = val;
			},
			// 全部订单切换
			allorder() {
				this.$refs.allorder.open();
			},
			// 选择订单
			clickorder(value, index) {
				this.alldata = value;
				this.isurgentval = index;
				this.$refs.allorder.close();
				this.getorder();
			},
			statustab() {
				this.$refs.completed.open();
			},
			completed(value, index) {
				this.status = value;
				this.resultval = index;
				this.$refs.completed.close();
				this.getorder();
			},
			closelist() {
				this.$refs.allorder.close();
				this.$refs.completed.close();
			},
			seach(e) {
				this.inputval = e.detail.value;
			},
			// 订单管理
			getorder() {
				uni.showLoading({
					title: '请稍后...',
					mask: true
				})
				let data = {
					result: this.resultval,
					start: '',
					end: '',
					page: this.page,
					isUrgent: this.isurgentval,
					sortType: '-1',
					key: this.inputval
				}
				production.original(data).then(res => {
					// console.log(res);
					uni.hideLoading();
					if (res.Flag) {
						if (res.Content.List.length != 0) {
							for (let i = 0; i < res.Content.List.length; i++) {
								this.listData.push(res.Content.List[i]);
							}
							this.listArr = this.listData;
							this.None = false;
						} else if (this.listArr != '') {
							uni.showToast({
								title: '暂无数据',
								image: 'none',
								mask: true
							})
						} else {
							this.None = true;
						}
					} else {
						uni.showToast({
							title: res.Flag,
							image: 'none',
							mask: true
						})
					}
				})
			},
			// 效绩统计
			statistics() {
				uni.showLoading({
					title: '请稍后...',
					mask: true
				})
				let data = {
					start: this.startTime,
					end: this.endTime,
					selectIds: ''
				}
				production.statistics(data).then(res => {
					// console.log(res)
					uni.hideLoading();
					if (res.Flag) {
						this.perList = res.Content;
						if (this.perList != '') {
							this.None = false;
						} else {
							this.None = true;
						}
					} else {
						uni.showToast({
							title: res.Flag,
							image: 'none',
							mask: true
						})
					}
				})
			},
			// 选择时间
			chageTime() {
				this.$refs.popup.open();
			},
			changedate(t) {
				this.Time = t;
			},
			// 确定
			closePopup() {
				this.m = this.Time.month;
				this.startTime = this.Time.range.begin;
				this.endTime = this.Time.range.end;
				this.$refs.popup.close();
				this.statistics();
			},
			// 加载更多
			loadmore() {
				this.page++;
				this.production()
			},
			onNavigationBarButtonTap() {
				this.$refs.uniPopup.open();
			}
		},
	}
</script>

<style lang="scss">
	.regulate {
		font-size: 30upx;

		.seachwrap {
			background: rgb(47, 163, 218);
			padding: 30upx;

			.seachwrapchilder {
				background: #fff;
				border-radius: 50px;
				box-sizing: border-box;
				padding: 10upx 30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #666;

				.iconsearch {
					font-size: 40upx;
					color: rgb(47, 163, 218);
				}

				input {
					width: 75%;
					text-align: left;
					font-size: 28upx;
					border-right: 1upx solid #eee;
				}
			}
		}

		.orderswrap {
			display: flex;
			justify-content: space-between;
			border-bottom: 16upx solid #eee;

			.orderview {
				padding: 20upx 0;
				text-align: center;
				align-items: center;
				width: 50%;

				.iconarrowright {
					width: 20upx;
					height: 20upx;
					margin-left: 4upx;
				}
			}

			.orderviewone {
				border-right: 1upx solid #eee;
			}
		}

		.popup-wrap view:nth-child(1) {
			padding-bottom: 20upx;
		}

		.allorderlist {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20upx;
			border-bottom: 1upx solid #eee;
			color: #47A3D9;
			font-size: 26upx;
		}

		.ordercount view {
			padding-top: 20upx;
			color: #333;
		}

		.nonewrap {
			position: absolute;
			top: 40%;
			left: 0;
			width: 100%;

			image {
				display: block;
				width: 150upx;
				margin: 10upx auto;
			}
		}

		.datawrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12upx 40upx;
			border-bottom: 1upx solid #eee;

			.datawrap-left {
				display: inline-block;
				width: 500upx;

				view {
					padding: 6upx 0;
				}

				.datawrap-title {
					color: #333;
				}

				.datawrap-code {
					font-size: 28upx;
					color: #787878;
				}

				.datawrap-time {
					font-size: 26upx;
					color: #999;
				}
			}

			.datawrap-right {
				// display: inline-block;
			}
		}

		.performance {
			padding: 30upx 40upx;
			border-bottom: 1upx solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			color: #787878;

			text {
				display: inline-block;
				width: 50%;
				text-align: center;
			}
		}
	}
</style>
