<template>
	<view class="content">
		<view class="top-tab">
			<view class="item" :class="{ cur: type == 0 }" @tap="tab(0)">待处理</view>
			<view class="item" :class="{ cur: type == 1 }" @tap="tab(1)">已通过</view>
			<view class="item" :class="{ cur: type == 2 }" @tap="tab(2)">已驳回</view>
		</view>
		<scroll-view class="main-box" scroll-y :style="{height: scrollHeight+'px'}" >
			<navigator
				v-for="(item, index) in listData"
				:key="index"
				:url="'./myRequestDetail?wid=' + item.Wid +'&applyId=' +item.Id"
				class="item"
			>
				<view class="left">
					<image
						mode="aspectFit"
						:src="item.MemberHeader"
						@error="imageError"
						class="img"
					></image>
				</view>
				<view class="right">
					<text class="title">{{ item.Name }}：{{ item.WfNO }}</text>
					<view class="des">
						<text>
							<text class="iconfont">&#xe630;</text>
							{{ item.DateTime }}
						</text>
						<text>
							<text class="iconfont">&#xe63b;</text>
							{{ item.MemberName }}
						</text>
					</view>
				</view>
			</navigator>
			<view class="data-dec" v-if="noData">暂无数据</view>
		</scroll-view>		
		
	</view>
</template>

<script>
import util from '@/common/util.js';
import { _data, _methods } from '@/common/public.js';
import Services from '@/services/approve.js';
import { uniCard } from '@/components/uni-card/uni-card.vue';
export default {
	components: { uniCard },
	data() {
		return {
			..._data,
			type: 0,
			listData:[],
			scrollHeight: '',
			noData:false
		};
	},
	onLoad() {
		this.scrollHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(90);
		this.getList();
	},
	onReady() {},
	methods: {
		..._methods,
		getList() {
			// 暂时一次性只能获取50条数据，没有翻页操作，后续修改
			Services.myApply({type: this.type,size:50}).then((res)=>{
				if(res.Flag){
					this.noData = res.Content.length == 0 ?true:false;
					console.log(this.noData)
					let _listData = res.Content.map(item => {
						let time = util.date2timeStamp(item.DateTime);
						item.DateTime = util.formatTime(time, 'Y-M-D h:m:s');
						return item;
					});
					this.listData = this.listData.concat(_listData);
				}
			});
		},
		tab(type) {
			this.type = type;
			this.resetPageParameters();
			this.getList();
		}
	}

};
</script>

<style lang="scss">
.top-tab{
	display: flex;
	height: 90upx;
	font-size:$uni-font-size-lg;
	background: #fff;
	.item{
		width: calc(100% / 3);
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.cur{
		color: $uni-text-color-blue;
		border-bottom: 1px solid $uni-text-color-blue;
	}
}
.content {
	background: $uni-bg-color-grey;
	box-sizing: border-box;
	
}
.loading{
	height: 100upx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: $uni-bg-color-grey;
}
.main-box{
	.item{
		height: 120upx;
		width: 100vw;
		padding: 0 20upx;
		background-color: #fff;
		display: flex;
		align-items: center;
		border-bottom: 1px solid $uni-border-color-gray;
		.left{
			width: 120upx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.img{
				width: 70%;
				height: 70%;
				border-radius: 50%;
			}
		}
		.right{
			flex: 1;
			margin-right: 10upx;
			.title{
				color: $uni-text-color;
				font-size: $uni-font-size-lg;
			}
			.des{
				display: flex;
				margin-top: 8upx;
				text{
					margin-right: 20upx;
					color: $uni-text-color-grey;
					font-size: $uni-font-size-sm;
					.iconfont{
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
						margin-right: 6upx;
					}
				}
			}
		}
	}
}
.data-dec{
	height: 100upx;
	font-size: $uni-font-size-sm;
	color: #8a8a8a;
	@include custom-flex(center,center,row,no-wrap);
}

</style>
