<template>
	<view class="content">
		<view class="header">
			<view class="head">
				<image :src="userHeader" class="head-img" ></image>
			</view>
			<text class="name">{{userInfo.Name}}</text>
		</view>

		<view class="statistics">
			<view class="statistics-ul">
				<view>出勤</view>
				<view>请假</view>
				<view>旷工</view>
				<view>迟到</view>
				<view>早退</view>
			</view>
			<view class="statistics-ul">
				<view>{{model.RealDays}}/{{ model.ShouldDays }}</view>
				<view class="t-info">{{ model.DayOffs }} 天</view>
				<view class="t-error">{{ model.Absenteeism }} 天</view>
				<view>{{ model.LateDays }} 次</view>
				<view>{{ model.EarlyDays }} 次</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="data-list">
			<view
				v-for="(item, index) in model.Attendances"
				:key="index"
				@tap="jumpMap(item)"
				class="panel"
			>
				<view class="head">
					<text class="head-day">{{ item.itemTitleDate }}</text>
				</view>
				<view class="li li-1">
					<view class="start"><text class="iconfont">&#xe7ed;</text></view>
					<view class="center">
						<view class="time">{{ item.itemOnTime }}</view>
						<view class="position">
							<text class="iconfont">&#xe6bb;</text>
							{{ item.OnAddress ? item.OnAddress : '暂无位置信息' }}
						</view>
					</view>
					<view class="end">
						<text class="iconfont grey" v-if="item.OnStatus === 0">&#xe67d;</text>
						<text class="iconfont red" v-if="item.OnStatus === 1">&#xe669;</text>
						<text class="iconfont green" v-if="item.OnStatus === 2">&#xe6a7;</text>
						<text class="iconfont red" v-if="item.OnStatus === 3">&#xe677;</text>
						<text class="iconfont red" v-if="item.OnStatus === 4">&#xe67a;</text>
						<text class="iconfont red" v-if="item.OnStatus === 5">&#xe67c;</text>
						<text class="iconfont green" v-if="item.OnStatus === 6">&#xe679;</text>
						<text class="iconfont green" v-if="item.OnStatus === -3">&#xe673;</text>
						<text class="iconfont red" v-if="item.OnStatus === -1">&#xe67e;</text>
						
					</view>
				</view>
				<view class="li">
					<view class="start"><text class="iconfont">&#xe667;</text></view>
					<view class="center">
						<view class="time">{{ item.itemOffTime }}</view>
						<view class="position">
							<text class="iconfont">&#xe6bb;</text>
							{{ item.OffAddress ? item.OffAddress : '暂无位置信息' }}
						</view>
					</view>
					<view class="end">
						<text class="iconfont grey" v-if="item.OffStatus === 0">&#xe67d;</text>
						<text class="iconfont red" v-if="item.OffStatus === 1">&#xe669;</text>
						<text class="iconfont green" v-if="item.OffStatus === 2">&#xe6a7;</text>
						<text class="iconfont red" v-if="item.OffStatus === 3">&#xe677;</text>
						<text class="iconfont red" v-if="item.OffStatus === 4">&#xe67a;</text>
						<text class="iconfont red" v-if="item.OffStatus === 5">&#xe67c;</text>
						<text class="iconfont green" v-if="item.OffStatus === 6">&#xe679;</text>
						<text class="iconfont green" v-if="item.OffStatus === -3">&#xe673;</text>
						<text class="iconfont red" v-if="item.OffStatus === -1">&#xe67e;</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<emPicker mode="date" ref="emPicker" fields='month' pickerValueDefault="2019-10-1" @onConfirm="onPickerConfirm"></emPicker>
		<w-picker 
		    mode="yearMonth" 
		    startYear="2010" 
		    endYear="2050"
		    :defaultVal="[0,0]" 
		    :current="true"
		    @confirm="onPickerConfirm" 
		    ref="emPicker" 
		    themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
import util from '@/common/util.js';
import { _data, _methods } from '@/common/public.js';
import wPicker from '@/components/w-picker/w-picker.vue';
import _config from '@/config.js';
import Services from '@/services/attendance.js';
let timer;
export default {
	components: {
		wPicker
	},
	data() {
		return {
			..._data,
			userHeader:'',
			date: util.formatTime(new Date().getTime(), 'Y-M-D'),
			month: util.formatTime(new Date().getTime(), 'M'),
			day: util.formatTime(new Date().getTime(), 'D'),
			curMonth: util.formatTime(new Date().getTime(), 'M'),
			model: {
				Absenteeism: 0,
				Attendances: [],
				DayOffs: 0,
				DepartName: '',
				EarlyDays: 0,
				Id: '',
				LateDays: 0,
				Member: '',
				MemberName: '',
				Number: '',
				RealDays: 0,
				ShouldDays: 0
			}
		};
	},
	onLoad() {
		uni.showLoading({
			mask:true,
			title:'加载中...'
		})
		timer = setTimeout( ()=>{
			uni.hideLoading();
			
		},2000)
		this.getUserInfo();
		// 处理头像的url
		this.userHeader = this.userInfo.Header.indexOf('/Backbone/')>-1 ? _config.api_path+this.userInfo.Header:this.userInfo.Header;
		this.getAttendanceList();
	},
	onUnload(){
		// 清除定时器
		timer = null;
	},
	methods:{
		..._methods,
		getAttendanceList() {
			Services.attendanceList({ date: this.date }).then(res => {
				if(res.Flag){
					uni.hideLoading();
				}else{
					uni.showToast({
						title:'数据加载失败',
						icon: 'none'
					})
				}
				let _attendances = res.Content.Attendances;
				if(this.curMonth==this.month){
					 _attendances = _attendances.slice(0, this.day);
				}
				_attendances = _attendances.reverse();
				_attendances = _attendances.map((item,index)=>{
					item['itemTitleDate'] = this.formatItemTitleDate(item,index);
					item['itemOnTime'] = this.formatDate(item.OnTime);
					item['itemOffTime'] = this.formatDate(item.OffTime)
					return item
				})
				
				res.Content.Attendances = _attendances;
				this.model = res.Content;
				let month = this.month;
				uni.setNavigationBarTitle({
					title: '考勤表（' + month + ' 月）'
				});
				
			});
		},
		jumpMap(item) {
			let member = this.model.Member;
			let date_array = this.date.split('-');
			date_array[2] = item.Day;
			let date = date_array.join('-');
			let _url = `/pages/work/member-manage/attendance/map?member=${member}&date=${date}`;
			uni.navigateTo({
				url: _url
			});
		},
		onPickerConfirm(obj) {
			this.date = obj.result+'-01';
			this.month = obj.checkArr[1];
			this.getAttendanceList();
		},
		formatItemTitleDate(item, index) {
			let d = item.Day + '日';
			if(this.curMonth==this.month&&index == 0){
				d = '今天';
			}
			let w_zh = ['', '一', '二', '三', '四', '五', '六', '日'][item.Week];
			return `${d}（周${w_zh}）`;
		},
		formatDate(date) {
			if (date.indexOf('0001-01-01') > -1) {
				return '时间未知';
			}
			let timeStamp = util.date2timeStamp(date);
			return util.formatTime(timeStamp, 'Y-M-D h:m:s');
		}
	},
	onNavigationBarButtonTap(e) {
		console.log(this.$refs)
		this.$refs.emPicker.show();
	}
};
</script>

<style lang="scss">
.green{
	color: #999933;
}
.red{
	color: #CC3300;
}
.grey{
	color: #ccc;
}
.content {
	position: relative;
	background: $uni-bg-color-grey;
}

/* 头部模块 */
.header {
	@extend %flex-column-center;

	height: 232upx;
	background: $uni-bg-color-primary;
	color: #fff;

	.head {
		width: 110upx;
		height: 110upx;
		background: #fff;
		border-radius: 50%;
		overflow: hidden;
	}

	.head-img {
		width: 100%;
		height: 100%;
	}

	.name {
		margin-top: 11upx;
	}
}

.uni-iput {
	position: absolute;
	top: 1px;
	left: 680upx;
}

/* 统计模块 */
.statistics {
	border-bottom: #f8f8f8 solid 20upx;
	background: #fff;
}
// .statistics{
// 	width: 90%;
// 	height: 150upx;
// 	background: #fff;
// 	border-radius: 10upx;
// 	margin: 0 auto;
// 	overflow: hidden;
// 	position: relative;
// 	top: -50upx;
// 	z-index: 999;
// }
.statistics-ul {
	color: $uni-text-color;
	@extend %flex-center;

	view {
		@extend %flex-center;
		flex: 1;
		font-size: $uni-font-size-base;
		box-sizing: border-box;
		border-left: #eee solid 1px;
		border-bottom: #eee solid 1px;
		box-sizing: border-box;
		height: 70upx;
	}
}

/* 滚动条模块 */
.data-list {
	height: vh(1376, 994);
	background: #f8f8f8;
}

.panel {
	background: #fff;
	margin-bottom: 20upx;
	.head {
		color: #2d81b5;
		font-size: $uni-font-size-base;
		border-bottom: 1px solid #eee;
		padding: 8upx 0;
	}
	.head-day {
		margin-left: 37upx;
	}
	.li {
		display: flex;
		align-items: center;
	}
	.iconfont {
		font-size: $uni-img-size-base;
	}
	.start,
	.end {
		width: 110upx;
		height: 120upx;
		@extend %flex-center;
		view {
			@extend %flex-center;
			font-size: $uni-font-size-sm;
			box-sizing: border-box;
			border-left: #eee solid 1px;
			border-bottom: #eee solid 1px;
			width: 150px;
			height: 60upx;
		}
	}
	.start {
		color: #fd8800;
	}
	.end {
		color: $uni-text-color-blue;
		.iconfont {
			font-size: $uni-img-size-base;
		}
	}
	.center {
		flex: 1;
		height: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.position{
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
	.time {
		font-size: $uni-font-size-base;
	}
}

.li-1 {
	.center {
		border-bottom: 1px solid #eee;
	}
}
.position{
	font-size: $uni-font-size-base;
	color: $uni-text-color-grey;
	.iconfont {
		font-size: $uni-font-size-base;
		padding-right: 10upx;
	}
}

</style>
