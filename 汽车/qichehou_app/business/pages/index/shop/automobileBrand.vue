<template>
	<view class="parts_brand_wrap" :style="{'min-height':height+ 'px'}">
		<view style="padding: 0 19px;height: 40px;line-height: 40px;font-size:14px;font-family:Source Han Sans CN;font-weight:400;color:rgba(0,0,0,1);background-color: #FFFFFF;display: flex;">
			<view style="flex: 1;">
				通用件
			</view>
			<view>
				<u-icon name="arrow-right" size="20"></u-icon>
			</view>
		</view>
		<view class="parts_brand_list">
			<view class="parts_brand_list_block" v-for="(item,i) in barndList" :key="i">
				<view class="parts_brand_list_block_title">
					{{item.title}}
				</view>
				<view class="parts_brand_list_block_list">
					<view :class="[i%4!=3||i==0?'parts_brand_list_block_list_left':'']" v-for="(items,i) in item.data" :key="i" style="width: 25%;padding: 15px 17px;border-bottom: 1px solid rgba(167,167,167,0.47843137254901963);position: relative;" @click="select(items)">
						<view style="width: 18px;height: 18px;position: absolute;top: 0;right: 0;" v-if="items.state">
							<image src="../../../static/img/index/duihao.png" style="width: 18px;height: 18px;"></image>
						</view>
						<view style="width: 60px;height: 60px;margin: 0 auto;">
							<image :src="items.img" style="width: 60px;height: 60px;"></image>
						</view>
						<view style="height:22px;line-height: 22px;font-family:Source Han Sans CN;font-weight:500;color:rgba(68,68,68,1);text-align: center;">
							{{items.car_brand_name}}
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		<view style="height: 55px;"></view>
		<view style="height: 55px;width: 100%;position: fixed;bottom: 0px;background:rgba(241,241,241,1);padding: 7px 19px;">
			<view style="width: 100%;background-color: #4779F2;border-radius:20px;height: 41px;line-height: 41px;text-align: center;font-size:16px;font-family:Source Han Sans CN;font-weight:400;color: #FFFFFF;" @click="queding">确定</view>
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
				barndList:[],
				data:[]
			}
		},
		methods: {
			select(data){
				console.log("11")
				console.log(data)
				for(var i=0;i<this.barndList.length;i++){
					if(this.barndList[i].title==data.car_brand_photo.substr(0, 1).toUpperCase()){
						for(var j=0;j<this.barndList[i].data.length;j++){
							if(this.barndList[i].data[j].Id==data.Id){
								if(this.barndList[i].data[j].state==undefined){
									this.barndList[i].data[j].state=1
									console.log(this.barndList[i].data[j])
									this.barndList.push()
									this.data.push(this.barndList[i].data[j])
								}else{
									this.barndList[i].data[j].state=undefined
									console.log(this.barndList[i].data[j])
									this.barndList.push()
									for(var k=0;k<this.data.length;k++){
										if(this.barndList[i].data[j].Id==this.data[k].Id){
											this.data.splice(k,1)
										}
										
									}
								}
							}
						}
					}
				}
			},
			queding(){
				var name = []
				var id = []
				for(var i=0;i<this.data.length;i++){
					name.push(this.data[i].car_brand_name)
					id.push("#"+this.data[i].Id+"#")  
				}
				
				name = name.join("、")
				id = id.join("@")
				console.log(name)
				console.log(id)
				uni.setStorageSync('automobileBrand', {
					name:name,
					id:id
				});
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
			Services.get_car_brand_list().then(res => {
				console.log("汽车品牌列表")
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
