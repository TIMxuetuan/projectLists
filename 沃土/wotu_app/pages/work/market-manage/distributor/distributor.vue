<template>
	<!-- 分销商 -->
	<view class="container">
		<view class="aside">
			<scroll-view class="scroll-box" scroll-y="true" :scroll-with-animation='true' :scroll-into-view='scrollInto'>
				<view v-for="(item, index) in provinceList" :key="item.id" :id='item.id'
				 @tap="ontabTap(index)" class="scroll-item" :class="{'scroll-item-active':tabIndex === index}">{{item.name}}</view>
			</scroll-view>
		</view>
		<view class="main" >
			<view class="content">
				<view class="m-item" v-for="(cityName, index) in provinceList[tabIndex]['cities']" :key='index'>
					<view class="show-box">{{cityName[0]}}</view>
					<view class="title">{{cityName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provinceList:[
					{id:'h01',name:'河南省',cities:['郑州','洛阳','开封','平顶山','周口']},
					{id:'h02',name:'河北省',cities:['北京','石家庄','邯郸','廊坊']},
					{id:'h03',name:'浙江省',cities:['杭州','温州','宁波','绍兴']},
					{id:'h04',name:'江苏省',cities:['南京','苏州','镇江','丹阳','无锡']},
					{id:'h05',name:'黑龙江省',cities:['哈尔滨','齐齐哈尔','鹤岗','大庆','双鸭山']},
					{id:'h06',name:'湖南省',cities:['长沙','株洲','岳阳','邵阳','湘潭']},
					{id:'h07',name:'河南省',cities:['郑州','洛阳','开封','平顶山','周口']},
					{id:'h08',name:'河北省',cities:['北京','石家庄','邯郸','廊坊']},
					{id:'h09',name:'浙江省',cities:['杭州','温州','宁波','绍兴']},
					{id:'h10',name:'江苏省',cities:['南京','苏州','镇江','丹阳','无锡']},
					{id:'h11',name:'黑龙江省',cities:['哈尔滨','齐齐哈尔','鹤岗','大庆','双鸭山']},
					{id:'h12',name:'湖南省',cities:['长沙','株洲','岳阳','邵阳','湘潭']},
					{id:'h13',name:'河南省',cities:['郑州','洛阳','开封','平顶山','周口']},
					{id:'h14',name:'河北省',cities:['北京','石家庄','邯郸','廊坊']},
					{id:'h15',name:'浙江省',cities:['杭州','温州','宁波','绍兴']},
					{id:'h16',name:'江苏省',cities:['南京','苏州','镇江','丹阳','无锡']},
					{id:'h17',name:'黑龙江省',cities:['哈尔滨','齐齐哈尔','鹤岗','大庆','双鸭山']},
					{id:'h18',name:'湖南省',cities:['长沙','株洲','岳阳','邵阳','湘潭']},
				],
				scrollInto:'',
				tabIndex:0,
			};
		},
		onLoad() {
			
		},
		methods:{
			ontabTap(index){
				this.tabIndex = index;
				this.scrollInto = this.provinceList[index].id;
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}
.container{
	display: flex;
	height: 100vh;
	overflow: hidden;
	color: $uni-text-color;
	.aside{
		width: 250upx;
		background: #eee;
	}
	.main{
		flex: 1;
		background: #fff;
	}
}

// scroll-view
.scroll-box{
	height: 100%;
	.scroll-item{
		text-align: center;
		padding: 30upx 0;
		color: #999;
		font-size: $uni-font-size-lg;
	}
	.scroll-item-active{
		background: #fff;
		font-weight: bold;
		color: #333;
		position: relative;
		&::before{
			content: '';
			display: block;
			width: 10upx;
			height: 60upx;
			background: #0077AA;
			position: absolute;
			left: 0;
			top: calc(50% - 30upx);
		}
	}
	// 隐藏滚动条
	::-webkit-scrollbar {
	  width: 0;
	  height: 0;
	  color: transparent;
	}
}

// content
.content{
	padding: 50upx 10upx;
	display: flex;
	flex-wrap: wrap;
	.m-item{
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 30upx;
		.show-box{
			width: 100upx;
			height: 100upx;
			border: 1upx dashed #00D3B8;
			color: #0190A0;
			font-size: 80upx;
			line-height: 100upx;
			text-align: center;
		}
		.title{
			margin-top: 20upx;
			font-size: $uni-font-size-base;
		}
	}
}

</style>
