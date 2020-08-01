<template>
	<view class="container">
		<view class="four-set ly-set">
			<block v-for="item in fourSetLists">
				<view class="four-set-item" @click="gotoPageClick(item.url)">
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</block>
		</view>
		<view class="four-set">
			<view class="four-set-item" @click="deletCache">
				<view class="">清楚缓存</view>
				<view class="">22M<u-icon name="arrow-right"></u-icon></view>
			</view>
			<view class="four-set-item last-set-item" @click="gotoVersion">
				<view class="">版本更新</view>
				<view class="">1.0.0<u-icon name="arrow-right"></u-icon></view>
			</view>
		</view>
		<u-button :custom-style="customStyle"  @click="show = true"  :hair-line="false" >退出登录</u-button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				customStyle:{
					marginTop: '60rpx',
					width:'674rpx',
					height:'80rpx',
					background:'rgba(71,121,242,1)',
					opacity:'1',
					borderRadius:'40rpx',
					color:'#FFFFFF',
					fontSize:'16px'
				},
				fourSetLists:[
				{name:'修改密码',id:1,url:'/pages/my/settings/changePassword'},
				{name:'修改绑定手机号',id:2,url:'/pages/my/settings/phone'},
				{name:'支付密码',id:3,url:'/pages/my/settings/payment'},
				]
			}
		},
		methods: {
			gotoPageClick(url){
				uni.navigateTo({
					url:url
				})
			},
			deletCache(){
				uni.showModal({
					title:'提示',
					content:'确定要清楚缓存吗?',
					success:res=>{
						if(res.confirm){
							console.log('确定')
						}
					}
					
				})
			},
			gotoVersion(){
				uni.navigateTo({
					url:'/pages/my/version'
				})
			},
		},
		
		onLoad() {
			
		},
	}
</script>

<style lang="scss">
	page{
		background:rgba(241,241,241,1);
	}
	.ly-set{
		margin-top:12rpx;
		.four-set-item:last-child{
			border-bottom: 1px solid rgba(167,167,167,0.5);
			
		}
	}
	
	.last-set-item{
		border-bottom:none;
	}
</style>
