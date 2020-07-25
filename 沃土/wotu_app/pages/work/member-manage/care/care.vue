<template>
	<view>
		<view class="tabwrap">
			<text :class="tab==true?'tabwraptext2':'tabwraptext1'" @click="tabclick(0)">生日关怀</text>
			<text :class="tab==true?'tabwraptext1':'tabwraptext2'" @click="tabclick(1)">特殊日期</text>
		</view>
		<view class="countwrap">
			<view class="nav">{{tab==true?"生日提醒":"本月特殊日期关怀员工"}}</view>
			<view class="count">
				<view class="counttitle">
					<text>姓名</text>
					<text>部门</text>
					<text>{{tab==true?"生日":"入职日期"}}</text>
				</view>
				<view class="counttitle counttitle2">
					<text>张三</text>
					<text>技术部</text>
					<text>08-23</text>
				</view>
				<view class="counttitle counttitle2">
					<text>张三</text>
					<text>技术部</text>
					<text>08-23</text>
				</view>
				<view class="counttitle counttitle2">
					<text>张三</text>
					<text>技术部</text>
					<text>08-23</text>
				</view>
				<view class="counttitle counttitle2 allview">
					<text>共计</text>
					<text>3人</text>
				</view>
			</view>
		</view>
		<view class="butt" @click="wish">发送生日祝福邮件</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				tab:true,
			}
		},
		methods:{
			tabclick(e){
				if(e==0){
					this.tab=true;
				}else{
					this.tab=false;
				}
			},
			// 发送祝福
			wish(){
				uni.navigateTo({
					url:'wish/wish?tab='+this.tab
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabwrap{
		display: flex;
		justify-content: center;
		font-size: 28upx;
		border-bottom: 20upx solid #F6F6F6;
		color: #007aff;
		text{
			display: inline-block;
			width: 45%;
			margin: 20upx 0;
			padding: 16upx 0;
			text-align: center;
			box-sizing: border-box;
		}
		text:nth-child(1){
			border-top-left-radius: 8upx;
			border-bottom-left-radius: 8upx;
		}
		text:nth-child(2){
			border-top-right-radius: 8upx;
			border-bottom-right-radius: 8upx;
		}
		.tabwraptext1{
			border: 1upx solid #007aff;
		}
		.tabwraptext2{
			background: #007aff;
			color: #fff;
		}
	}
	.countwrap{
		font-size: 28upx;
		box-sizing: border-box;
		padding: 30upx 20upx;
		.nav{
			border-left: 8upx solid #007aff;
			padding-left: 10upx;
			color: #333333;
		}
	}
	.counttitle {
		background: #5A9CF3;
		color: #fff;
		display: flex;
		justify-content: space-between;
		border-bottom: 0.5upx solid #eee;
	}
	.count{
	 border: 0.5upx solid #eee;
	 border-bottom: none;
	 margin-top: 30upx;
	}
	.counttitle2 {
		background: #fff;
		color: #333;
	}
	.allview text:nth-child(1){
		background: #ECA05E;
		color: #fff;
	}
	.allview text:nth-child(2){
		width: 66%;
	}
	.counttitle text {
		box-sizing: border-box;
		padding: 18upx 4upx;
		border-right: 0.5upx solid #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 33%;
		text-align: center;
		flex-wrap: wrap;
	}
	.butt{
		width: 70%;
		font-size: 32upx;
		font-weight: bold;
		color: #fff;
		padding: 20upx 0;
		text-align: center;
		margin: 50upx auto;
		background: #00D3B8;
		border-radius: 4px;
	}
</style>
