<template>
	<view class="container">
		<view class="files-box images">
			<view class="img" v-for="(item,index) in images" :key="index" v-if="images.length">
				<image :src="show_img_path+item"></image>
				<text class="icon-cuowu close" @tap="uf_del(item,'images')"></text>
			</view>
		</view>

		<view class="files-box files">
			<view class="file" v-for="(item,index) in files" :key="index" v-if="files.length">
				<text :class="item.icon"></text>
				<text class="icon-cuowu close" @tap="uf_del(item,'files')"></text>
			</view>
		</view>

		<view class="button">
			<button @tap="chooseImage" v-if="!hiddenImageButton">上传图片</button>
			<button @tap="chooseFile" v-if="!hiddenFileButton">上传附件</button>
		</view>

		<view class="submit-button">
			<button type="primary" @tap="submitForm" class="btn-w-100">立即提交</button>
		</view>
		
		<view class="fn-mt30 bl-alert alert-warning">
			<view>支持图片格式: jpg、png</view>
			<view>支持附件格式: pdf、docx、doc、xls、zip</view>
		</view>

		<l-file ref="lFile" @up-success="upSuccessFile"></l-file>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '@/common/public.js';
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
	import lFile from '@/components/l-file/l-file.vue'

	import appServices from '@/services/app.js'

	export default {
		components: {
			ImageCropper,
			lFile
		},
		data() {
			return {
				..._data,
				host:'',
				images: [], //上传的所有图片
				files:[], //上传的所有文件  [{src:'',icon:''}]
				uploadDir: 'docx',
				uploadTo: 'ali',
				hiddenImageButton:0,
				hiddenFileButton:0
			};
		},
		onLoad(opts) {
			this.hiddenImageButton = opts.hiddenButton=='image'||0;
			this.hiddenFileButton = opts.hiddenButton=='file'||0;
			
			let file_names = opts.file_names;
			this.file_name = file_names;
			
			this.host = this._config.host;
			this.show_img_path = this._config.show_img_path;
			this.show_file_path = this._config.show_file_path;
		},
		methods: {
			..._methods,
			chooseImage() {
				util.upPhoto({
					onChooseImage: (tempFilePaths) => {
						console.log('onChooseImage', tempFilePaths)
					},
					onSuccess: (res, return_res) => {
						console.log('return_res', return_res);
						if (return_res.Flag) {
							this.images.push(return_res.result);
						}
						uni.showToast({
							title: return_res.Content,
							icon: return_res.Flag ? 'success' : 'none'
						})
					},
					onComplete: (res) => {
						console.log('onComplete', res)
					},
				});
			},
			chooseFile() {
				//this.isUpFile = true;
				//this.createView();
				/*
				选择文件并上传
				
				currentWebview=当前窗口，仅app端需要传，且必传
				
				url=上传服务器地址，必填
				name=上传文件的key(选填，默认为file)
				header=请求头(选填)
				*/
			   let header = {};
			   let session_id = uni.getStorageSync('PHPSESSID') || '';
			   if (session_id != "" && session_id != null) {
			   	header.Cookie = 'PHPSESSID=' + session_id;
			   }
			   
				let url = this._config.host + '/plug-in/action_webuploader/fileupload.php';
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: url, //测试地址，记得更换
					name: 'file',
					header: header,//{'Content-Type':'类型','Authorization':'token'},
					//...其他参数
					uploadDir: this.uploadDir,
					uploadTo: this.uploadTo,
					env:this._config.env
				});
			},
			upSuccessFile(data) {
				console.log('upSuccessFile', data);
				if(!data.data.Flag){
					uni.showToast({
						icon:'none',
						title:data.data.msg
					})
					return
				}
				let return_res = data.data;				
				let src = return_res.result;
				let suffix = src.split('.').pop().toLowerCase();
				this.files.push({src:src,icon:'icon-'+suffix});
			},
			submitForm() {
				let obj = {};
				let _joinFiles = this.joinFiles();
				obj[this.file_name] = {
					images:this.images,
					files:this.files,
					joinFiles:_joinFiles,
					isPush:true
				}
				this._setApp(obj);
				console.log('submitForm',obj)
				uni.navigateBack({
					 delta: 1
				})
			},
			joinFiles(){
				let _files = [];
				if(this.files.length){
					this.files.forEach((value,index)=>{
						_files.push(value.src)
					})
				}
				
				let _new_files = this.images.concat(_files);
				return _new_files.join('|');
			}
		}
	};
</script>

<style lang="scss">
	.button {
		margin-top: 26upx;
		display: flex;

		button {
			flex: 1;
			margin: 6upx;
		}
	}

	.submit-button {
		margin-top: 26upx;
	}
	
	.web-view {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100vw;
		height: 100vh;
		background-color: #fff;

		.loading {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 100;
			width: 100vw;
			height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
