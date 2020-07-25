<template>
	<view class="em-picker">
		<view :class="{ pickerMask: showPicker }" @tap="maskClick" catchtouchmove="true"></view>
		<view class="em-picker-content" :class="{ 'em-picker-view-show': showPicker }">
			<view class="picker-header" catchtouchmove="true">
				<view class="em-cancel" @tap="pickerCancel">取消</view>
				<view class="em-confirm" :style="{ color: themeColor }" @tap="pickerConfirm">
					确定
				</view>
			</view>
			<picker-view
				:indicator-style="indicatorStyle"
				:value="value"
				@change="pickerChange"
				v-if="mode === 'date'"
			>
				<picker-view-column>
					<view class="item" v-for="(item, index) in years" :key="index">
						{{ item }}年
					</view>
				</picker-view-column>
				<picker-view-column v-if="fields === 'month' || fields === 'day'">
					<view class="item" v-for="(item, index) in months" :key="index">
						{{ item }}月
					</view>
				</picker-view-column>
				<picker-view-column v-if="fields === 'day'">
					<view class="item" v-for="(item, index) in days" :key="index">
						{{ item }}日
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
/*
mode="date" 
ref="emPicker" 
fields='month' 
pickerValueDefault="2018-10-20" 
@onConfirm="onPickerConfirm"
*/
export default {
	data() {
		return {
			pickerChangeValue: [],
			pickerValue: [],
			pickerValueArrayChange: true,
			modeChange: false,

			years: [],
			year: '',
			months: [],
			month: '',
			days: [],
			day: '',
			value: [9999, 12 - 1, 20 - 1],
			/**
			 * 解决动态设置indicator-style不生效的问题
			 */
			indicatorStyle: `height: ${Math.round(
				uni.getSystemInfoSync().screenWidth / (750 / 100)
			)}px;`,
			/* 是否显示控件 */
			showPicker: false
		};
	},
	props: {
		/* mode */
		mode: {
			type: String,
			default: 'date'
		},
		fields: {
			type: String,
			default: 'day'
		},
		/* 默认值 */
		pickerValueDefault: {
			type: String,
			default: ''
		},
		/* 主题色 */
		themeColor: String
	},
	watch: {
		value(val) {
			//console.log('val',val);
			//this._initDate();
		}
	},
	methods: {
		_initDate() {
			let date = new Date();
			let years = [];
			let year = date.getFullYear();
			let months = [];
			let month = date.getMonth() + 1;
			let days = [];
			let day = date.getDate();

			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i);
			}

			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}

			for (let i = 1; i <= 31; i++) {
				days.push(i);
			}

			this.years = years;
			this.year = date.getFullYear();
			this.months = months;
			this.month = date.getMonth() + 1;
			this.days = days;
			this.day = date.getDate()||1;
			this.value = [9999, month - 1, day - 1];

			if (this.pickerValueDefault) {
				let _pickerValueDefault_array = this.pickerValueDefault.split('-');
				let year_index = this.years.indexOf(_pickerValueDefault_array[0] - 0);
				let month_index = _pickerValueDefault_array[1]
					? this.months.indexOf(_pickerValueDefault_array[1] - 0)
					: 1;
				let day_index = _pickerValueDefault_array[2]
					? this.days.indexOf(_pickerValueDefault_array[2] - 0)
					: 1;

				this.year = _pickerValueDefault_array[0];
				_pickerValueDefault_array[1] && (this.month = _pickerValueDefault_array[1]);
				_pickerValueDefault_array[2] && (this.day = _pickerValueDefault_array[2]);
				this.value = [year_index, month_index, day_index];
			}
		},
		show() {
			setTimeout(() => {
				this._initDate();
				this.showPicker = true;
			}, 0);
		},
		maskClick() {
			this.pickerCancel();
		},
		pickerCancel() {
			this.showPicker = false;
			setTimeout(() => {
				this.$emit('onCancel', {
					year: this.year,
					month: this.month,
					day: this.day
				});
			}, 100);
		},
		pickerConfirm(e) {
			this.showPicker = false;
			setTimeout(() => {
				this.$emit('onConfirm', {
					year: this.year,
					month: this.month,
					day: this.day
				});
			}, 100);
			return false;
		},
		pickerChange(e) {
			const val = e.detail.value;
			this.year = this.years[val[0]];
			this.month = this.months[val[1]];
			this.day = val.length>2?this.days[val[2]]:1;
		}
	}
};
</script>

<style>
picker-view {
	width: 100%;
	height: 500upx;
}
.pickerMask {
	position: fixed;
	z-index: 1000;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
}

.em-picker-content {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	transition: all 0.3s ease;
	transform: translateY(100%);
	z-index: 3000;
	background: #fff;
}

.em-picker-view-show {
	transform: translateY(0);
}

.picker-header {
	display: flex;
	justify-content: space-between;
	background: #fff;
}
.em-cancel,
.em-confirm {
	line-height: 44px;
	width: 100px;
	padding: 0 20px;
}
.em-confirm {
	text-align: right;
}

.item {
	text-align: center;
	line-height: 50px;
	font-size: 16px;
}

.mpvue-picker-view {
	position: relative;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 238px;
	background-color: rgba(255, 255, 255, 1);
}
</style>
