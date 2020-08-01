<template>
	<view class="fast_location_wrap" :style="{'min-height':height+ 'px'}">
		<view class="">
			<map></map>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				height:0,
				logoShow:false,
				
			}
		},
		methods: {
			shop_logo_show(data){
				if(data==0){
					this.logoShow = true
				}else if(data==1){
					this.logoShow = false
				}
			},
			go_shop_address(){
				this.$u.route({
								url: 'pages/index/shop/shopAddress',
							})
			}
		},
		onLoad() {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.height = windowHeight
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
					console.log("000000")
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
		},
	}
</script>

<style lang="scss" scoped>
	.fast_location_wrap{
		background-color: #E5E5E5;
	}
</style>
