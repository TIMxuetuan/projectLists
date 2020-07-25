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
					<text class="appraver">{{item.Name}}</text>
					<text class="current-state" v-if="item.ApprovalResult !== 0">意见: <text class="process" >{{item.Content}}</text></text>
					<text class="current-state" v-if="item.ApprovalResult == 0">等待审批</text>
				</view>
				<view class="item-result" v-if="item.ApprovalResult == 1"><text >通过</text></view>
				<view class="item-result" v-if="item.ApprovalResult == 2"><text style="border: 1px solid #f00;color: #f00;">驳回</text></view>
				<view class="item-result" v-if="item.ApprovalResult == 3"><text >通过</text></view>
			</view>
		</view>
		<view class="option-form" v-if="parentType == 0">
			<view class="form-item">审批意见</view>
			<view class="form-item">
				<radio-group @change="radioChange">
					<label class="radio"><radio value="1" checked="true" />同意</label>
					<label class="radio"><radio value="2" />拒绝</label>
					<label class="radio" v-if="membersLength"><radio value="3" />转交</label>
				</radio-group>
			</view>

			<view class="form-item" v-if="index == 1 && approveLength > 0">
				<view class="left">下一级审批人:</view>
				<view class="right">
					 <picker mode="selector" :range="approveList" range-key="Name" :value="nextApprover"  @change="bindChange">
                        <view >{{nextApprover}}</view>
                    </picker>
				</view>
			</view>
			<view class="form-item" v-if="index == 3 && membersLength > 0">
				<view class="left">下一级审批人:</view>
				<view class="right">
					 <picker mode="selector" :range="memberList" range-key="Name" :value="nextApprover"  @change="bindChange">
			            <view >{{nextApprover}}</view>
			        </picker>
				</view>
			</view>
			<view class="form-item">
				<textarea v-model="idea" :auto-height="true" placeholder="请输入审批意见" />
			</view>
			<view class="form-item">
				<button size="default" style="background: #00D3B8;color: #fff;" @tap="confirm" :disabled="buttonDisabled">确认</button>
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
				parentType:0, 
				applicant:'',
				createTime:'',
				approvalTop:[],
				approvalTime:'',
				wfData:{},
				nextApprover:'',
				nextApproverId:'',
				approveList:[],
				memberList:[],
				wfId:'',
				index:1,
				idea:'',
				buttonDisabled:false
			}
		},
		onLoad(options) {
			this.wid = options.wid;
			this.applyId = options.applyId;
			this.userInfo = this.getUserInfo();
			console.log(this.userInfo)
			// 如果type=0 才会出现操作按钮
			this.parentType = options.type;
			this.getList();
		},
		computed:{
			membersLength(){
				const {memberList} = this;
				return memberList.length;
			},
			approveLength(){
				const {approveList} = this;
				return approveList.length;
			}
		},
		methods:{
			..._methods,
			getList() {
				let self = this;
				//第一个参数不清楚，获取不到，请求会失败
				Services.myApproveDetail(this.applyId,{
					wid:this.wid,
					type:this.type
				}).then(res=>{
					self.applicant = res.Content.Model.Owner.Name;
					self.createTime = self.timeFormat(res.Content.Model.Wf.CreateDateTime);
					self.wfData = res.Content.Model.Wf;
					self.approvalTop = res.Content.Model.ApprovalTop;
					self.approvalTime = self.timeFormat(res.Content.Model.ApprovalTop[0].DateTime);
					self.wfId = res.Content.Model.Wf.Id;
					if(res.Content.Model.Approvals.length > 0){
						let approveMembers = res.Content.Model.Approvals;
						self.nextApprover = approveMembers[0].Name;
						self.nextApproverId = approveMembers[0].Id;
						self.approveList = approveMembers;
						console.log(self.approveList);
					}
					if(res.Content.Model.Members.length > 0){
						let approveMembers = res.Content.Model.Members;
						self.nextApprover = approveMembers[0].Name;
						self.nextApproverId = approveMembers[0].Id;
						self.memberList = approveMembers;
						console.log(self.memberList);
					}
					uni.setNavigationBarTitle({
						title: self.applicant + self.wfData.Name
					});
				})
			},
			timeFormat(oriTime){
				let arr = oriTime.split('T');
				let arr2 = arr[1].split('.');
				return arr[0] + ' ' + arr2[0];
			},
			radioChange(e){
				this.index = e.detail.value;
				console.log(this.index);
			},
			bindChange(e){
				this.nextApprover = this.memberList[e.detail.value].Name;
				this.nextApproverId = this.memberList[e.detail.value].Id;
			},
			confirm(){
				let approva = '';
				if(this.index == 1){
					if(this.approveLength == 0){
						approva = null;
					}else{
						approva = this.nextApproverId;
					}
				}
				
				if(this.index == 2){
					approva = null;
				}
				
				if(this.index == 3){
					if(this.membersLength == 0){
						approva = null;
					}else{
						approva = this.nextApproverId;
					}
				}
				
				// 根据wfid造出请求的id-------因为请求时发送的这个属性是wfid代表的十六进制加了一-----------------------
				let val = this.wfId.substr(-3,3);
				console.log(val);
				let val2 = this.wfId.substr(0,21);
				let num_16 = (parseInt(val,16) + 1).toString(16);
				
				let resultId = val2+'' + num_16;
				console.log(resultId)

				// ------------------------------------------------
				
				Services.approveOption(resultId,{
					Approva:approva,
					ApprovalResult:parseInt(this.index), //1,同意，2，驳回，3，转交
					Comment:this.idea,
					WfId:this.wfId,
				}).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:'审批成功',
							duration:2000
						})
						this.approvalTop[this.approvalTop.length - 1].ApprovalResult = res.Content.ApprovalResult;
						this.buttonDisabled = true; //禁止按键操作
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #fff;
		font-size: $uni-font-size-base;
		background: $uni-bg-color-grey;
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
			width: 100%;
			border-bottom: 1px solid $uni-border-color-gray;
			display: flex;
			padding:24upx 0;
			align-items: center;
			justify-content: space-between;
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
	.apply-result,.option-form{
		background: #fff;
	}
	.result-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		color: $uni-text-color;
		padding: 26upx 20upx;
		.item-header{
			margin-right: 15upx;
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
	
	.option-form{
		padding: 20upx 20upx;
		box-sizing: border-box;
		margin-top: 20upx;
		.form-item{
			width: 100%;
			font-size: $uni-font-size-base;
			padding: 20upx 0;
			@include custom-flex(space-between,center,row);
			.left{
				flex: 1;
				@include custom-flex(flex-start,center,row);
			}
			.right{
				flex: 1;
				@include custom-flex(flex-end,center,row);
			}
			button{
				width: 100%;
			}
			textarea{
				width: 100%;
				border: 1px solid #ccc;
				border-radius: 15upx;
				padding: 15upx;
				min-height: 2em;
			}
		}
	}
	
</style>
