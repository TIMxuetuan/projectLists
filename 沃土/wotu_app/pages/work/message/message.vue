<template>
	<view class="">
		<view class="headerwrap">
			<image src="/static/img/release.png" mode=""></image>
			<text>张三李四</text>
		</view>
		<view class="tabwrap">
			<text :class="istrue==0?'clicksty':''" @click="colleague">同事信息</text>
			<text :class="istrue==1?'clicksty':''" @click="business">对外名片</text>
		</view>
		<view class="mess_count" v-if="istrue==0">
			<view class="listwrap">
				<text class="smalltext">企业/组织</text>
				<view class="more">
					<text>智业科技</text>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">部门</text>
				<view class="more">
					<text>技术部>技术一部</text>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">职位</text>
				<view class="more moreover">
					<text class="moreoverchilder">java开发工程师，开发很多东西</text>
					<view>
						<text>更多</text>
						<text class="iconarrow-right"></text>
					</view>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">入职日期</text>
				<view class="more">
					<text>2018-03-05</text>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">生日</text>
				<view class="more">
					<text>1990-07-25</text>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">固话</text>
				<view class="more">
					<text>0371-5656566</text>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">手机</text>
				<view class="more">
					<text>18888888888</text>
				</view>
			</view>
			<view class="listwrap">
				<text class="smalltext">企业邮箱</text>
				<view class="more">
					<text>jhifjksa@qq.com</text>
				</view>
			</view>
		</view>
		
		<view class="codewrap" v-if="istrue==1">
			<image src="/static/img/logo.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				istrue: 0
			}
		},
		mounted() {
			

		},
		methods: {
			// 同事信息
			colleague() {
				this.istrue = 0
			},
			// 对外名片
			business() {
				this.istrue = 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	.headerwrap {
		background: #09B8F2;
		text-align: center;
		padding: 70upx 0px;
		font-size: 32upx;
		color: #fff;

		image {
			display: block;
			width: 100upx;
			height: 100upx;
			margin: 20upx auto;
			border-radius: 50%;
		}
	}

	.tabwrap {
		font-size: 30upx;
		overflow: hidden;
		color: #000000;
		font-weight: bold;
		border-bottom: 10upx solid #F6F6F6;

		text {
			display: inline-block;
			box-sizing: border-box;
			width: 50%;
			float: left;
			text-align: center;
			padding: 26upx 0px;
			color: #000;
			font-family: 'PingFangSC-regular';
		}

		.clicksty {
			color: #09B8F2;
			box-sizing: border-box;
			border-bottom: 2upx solid #09B8F2;
		}
	}

	.mess_count {
		box-sizing: border-box;
		padding: 0 20upx;
		background: #fff;

		.listwrap {
			font-size: 28upx;
			color: #101010;
			box-sizing: border-box;
			padding: 16upx 20upx;
			border-bottom: 1upx solid rgba(187, 187, 187, 0.53);
		}

		.smalltext {
			font-size: 26upx;
			color: #0F0E0E;
		}

		.more {
			box-sizing: border-box;
			padding: 6upx 0px;
			color: #000;
			font-weight: bold
		}

		.moreover {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.iconarrow-right {
				font-size: 26upx;
			}
		}

		.moreoverchilder {
			display: inline-block;
			width: 460upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.codewrap{
		display: block;
		width: 600upx;
		height: 600upx;
		margin: 0px auto;
		margin-top: 60upx;
		text-align: center;
	}
	.codewrap image{
		width: 100%;
		height: 100%;
	}
</style>
