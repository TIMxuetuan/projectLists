<template>
	<view>
		<view class="listwrap" v-for="(item,index) in listdata" :key='index' @click="godeatils(item.date,item.Name,item.Id)">
			<image src="../../../../static/img/naozhong.png"></image>
			<view class="count">
				<text>{{item.Name}}</text>
				<text>{{item.date}} {{item.xingqi==0?"周日":""}}{{item.xingqi==1?"周一":""}}{{item.xingqi==2?"周二":""}}{{item.xingqi==3?"周三":""}}{{item.xingqi==4?"周四":""}}{{item.xingqi==5?"周五":""}}{{item.xingqi==6?"周六":""}} {{item.time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import daily from '@/services/daily.js';
	export default {
		data() {
			return {
				listdata: []
			}
		},
		mounted() {
			let self = this;
			uni.showLoading({
				title: '请稍后...',
				mask: true
			})
			daily.meeting().then(res => {
				// console.log(res)
				uni.hideLoading()
				if (res.Flag && res.Content) {
					for (var i = 0; i < res.Content.length; i++) {
						var date = new Date(res.Content[i].CreateDateTime);
						res.Content[i].date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
						res.Content[i].time = date.getHours() + ':' + date.getMinutes();
						res.Content[i].xingqi = new Date(res.Content[i].date).getDay();
					}
					this.listdata = res.Content
				}
			})
		},
		methods: {
			godeatils(date, name, id) {
				uni.navigateTo({
					url: './details/details?id=' + id + '&name=' + name + '&date=' + date
				})
			},
			onNavigationBarButtonTap() {
				uni.navigateTo({
					url: './apply/apply'
				})
			},


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
</style>
