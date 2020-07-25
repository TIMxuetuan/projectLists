<template>
	<view class="container">
		<scroll-view class="content" scroll-y :style='{height:scrollHeight+"px"}'>
			<view v-if="folderIdList.length > 0" class="file-back" @tap="back">
				<view class="iconfont">&#xe749;</view>
				<view class="file-option">返回上一级</view>
			</view>
			<view class="file-item" v-for="(item, index) in fileList" :key="index" @longpress="moreOption(item)" @tap="fileClick(item)" >
				<view v-if="item.Type == 0" class="iconfont folder-icon" >&#xea11;</view>
				<view v-if="item.Type == 1" class="iconfont file-icon" v-html="item.icon" @tap="previewImg(item)"></view>
				<view class="file-content" >
					<view class="file-name">{{item.Name}}</view>
					<text class="file-time">{{item.CreateDateTime}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-tabbar">
			<view class='b-item' hover-class="b-item-active" @tap='bottomTabClick(1)'>
				<text class="iconfont">&#xe743;</text><text>新建文件夹</text>
			</view>
			<view class='b-item' hover-class="b-item-active" @tap='bottomTabClick(2)'>
				<text class="iconfont">&#xe66a;</text><text>上传文件</text>
			</view>
		</view>
		
		<!-- *****************弹出层******************* -->
		<!-- uniPopup 新建文件夹 -->
		<uni-popup ref="newFolder" type="center" :maskClick='false'>
			<view class="popup-container">
				<view class="p-title">新建文件夹</view>
				<view class="p-content">
					<input type="text" v-model="newFolderName">
				</view>
				<view class="p-option">
					<text @tap="closePopup(1)">取消</text>
					<text style='color: #007AFF;' @tap="createFolder">确认</text>
				</view>
			</view>
		</uni-popup>
		
		
		<!-- uniPopup 文件重命名 -->
		<uni-popup ref="reName" type="center" :maskClick='true'>
			<view class="popup-container">
				<view class="p-title">重命名</view>
				<view class="p-content">
					<input type="text" v-model="re_name">
				</view>
				<view class="p-option">
					<text @tap="closePopup(3)">取消</text>
					<text style='color: #007AFF;' @tap="reName">确认</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Services from '@/services/fileList.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import { _data,_methods } from '@/common/public.js';
	import config from '@/config.js';
	let menu = ['下载','移动','重命名','删除','分享'];
	let self;
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				..._data,
				scrollHeight:'', //scroll-view设置固定高度
				fileList:[],
				folderIdList:[], //保存文件夹Id,记录文件层级
				newFolderName:'', //新建文件夹名称
				re_name:'', //重命名
				fileInfo:{}, //保存选中的文件信息
			};
		},
		onLoad() {
			self = this;
			this.userInfo = this.getUserInfo();
			this.getMyFiles();
			this.scrollHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(200);
		},
		methods:{
			..._methods,
			bottomTabClick(type){
				// type=1 新建文件夹  type=2 上传文件
				if(type == 1){
					// 先打开弹出框，输入文件夹名字
					this.$refs.newFolder.open();	
				}
				if(type == 2){
					this.uploadFile();
				}
			},
			formatTime(time){
				if(time){
					let i = time.indexOf('.');
					return time.slice(0,i).replace(/T/,' ');
				}
			},
			getMyFiles(folderId){
				uni.showLoading({
					title:'请求中',
					mask:true
				})
				this.timestamp = (new Date()).getTime();
				// 如果没有folderId 表示请求根目录文件，否则，请求文件夹内文件
				if(folderId){
					Services.childFolder(folderId,{
						_:this.timestamp
					}).then(res=>{
						uni.hideLoading();
						// 数据处理
						this.formatData(res);
					})
				}else{ 
					Services.myFile({
						_:this.timestamp
					}).then(res=>{
						uni.hideLoading();
						// 数据处理
						this.formatData(res);
					})
				}
			},
			// 格式化文件数据
			formatData(res){
				this.fileList = res.Content;
				this.fileList.forEach((item)=>{
					item.CreateDateTime = this.formatTime(item.CreateDateTime);
					if(item.ImageThumbnail){
						item.ImageThumbnail = item.ImageThumbnail.replace('?attname=','');
					}					
					item.icon = '';
					// 校验文件格式，设置图标
					if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(item.Name)){
						item.icon = '&#xe6a5;';
					}else if(/\.(flv|mp4|rmvb|avi|mpeg|wmv)$/.test(item.Name)){
						item.icon = '&#xe6a1;';
					}else if(/\.(doc|docx)$/.test(item.Name)){
						item.icon = '&#xe69f;';
					}else if(/\.(ppt|pptx)$/.test(item.Name)){
						item.icon = '&#xe6a2;';
					}else if(/\.(xls)$/.test(item.Name)){
						item.icon = '&#xe69e;';
					}else if(/\.(pdf)$/.test(item.Name)){
						item.icon = '&#xe6a2;';
					}else{
						item.icon = '&#xe6a4;';
					}
				})
			},
			fileClick(e){
				console.log(e);
				if(e.Type == 0){
					this.getMyFiles(e.Id);
					this.folderIdList.push(e.Id);
				}
			},
			back(){
				// 定义一个数组，模拟栈的操作，点击一次文件夹，往栈中压入一个id(发送数据请求需要用到)，返回一次上一级，弹出一次id
				// 点击返回上一级，弹出本级文件夹的id，数组中最后一个id是返回后文件夹的id
				this.folderIdList.pop();
				if(this.folderIdList.length == 0){
					this.getMyFiles();
				}else{
					// 获取文件夹的数据				
					this.getMyFiles(this.folderIdList[this.folderIdList.length-1]);
				}
			},
			// 关闭弹出层
			closePopup(type){
				// type=1 关闭新建文件夹弹出层
				if(type == 1){
					this.$refs.newFolder.close();
				}
				if(type == 2){
					// this.$refs.moreOption.close();
				}
				if(type == 3){
					this.$refs.reName.close();
				}
			},
			openReName(){
				this.closePopup(2);
				this.re_name = this.fileInfo.Name;
				this.$refs.reName.open();
			},
			// 更多操作，重命名，下载等
			moreOption(e){
		
				this.fileInfo = e;
				uni.vibrateShort({
					success: function () {
						console.log('震动了');
					}
				});
				uni.showActionSheet({
				    itemList: menu,
				    success: function (res) {
						// 下载
				        if(res.tapIndex == 0){
							self.downloadFile();
						}
						// 移动
						if(res.tapIndex == 1){
							
						}
						// 重命名
						if(res.tapIndex == 2){
							self.openReName();
						}
						// 删除
						if(res.tapIndex == 3){
							self.deleteFile();
						}
						// 分享
						if(res.tapIndex == 4){
							self.shareFile();
						}
				    }
				});
		
			},
			// 新建文件夹
			createFolder(){
				//1代表新建文件夹弹出层
				this.closePopup(1);
				
				let parentId = '';
				if(this.folderIdList.length == 0){
					parentId = '';
				}else{
					parentId = this.folderIdList[this.folderIdList.length - 1];
				}				
				// post data
				let post_data = {
					CreateDateTime:'',
					Id:null,
					ImageThumbnail:'',
					Name:this.newFolderName,
					Owner:'',
					Parent: parentId,
					Size:0,
					Type:0,
					_Checked:false
				}
				if(this.newFolderName == ''){
					uni.showModal({
						title:'提示信息',
						content:'文件夹名称不能为空',
						showCancel:false
					})
				}else{
					Services.newFolder(post_data).then(res =>{
						if(res.Flag){
							res.Content.CreateDateTime = this.formatTime(res.Content.CreateDateTime);
							this.fileList.push(res.Content);
						}
					})
				}
				
			},
			// 上传文件
			uploadFile(){
				let parentId = '';
				if(this.folderIdList.length == 0){
					parentId = '';
				}else{
					parentId = this.folderIdList[this.folderIdList.length - 1];
				}
				
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: `${config.api_path}api/${self.userInfo.Key}/Netdisk/Upload/v2?folder=${parentId}`,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								let newData = JSON.parse(uploadFileRes.data);
								newData.Content.CreateDateTime = self.formatTime(newData.Content.CreateDateTime);
								let item = newData.Content;
			
								if(item.ImageThumbnail){
									item.ImageThumbnail = item.ImageThumbnail.replace('?attname=','');
								}
								item.icon = '';
								// 校验文件格式，设置图标
								if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(item.Name)){
									item.icon = '&#xe6a5;';
								}else if(/\.(flv|mp4|rmvb|avi|mpeg|wmv)$/.test(item.Name)){
									item.icon = '&#xe6a1;';
								}else if(/\.(doc|docx)$/.test(item.Name)){
									item.icon = '&#xe69f;';
								}else if(/\.(ppt|pptx)$/.test(item.Name)){
									item.icon = '&#xe6a2;';
								}else if(/\.(xls)$/.test(item.Name)){
									item.icon = '&#xe69e;';
								}else if(/\.(pdf)$/.test(item.Name)){
									item.icon = '&#xe6a0;';
								}else{
									item.icon = '&#xe6a4;';
								}
								self.fileList.push(item);
								uni.hideLoading();
							}
						});
						 uploadTask.onProgressUpdate((res) => {
							console.log('上传进度' + res.progress);
							if(res.progress < 100){
								uni.showLoading({
									title:'正在上传 '+res.progress +'%'
								})	
							}else{
								uni.showLoading({
									title:'请稍等...'
								})	
							}	
						});
					}
				});
			},
			// 下载文件
			downloadFile(){
				this.closePopup(2);
				
				// 文件夹没有url 不能下载
				if(this.fileInfo.Type == 1){
					uni.downloadFile({
						url: self.fileInfo.ImageThumbnail, 
						success: (res) => {
							if (res.statusCode === 200) {
								let tempFilePath = res.tempFilePath;
								uni.saveFile({
								      tempFilePath: tempFilePath,
								      success: function (res) {
								        let savedFilePath = res.savedFilePath;
										uni.showToast({
											title:'已保存到 '+ savedFilePath,
											duration:3000,
											position:'bottom',
											icon:"none"
										})
								      }
								    });
							}else{
								uni.showToast({
									title:'下载错误',
									icon:'none'
								})
							}
						}
					});
					
				}else{
					uni.showToast({
						title:'文件夹不能下载',
						position:'bottom'
					})
				}
		
			},
			// 文件重命名
			reName(){
				this.closePopup(3);				
				let parentId = '';
				if(this.folderIdList.length == 0){
					parentId = '';
				}else{
					parentId = this.folderIdList[this.folderIdList.length - 1];
				}
				
				// post data
				let post_data = this.fileInfo;
				post_data.Name = this.re_name;
				post_data._Checked = false;				
				if(this.re_name == ''){
					uni.showModal({
						title:'提示信息',
						content:'文件名称不能为空',
						showCancel:false
					})
				}else{
					Services.reName(post_data.Id,post_data).then(res =>{
						
					})
				}	
			},
			// 删除文件
			deleteFile(){
				this.closePopup(2);
				let fileId = this.fileInfo.Id;
				uni.showModal({
					title:'提示',
					content:'确认要删除 '+self.fileInfo.Name+'?',
					showCancel:true,
					success(res) {
						if(res.confirm){
							Services.deleteFile(fileId).then(res =>{
								if(res.Flag){
									self.fileList.forEach(function(item,index){
										if(item.Id == fileId){
											self.fileList.splice(index,1);
										}
									})
									uni.showToast({
										title:"已删除",
										position:'bottom'
									})
								}else{
									uni.showToast({
										title:"删除失败",
										position:'bottom'
									})
								}
								
							})
						}
					}
				})
				
			},
			// 移动文件
			moveFile(){
				this.closePopup(2);
				console.log('移动')
			},
			// 分享文件
			shareFile(){
				this.closePopup(2);
				// 只能分享图片
				if(!self.fileInfo.ImageThumbnail){
					console.log('不是图片')
					return;
				}
				
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: self.fileInfo.ImageThumbnail,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 图片预览
			previewImg(e){
				// 预览图片
				let imgUrls = [];
				imgUrls.push(e.ImageThumbnail);
				uni.previewImage({
					urls: imgUrls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.container{
		padding: 0 20upx;
		box-sizing: border-box;
		.bottom-tabbar{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100vw;
			height: 100upx;
			background: #fff;
			display: flex;
			border-top: 1px solid #ddd;
			.b-item{
				flex: 1;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				@include custom-flex(center,center,row,nowrap);
				&:first-child{
					border-right: 1px solid #ddd;
				}
				.iconfont{
					font-size: $uni-font-size-lg;
					margin-right: 7upx;
				}
			}
			.b-item-active{
				color: $icon-bg-primary;
			}
		}
		.content{
			background: #fff;
			
			.file-item{
				padding: 20upx 0;
				border-bottom: 1px solid #eee;
				display: flex;
				align-items: center;
				.file-icon{
					color: #4D97FF;
					font-size:56upx;
				}
				.folder-icon{
					color: #FFD659;
					font-size:56upx;
				}
				.file-content{
					flex: 1;
					margin-left: 20upx;
					.file-name{
						font-size: $uni-font-size-lg;
						color: $uni-text-color;
						width: 600upx;
						word-wrap:break-word;
					}
					.file-time{
						color: $uni-text-color-grey;
						font-size:$uni-font-size-base;
					}
				}
			}
			.file-back{
				padding: 20upx 0;
				border-bottom: 1px solid #eee;
				display: flex;
				align-items: center;
				.iconfont{
					color: #8a8a8a;
					font-size:50upx;
					margin-right: 20upx;
				}
				.file-option{
					font-size: $uni-font-size-lg;
					color: #8a8a8a;
				}
			}
		
	}
}
// -----------弹出层样式
// 新建文件夹
.popup-container{
	width: 500upx;
	background: #fff;
	.p-title{
		font-size: $uni-font-size-lg;
		color: #333;
	}
	.p-content{
		margin: 20upx 0;
		input{
			padding: 5upx 15upx;
			font-size: $uni-font-size-base;
			border: 1px solid #ccc;
			border-radius: 10upx;
		}
	}
	.p-option{
		font-size: $uni-font-size-lg;
		@include custom-flex(space-between,center,row,nowrap);
		text{
			padding: 10upx;
		}
	}
}
// 更多操作
.popup-container2{
	font-size: $uni-font-size-lg;
	.option-item{
		@include custom-flex(flex-start,center,row,nowrap);
		padding: 20upx 0;
		border-bottom: 1px solid #eee;
		.iconfont{
			margin-right: 10upx;
			font-size: $uni-font-size-lg;
		}
	}
}
	
</style>
