<template>
	<view class="parts_brand_wrap" :style="{'min-height':height+ 'px'}">
		
		<view class="parts_brand_list">
			<view class="parts_brand_list_block" v-for="(item,i) in barndList" :key="i">
				<view class="parts_brand_list_block_title">
					{{item.title}}
				</view>
				<view class="parts_brand_list_block_list">
					<view :class="[i%4!=3||i==0?'parts_brand_list_block_list_left':'']" v-for="(items,i) in item.data" :key="i" style="width: 25%;padding: 15px 17px;border-bottom: 1px solid rgba(167,167,167,0.47843137254901963);" @click="select(items)">
						<view style="width: 60px;height: 60px;margin: 0 auto;">
							<image :src="items.img" style="width: 60px;height: 60px;"></image>
						</view>
						<view style="height:22px;line-height: 22px;font-family:Source Han Sans CN;font-weight:500;color:rgba(68,68,68,1);text-align: center;">
							{{items.parts_brand_name}}
						</view>
					</view>
					
				</view>
				
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
				barndList:[]
			}
		},
		methods: {
			select(data){
				var sendData = {
					Id:data.Id,
					parts_brand_name:data.parts_brand_name
				}
				uni.setStorageSync('selectBrand', sendData);
				uni.navigateBack({
					delta:1
				})
				// this.$u.route({
				// 	url: 'pages/index/shop/addGoods',
				// 	params: {
				// 		selectBrand: JSON.stringify(sendData)
				// 	}
				// })
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
			Services.get_parts_brand_list().then(res => {
				console.log("配件品牌列表")
				console.log(res.data)
				this.barndList = res.data
			})
		},
	}
</script>

<style lang="scss" scoped>
	.parts_brand_wrap{
		background-color: #E5E5E5;
		padding: 2px 0 10px 0;
		.parts_brand_list{
			.parts_brand_list_block{
				.parts_brand_list_block_title{
					padding: 0 19px;
					height: 40px;
					line-height: 40px;
					font-size:12px;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(68,68,68,1);
				}
				.parts_brand_list_block_list{
					background-color: #FFFFFF;
					display: flex;
					 flex-wrap: wrap;
					.parts_brand_list_block_list_block{
						width: 25%;
						.parts_brand_list_block_list_block_img{
							width: 75%;
							height: 35px;
							margin: 0 auto;
						}
					}
					.parts_brand_list_block_list_top{
						border-bottom: 1px solid rgba(167,167,167,0.47843137254901963);
					}
					.parts_brand_list_block_list_left{
						border-right: 1px solid rgba(167,167,167,0.47843137254901963);
					}
				}
			}
		}
	}
</style>
