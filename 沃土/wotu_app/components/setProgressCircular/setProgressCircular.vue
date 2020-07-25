<template>
	<view class="set-progress-circular" v-if="show">
		<view class="circleprogress-wrap" :style="{width:size,height:size}">
			<view class="circleprogress">
				<view class="progresstext" :style="{fontSize:fontSize}">{{progresstext}}%</view>
				<view class="wrapper">
					<view class="leftprogress" :style="{borderWidth:borderWidth,transform: leftprogress}"></view>
				</view>
				<view class="wrapper">
					<view class="rightprogress" :style="{borderWidth:borderWidth,transform: rightprogress}"></view>
				</view>
			</view>
			
			<view class="set-progress">
				<view class="spot spot-1" @tap="setProgress(10)"><text>10</text></view>
				<view class="spot spot-2" @tap="setProgress(20)"><text>20</text></view>
				<view class="spot spot-3" @tap="setProgress(30)"><text>30</text></view>
				<view class="spot spot-4" @tap="setProgress(40)"><text>40</text></view>
				<view class="spot spot-5" @tap="setProgress(50)"><text>50</text></view>
				<view class="spot spot-6" @tap="setProgress(60)"><text>60</text></view>
				<view class="spot spot-7" @tap="setProgress(70)"><text>70</text></view>
				<view class="spot spot-8" @tap="setProgress(80)"><text>80</text></view>
				<view class="spot spot-9" @tap="setProgress(90)"><text>90</text></view>
				<view class="spot spot-10" @tap="setProgress(100)"><text>100</text></view>
			</view>
		</view>
		
		<view class="set-progress-mask" @tap="_hidden"></view>
	</view>
</template>

<script>
	export default {
		name:"setProgressCircular",
		props:{
			progresstext:{
				type:Number,
				value:0,
			},
			size:{
				type:String,
				value:'60px',
			},
			borderWidth:{
				type:String,
				value:'6px',
			},
			fontSize:{
				type:String,
				value:'10px',
			}
		},
		data() {
			return {
				show:false,
				leftprogress: 'rotate(-45deg)',
				rightprogress: 'rotate(45deg)',
			}
		},
		created() {
			this.sliderchange();
		},
		methods: {
			setProgress(value){
				this.$emit('onSetProgress',value);
			},
			sliderchange(){
				var deg = this.progresstext/100*360;
				if(deg<=180)
				{
					this.rightprogress = 'rotate('+(45+deg)+'deg)'
					this.leftprogress = 'rotate('+(-45)+'deg)'
				}else
				{
					this.rightprogress = 'rotate('+(45+180)+'deg)'
					this.leftprogress = 'rotate('+(-45+(deg-180))+'deg)'
				}
			},
			_hidden(){
				this.show = false;
			},
			_show(){
				this.show = true;
			}
		}
	}
</script>

<style>
	.set-progress-circular{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.set-progress-mask{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #000000;
		opacity: 0.3;
	}
	.circleprogress-wrap{
		width: 200px;
		height: 200px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.circleprogress{
		width: 50%;
		height: 50%;
		display: flex;
		justify-content: center;
		transform-origin:0 0;
		position: relative;
		z-index: 2;
	}
	.circleprogress .progresstext{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		font-size: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		color: #008000;
	}
	.circleprogress .wrapper{
		width: 50%;
		height: 100%;
		overflow: hidden;
	}
	.circleprogress .leftprogress,
	.circleprogress .rightprogress{
		width: 200%; /*160px*/
		height: 100%; /*160px*/
		border-style: solid;
		border-color: green;
		border-width: 5px;
		border-bottom-color:#7ef22e;
		border-radius: 50%;
		background: #fff;
		box-sizing: border-box;
	}
	.circleprogress .leftprogress{
		border-right-color:#7ef22e;
	}
	.circleprogress .rightprogress{
		border-left-color:#7ef22e;
		margin-left: -100%;
	}
	
	.set-progress{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		border-radius: 50%;
		width: 100%;
		height: 100%;
		background: #0077AA;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		transform:rotate(180deg);
	}
	.set-progress .spots{
		width: 40px;
		height: 40px;
		position: relative;
	}
	.set-progress .spot{
		position: absolute;
		left: 0;
		top:0;
		height: 50%;
		width: 50%;
		transform-origin: bottom right;
		overflow: hidden;
		transform: rotate(60deg) skew(60deg);
		/*
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		
		width:0; 
		height:0; 
		border-left:50px solid transparent;
		border-right:50px solid transparent;
		border-top:100px solid #0066cc;
		*/
	}
	.set-progress .spot text{
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 200%;
		width: 200%;
		border-radius: 50%;
		
		text-align: center;
		padding-top: 14px;
		box-sizing: border-box;
		
		background-color: rgb(46, 135, 192);
		color: #fff;
		font-size: 14px;
		
		transform: skew(-54deg) rotate(-72deg) scale(1);
	}
	.set-progress .spot-1{
		transform: rotate(-90deg) skew(54deg);
	}
	.set-progress .spot-2{
		transform: rotate(-54deg) skew(54deg);
	}
	.set-progress .spot-3{
		transform: rotate(-18deg) skew(54deg);
	}
	.set-progress .spot-4{
		transform: rotate(18deg) skew(54deg);
	}
	.set-progress .spot-5{
		transform: rotate(54deg) skew(54deg);
	}
	.set-progress .spot-6{
		transform: rotate(90deg) skew(54deg);
	}
	.set-progress .spot-7{
		transform: rotate(126deg) skew(54deg);
	}
	.set-progress .spot-8{
		transform: rotate(162deg) skew(54deg);
	}
	.set-progress .spot-9{
		transform: rotate(198deg) skew(54deg);
	}
	.set-progress .spot-10{
		transform: rotate(234deg) skew(54deg);
	}
</style>