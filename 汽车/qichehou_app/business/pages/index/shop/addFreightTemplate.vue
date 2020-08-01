<template>
	<view class="add_freight_template" :style="{'min-height':height+ 'px'}">
		<view class="add_freight_template_block" v-if="this.state==1">
			<view class="block-title">
				默认(除指定地区外)运费：
			</view>
			<view class="block-top">
				<view class="top-input">
					<u-input v-model="body.number" type="text" :border="border" placeholder="1"/>
				</view>
				<view class="top-txt">
					件内
				</view>
				<view class="top-input">
					<u-input v-model="body.freight" type="text" :border="border" placeholder="0.00" />
				</view>
				<view class="top-txt">
					元
				</view>
			</view>
			<view class="block-bottom">
				<view class="boottom-txt" placeholder="1">
					每增加
				</view>
				<view class="" style="width: 200rpx;">
					<u-input v-model="body.additional" type="text" :border="border" />
				</view>
				<view class="boottom-txt">
					件,运费增加
				</view>
				<view class="" style="width: 200rpx;">
					<u-input v-model="body.additional_freight" type="text" :border="border" placeholder="0.00" />
				</view>
				<view class="boottom-txt">
					元
				</view>
			</view>
		</view>
		<view class="add_freight_template_block" v-if="this.state==2">
			<view class="block-title">
				默认(除指定地区外)运费：
			</view>
			<view class="block-top">
				<view class="top-input">
					<u-input v-model="body.number" type="text" :border="border" placeholder="1.00"/>
				</view>
				<view class="top-txt">
					Kg内
				</view>
				<view class="top-input">
					<u-input v-model="body.freight" type="text" :border="border" placeholder="0.00"/>
				</view>
				<view class="top-txt">
					元
				</view>
			</view>
			<view class="block-bottom">
				<view class="boottom-txt">
					每增加
				</view>
				<view class="" style="width: 200rpx;">
					<u-input v-model="body.additional" type="text" :border="border" placeholder="0.00"/>
				</view>
				<view class="boottom-txt">
					Kg,运费增加
				</view>
				<view class="" style="width: 200rpx;">
					<u-input v-model="body.additional_freight" type="text" :border="border" placeholder="0.00"/>
				</view>
				<view class="boottom-txt">
					元
				</view>
			</view>
		</view>
		<view style="height: 60rpx;"></view>
		<view style="height:80rpx;line-height: 80rpx;background:rgba(71,121,242,1);color: #FFFFFF;text-align: center;border-radius:40rpx;margin: 0 38rpx;font-size:32rpx;font-weight:500;font-family:Source Han Sans CN;" @click="addFreightInsert">完成</view>
	</view>
</template>

<script>
	import Services from '../../../services/app.js';
	import Services_shop from '../../../services/shop.js';
	export default {
		components: {

		},
		data() {
			return {
				height: 0,
				state: null,
				placeholder: '1.00',
				body: {
					"number": null,
					"freight": null,
					"additional": null,
					"additional_freight": null
				},
				id:null,
				is_default_freight:null,
				border:true
			}
		},
		methods: {
			addFreightInsert(){
				
					
				if(this.id==null){
					this.body.number = parseFloat(this.body.number)
					this.body.freight = parseFloat(this.body.freight)
					this.body.additional = parseFloat(this.body.additional)
					this.body.additional_freight = parseFloat(this.body.additional_freight)
					var data = {
						type:parseInt(this.state),
						body:JSON.stringify(this.body)
					}
					console.log("数据参数")
					console.log(data)
					Services.post_freight_insert(data).then(res => {
						console.log(res)
						console.log("`1`1`")
						this.$u.route({
										url: 'pages/index/shop/cloudDistribution',
									})
					})
				}else{
					this.body.number = parseFloat(this.body.number)
					this.body.freight = parseFloat(this.body.freight)
					this.body.additional = parseFloat(this.body.additional)
					this.body.additional_freight = parseFloat(this.body.additional_freight)
					var data = {
						id:this.id,
						type:parseInt(this.state),
						body:JSON.stringify(this.body),
						is_default_freight:this.is_default_freight
					}
					console.log(data)
					Services_shop.post_freight_update(data).then(res => {
						console.log(res)
						console.log("`1`1`")
						// this.$u.route({
						// 				url: 'pages/index/shop/cloudDistribution',
						// 			})
					})
				}
				
				
			}
		},
		onLoad() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.height = windowHeight
			console.log("222")
			
		},
		created() { //生命周期里接收参数
			this.state = this.$route.query.state //接受参数关键代码
			console.log("111")
			if(this.state==3){
				Services_shop.get_one_freight({
					id:this.$route.query.id,
				}).then(res => {
					console.log("获取运费模板")
					console.log(res.Data)
					this.state = res.Data.type
					this.id = res.Data.Id
					this.is_default_freight = res.Data.is_default_freight
					var a = res.Data.body.split(',')
					var b = []
					console.log(a)
					for(var i=0;i<a.length;i++){
						b.push(a[i].replace(/[^0-9]/ig,""))
					}
					this.body = {
					"number": parseInt(b[0]),
					"freight": parseInt(b[1]),
					"additional": parseInt(b[2]),
					"additional_freight": parseInt(b[3])
					}
					console.log(this.body)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add_freight_template {
		background-color: #E5E5E5;

		.add_freight_template_block {
			background-color: #FFFFFF;
			padding: 0 19px 10px 19px;
			.block-title{
				height: 70rpx;
				line-height: 60rpx;
			}
			.block-top{
				display: flex;
				height: 80rpx;
				.top-input{
					width: 200rpx;
				}
				.top-txt{
					height: 74rpx;
					line-height: 74rpx;
				}
			}
			.block-bottom{
				display: flex;
				height: 80rpx;
				.boottom-txt{
					height: 74rpx;
					line-height: 74rpx
				}
			}
		}
	}
</style>
