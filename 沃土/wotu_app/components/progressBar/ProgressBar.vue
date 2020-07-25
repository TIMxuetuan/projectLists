<template>
	<view class="circleprogress" :style="{width:size,height:size}">
		<view class="progresstext" :style="{fontSize:fontSize,color:color}">{{progresstext}}%</view>
		<view class="wrapper">
			<view class="leftprogress" :style="{borderWidth:borderWidth,transform: leftprogress}"></view>
		</view>
		<view class="wrapper">
			<view class="rightprogress" :style="{borderWidth:borderWidth,transform: rightprogress}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"progressBar",
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
			},
			color:{
				type:String,
				default:'#008000'
			}
		},
		data() {
			return {
				leftprogress: 'rotate(-45deg)',
				rightprogress: 'rotate(45deg)',
			}
		},
		created() {
			this.sliderchange();
		},
		methods: {
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
			}
		},
		watch: {
			progresstext(){
				this.sliderchange();
			}
		}
	}
</script>

<style>
	.circleprogress-wrap{
		width: 200px;
		height: 200px;
		position: relative;
	}
	.circleprogress{
		width: 100%;
		height: 100%;
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
		/* color: #008000; */
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
		border-color: #ccc;
		border-width: 5px;
		border-bottom-color:#F0AD4E;
		border-radius: 50%;
		background: #fff;
		box-sizing: border-box;
	}
	.circleprogress .leftprogress{
		border-right-color:#F0AD4E;
	}
	.circleprogress .rightprogress{
		border-left-color:#F0AD4E;
		margin-left: -100%;
	}
</style>