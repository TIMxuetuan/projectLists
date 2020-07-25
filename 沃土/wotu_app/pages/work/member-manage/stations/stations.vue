<template>
	<view class="overhidden">
		<view class="fn-list-single">
			<view class="item" v-for="m in listdata" :key='m.Id' @tap="showDetail(m)" :hover-class="hoverClass">
				<text class="start">{{m.Job}}</text>
				<text class="icon-arrow-right"></text>
			</view>
		</view>
		
		<uni-drawer :visible="showDrawer" @close="showDrawer=false">
			<view class="drawer-title">{{model.Job}}</view>
		    <scroll-view scroll-y="true" class="drawer-box">
		        <view class="fn-panel">
		            <view class="header">
		               岗位职责
		            </view>
		            <view class="bd">
		               {{model.Description}}
		            </view>
		        </view>

				<view class="fn-panel">
				    <view class="header">
				       工作流程
				    </view>
				    <view class="bd">
				       {{model.Workflow}}
				    </view>
				</view>
		    </scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import _config from '@/config.js';
	import _services from '@/services/stations.js';
	import {
		_data,
		_methods
	} from '@/common/public.js';
	
	export default {
		data() {
			return {
				..._data,
				listdata: [],
				showDrawer:false,
				model:{
					Company: "",
					CreateDateTime: "",
					Deleted: false,
					Description: "",
					Id: "",
					Job: "",
					Workflow: "",
				}
			}
		},
		onLoad(){
			this.getData();
		},
		mounted() {
			
		},
		methods: {
			..._methods,
			getData(){
				_services.jobDescription()
					.then((res)=>{
						this.listdata = res.Content;
						// console.log('this.listdata',JSON.stringify(this.listdata))
					})
			},
			showDetail(item){
				console.log('this.listdata.item',item)
				this.model = item;
				this.showDrawer = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drawer-box{
		position:absolute;
		left: 0;
		top:90upx;
		bottom: 0;
		right: 0;
		height: calc( 100%-90upx );
		overflow: scroll;
		padding:26upx 20upx;
		box-sizing: border-box;
	}
	.drawer-title{
		margin-bottom: 20upx;
		height: 90upx;
		font-size: 38upx;
		display: flex;
		align-items: center;
		padding: 0 20upx;
	}
	.fn-panel{
		width: 100%;
		box-sizing: border-box;
		.bd{
			padding: 20upx;
			line-height: 1.75;
			white-space: pre-wrap;
		}
	}
</style>
