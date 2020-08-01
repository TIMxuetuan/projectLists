<template>
	<view>
		<view class="files-box images">
			<view class="img" v-for="(item,index) in images" :key="index">
				<image :src="show_img_path+item" mode="aspectFill" @click="uf_previewImage(index,images)"></image>
				<text class="icon-cuowu close" @tap="uf_del(item,'images')" v-if="!disable"></text>
				<text class="icon-cuowu close" @tap="uf_del(item,'images')" v-if="openDelete"></text>
			</view>
		</view>

		<view class="files-box files">
			<view class="file" v-for="(item,index) in files" :key="index">
				<text :class="item.icon" @tap="uf_down(item)"></text>
				<text class="icon-cuowu close" @tap="uf_del(item,'files')" v-if="openDelete"></text>
				<text class="icon-cuowu close" @tap="uf_del(item,'files')" v-if="!disable"></text>
			</view>
		</view>
		<view @tap="jumpToUp" class="btn-up-files" v-if="!disable"><text class="icon-jiahao"></text></view>
		<view class="form-help" v-if="!disable">支持 jpg、png、pdf、docx、doc、xls、zip</view>
	</view>
</template>

<script>
	/*
	 * 此组件 需要和 pages/upFiles 配合使用
	 * images:['xxx.jpg','aaa.jpg']
	 * files:[{src:'xx.jpg',icon:'icon-doc'}]
	 */
	import {
		_data,
		_methods,
		util
	} from "@/common/public.js"
	export default {
		name: "zyShowFiles",
		props: {
			dataKey: {
				type: String,
				default: 'uf_temp_files'
			},
			parameter: {
				type: String,
				default: ''
			},
			disable: {
				type: Boolean,
				default: false
			},
			openDelete: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				host: this._config.host,
				show_img_path:this._config.show_img_path,
				show_file_path:this._config.show_file_path,
				images: [],
				files: [],
				isPreview:false
			};
		},
		methods: {
			..._methods,
			// 上传文件
			jumpToUp() {
				let obj = {}
				obj[this.dataKey] = {
					images: '',
					files: ''
				}
				this._setApp(obj)

				let url = `/pages/upFiles/upFiles?file_names=${this.dataKey}${this.parameter}`;
				uni.navigateTo({
					url: url
				});
			},
			_onShow() {
				if(this.isPreview){
					this.isPreview = 0;
					return
				}
				
				let Files = this._getApp(this.dataKey);
				if(Files==null){
					return
				}
				console.log('onShow-files', Files);
				let isPush = Files.isPush || 0;
				if (Files != null && !util.isset(Files.images) && Files.images.length) {
					this.images = isPush ? this.images.concat(Files.images) : Files.images;
				}
				if (Files != null && !util.isset(Files.files) && Files.files.length) {
					this.files = isPush ? this.files.concat(Files.files) : Files.files;
				}
			},
			_getFiles() {
				return {
					images: this.images,
					files: this.files
				}
			},
			_onUnload() {
				let obj = {};
				obj[this.dataKey] = '';
				this._setApp(obj);
			},
			uf_del(item, type) {
				if (this.disable&&!this.openDelete) {
					return
				}
				uni.showModal({
					title: '删除提示',
					content: '确定要删除吗？',
					success: (res) => {
						if (res.confirm) {
							if (type == 'images') {
								this.uf_delImages(item, type);
							} else {
								this.uf_delFiles(item, type);
							}
						} else if (res.cancel) {

						}
					}
				});
			},
			uf_delImages(item) {
				if (this.disable&&!this.openDelete) {
					return
				}
				let index = this.images.findIndex((value, index) => {
					return value == item;
				});
				let file = this.images[index];
				console.log('delImages', item, index)

				this.images.splice(index, 1);

				//this.uf_del_sucess();
				this.$emit('ufDelSucess',{type:'image','dataKey':this.dataKey,file:file,'files':this.images});
				//this.uf_delServerFile(file)
			},
			uf_delFiles(item) {
				if (this.disable&&!this.openDelete) {
					return
				}
				console.log(item);
				let index = this.files.findIndex((value, index) => {
					return value.src == item.src;
				});
				let file = this.files[index]['src'];
				this.files.splice(index, 1);
				
				this.$emit('ufDelSucess',{type:'file','dataKey':this.dataKey,file:file,'files':this.files});
				//this.uf_delServerFile(file)
			},
			uf_del_sucess() {
				//自行实现
				
			},
			async uf_down(item) {
				let that = this;
				
				//获取数据流文件
				let file_path = `${this._config.host}/get_file_path.php?name=${item.src}&type=down`;
				let file_info = await this.getTempFile(file_path);
				if(!file_info.Flag){
					uni.showToast({
						title:file_info.Content
					});
					return;
				}
				
				let filepath = this._config.host+file_info.file;

				this.isPreview = 1;
				uni.showLoading({
					title: '正在下载...',
					mask: true
				})
				uni.downloadFile({
					url: filepath, //仅为示例，并非真实的资源
					success: ({
						statusCode,
						tempFilePath
					}) => {
						console.log('downloadFile', statusCode)
						//statusCode状态为200表示请求成功，tempFilePath 临时路径
						if (statusCode == 200) {
							//保存到本地
							console.log('temfile', tempFilePath)
							uni.saveFile({
								tempFilePath,
								success: (res) => {
									uni.hideLoading();
									//res.savedFilePath文件的保存路径
									//保存成功并打开文件 内部存储Androiddataio.dcloud.HBuilderappsHBuilderdocuniapp_save
									console.log('savedFilePath', res.savedFilePath)
									uni.showModal({
										title: '文件路径',
										content: res.savedFilePath
									});

									//预览
									this.uf_review(res.savedFilePath,file_info.file)

								},
								fail: () => console.log('下载失败')
							})
							fail: () => console.log('下载失败')
						}
					},
					fail: ((e) => {
						uni.hideLoading();
						console.log('downloadFile-fail', e);
					})
				})
				
			},
			//附件在线预览
			uf_review(tempath,filepath)
			{
				let suffix = filepath.split('.').pop().toLowerCase();
				console.log(suffix);
				const documents = ['doc','xls','ppt','pdf','docx','pptx','xlsx'];
				if(documents.indexOf(suffix)!=-1){
					uni.openDocument({
						filePath: tempath,
						success: res => console.log('成功打开文档')
					});
				}
				else{
					uni.showModal({
						title: '格式错误',
						content: '该文件格式不支持在线预览'
					});
				}
				
			},
			uf_previewImage(index,urls) {
				const images = urls.map(item => {
					return this.host + item;
				})
				uni.previewImage({
					urls:images,
					current:index,
					success:(e)=>{
						console.log('previewImage-success',e);
						this.isPreview = 1;
					}
				});
				
			},
			getTempFile(filepath){
				return util.get(filepath)
			}
			
		}
	}
</script>

<style>

</style>
