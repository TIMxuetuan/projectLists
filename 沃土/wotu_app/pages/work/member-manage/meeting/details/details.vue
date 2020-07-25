<template>
	<view>
		<view class="listwrap">
			<image src="../../../../../static/img/naozhong.png"></image>
			<view class="count">
				<text>{{title}}</text>
				<text>{{date}}</text>
			</view>
		</view>
		<view class="countwrap" v-for="(item,index) in wrowrap" :key='index'>
			<!-- <view class="title">工作内容</view> -->
			<!-- <view class="neirong">{{item.Name}}</view> -->

			<view class="title">{{item.Name}}</view>
			<view>
				<view class="counttitle counttitlewrap">
					<text style="width: 30%;">内容细分</text>
					<text>进度</text>
					<text>权重</text>
					<text>负责人</text>
					<text style="border: none;width: 30%;">时间</text>
				</view>
				<view class="counttitle counttitle2" v-for="(childerdata,childindex) in item.childerDatas" :key='childindex'>
					<text style="width: 30%;">{{childerdata.Content}}</text>
					<view class="views">
						<cmd-progress :width="25" type="circle" :percent="childerdata.Progress"></cmd-progress>
					</view>
					<text style="color: #10AEFF;">{{childerdata.Weights}}分</text>
					<text>{{childerdata.ExecutorName}}</text>
					<text style="border: none;width: 30%;">{{childerdata.month+'月'+childerdata.day+'日'}}</text>
				</view>
			</view>
		</view>
		<view class="counttitle counttitle2 counttitle3">
			<text style="width: 30%;">汇总</text>
			<text></text>
			<text style="color: #10AEFF">{{totalPoints != ""? (totalPoints != null ? totalPoints: 0):0}}分</text>
			<text></text>
			<text style="border: none;width: 30%;"></text>
		</view>
	</view>
</template>
<script>
	import daily from '@/services/daily.js';
	export default {
		data() {
			return {
				title: '',
				date: '',
				wrowrap: [],
				childerData: [],
				childerdata: '',
				totalPoints: "",
				contenList: [],
				Project: "",
				allList: [],
				wang_id: "",
			}
		},
		onLoad(id) {
			var that = this
			console.log(id)
			this.title = id.name;
			this.date = id.date;
			uni.showLoading({
				title: '请稍后...',
				mask: true
			})
			daily.details(id.id).then(res => {
				// console.log(res)
				uni.hideLoading();
				if (res.Flag) {
					var arr_id = [],
						list = [];
					var subsetData = []
					var childerDatas = []
					let rum = 0
					let two_id = []
					var childerData = []
					list = res.Content
					for (var i = 0; i < res.Content.length; i++) {
						two_id.push(res.Content[i].Id);
					}
					// console.log(two_id)
					arr_id = two_id
					two_id.forEach(function(v, index) {
						daily.xifendetails(v).then(reschilder => {
							list[index].childerDatas = reschilder.Content
							if (index + 1 == res.Content.length) {
								that.wrowrap = list;
							}
							reschilder.Content.forEach(function(data, index) {
								console.log("一共二级数据", data)
								rum += data.Weights * 1
								data.month = new Date(data.EndTime).getMonth();
								data.day = new Date(data.EndTime).getDay();
							})
							console.log("分数",rum)
							that.totalPoints = rum
						})
						// console.log(list)
						that.getCenterList(v, list[index])
					});

				}
			})

		},
		methods: {


			//获得中间二级的项目内容
			getCenterList(v, listOne) {
				var that = this
				daily.details(v).then(res => {
					// console.log(res) //获得的项目名称，中间的
					if (res.Content != '') {
						for (var i = 0; i < res.Content.length; i++) {
							// that.contenList.push(res.Content[i])
							console.log(res.Content[i])
							// that.contenList = res.Content[i]
							that.wang_id = res.Content[i].Id;
							// console.log("中间id和内容",that.wang_id,that.contenList)
							that.getThreeList(res.Content[i], listOne)

						}

					}

				})
			},

			//根据中间第二级的id得到第三级内容详情
			getThreeList(twoListOne, listOne) {
				// console.log("第三级id和内容",this.wang_id,this.contenList)
				var that = this
				daily.xifendetails(that.wang_id).then(reschilder => {
					// console.log("根据二级获得的三级数据",reschilder.Content) //数据已经全部出来 遍历根据Project 向上推
					reschilder.Content.forEach(function(data, index) {
						// console.log("三级数据遍历",data)
						that.jointTwoThree(data, twoListOne, listOne)
						that.totalPoints += data.Weights * 1
						data.month = new Date(data.EndTime).getMonth();
						data.day = new Date(data.EndTime).getDay();
					})
					console.log("分数",that.totalPoints)
				})
			},

			//将三级遍历出的数据  与 二级进行对接
			jointTwoThree(data, twoListOne, listOne) {
				var that = this
				console.log(data, twoListOne)
				if (data.Project == twoListOne.Id) {
					twoListOne.childerData = data
					// console.log(twoListOne)
					if (listOne.Id == twoListOne.Parent) {
						listOne.childerDatas.push(twoListOne.childerData)
						// console.log("单个", listOne)
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	.listwrap {
		font-size: 24upx;
		color: #000;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 20upx 40upx;
		border-bottom: 1upx solid #eee;

		.count {
			width: 90%;
		}

		.count text {
			display: block;
			padding: 4upx 0px;
		}

		.count text:nth-child(1) {
			font-size: 30upx;
		}

		.count text:nth-child(2) {
			color: #787878;
		}
	}

	.listwrap image {
		width: 40upx;
		height: 40upx;
		margin-right: 20upx;
	}

	.countwrap {
		font-size: 28upx;
		color: #787878;
		border: 1upx solid #ADADAD;
		box-sizing: border-box;
		width: 96%;
		margin: 20upx auto;
		margin-bottom: 50upx;


	}

	.title {
		box-sizing: border-box;
		padding: 14upx 20upx;
		background: #09B8F2;
		color: #fff;
	}

	.neirong {
		box-sizing: border-box;
		padding: 20upx 20upx;
	}

	.counttitle {
		background: #eee;
		color: #333;
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #eee;
	}

	.counttitle2 {
		background: #fff;
		color: #787878;
	}

	.counttitle3 {
		border: 1upx solid #ADADAD;
		width: 96%;
		margin: 20upx auto;
	}

	.counttitle text,
	.views {
		padding: 14upx 4upx;
		border-right: 1upx solid #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 15%;
		text-align: center;
		flex-wrap: wrap;
	}

	.counttitlewrap text {
		border-right: 1upx solid #fff;
	}
</style>
