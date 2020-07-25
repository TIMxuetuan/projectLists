<template>
	<view>
		<map :latitude="latitude" :longitude="longitude" :polyline="polyline" :markers="covers" @updated="updated"></map>
		
	</view>
</template>
<script>
//https://blog.csdn.net/weixin_43968043/article/details/86642657
import {_data,_methods} from '@/common/public.js'
import util from '@/common/util.js';
import Services from '@/services/attendance.js';
export default {
	data() {
		return {
			..._data,
			member:'',
			date:'',
			latitude: 39.997761,
			longitude: 116.478935,
			scale: 14,
			polyline: [
				{
					points: [
						{longitude:116.478935,latitude:39.997761},
						{longitude:116.478939, latitude:39.997825},
						{longitude:116.478998, latitude:39.998555},				
						{longitude:116.479658, latitude:39.998528},
						{longitude:116.481573,latitude:39.997997},
						{longitude:116.482072,latitude:39.997718},
						{longitude:116.484648,latitude:39.999861}
					],
					color:"#2e87c0",//线的颜色
					width:8,//线的宽度
					dottedLine:true,//是否虚线
					arrowLine:true,	//带箭头的线 开发者工具暂不支持该属性
				}
			],
			covers: [
				{
					latitude: 39.997761,
					longitude: 116.478935,
					iconPath: ''
				}
			]
		};
	},
	onLoad(e){
		console.log(e);
		this.member = e.member;
		this.date = e.date;
		this.getAttenceTrack();
	},
	methods: {
		..._methods,
		updated(){
			
		},
		getAttenceTrack(){
			console.log('updated');
			let obj= {member:this.member,date:this.date};
			Services.attenceTrack(obj)
				.then((res)=>{
					if(res.Flag){
						this.dataProcessor(res.Content)
					}
					
				})
		},
		dataProcessor(data){
			if(!data.length){
				return
			}
			let _points = [];
			let _covers = [];
			for(let i=0;i<data.length;i++){
				let _item = data[i];
				if(!_item.Location){
					continue;
				}
				let location_array = _item.Location.split(',');
				_points.push({longitude:location_array[1],latitude:location_array[0]});
				_covers.push({
					latitude: location_array[0],
					longitude: location_array[1],
					iconPath: '../../../../static/img/location.png'
				});
				let _polyline = [
					{
						points: _points,
						color:"#2e87c0",//线的颜色
						width:8,//线的宽度
						dottedLine:true,//是否虚线
						arrowLine:true,	//带箭头的线 开发者工具暂不支持该属性
					}
				]
				this.polyline = _polyline;
				this.covers = _covers;
				this.latitude = _points[0]['latitude'];
				this.longitude = _points[0]['longitude']
			}
		}
	}
};
</script>
<style lang="scss">
	map {
		width: 100%;
		height: 100vh;
	}
</style>
