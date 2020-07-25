<template>
	<view class="allwrap">
		<view>
			<view class="statisticstitle">OA统计</view>
			<view class="statistics">
				<view class="listwrap">
					<text>新增任务</text>
					<text>{{add}}个</text>
				</view>
				<view class="listwrap">
					<text>完成任务</text>
					<text>{{finish}}个</text>
				</view>
				<view class="listwrap">
					<text>未完成任务</text>
					<text>{{nosuccess}}个</text>
				</view>
				<view class="listwrap" style="border: none;">
					<text>审批流量</text>
					<text>{{examine}}个</text>
				</view>
			</view>
		</view>

		<view>
			<view class="statisticstitle">CRM统计</view>
			<view class="statistics">
				<view class="listwrap">
					<text>新增客户</text>
					<text>{{Customer}}个</text>
				</view>
				<view class="listwrap">
					<text>新增联系人</text>
					<text>{{Contact}}个</text>
				</view>
				<view class="listwrap">
					<text>客户跟进</text>
					<text>{{TrackRecord}}个</text>
				</view>
				<view class="listwrap">
					<text>新增机会</text>
					<text>{{Chance}}个</text>
				</view>
				<view class="listwrap" style="border: none;">
					<text>新增合同</text>
					<text>{{Contract}}个</text>
				</view>
			</view>
		</view>
		<view>
			<uni-popup ref="popup" type="center">
				<uni-calendar :insert="true" @change='changedate' />
				<button class="buttsucc" @click="closePopup">确定</button>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods
	} from '@/common/public.js';
	import report from '@/services/report.js';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				add: 0, //新增
				finish: 0, //完成
				nosuccess: 0, //未完成
				examine: 0, //审批
				Contact: 0, //number	新增联系人
				Chance: 0, //number	新增机会
				Contract: 0, //	number	新增合同
				Customer: 0, //	number	新增客户
				TrackRecord: 0, //
				date_val: ''
			}
		},
		components: {
			uniPopup
		},
		mounted() {
			var _this = this;
			var day2 = new Date(),
				startenddate = day2.getFullYear() + "-" + ((day2.getMonth() + 1) < 10 ? "0" + (day2.getMonth() + 1) : (day2.getMonth() +
					1)) + "-" + (day2.getDate() < 10 ? "0" + day2.getDate() : day2.getDate()); //当前时间
			uni.setNavigationBarTitle({
				title: '简报' + '(' + startenddate + ')'
			});
			this.date_val = startenddate
			this.getdata()
		},
		methods: {
			changedate(e) {
				this.date_val = e.year + "-" + (e.month < 10 ? "0" + e.month : e.month) + "-" + (e.date < 10 ? "0" + e.date : e.date);
				uni.setNavigationBarTitle({
					title: '简报' + '(' + this.date_val + ')'
				});
				this.getdata()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onNavigationBarButtonTap() {
				this.$refs.popup.open()
			},
			getdata() {
				var _this = this;
				report.getOAdata({
					start: this.date_val,
					end: this.date_val
				}).then(res => {
					console.log(res)
					if (res.Flag == true) {
						_this.add = res.Content.tc_add
						_this.finish = res.Content.tc_finnish
						_this.nosuccess = res.Content.tc_todo
						_this.examine = res.Content.wf_c
					} else {
						uni.showModal({
							title: '提示',
							content: res.Content
						});
						return;
					}
				});
				report.getCRMdata({
					start: this.date_val,
					end: this.date_val
				}).then(res => {
					console.log(res)
					if (res.Flag == true) {
						_this.Contact = res.Content.Contact
						_this.Chance = res.Content.Chance
						_this.Contract = res.Content.Contract
						_this.Customer = res.Content.Customer
						_this.TrackRecord = res.Content.TrackRecord
					} else {
						uni.showModal({
							title: '提示',
							content: res.Content
						});
						return;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	page {
		background: #F6F6F6;
	}

	.allwrap {
		box-sizing: border-box;
		padding: 30upx 20upx;
		background: $uni-bg-color-grey;
		min-height: 100vh;
		.datewrap {
			text-align: center;
			font-size: 28upx;
			padding: 10upx 0px;
		}

		.statistics {
			background: #fff;
			font-size: 28upx;
			// border: 1upx solid #eee;
			overflow: hidden;
			box-sizing: border-box;
			color: #787878;
			margin-bottom: 60upx;

			.listwrap {
				box-sizing: border-box;
				padding: 20upx 20upx;
				border-bottom: 1upx solid #eee;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

		}
	}

	.statisticstitle {
		font-size: 28upx;
		padding: 0 10upx;
		margin: 20upx 0;
		border-left: 8upx solid #1F75E5;
		color: #333333;
	}

	.buttsucc {
		background: #2E87C0 !important;
		color: #fff;
	}
</style>
