<template>
	<view>
		<view class="addAddress-content">
			<!--表单-->
			<view class="">
				<u-form :model="form" ref="uForm" :label-style='labelStyle'>
					<u-form-item label="收货人" label-width="120">
						<u-input v-model="form.name" placeholder="请输入姓名" :clearable='false'/>
					</u-form-item>

					<u-form-item :border-bottom="true" label="手机号码" label-width="120">
						<view class="auth_code_style">
							<u-input v-model="form.phone" placeholder="请输入手机号" type="number" :custom-style='inputWidth' :clearable='false'/>
							<view class="">
								+86
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</u-form-item>

					<u-form-item :border-bottom="true" label="所在地区" label-width="120">
						<view class="auth_code_style">
							<u-input v-model="form.city" placeholder="省市区县、乡镇等" :custom-style='inputWidth' :clearable='false'/>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</u-form-item>

					<u-form-item label="详细地址" label-width="120" label-position='top'>
						<u-input v-model="form.addressText" placeholder="请输入详细街道、楼牌号等" :clearable='false'/>
					</u-form-item>
				</u-form>
				<view class="default-check">
					<view class="default-check-text">
						设置默认地址
					</view>
					<view class="">
						<u-checkbox-group>
							<u-checkbox @change="checkboxChange" v-model="checked" shape="circle"></u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>

			<!--按钮-->
			<view class="saveBtn">
				<u-button shape="circle" type="error" :custom-style="addAddressStyle" @click="gotoaddAddress">保存</u-button>
				<view v-if="stateType == 1" style="margin-top: 30rpx;">
					<u-button shape="circle" :custom-style="addAddressStyle" @click="deleteShowClick">删除</u-button>
				</view>
			</view>
		</view>

		<!--删除模态框-->
		<u-modal v-model="deleteShow" :content="content" :show-cancel-button='true' @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../../common/public.js'
	import Services from '../../../services/app.js';
	export default {
		data() {
			return {
				..._data,
				stateType: '',
				//输入框宽度
				inputWidth:{
					width:'420rpx'
				},
				//按钮样式属性
				addAddressStyle: {
					width: '674rpx',
					height: '80rpx',
				},
				labelStyle: {
					fontSize: '24rpx'
				},
				form: {
					name: '',
					phone: '',
					city: '',
					addressText: '',
				},
				//选中默认矿
				checked: false,

				//是否显示删除弹窗
				deleteShow: false,
				content:'确定要删除该地址吗？'
			};
		},
		onLoad: function(option) {
			this.stateType = option.stateType
			console.log('this.stateType', this.stateType)
			if (this.stateType == 1) {
				const item = JSON.parse(decodeURIComponent(option.item));
				console.log(item)
				this.form = item
				this.checked = item.isShow
			}
		},
		methods: {
			..._methods,
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},

			//弹出删除弹出框
			deleteShowClick() {
				this.deleteShow = true
			},

			//删除确认弹窗 确定事件
			confirm() {
				this.show_toast("删除成功")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addAddress-content {
		padding: 0 40rpx;

		/deep/ .u-form-item--left {
			margin: 0 !important;
		}
	}

	.default-check {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;

		.default-check-text {
			font-size: 28rpx;
			color: #444444;
		}
	}
	
	.auth_code_style{
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.saveBtn {
		margin: 100rpx 0 0;
	}
</style>
