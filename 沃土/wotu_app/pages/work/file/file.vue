<template>
	<view class="container">
		<view class="w-panel-header">
			<navigator url="./myFile/myFile" class="w-panel-header-cell">
				<text class="iconwodewenjian1" style='color:#47A3D9'></text>
				<text class="title">
					我的文件
				</text>
			</navigator>
			<navigator class="w-panel-header-cell">
				<text class="iconshoucang1" style='color:#47A3D9'></text>
				<text class="title">
					收藏文件
				</text>
			</navigator>
			<navigator class="w-panel-header-cell">
				<text class="iconwj-tzwj" style='color:#47A3D9'></text>
				<text class="title">
					通知文件
				</text>
			</navigator>
		</view>
		
		<view class="w-panel">
			<view class="w-panel-title">共享文件</view>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					会议文件
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					制度文件
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					项目文件
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					技能学习库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					模型数据库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					算法数据库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					工艺专家知识库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					质量管理知识库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					设备故障库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					安全技能知识库
				</text>
			</navigator>
			<navigator url="./approve/approve" class="w-panel-cell">
				<text class="iconwenjianjia" ></text>
				<text class="title">
					节能降耗方案库
				</text>
			</navigator>
		</view>
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
				
			};
		},
		onLoad() {
			self = this;
			
		},
		methods:{
			..._methods,
			jumpTo(url){
				uni.navigateTo({
					url
				})
			}
		},
	}
</script>

<style lang="scss">
	.container{
		padding: 10upx 20upx;
		background: $uni-bg-color-grey;
		box-sizing: border-box;
		min-height: 100vh;
		.w-panel-header{
			.w-panel-header-cell{
				.iconfont{
					color: $icon-bg-primary;
				}
				.title{
					color: $icon-bg-primary;
				}
			}
		}
		.w-panel-cell{
			[class^='icon']{
				color: #FFD659;
			}
		}
	}
</style>
