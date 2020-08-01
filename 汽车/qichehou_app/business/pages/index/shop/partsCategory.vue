<template>
	<view class="parts_category_wrap" :style="{'min-height':height+ 'px'}">
		<view class="parts_category_list">
			<view :class="i==0?'parts_category_list_blocks':'parts_category_list_block'" v-for="(item,i) in partsCategoryList" @click="go_nextPage(item)" :key="i">
				{{item.classify_name}}
				<view style="flex: 1;"></view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import Services from '../../../services/app.js';
	export default {
		components: {
	
		},
		data() {
			return {
				height:0,
				partsCategoryList:[
					"轮胎",
					"点火系",
					"油品",
					"轮胎",
					"点火系",
					"油品",
					"轮胎",
					"点火系",
					"油品",
					"轮胎",
					"点火系",
					"油品",
					"轮胎",
					"点火系",
					"油品",
					"轮胎",
					"点火系",
					"油品",
					"轮胎",
					"点火系",
					"油品",
				]
			}
		},
		methods: {
			go_nextPage(data){
				var _self = this;
				uni.setStorage({
					key:'category',
					data:data
				})
				this.$u.route({
					url: 'pages/index/shop/nextPage'
				})
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
			Services.get_cclassify_list().then(res => {
				console.log("汽车品牌列表")
				console.log(res.data)
				this.partsCategoryList = res.data
			})
		},
	}
</script>

<style lang="scss" scoped>
	.parts_category_wrap{
		background-color: #E5E5E5;
		padding: 2px 0 10px 0;
		.parts_category_list{
			background-color: #FFFFFF;
			padding: 0 19px;
			.parts_category_list_block{
				height: 54px;
				line-height: 54px;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(68,68,68,1);
				border-top: 1px solid #E5E5E5;
				display: flex;
			}
			.parts_category_list_blocks{
				height: 54px;
				line-height: 54px;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(68,68,68,1);
				display: flex;
			}
		}
	}
</style>
