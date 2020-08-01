<template>
	<view class="parts_category_wrap" :style="{'min-height':height+ 'px'}">
		<view class="parts_category_list">
			<view :class="i==0?'parts_category_list_blocks':'parts_category_list_block'" v-for="(item,i) in list.sub" @click="go_addGoods(item)" :key="i">
				{{item.classify_name}}
				<view style="flex: 1;"></view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				height: 0,
				list: {}
			}
		},
		methods: {
			go_addGoods(data){
				uni.setStorageSync('parts_category', {
					send_data:data.Id,
					send_name:data.classify_name
				});
				uni.navigateBack({
					delta:2
				})
				
			}
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.height = windowHeight
		},
		onShow() {
			var _self = this;
			uni.getStorage({
				key:'category',
				success: function (res) {
						_self.list = res.data
				        console.log('这是获取key中的内容',_self.list)
				    }
			})
		},
		created() { //生命周期里接收参数
			// this.state = json.parse(this.$route.query.state)//接受参数关键代码
			// console.log(this.state.sub)
		}
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
