<template>
	<view class="">
		<view class="listwrap">
			<view class="states">必填</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>姓名</text>
					<input type="text" value="老马"></input>
				</view>
				<view class="listchilder2">
					<text>通讯录</text>
					<text class="iconarrow-right"></text>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>手机号</text>
					<input type="text" value="18888888888"></input>
				</view>
			</view>
		</view>

		<view class="listwrap">
			<view class="states">选填</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>职位</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>企业邮箱</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>部门</text>
					<!-- <input type="text" value=""></input> -->
				</view>
				<view class="listchilder2">
					<text>技术一部</text>
					<text class="iconarrow-right"></text>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>工号</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>职位说明</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>分机号</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>办公地点</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>入职时间</text>
					<input type="text" value=""></input>
				</view>
			</view>
			<view class="listcount">
				<view class="listchilder1">
					<text>备注</text>
					<input type="text" value=""></input>
				</view>
			</view>
		</view>

		<view class="listwrap cell-phone">
			<view class="listcount" style="padding-bottom: 10upx;">
				<view class="listchilder1">
					<text>号码隐藏</text>
				</view>
				<view class="listchilder2">
					<switch color="#66e200" checked @change="switchtrue1" />
				</view>
			</view>
			<view class="listcount listchilder1wrap">
				<view class="listchilder1">
					<text>隐藏手机号后，手机号在个人资料页隐藏</text>
				</view>
			</view>
		</view>
		<view class="listwrap cell-phone">
			<view class="listcount" style="padding-bottom: 10upx;">
				<view class="listchilder1">
					<text>高管模式</text>
				</view>
				<view class="listchilder2">
					<switch color="#66e200" checked @change="switchtrue2" />
				</view>
			</view>
			<view class="listcount listchilder1wrap">
				<view class="listchilder1">
					<text>高管模式可直接有高权限管理各部门</text>
				</view>
			</view>
		</view>
		
		<view class="removebutt">
			删除
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/icon.scss';

	.listwrap {
		background: #fff;
		box-sizing: border-box;
		padding: 0upx 20upx;
		padding-bottom: 0upx;
		font-size: 28upx;
		color: #000;
		border-bottom: 20upx solid #F6F6F6;

		.states {
			font-size: 32upx;
			color: #09B8F2;
			box-sizing: border-box;
			padding: 20upx 30upx;
			padding-bottom: 0upx;
		}

		.listcount {
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20upx 30upx;
			border-bottom: 1upx solid rgba(187, 187, 187, 0.53);

			.iconarrow-right {
				font-size: 28upx;
				color: #707070;
			}
		}

		.listcount:last-child {
			border: none;
		}

		.listchilder1,
		.listchilder2 {
			display: flex;
			align-items: center;
		}

		.listchilder2 {
			font-weight: normal;
			switch {
				transform: scale(0.6, 0.6);
			}
		}

		.listchilder1 input {
			color: #707070;
			margin-left: 20upx;
			font-size: 28upx;
			display: inline-block !important;
			width: 400upx;
		}
	}

	.cell-phone .listcount {
		border: none;
	}

	.cell-phone .listchilder1wrap {
		font-size: 24upx;
		color: #707070;
		padding-top: 0px;
		font-weight: normal;
	}
	.removebutt{
		display: block;
		width: 80%;
		margin: 50upx auto;
		text-align: center;
		font-size: 28upx;
		color: #fff;
		background: #09B8F2;
		padding: 20upx 0upx;
		border-radius: 12upx;
	}
</style>
