<template>
	<view class="content">
		<view class="list">
			<view class="list-item">
				<text class="item-title">申请人：</text>
				<text class="item-text">{{applicant}}</text>
			</view>
			<view class="list-item">
				<text class="item-title">申请单号：</text>
				<text class="item-text">{{wfData.WfNO}}</text>
			</view>
			<view class="list-item">
				<text class="item-title">创建时间：</text>
				<text class="item-text">{{createTime}}</text>
			</view>
			<view class="list-item" v-for="(item, index) in wfData.WfForm" :key='index'>
				<text class="item-title">{{item.Text}}：</text>
				<text class="item-text">{{item.Value}}</text>
			</view>
		</view>
		<view class="apply-result">
			<view class="result-item" v-for="(item, index) in approvalTop" :key='index'>
				<view class="item-header">
					<image v-if="item.Header" :src="item.Header" mode="aspectFill"></image>
					<image v-else src="../../../../static/img/default-head.png" mode="aspectFill"></image>
				</view>
				<view class="item-content">
					<text class="appraver">{{item.Name}}<text class="c-time" v-if="item.ApprovalResult !== 0">{{approvalTime}}</text></text>
					<text class="current-state" v-if="item.ApprovalResult !== 0">意见: <text class="process" >{{item.Content}}</text></text>
					<text class="current-state" v-if="item.ApprovalResult == 0">等待审批</text>
				</view>
				<view class="item-result" v-if="item.ApprovalResult == 1"><text>通过</text></view>
				<view class="item-result" v-if="item.ApprovalResult == 2"><text style="border: 1px solid #f00;color: #f00;">驳回</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { _data, _methods } from '@/common/public.js';
	import Services from '@/services/approve.js';
	export default{
		data() {
			return {
				..._data,
				wid:'',
				applyId:'',
				type:0,
				applicant:'',
				createTime:'',
				approvalTop:[],
				approvalTime:'',
				wfData:{},
				title:''
			}
		},
		onLoad(options) {
			this.wid = options.wid;
			this.applyId = options.applyId;
			this.getList();
		},
		methods:{
			..._methods,
			getList() {
				let self = this;
				Services.myApproveDetail(this.applyId,{
					wid:this.wid,
					type:this.type
				}).then(res=>{
					self.applicant = res.Content.Model.Owner.Name;	
					self.createTime = self.timeFormat(res.Content.Model.Wf.CreateDateTime);
					self.wfData = res.Content.Model.Wf;
					self.approvalTop = res.Content.Model.ApprovalTop;
					self.approvalTime= self.timeFormat(res.Content.Model.ApprovalTop[0].DateTime)
					uni.setNavigationBarTitle({
						title: self.applicant + self.wfData.Name
					});
				})
				
			},
			timeFormat(oriTime){
				let arr = oriTime.split('T');
				let arr2 = arr[1].split('.');
				return arr[0] + ' ' + arr2[0];
			}
		}
	}
</script>

<style lang="scss">
	$_fontSize:32upx;
	.content{
		background-color: #fff;
		background: $uni-bg-color-grey;
		font-size: $uni-font-size-base;
		min-height: 100vh;
		padding: 10upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
		overflow: hidden;
	}
	.list{
		color: $uni-text-color;
		padding:5upx 20upx;
		background: #fff;
		.list-item{
			border-bottom: 1px solid $uni-border-color-gray;
			display: flex;
			padding:20upx 0;
			align-items: center;
		}
	}
	.list-item{
		.item-title{
			flex:3;
		}
		.item-text{
			flex:7;
			display: flex;
			flex-direction: row;
		}
	}
	.apply-result{
		background: #fff;
	}
	.result-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		color: $uni-text-color;
		padding: 20upx 20upx;
		.item-header{
			margin-right: 15upx;
			width: 80upx;
			image{
				width:80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
		.item-content{
			flex: 5;
			display: flex;
			flex-direction: column;
			margin-right: 30upx;
			.appraver{
				.c-time{
					margin-left: 20upx;
					color:$uni-text-color-grey;
				}
			}
			.current-state{
				color: $uni-text-color-grey;
				font-size: $uni-font-size-base;
			}
		}
		.item-result{
			flex: 1;
			display: flex;
			flex-direction: row-reverse;
			text{
				padding: 5upx 10upx;
				color: green;
				font-size: $uni-font-size-base;
				background: transparent;
				border: 1px solid green;
				border-radius: 5upx;
				transform: rotate(-20deg);
			}
		}
	}
	
</style>
