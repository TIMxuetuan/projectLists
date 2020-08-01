<template>
	<view class="authentication_page">
		<view class="authentication_page_wrap">
			<view class="authentication_info">
				恭喜您成功注册，请完善以下信息正式入驻，上架商品或享受更多权益。
			</view>
			<view class="authentication_info_txt">
				<view class="authentication_info_txt_title">
					企业名称
				</view>
				<u-input v-model="form.enterpriseName" type="textarea" placeholder="与营业执照名称一致,否则审核不通过(必填)" height=25rpx />
			</view>
			<view style="height: 1px;background-color: #E5E5E5;;"></view>
			<view class="authentication_info_txt">
				<view class="">
					营业执照编码
				</view>
				<u-input v-model="form.number" type="textarea" placeholder="请输入营业执照编码(必填)" height=25rpx />
			</view>
			<view style="height: 1px;background-color: #E5E5E5;;"></view>
			<view class="authentication_info_txt">
				<view class="">
					法人姓名
				</view>
				<u-input v-model="form.name" type="textarea" placeholder="请输入法人身份姓名" height=25rpx />
			</view>
			<view style="height: 1px;background-color: #E5E5E5;;"></view>
			<view class="authentication_info_txt">
				<view class="">
					身份证
				</view>
				<u-input v-model="form.id" type="textarea" placeholder="请输入法人身份证号" height=25rpx />
			</view>
			<view style="height: 1px;background-color: #E5E5E5;;"></view>
			<view class="authentication_info_txt">
				<view class="">
					资质照片
				</view>
				<u-input type="textarea" placeholder="请上传已加盖红色公章得黑白清晰复印件(*为比填)" height=25rpx disabled />
				<view class="authentication_info_photo">
					<u-upload :action="uploadUrl" :header="uploadHeader"  width="300" :max-count="max_count" @on-success="doorhead" style="margin: 0;"></u-upload>
					<view style="flex: 1;"></view>
					<u-upload :action="uploadUrl" :header="uploadHeader" width="300" :max-count="max_count" style="margin: 0;" @on-success="license"></u-upload>
				</view>
				<view style="display: flex;">
					<view style="width: 150px;text-align: center;font-size:12px;font-family:Source Han Sans CN;font-weight:400;color:rgba(90,90,90,1);line-height:20px;"><span style="color: #EC3333;">*</span>门头信息</view>
					<view style="flex: 1;"></view>
					<view style="width: 150px;text-align: center;font-size:12px;font-family:Source Han Sans CN;font-weight:400;color:rgba(90,90,90,1);line-height:20px;"><span style="color: #EC3333;">*</span>营业执照</view>
				</view>
			</view>
			<view class="authentication_info_txt">
				<view class="">
					身份证信息
				</view>
				<view class="authentication_info_photo">
					<u-upload :action="uploadUrl" :header="uploadHeader"  width="300" :max-count="max_count" @on-success="positive" style="margin: 0;" :disabled="disabled"></u-upload>
					<view style="flex: 1;"></view>
					<u-upload :action="uploadUrl" :header="uploadHeader"  width="300" :max-count="max_count" @on-success="verso" style="margin: 0;"></u-upload>
				</view>
				<view style="display: flex;">
					<view style="width: 150px;text-align: center;font-size:12px;font-family:Source Han Sans CN;font-weight:400;color:rgba(90,90,90,1);line-height:20px;">身份证正面/有照片</view>
					<view style="flex: 1;"></view>
					<view style="width: 150px;text-align: center;">身份证反面/有国徽</view>
				</view>
				<view class="" style="height: 30px;">

				</view>
				<u-button type="primary" @click="qualificationsSubmit">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		_data,
		_methods,
		util
	} from '../../common/public.js';
	import Services from '../../services/app.js';

	export default {
		data() {
			return {
				..._data,
				uploadUrl: this._config.uploadUrl,
				form: {
					enterpriseName: '',
					number: null,
					name: '',
					id: ''
				},
				file: {
					doorhead: [],
					license: [],
					positive: [],
					verso: []
				},
				aaa: "",
				max_count:1,
				disabled:false
			}
		},
		onLoad(){
			
		},
		methods: {
			..._methods,
			qualificationsSubmit() {
				if(this.file.doorhead.length<1){
					this.toast("门头照片为空");
				}else if(this.file.license.length<1){
					this.toast("营业执照为空");
				}else{
					console.log("888888")
					console.log(this.form)
					console.log(this.file)
					var id_photo = this.file.positive + "@" + this.file.verso
					var data = {
						company_name: this.form.enterpriseName,
						credit_code: this.form.number,
						business_license: this.file.license,
						door_photo: this.file.doorhead,
						legal_person: this.form.name,
						legal_person_card: this.form.id,
						legal_person_card: id_photo
					}
					console.log(data)
					Services.post_goods_authentication(data).then(res => {
						console.log("9999")
						console.log(res)
					})
				}
				
				// this.$u.route({
				// 				url: 'pages/my/examineSuccess',
				// 			})
			},
			doorhead(data, index, lists) {
				this.file.doorhead = []
				this.file.doorhead.push(data.result)
				console.log("000000")
				console.log(data)
			},
			license(data,index, lists) {
				this.file.license = []
				this.file.license.push(data.result)
			},
			positive(data,index, lists) {
				this.file.positive = []
				this.file.positive.push(data.result)
			},
			verso(data,index, lists) {
				this.file.verso = []
				this.file.verso.push(data.result)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.authentication_page_wrap {
		padding: 10px 19px;
		background-color: #FFFFFF;

		.authentication_info {
			padding: 7px 6px;
			font-size: 12px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 19px;
			background-color: #86A8FB;
			color: #4779F2;
			border: 1px solid rgba(167, 167, 167, 0.47843137254901963);
		}

		.authentication_info_txt {
			padding: 10px 0 5px 0;

			.authentication_info_txt_title {
				height: 24px;
				line-height: 24px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: rgba(68, 68, 68, 1);
				font-size: 14px;
			}

			.authentication_info_photo {
				display: flex;
			}
		}
	}
</style>
