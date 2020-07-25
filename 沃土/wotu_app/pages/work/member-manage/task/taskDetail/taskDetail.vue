<template>
	<view class="container">
		<scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}">
			<view class="w-card margin-bottom">
				<view class="item">
					<view class="left">任务描述</view>
					<view class="right" style="color: #999;">{{itemData.Content}}</view>
				</view>
				<view class="item align-center">
					<view class="left">任务优先级</view>
					<view class="right right-end">
						<view class="level" :style="{'background-color':levelColor[itemData.Level - 1]}">{{levelTitle[itemData.Level - 1]}}</view>
					</view>
				</view>
			</view>
			<view class="w-card margin-bottom">
				<view class="item align-center">
					<view class="left">添加子任务</view>
					<view class="right right-end" @tap="addChildTask">
						<text class="iconfont">&#xe65c;</text>
					</view>
				</view>
				<view class="item  align-center">
					<view class="left">任务进度</view>
					<view class="right right-end" @tap="showProgressSet">
						<Progress :progresstext="progress"  size="40px" borderWidth="5px" fontSize="10px"></Progress>
					</view>
				</view>
			</view>
			<view class="w-card margin-bottom">
				<view class="item  align-center">
					<view class="left">开始时间</view>
					<view class="right right-end" style="color: #999;">{{itemData.StartTime}}</view>
				</view>
				<view class="item  align-center">
					<view class="left">结束时间</view>
					<view class="right right-end" style="color: #999;">{{itemData.EndTime}}</view>
				</view>
			</view>
			<view class="w-card margin-bottom">
				<view class="item  align-center">
					<view class="left">执行人</view>
					<view class="right right-end">{{itemData.ExecutorName}}</view>
				</view>
				<view class="item  align-center">
					<view class="left">监督人</view>
					<view class="right right-end">{{itemData.OwnerName}}</view>
				</view>
			</view>
			<!-- 附件 -->
			<view class="w-card margin-bottom" >
				<view class="item" style="border: none;">
					<view class="left">附件</view>
					<view class="right right-end" @tap="addFile">
						<text class="iconfont">&#xe654;</text>
					</view>
				</view>
				<view class="show-img">
					<view class="img-item" v-for="(imgItem,i) in itemData.Attachments" :key='i'>
						<view class="img">
							<image :src="imgItem.Path" mode="aspectFill"></image>
						</view>
						<view class="img-name">{{imgItem.Name}}</view>
						<view class="options">
							<text class="iconfont download" @tap="downloadFile(imgItem.Path)">&#xe64f;</text>
							<text class="iconfont del" @tap="delFile(imgItem.Name)">&#xe64e;</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		
		<SetProgressCircular ref='progressSet' :progresstext='progress' @onSetProgress='setProgress'></SetProgressCircular>
		<view class="tabbar">
			<view class="talk" @tap="jumpTo(1)"><text class="iconfont">&#xe63f;</text><text class="txt">任务讨论</text></view>
			<view class="dynamic" @tap="jumpTo(2)"><text class="iconfont">&#xe63a;</text><text class="txt">任务动态</text></view>
			<view class="task-progress" @tap="jumpTo(3)"><text class="iconfont">&#xe642;</text><text class="txt">任务进度</text></view>
		</view>
		
		<uni-popup ref='uniPopup' :custom="true" type="top">
			<view class="pop-item" @tap='menuClick(1)'><text class="iconshuxiebingli"></text><text class="txt">编辑</text></view>
			<view class="pop-item" @tap='menuClick(2)'><text class="iconfeiji"></text><text class="txt">转交</text></view>
			<view class="pop-item" @tap='menuClick(3)'><text class="iconshanchu"></text><text class="txt">删除</text></view>
		</uni-popup>
		
	<!-- 	<uni-drawer mode='right' :visible="showDrawer" @close='closeDrawer'>
			<view style="padding:30upx;">
				<view class="uni-title">选择团队成员</view>
			</view>
			<radio-group class="drawer-list" @change="radioChange">
		        <label class="list-cell" v-for="(item, index) in executorList" :key="index">
		            <view class="left">
		            	<view class="l-img">
		            		<image :src="item.Header.indexOf('/Backbone/')>-1?config.api_path+item.Header:item.Header" mode="aspectFill"></image>
		            	</view>
		            	<view class="l-name">{{item.Name}}</view>
		            </view>
		            <view>
		                <radio :value="item.Id" />
		            </view>
		        </label>
		    </radio-group>
		</uni-drawer> -->
		<!-- 弹出人员选择 -->
		<uni-popup ref='personSelect' type="center">
			<view class="person-title" style="font-size: 32upx;color: #333;">请选择团队成员</view>
			<picker-view class="person-select" indicator-style="height: 50px;" :value="pVal" @change="pBindChange">
				<picker-view-column>
					 <view class="p-item" v-for="(item,index) in executorList" :key="index">{{item.Name}}</view>
				</picker-view-column>
			</picker-view>
			<button style="background: #00D3B8; color: #fff;" @tap='confirmSelect'>确定</button>
		</uni-popup>
	</view>
</template>

<script>
	import Progress from '@/components/progressBar/ProgressBar.vue';
	import SetProgressCircular from '@/components/setProgressCircular/setProgressCircular.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import Services from '@/services/task.js';
	import config from '@/config.js';
	import {_data,_methods} from '@/common/public.js';
	import util from '@/common/util.js';
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	let self,timer;
	export default {
		components: {
			Progress,
			SetProgressCircular,
			uniDrawer
		},
		data() {
			return {
				..._data,
				itemData:{},
				taskId:'',
				config:'',
				scrollHeight:'',
				executorList:[],
				TranlateId:'',
				showDrawer:false,
				img:{
					name:'',
					path:'',
				},
				showProgressEdit:false,
				progress:0,
				levelColor: ['#cccccc', '#0000ff', '#ffe348', '#ff0000'],
				levelTitle: ['IV 不重要不紧急', 'III 重要不紧急', 'II 紧急不重要', 'I 紧急重要'],
				pVal:[0], //保存转交人信息
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			timer = setTimeout(()=>{
				uni.hideLoading();
			},2000)
			self = this;
			this.scrollHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(100);
			this.taskId = option.taskId;
			// 隐藏setProgressCircular
			this.getData();
			this.config = config;
			this.getMembers();
			this.userInfo = this.getUserInfo();
		},
		onUnload() {
			timer = null;
		},
		methods: {
			..._methods,
			getData() {
				Services.taskDetail(this.taskId).then(res=>{
					uni.hideLoading();
					this.itemData = res.Content;
					this.itemData.StartTime = this.formatTime(this.itemData.StartTime);
					this.itemData.EndTime = this.formatTime(this.itemData.EndTime);
					this.progress = this.itemData.Progress;
				})
			},
			getMembers(){
				Services.memberExcutor().then(res =>{
					if(res.Flag){
						this.executorList = res.Content;
						
					}
				})
			},
			formatTime(srcDate){
				let date = '';
				if(srcDate){
					date = srcDate.split('T')[0];
				}else{
					date = '空日期';
				}
				return date;
			},
			jumpTo(index){
				let self = this;
				if(index === 1){
					uni.showToast({
						title:'不要急，功能正在开发中',
						icon:'none'
					})
				}
				
				if(index === 2){
					uni.navigateTo({
						url:'../taskDynamic/taskDynamic?taskId='+self.taskId
					})
				}
				if(index === 3){
					uni.navigateTo({
						url:'../taskStep/taskStep?taskId='+self.taskId
					})
				}
			},
			addFile(){
				let self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title:'正在上传图片'
						})
						uni.uploadFile({
							url: 'https://www.effmaster.com/attachment/Upload', 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								console.log(res)
								let _data = JSON.parse(res.data);
								if(_data.Flag){
									self.img.path = _data.Content;
									if(_data.Content.indexOf('attname=') !== -1){
										self.img.name = _data.Content.split('attname=')[1];
									}else{
										self.img.name = '附件';
									}
									
									Services.upFile({
										Path:self.img.path,
										TaskId:self.taskId,
										Name:self.img.name
									}).then(resp =>{
										uni.hideLoading();
										self.getData();
									})
								}
							}
						});
					}
				});
			},
			delFile(fileName){
				let self = this;
				console.log(fileName);
				// app端按钮左右调整
				// #ifdef  APP-PLUS 
				uni.showModal({
					content:'确认删除 ' +fileName+'?',
					confirmText:'取消',
					cancelText: '确认',
					success(res) {
						if (res.cancel) {
							// 这里需要uniapp封装的方法，要不然会有点问题
							uni.request({
								url:`${config.api_path}api/${self.userInfo.Key}/attachment/${self.taskId}?file=${fileName}`,
								method:'DELETE',
								success(resp){
									uni.showToast({
										title:'删除成功',
										icon: 'none',
										success() {
											self.getData();
										}
									})
						
								}
							})
					
						} else if (res.confirm) {
		
						}
						
					}
					
				})
				// #endif
				// #ifdef H5 || MP-WEIXIN
				uni.showModal({
					content:'确认删除' +fileName+'?',
					success(res) {
						if (res.confirm) {
							// 这里需要uniapp封装的方法，要不然会有点问题
							uni.request({
								url:`${config.api_path}api/${self.userInfo.Key}/attachment/${self.taskId}?file=${fileName}`,
								method:'DELETE',
								success(resp){
									uni.showToast({
										title:'删除成功',
										icon: 'none',
										success() {
											self.getData();
										}
									})
						
								}
							})
					
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
						
					}
					
				})
				// #endif
				
				
			},
			downloadFile(imgPath){
				console.log(imgPath);
				util.downloadFile(imgPath).then(res =>{
					uni.showToast({
						title:'下载成功'
					})
				});
			},
			showProgressSet(){
				this.$refs.progressSet._show();
				// this.showProgressEdit = true;
			},
			setProgress(pValue){
				let self = this;
				this.progress = pValue;
				this.$refs.progressSet._hidden();
				let _data = {
					Progress:pValue
				}
				Services.changeProgress(this.taskId,_data).then(res=>{
					if(re.Flag){
						uni.showToast({
							title:'任务进度修改成功',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:'任务进度修改失败！',
							icon:'none'
						})
					}
				})
			
			},
			menuClick(type){
				let self = this;
				this.$refs.uniPopup.close();
				// 编辑
				if(type == 1){
					let itemData = self.itemData;
					itemData.Attachments = [];
					uni.navigateTo({
						url:'../editTask/editTask?data='+JSON.stringify(itemData)
					})
				}
				// 转交
				if(type == 2){
					this.$refs.personSelect.open();
				}
				// 删除
				if(type == 3){
					this.delTask();
				}
			},
			addChildTask(){
				uni.navigateTo({
					url:`../addTask/addTask?parentId=${this.taskId}`
				})
			},
			closeDrawer(){
				this.showDrawer = false;
			},
			// radioChange(e){
			// 	let transferId = e.detail.value;
			// 	uni.showModal({
			// 		title:'提示信息',
			// 		content:'确认转交任务?',
			// 		success(res) {
			// 			if (res.confirm) {
			// 				Services.transferTask(self.taskId,{
			// 					Tranlate: transferId
			// 				}).then(resp =>{
			// 					uni.hideLoading();
			// 					if(resp.Flag){
			// 						uni.showToast({
			// 							title:'转交成功',
					
			// 						})
			// 					}else{
			// 						uni.showToast({
			// 							title:'转交失败'
			// 						})
			// 					}
			// 				})
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	})
				
			// },
			// 删除任务
			delTask(){
				Services.delTask(this.taskId).then(res=>{
					if(res.Flag){
						uni.showToast({
							title:'删除成功',
							success() {
								uni.navigateBack({
									delta:1
								})
							}
						})
					}
				})
			},

			// 转交任务
			confirmSelect(){
				console.log(this.pVal);
				let len = this.executorList.length;
				let transferId;
				if(len > 0){
					transferId =this.executorList[this.pVal[0]].Id;						
				}
				
				if(!transferId){
					return;
				}
				Services.transferTask(self.taskId,{
					Tranlate: transferId
				}).then(resp =>{
					uni.hideLoading();
					if(resp.Flag){
						uni.showToast({
							title:'转交成功'		
						})
					}else{
						uni.showToast({
							title:'转交失败',
							icon:'none'
						})
					}
				})
			},
			pBindChange(e){
				this.pVal = e.detail.value
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.uniPopup.open();
		}
	}
</script>

<style lang="scss">
	// 字体颜色 可修改
	.text-able{
		color: $uni-text-color-blue;
	}
	// 字体颜色 不可修改
	.text-disabled{
		color: $uni-text-color-grey;
	}
	.container{
		padding: 10upx 20upx;
		box-sizing: border-box;
		background: $uni-bg-color-grey;
	}
	
	.margin-bottom{
		margin-bottom: 20upx;
	}
	.align-center{
		align-items: center;
	}
	.item{
		display: flex;
		padding: 20upx;
		color: $uni-text-color;
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
	
	.level{
		padding: 10upx 30upx;
		font-size: $uni-font-size-sm;
		color: #fff;
	}
		
		// show-img
	.show-img{
		width: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
		.img-item{
			display: flex;
			padding: 15upx 0;
			align-items: center;
			.img{
				width: 20%;
				image{
					width: $uni-img-size-lg;
					height: $uni-img-size-lg;
				}
			}
			.img-name{
				width: 50%;
				font-size: $uni-font-size-base;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				word-wrap:break-word;
			}
			.options{
				width: 30%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.iconfont{
					font-size: 56upx;
					color: #999;
				}
			}
		}
			
	}
	.tabbar{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		height: 100upx;
		width: 100vw;
		display: flex;
		border-top: 1px solid #ccc;
		background: #fff;
		.talk, .dynamic, .task-progress{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #333;
			.iconfont{
				font-size: $uni-font-size-lg;
				margin-right: 7upx;
			}
			.txt{
				font-size: $uni-font-size-lg;
			}
		}
		.dynamic{
			border-right: 1px solid #ccc;
			border-left: 1px solid #ccc;
		}
	}
	
	.pop-item{
		border-bottom:1px solid $uni-border-color;
		font-size: $uni-font-size-lg;
		padding: 20upx 0;
		background: #fff;
		[class^='icon']{
			font-size: $uni-font-size-lg;
			color: $uni-text-color-blue;
			margin-right: 10upx;
			margin-left: 30upx;
		}
		.txt{
			color: $uni-text-color;
			font-size: $uni-font-size-base;
		}
	}
	
	.drawer-list{
		@include custom-flex(flex-start,flex-start,column);
		padding: 0 20upx;
		box-sizing: border-box;
		.list-title{
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			@include custom-flex(flex-start,center,row);
		}
		.list-cell{
			@include custom-flex(space-between,center,row);
			width: 100%;
			height: 80upx;
			border-bottom:1px solid $uni-border-color-gray;
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
					color: $uni-text-color;
				}
			}
			
		}
	}
	.person-select{
		width: 500upx;
		padding: 20upx;
		box-sizing: border-box;
		height: 500upx;
		font-size: 32upx;
		// background: #999;
	}
</style>
