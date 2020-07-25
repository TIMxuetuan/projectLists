<template>
	<view class="overhidden">
		<view class="nav_wrap">
			<view class="seachwrap">
				<text class="iconsearch"></text>
				<text class="input" @click="seachpeaple">输入关键字查询</text>
			</view>
			<!-- <view class="navwrap">
				<text>智业科技</text>
			</view> -->
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
				<view class="foldlist">
					<view class="foldlistview" v-for="(item,wraplistindex) in wraplist" :key="wraplistindex">
						<view class="foldlistviewchilder" @click="rotateright(wraplistindex,item.open)">
							<image class="iconarrowright" :class="item.open==true?'rotu':'norotu'" src="../../../../static/img/triangle.png"
							 mode=""></image>
							<text>{{item.Name}} [{{item.Children.length}}]</text>
						</view>
						<view v-for="(items,index) in item.Children" :key="index" v-if="item.open">
							<view class="foldlistviewchilder foldlistviewchilder2" @click="getlistdata(items.Open,index,item.Children,item.Children[index].Id)">
								<image class="iconarrowright" :class="items.Open==true?'norotu':'rotu'" src="../../../../static/img/triangle.png"
								 mode=""></image>
								<text>{{items.Name}}</text>
								<!-- <text class="iconarrow-right" :class="items.Open==true?'norotu':'rotu'"></text> -->
							</view>
							<view class="childerlist" v-for="(itemlist,childerindex) in listdata" :key="childerindex" v-if="items.Open==0"
							 @click="phoneFunction(itemlist.Id)">
								<view class="peoplelistcount">
									<view>
										<image :src="itemlist.Header.indexOf('/Backbone/')>-1?config.api_path+itemlist.Header:itemlist.Header"></image>
										<text>{{itemlist.Name}}</text>
										<text class="adminitext">（{{itemlist.Position}}）</text>
									</view>
									<text class="iconarrow-right"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="footerwrap">
			<text @click="addpeaple">添加员工</text>
			<text @click="addbumen">添加部门</text>
		</view> -->
	</view>
</template>

<script>
	import {
		uniCollapse,
		uniCollapseItem
	} from '@dcloudio/uni-ui';
	import {
		_data,
		_methods
	} from '@/common/public.js';
	import daily from '@/services/daily.js';
	import _config from '@/config.js';
	export default {
		data() {
			return {
				wraplist: [],
				listdata: [],
				val: '',
				config: Object,
				master:[],
			}
		},
		components: {
			uniCollapse,
			uniCollapseItem
		},
		mounted() {
			this.config = _config;
			let that=this;
			uni.showLoading({
				title: '请稍后...',
				mask: true
			})
			daily.organization({
				type: 0
			}).then(res => {
				uni.hideLoading();
				if (res.Flag) {
					for (let i = 0; i < res.Content.length; i++) {
						res.Content[i].open = false;
						res.Content[i].Children.forEach(function(data,index){
							that.master.push(data.Attributes.master[0]);
						})
					}
					this.wraplist = res.Content;
				}
			})
		},
		methods: {
			// input值
			inputvalue(e) {
				this.val = e.detail.value
			},
			// 添加员工
			addpeaple() {
				uni.navigateTo({
					url: '../../compile_staff/compile_staff'
				})
			},
			// 添加部门
			addbumen() {
				uni.navigateTo({
					url: './addbumen/addbumen'
				})
			},
			// 查找
			seachpeaple() {
				uni.navigateTo({
					url: './seach/seach'
				})
			},
			rotateright(wraplistindex, open) {
				this.wraplist[wraplistindex].open = !this.wraplist[wraplistindex].open
			},
			getlistdata(open, index, childerindex, ids) {
				let that = this;
				let masterIndex=this.master[index];
				that.listdata = [];
				for (let i = 0; i < childerindex.length; i++) {
					if (i == index) {
						childerindex[index].Open = !childerindex[index].Open;
					} else {
						childerindex[i].Open = 1;
					};
				}
				if (open == 1 || open == true) {
					daily.getpeaple(ids).then(res => {
						if (res.Flag && res.Content.Members != '') {
							res.Content.Members.forEach(function(data, i) {
								if (data.Id == masterIndex && i != 0) {
									res.Content.Members.unshift(res.Content.Members.splice(i, 1)[0]);
								}
							})
							that.listdata = res.Content.Members
						}
					})
				}
			},
			phoneFunction(phone) {
				uni.navigateTo({
					url: '../../../phones/phone-details?uid=' + phone
				})
			}
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
		width: 90%;
		border-radius: 50px;
		margin: 0 auto;
		margin-bottom: 20upx;
		font-size: 28upx;
		color: #eee;
		text-align: center;
		padding: 0 30upx;
		background: #fff;

		.iconsearch {
			color: #BAE6FF;
		}
	}

	.seachwrap .seachbutt {
		font-size: 30upx !important;
		color: #eee !important;
		border-left: 1upx solid #ddd;
		box-sizing: border-box;
		padding-left: 20upx;
	}

	.seachwrap .input {
		display: inline-block !important;
		width: 76% !important;
		height: 60upx !important;
		line-height: 60upx;
		font-size: 30upx !important;
		text-align: left;
		margin-left: 20upx;
		color: #B7B7B7;
	}

	.navwrap {
		font-size: 28upx;
		color: #707070;
		box-sizing: border-box;
		padding-bottom: 20upx;
		width: 90%;
		margin: 0 auto;
	}

	.navwrap text {
		display: inline-block;
		margin-right: 10upx;
	}

	.nav_wrap {
		padding: 10upx 0;
		background: rgb(47, 163, 218);
	}

	.nav_wrap,
	.peoplelist {
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

		}
	}

	.peoplelistcount {
		border-bottom: 1rpx solid #eee;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
		padding: 10upx 60upx;
		padding-right: 20upx;
		font-size: 28upx;
		color: #101010;
	}

	.peoplelistcount view {
		display: flex;
		align-items: center;
	}

	.peoplelistcount image {
		display: inline-block;
		box-sizing: border-box;
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		overflow: hidden;
		margin: 10upx;
		margin-right: 20upx;
	}

	.adminitext {
		// margin-left: 20upx;
		display: inline-block;
		color: #09B8F2;
		box-sizing: border-box;
		// border: 1upx solid #09B8F2;
		font-size: 24upx;
		border-radius: 12upx;
		padding: 0 6upx;
	}

	.seachwrap text {
		font-size: 40upx;
		color: #666;
	}

	.foldwrap {
		box-sizing: border-box;
		padding: 0;
		font-size: 28upx;
		color: #101010;

		.foldlist .foldlistview {
			box-sizing: border-box;
			padding: 30upx 20upx;
			padding-top: 0;
			// display: flex;
			// align-items: center;
			// justify-content: space-between;

		}

		.foldlistviewchilder {
			box-sizing: border-box;
			padding: 30upx 20upx;
			display: flex;
			align-items: center;
			// justify-content: space-between;
			border-bottom: 1upx solid #eee;
		}

		.foldlistviewchilder2 {
			padding-left: 40upx;

		}

		.childerlist {
			border-bottom: 1upx solid #eee;
		}

		.peoplelistcount:last-child {
			border: none;
		}

		.foldlist:last-child {
			border: none;
		}

		.foldlist .iconarrow-right {
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

	.uni-page-body {
		height: auto !important;
		min-height: auto !important;
	}

	.iconphone {
		font-size: 28upx;
	}

	.iconarrowright {
		display: inline-block;
		width: 16upx;
		height: 16upx;
		margin-right: 10upx;
	}
</style>
