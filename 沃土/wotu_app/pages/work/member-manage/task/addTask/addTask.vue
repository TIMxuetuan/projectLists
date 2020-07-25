<template>
	<view class="content">
		<view class="w-card margin-bottom">
			<view class="item">
				<view class="left">任务描述</view>
				<view class="right"><textarea style="width: 100%;" v-model="model.taskDec" placeholder="请输入任务描述" auto-height="true" /></view>
			</view>
			<view class="item align-center">
				<view class="left">任务优先级</view>
				<view class="right right-end">
					<view class="youxian" :style="{background:level[model.level - 1].color}" @tap="openPop">{{level[model.level - 1].title}}</view>
				</view>
			</view>
		</view>
		
		<view class="w-card margin-bottom">
			<view class="item">
				<view class="left">开始时间</view>
				<view class="right right-end" @tap="showPicker(1)">{{model.startTime}}</view>
			</view>
			<view class="item">
				<view class="left">结束时间</view>
				<view class="right right-end" @tap="showPicker(2)">{{model.endTime}}</view>
			</view>
		</view>
		
		<view class="w-card margin-bottom">
			<view class="item">
				<view class="left">执行人</view>
				<view class="right right-end" @tap='showDrawer1 = true'>{{model.executor?model.executor:'选择'}}</view>
			</view>
			<view class="item">
				<view class="left">监督人</view>
				<view class="right right-end" @tap='showDrawer2 = true'>{{model.custodian?model.custodian:'选择'}}</view>
			</view>
		</view>
		
		<button style="background: #00D3B8; color: #fff;" @tap="addTask">添加</button>
		
		<!-- 时间picker -->
		<w-picker 
			mode="date" 
			startYear="2019" 
			endYear="2030"
			step="1"
			:current="true" 
			@confirm="onConfirm1" 
			ref="dateTime1" 
			themeColor="#f00">
		</w-picker>
		
		<w-picker 
			mode="date" 
			startYear="2019" 
			endYear="2030"
			step="1"
			:current="true" 
			@confirm="onConfirm2" 
			ref="dateTime2" 
			themeColor="#f00">
		</w-picker>
		
		<uni-drawer mode='right' :visible="showDrawer1" @close='closeDrawer'>
			<view style="padding:30upx;">
				<view class="uni-title">选择团队成员</view>
			</view>
			<radio-group class="drawer-list" @change="radioChange($event,1)">
                <label class="list-cell" v-for="(item, index) in executorList" :key="item.value">
                    <view class="left">
                    	<view class="l-img">
                    		<image :src="item.Header.indexOf('/Backbone/')>-1?config.api_path+item.Header:item.Header" mode="aspectFill"></image>
                    	</view>
                    	<view class="l-name">{{item.Name}}</view>
                    </view>
                    <view>
                        <radio :value="item.Name" :checked="index === current" />
                    </view>
                </label>
            </radio-group>
		</uni-drawer>
		
		<uni-drawer mode='right' :visible="showDrawer2" @close='closeDrawer'>
			<view style="padding:30upx;">
				<view class="list-title">选择团队成员</view>
			</view>
			<radio-group class="drawer-list" @change="radioChange($event,2)">
		        <label class="list-cell" v-for="(item, index) in executorList" :key="item.value">
					<view class="left">
						<view class="l-img">
							<image :src="item.Header.indexOf('/Backbone/')>-1?config.api_path+item.Header:item.Header" mode="aspectFill"></image>
						</view>
						<view class="l-name">{{item.Name}}</view>
					</view>
		            <view>
		                <radio :value="item.Name" :checked="index === current" />
		            </view>
					
		        </label>
		    </radio-group>
		</uni-drawer>
		
		<!-- uni-popup 弹出层 -->
		<uni-popup ref='popup' type='bottom'>
			<view class="popup-wrap">
				<view class="top">
					<view class="title">
						<text style="margin-left: 7upx">优先级</text>
					</view>
					<view class="cancle" @tap="cancle">取消</view>
				</view>
				<view class="main">
					<view class="item" v-for="(item, index) in level" :key='index'  @tap='levelTap(item)'>
						<text class="color-view" :style="{'background-color':item.color}"></text><text>{{item.title}}</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	import util from '@/common/util.js';
	import Services from '@/services/task.js';
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import _config from '@/config.js';
	export default {
		components:{
			wPicker,
			uniDrawer
		},
		data() {
			return {
				model:{
					taskDec:'',
					startTime:'',
					endTime:'',
					executor:'',
					custodian:'',
					level:'1'
				},
				executorId:'',
				custodianId:'',
				custodianName:'',
				parentId:'',
				executorList:[],
				showDrawer1:false,
				showDrawer2:false,
				current:0,
				config:Object,
				level: [{
						id: 1,
						title: 'IV 不重要不紧急',
						color: '#cccccc'
					},
					{
						id: 2,
						title: 'III 重要不紧急',
						color: '#0000ff'
					},
					{
						id: 3,
						title: 'II 紧急不重要',
						color: '#ffe348'
					},
					{
						id: 4,
						title: 'I 紧急重要',
						color: '#ff0000'
					}
				],
			}
		},
		onLoad(option) {
			this.config = _config;
			this.getMembers();
			// 给数据设置初值
			let nowTime = util.formatTime((new Date()).getTime(),'Y-M-D');
			this.model.startTime = nowTime;
			this.model.endTime = nowTime;
			// 如果option中传有父任务id，说明是新建子任务
			if(option.parentId){
				this.parentId = option.parentId;
			}
		},
		methods:{
			showPicker(type){
				if(type == 1){
					this.$refs.dateTime1.show();
				}else{
					this.$refs.dateTime2.show();
				}
				
			},
			onConfirm1(e){
				this.model.startTime = e.result;
			},
			onConfirm2(e){
				this.model.endTime = e.result;
			},
			getMembers(){
				Services.memberExcutor().then(res =>{
					if(res.Flag){
						this.executorList = res.Content;
						if(this.executorList.length != 0){
							this.model.executor = this.executorList[0].Name;
							this.model.custodian = this.executorList[0].Name;
						}
					}
				})
			},
			closeDrawer(){
				this.showDrawer1 = false;
				this.showDrawer2 = false;
			},
			radioChange(e,type){
				if(type == 1){
					this.model.executor = e.detail.value;
				}else{
					this.model.custodian = e.detail.value;
				}
			},
			openPop(){
				this.$refs.popup.open();
			},
			//选择等级按钮
			levelTap(item) {
				this.$refs.popup.close();
				this.model.level = item.id;
				
			},
			addTask(){
				for(let val in this.model){
					if(this.model[val] == ''){
						uni.showModal({
							title: '提示信息',
							content:'内容不能为空',
							showCancel:false
						})
						return;
					}
				}
				
				// 任务描述不能少于5个字符
				if(this.model.taskDec.length < 5){
					uni.showModal({
						title: '提示信息',
						content:'描述信息不能少于5个字符',
						showCancel:false
					})
					return;
				}
				
				this.executorList.forEach(item=>{
					if(item.Name == this.model.executor){
						this.executorId = item.Id;
					}
					if(item.Name == this.model.custodian){
						this.custodianId = item.Id;
						this.custodianName = item.Name;
					}
				})
				
				let postData = {
					Custodian:this.custodianId,
					Executor:this.executorId,
					CustodianName:this.custodianName,
					StartTime:this.model.startTime,
					EndTime:this.model.endTime,
					Level:this.model.level,
					Content:this.model.taskDec
				}
				
				
				// 多添加一个参数
				if(this.parentId){
					postData.ParentId = this.parentId;
				}
				console.log(postData);
				// 发起请求
				Services.addTask(postData).then(res =>{
					if(res.Flag){
						// 如果是添加子任务，要返回两层
						if(this.parentId){
							uni.navigateBack({
								delta: 2
							})
						}else{
							uni.navigateBack({
								delta: 1
							})
						}
						
						uni.showToast({
							title:'任务添加成功'
						})	

					}
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.content{
		padding: 0 20upx;
		padding-top: 20upx;
		box-sizing: border-box;
		background: $uni-bg-color-grey;
		width: 100%;
		.item{
			display: flex;
			padding: 20upx;
			color: #333;
			box-sizing: border-box;
			border-bottom: 1px solid $uni-border-color-gray;
			.left{
				width: 200upx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
			}
			.right{
				flex: 1;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				.iconfont{
					font-size: 36upx;
					color: #B7B7B7;
				}
			}
			// 对right的补充
			.right-end{
				display: flex;
				justify-content: flex-end;
			}
			&:last-child{
				border: none;
			}
		}
	}
	.youxian{
		padding: 5upx 10upx;
		color: #fff;
		font-size: $uni-font-size-sm;
	}
	.margin-bottom{
		margin-bottom: 20upx;
	}
	.align-center{
		align-items: center;
	}
	.drawer-list{
		@include custom-flex(flex-start,flex-start,column);
		border-bottom: 1px solid $uni-border-color-gray;
		padding: 0 20upx;
		box-sizing: border-box;
		.list-title{
			font-size: $uni-font-size-lg;
			@include custom-flex(flex-start,center,row);
		}
		.list-cell{
			@include custom-flex(space-between,center,row);
			width: 100%;
			height: 80upx;
			.left{
				@include custom-flex(flex-start,center,row);
				.l-img{
					image{
						width: $uni-img-size-base;
						height: $uni-img-size-base;
						border-radius: 50%;
						margin-right: 20upx;
					}
				}
				.l-name{
					font-size: $uni-font-size-base;
				}
			}
			
		}
	}
	// 选择优先级
	.popup-wrap{
		.top{
			padding-bottom: 20upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid $uni-border-color;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
		}
		.main{
			.item{
				padding: 20upx;
				border-bottom: 1px solid $uni-border-color-gray;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				.color-view{
					width: 25upx;
					height: 50upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
