<template>
	<view class="big_container">
		<view class="auth_content">

			<view style="padding:10px 10px;">
				<u-steps :list="numList" 　mode="number" :current="1"></u-steps>
			</view>
			<view class="notice_item">恭喜你注册成功，请完善以下信息，并缴纳保证金，可正式入驻。</view>
			<view class="auth_from">
				<!--输入表单-->
				<u-form class="uview_from" :model="model" ref="uForm">
					<u-form-item class="from_item" label="公司名称" :border-bottom="true" label-width="150" label-position="top"
					 :label-style="labelStyle">
						<u-input v-model="model.company" placeholder="与营业执照名称一致,否则审核不通过" />
					</u-form-item>
					<u-form-item class="from_item" label="营业执照编码" :border-bottom="true" label-width="150" label-position="top"
					 :label-style="labelStyle">
						<u-input v-model="model.license" placeholder="请输入营业执照编码" />
					</u-form-item>
					<u-form-item class="from_item" label="法人姓名" :border-bottom="true" label-width="150" label-position="top"
					 :label-style="labelStyle">
						<u-input v-model="model.name" placeholder="请输入法人姓名" />
					</u-form-item>
					<u-form-item class="from_item" label="联系电话" :border-bottom="true" label-width="150" label-position="top"
					 :label-style="labelStyle">
						<u-input v-model="model.phone" placeholder="请输入联系电话" type="number" />
					</u-form-item>
					<u-form-item class="from_item" label="上传公司营业执照" :border-bottom="true" label-width="300" label-position="top"
					 :label-style="labelStyle">
						<u-upload :header="uploadHeader" :action="uploadUrl" :file-list="model.photo" width="160" @on-success="doorhead"></u-upload>
					</u-form-item>
				</u-form>

				<view class="config_btn">
					<u-button class="uview_from_button" shape="circle" type="warning" @click="saveInfo">提交</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {_data,_methods,util} from '@/common/public.js'
	import Services from '../../services/app.js';
	import {_config} from '../../config.js'
	export default {
		components: {

		},
		data() {
			return {
				..._data,
				model: {
					company: "",
					license: "",
					name: "",
					phone: '',
					photo: ''
				},
				uploadUrl:this._config.uploadUrl,
				//获取验证码属性
				smsFlag: false,
				sendTime: "获取验证码",
				snsMsgWait: 10,
				labelStyle: {
					"margin-bottom": "0",
					"height": "40rpx"
				},
				customStyle: {
					// "background-color":"#A6C0FF"
				},
				numList: [{
					name: '注册信息'
				}, {
					name: '认证信息'
				}, {
					name: '缴纳保证金'
				}],
				btnDisabled: true
			};
		},
		onLoad() {
			//console.log("url",this._config.uploadUrl);
		},
		methods: {
			..._methods,
			//获取验证码
			sendCode() {
				if (!this.model.phone) {
					this.show_toast("手机号不能为空")
					return
				}
				if (!method_all.checkPhone(this.model.phone)) {
					this.show_toast("手机号格式不正确")
					return
				}

				this.smsFlag = true;
				let postObj = {
					type: "reg",
					mphone: this.model.phone
				};
				return
				console.log("postObj:", postObj);
				console.log(Services.getSendCode)
				Services.getSendCode(postObj).then(res => {
					console.log(res)
					this.show_toast("发送成功")
				})
				var inter = setInterval(
					function() {
						this.sendTime = this.snsMsgWait + "秒后重发";
						this.snsMsgWait = this.snsMsgWait - 1;
						if (this.snsMsgWait < 0) {
							clearInterval(inter);
							this.sendTime = "获取验证码";
							this.snsMsgWait = 10;
							this.smsFlag = false;
						}
					}.bind(this),
					1000
				);
				console.log(66666);
			},
			doorhead(data, index, lists) {
				console.log("1111",data.result)
				this.model.photo=data.result;
				console.log(data)
				console.log(index)
				console.log(lists)
			},
			saveInfo() {
				if (!this.model.company) {
					this.show_toast("公司名称不能为空")
					return
				}
				if (!this.model.license) {
					this.show_toast("公司营业执照编码不能为空！")
					return
				}
				if (!this.model.phone) {
					this.show_toast("手机号不能为空")
					return
				}
				if (!this.checkPhone(this.model.phone)) {
					this.show_toast("手机号格式不正确")
					return
				}
				let postObj = {
					ce_corname: this.model.company,
					ce_corUSCC: this.model.license,
					ce_lpname: this.model.name,
					ce_contact: this.model.phone,
					ce_license_photo: this.model.photo
				};
				console.log("obj",postObj);
				uni.showLoading({
					title: '提交中...',
					icon: "none"
				});
				Services.authInfo(postObj).then(res => {
					if (res.Flag) {
						console.log(res)
						this.show_toast("保存成功")
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 500)
					} else {
						this.show_toast(res.Content)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: auto;
	}

	.big_container {
		height: auto !important;
	}

	.notice_item {
		background-color: #DAE5FE;
		color: #4779F2;
		height: 50px;
		line-height: 20px;
		padding: 5px 10px;
		font-size: 12px;
		margin: 10px 15px;
		border: 1px solid #fff;
	}

	.auth_content {
		width: 100%;
		height: auto;
		overflow: hidden;

		.auth_from {
			margin: 40rpx 0;
			padding: 0 40rpx;

			.u-border-bottom:after {
				border-bottom: 2px solid #E9E9E9;
			}

		}
	}

	.uview_from {
		.u-form-item {
			padding: 0;
			margin: 20rpx 0;
		}
	}

	.from_item {
		.u-form-item--left {
			margin: 0 !important;
		}
	}

	.config_btn {
		.uview_from_button {
			width: 674rpx;
			margin: 60rpx auto 30rpx;
		}
	}
</style>
