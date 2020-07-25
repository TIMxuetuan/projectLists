<template name="gmy-float-touch">
	<view>
		<view @touchmove.stop.prevent = "doNothing" >
			<view class="box" @click="show" style="z-index: 999;" :style="{top:top+'px',left:left + 'px'}" @touchmove="touchmove" @touchend="touchend" :animation="animationData" >
				<image :src="mainImg" mode="aspectFill"></image>
			</view>
			<view class="menu  " :class="{menu0:!isShow&&isleft,menu1:isShow&&isleft ,menu1R:isShow&& !isleft ,menu0R:!isShow&& !isleft}" :style="{top:(top-53)  +'px'}" @tap="menuClick(1)" >
				<image :src="imgLists[0]" mode=""></image>
			</view>
			<view class="menu " :class="{menu0:!isShow&&isleft,menu2:isShow&&isleft ,menu2R:isShow&& !isleft ,menu0R:!isShow&& !isleft }"  :style="{top:top+'px'}" @tap="menuClick(2)">
				<image :src="imgLists[1]" mode="aspectFill"></image>
			</view>
			<!-- <view class="menu " :class="{menu0:!isShow&&isleft,menu3:isShow&&isleft ,menu3R:isShow&& !isleft ,menu0R:!isShow&& !isleft}"  :style="{top:top+'px'}" @tap="menuClick(3)">
				<image :src="imgLists[2]" mode="aspectFill"></image>
			</view>
			<view class="menu " :class="{menu0:!isShow&&isleft,menu4:isShow&&isleft ,menu4R:isShow&& !isleft ,menu0R:!isShow&& !isleft}"  :style="{top:(top + 53)+'px'}" @tap="menuClick(4)">
				<image :src="imgLists[3]" mode="aspectFill"></image>
			</view>
			<view class="menu " :class="{menu0:!isShow&&isleft,menu5:isShow&&isleft ,menu5R:isShow&& !isleft ,menu0R:!isShow&& !isleft}"  :style="{top:(top + 75)+'px'}" @tap="menuClick(5)">
				<image :src="imgLists[4]" mode="aspectFill"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		name:"gmy-float-touch",
		data(){
			return {
				isShow:false,
				top:350,
				left:3,
				right:3,
				isleft:true,
				animationData:''
			}
		},
		props:{
			imgLists:{
				type:Array
			},
			mainImg:{
				type:String,
				default:"../../static/main.png"
			}
		},
		methods:{
			doNothing:function(){},
			show:function(){
				this.isShow = !this.isShow;
				this.spred();
			},
			touchmove:function(e){
				if(this.isShow){
					return 
				}
				var position = e.touches[0];
				var wHeight = this.getSystemInfo('H');
				if(position.pageY>100 && position.pageY+100 < wHeight){
					this.top =  position.pageY-20;
				}
				this.left = position.pageX;
			},
			touchend:function(e){
				var wWidth = this.getSystemInfo('W');
				const pageX = e.changedTouches[0].clientX;
				if(pageX > wWidth*0.5){
					this.isleft = false;
					this.left = wWidth-50;
				}
				else{
					this.isleft = true;
					this.left = 3;
				}
				
			},
			menuClick:function(index){
				this.$emit("menuClick",index);
				this.isShow=!this.isShow;
				this.spred();
			},
			getSystemInfo:function(type){
				var result;
				const screen = uni.getSystemInfoSync();
				const wHeight = screen.windowHeight;
				const wWidth = screen.windowWidth;
				switch(type){
					case 'H':result =  wHeight;break;
					case 'W':result = wWidth;break;
					default: result = 'Err';			
				}
				return result;
			},
			spred:function(e){
				var animation = uni.createAnimation({
				  duration: 200,
					timingFunction: 'ease',
				});
				this.animationData = animation.export();
				
				if(this.isShow){
					animation.rotate(135).step();
				}
				else{
					animation.rotate(0).step();
				}
				this.animationData = animation.export();
			},
		}
	}
	
</script>

<style lang="scss">
	image{
		width: 40upx;
		height: 40upx;
		z-index: 99;
		margin: 20upx;
	}
	.box{
		position: fixed;
		left: 5upx;
		top: 70%;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		background-color: rgba($color: #000000, $alpha: 0.5);
	}
	.menu{
		color:white;
		position: fixed;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		background-color: rgba($color: #000000, $alpha: 0.8);
	}
	.menu0{
		left: 5upx;
		opacity: 0;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu1{
		left: 20upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu2{
		left: 106upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu3{
		left: 145upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu4{
		left: 106upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu5{
		left: 20upx;
		transition: top 0.2s, left 0.2s, opacity 0.2s;
	}
	.menu0R{
		right: 5upx;
		opacity: 0;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
		
	}
	.menu1R{
		right: 20upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu2R{
		right: 106upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu3R{
		right: 145upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu4R{
		right: 106upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
	.menu5R{
		right: 20upx;
		transition: top 0.2s, right 0.2s, opacity 0.2s;
	}
</style>
