<template>
	<view class="content">
		<view class="w-card w-wrap">
			<view class="item">
				<view class="title">申请人</view>
				<view class="main">
					<text>{{username}}</text>
				</view>
			</view>
			<view class="item" v-if="approveMembers.length > 0">
				<view class="title">审批人</view>
				<view class="main" >
				
					<picker mode="selector" :range="approveMembers" range-key="label"  @change="approverConfirm">
						<view style="padding-left: 200upx;">{{approver}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="w-card w-wrap">
			<block v-if="formList.length != 0" v-for="(item,index) in formList" :key='index'>
				<!-- Type == 1 input -->
				<view v-if="item.Type == 1" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<input type="text" v-model="form[item.Name]" />
					</view>
				</view>
				<!-- Type == 2 radio -->
				<view v-if="item.Type == 2" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<radio-group @change="inputChange($event,item.Name)">
							<label v-for="(n, i) in item.Items" :key="i">
								<view>
									<radio :value="n" />
								</view>
								<view>{{n}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<!-- Type == 3 checkbox -->
				<view v-if="item.Type == 3" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<checkbox-group @change="inputChange($event,item.Name)">
							<label v-for="(n, i) in item.Items" :key="i">
								<view>
									<checkbox :value="n" />
								</view>
								<view>{{n}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				<!-- Type == 4 textarea -->
				<view v-if="item.Type == 4" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<textarea :auto-height="true" :placeholder="'请输入'+item.Text" @input="inputChange($event,item.Name)" />
						</view>
				</view>
				<!-- Type == 5 date -->
				<view v-if="item.Type == 5" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<!-- 日期加时间 -->
						<block v-if="item.DateOrTime == 3" >
							<view class="date-text" @tap="openPicker(item.Name)" style="padding-left: 100upx;">{{form[item.Name]!=''?form[item.Name]:'选择时间'}}</view>
							<w-picker 
								mode="limit" 
								dayStep="60"
								startHour="8"
								endHour="20"
								minuteStep="1"
								afterStep="0"
								@confirm="onConfirm($event,item.Name)" 
								:ref="item.Name" 
								themeColor="#f00">
							</w-picker>
						</block>
						<!-- 时间 -->
						<block v-if="item.DateOrTime == 2" >
							<view class="date-text" @tap="openPicker(item.Name)" style="padding-left: 100upx;">{{form[item.Name]!=''?form[item.Name]:'选择时间'}}</view>
							<w-picker 
								mode="time"
								:defaultVal="[1,1,0]" 
								:current="true"
								step="1"
								@confirm="onConfirm($event,item.Name)" 
								:ref="item.Name" 
								themeColor="#f00">
							</w-picker>
						</block>
						<!-- 日期 -->
						<block v-if="item.DateOrTime == 1" >
							<view class="date-text" @tap="openPicker(item.Name)" style="padding-left: 100upx;">{{form[item.Name]!=''?form[item.Name]:'选择时间'}}</view>
							<w-picker 
								mode="date" 
								startYear="2019" 
								endYear="2030"
								:defaultVal="[0,0,0]" 
								:current="true"
								@confirm="onConfirm($event,item.Name)" 
								:ref="item.Name" 
								themeColor="#f00">
							</w-picker>
						</block>
					</view>
				</view>
				<!-- Type == 6 select下拉框 -->
				<view v-if="item.Type == 6" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<view class="date-text" @tap="openPicker(item.Name)" style="padding-left: 200upx;">{{form[item.Name]}}</view>
						<w-picker 
							v-if="item.Items.length!=0"
							mode="selector" 
							:defaultVal="[1]" 
							@confirm="onConfirm($event,item.Name)" 
							:ref="item.Name" 
							themeColor="#f00"
							:selectList="item.Items">
						</w-picker>
					</view>
				</view>
				<!-- Type == 7 部门选择-->
				<view v-if="item.Type == 7" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<view class="date-text" @tap="openPicker(item.Name)" style="padding-left: 200upx;">{{form[item.Name]!=''?form[item.Name]:'选择部门'}}</view>
						<w-picker 
							v-if="depList.length!=0"
							mode="selector" 
							:defaultVal="[1]" 
							@confirm="onConfirm($event,item.Name)" 
							:ref="item.Name" 
							themeColor="#f00"
							:selectList="depList">
						</w-picker>
					</view>
				</view>
				<!-- Type == 8 人员选择-->
				<view v-if="item.Type == 8" class="item">
					<view class="title">{{item.Text}}</view>
					<view class="main">
						<view class="date-text" @tap="openPicker(item.Name)" style="padding-left: 200upx;">{{form[item.Name]!=''?form[item.Name]:'选择人员'}}</view>
						<w-picker 
							v-if="memberList.length!=0"
							mode="selector" 
							:defaultVal="[1]" 
							@confirm="onConfirm($event,item.Name)" 
							:ref="item.Name" 
							themeColor="#f00"
							:selectList="memberList">
						</w-picker>
					</view>
				</view>
			</block>
		</view>
		
		<view class="w-card w-wrap" v-if="isAttachment">
			<view class="item">
				<view class="title">附件</view>
				<view class="main">
					<view v-if="!tempFilePath" @tap="uploadFile" style="padding-left: 200upx;">上传附件</view>
					<view class="img-box" v-else>
						<image :src="tempFilePath" mode="aspectFill"></image>
						<text class="iconfont iconshanchu" @tap="deleteFile"></text>
					</view>
				</view>
			</view>
		</view>

		<button @tap="submitData" :disabled="disabledBtn" type="primary">提交</button>

	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	import {_data, _methods} from '@/common/public.js';
	import Services from '@/services/approve.js';
	import _config from '@/config.js';
	let timer;
	export default {
		data() {
			return {
				..._data,
				config_path:'',
				formList:[],
				approveMembers:[],
				approver:'', //审批人不用动态创建
				approvaId:'',
				form:{},
				depList:[],
				memberList:[],
				username:'',
				attachment:'',
				tempFilePath:'',
				workflowId:'',
				isAttachment:false,
				disabledBtn:false,
			};
		},
		components:{
			wPicker
		},
		onLoad(options){
			console.log(options)
			this.workflowId = options.workflowId;
			this.isAttachment = options.isAttachment;
			uni.setNavigationBarTitle({
			    title: options.name
			});
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			timer = setTimeout(function() {
				uni.hideLoading();
			}, 2000);
			this.getForms();
			this.config_path = _config.api_path;
			this.username = this.getUserInfo().Name;
		},
		computed:{
			approve_length(){
				return this.approveMembers.length;
			}
		},
		methods:{
			..._methods,
			inputChange(e,form_name){
				this.$set(this.form,form_name,e.detail.value);
				console.log(e.detail.value);
			},
			openPicker(refName){
				// vue ref写在v-for中时，ref对象会变成数组
				this.$refs[refName][0].show();

			},
			openPicker_approver(){
				this.$refs.approver.show();
			},
			onConfirm(val,key){
				this.$set(this.form,key,val.result);
			},
			approverConfirm(e){
				let index = e.detail.value;
				this.approver = this.approveMembers[index].label;
				this.approvaId = this.approveMembers[index].value;
			},
			submitData(){
				console.log(this.form);
				let arr = [];
				for(let key in this.form){
					if(this.form[key] == ''){
						uni.showToast({
							title:'提交内容不能有空',
							icon:'none'
						})
						return;
					}
					// 员工未打卡单，textarea2要改成1不知道为啥
					if(key == 'textarea2'){
						key = '1';
					}
					let _temp = `${this.workflowId}_${key}#team#${this.form[key]}`;
					arr.push(_temp);
				}
				let _val = arr.join('#;#');
				console.log(_val);
				
				Services.submitApprove({
					Approva: this.approvaId,
					Attachments: this.attachment,
					Value: _val,
					WfId: this.workflowId
				}).then((res)=>{
					if(res.Flag){
						uni.showToast({
							title:res.Content,
							icon:'none',
							duration:2000
						})
						this.disabledBtn = true;  //提交成功，禁用按钮
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				});
			},
			getForms(){
				Services.getAttSubList(this.workflowId).then((res)=>{
					uni.hideLoading();
					if(res.Flag){
						
						this.formList = res.Content.Form;
						let _members = res.Content.Members;
						// 格式化members数据
						_members.forEach((item)=>{
							let _obj = {};
							_obj.label = item.Name;
							_obj.value = item.Id;
							this.approveMembers.push(_obj);
						})
						console.log(this.approveMembers)
			
						// 设置审批人默认值
						if(this.approveMembers.length != 0){
							this.approver = this.approveMembers[0].label;
							this.approvaId = this.approveMembers[0].value;
						}
						
						// 格式化form数据
						this.formList.forEach((item)=>{
							if(item.Items){
								// 字符串转数组
								item.Items = item.Items.split(';');
								console.log(item.Items)
							}
							// 创建form对象属性，并初始化默认值
							if(item.Type == 5){
								this.$set(this.form,item.Name, '')
							}else if(item.Type == 6){
								// 设置默认值
								console.log(item.Items)
								this.$set(this.form,item.Name, item.Items[0])
							}else if(item.Type == 7){
								this.$set(this.form,item.Name, '')
							}else if(item.Type == 8){
								this.$set(this.form,item.Name, '')
							}else{
								this.$set(this.form, item.Name, '');
									
							}
							
							// 如果是部门的话，需要获取部门信息
							if(item.Type == 7){
								this.getDepartment();
							}
							// 如果是人员的话，需要获取人员信息
							if(item.Type == 8){
								this.getMembers();
							}
							// 如果是下拉，需要转数组对象
							if(item.Type == 6){
								let arr = [];
								console.log(item)
								item.Items.forEach((i)=>{
									let _obj = {};
									_obj.label = i;
									_obj.value = i;
									arr.push(_obj);
								})
								item.Items = arr;
								console.log(item.Items)
							}
						
						})
					}else{
						uni.showToast({
							title:'请求错误',
							icon:'none'
						})
					}
				})
			},
			getDepartment(){
				Services.getDepartment().then((response)=>{
					let depList = response.Content[0].Children;
					let arr = [];
					depList.forEach((i)=>{
						let _obj = {};
						_obj.label = i.Name;
						_obj.value = i.Name;
						arr.push(_obj);
					})
					this.depList = arr;
				})
			},
			getMembers(){
				Services.getMembers().then((response)=>{
					
					let memberList = response.Content;
					let arr = [];
					memberList.forEach((i)=>{
						let _obj = {};
						_obj.label = i.Name;
						_obj.value = i.Name;
						arr.push(_obj);
					})
					this.memberList = arr;
				})
			},
			uploadFile(){
				let self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						self.tempFilePath = tempFilePaths[0];
						uni.uploadFile({
							url: self.config_path+'attachment/Upload', 
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let _data = JSON.parse(uploadFileRes.data);
								self.attachment = _data.Content;
								console.log(self.attachment);
							}
						});
					}
				});
			},
			deleteFile(){
				this.attachment = '';
				this.tempFilePath = '';
			}
		}
	}
</script>

<style lang="scss">
	$min_fontSize: $uni-font-size-base;
	$title_fontSize: $uni-font-size-lg;
	$f_color:#333;
	$f_color_gray:#666;
	.w-wrap{
		margin-bottom: 20upx;
	}
	.w-card{
		width: 100%;
		border-radius: 10upx;
		background-color: #fff;
		box-sizing: border-box;
		overflow: hidden;
		font-size: $uni-font-size-base;
		color: $f_color;
		.item{
			&:last-child{
				border: none;
			}
		}
	}
	.content {
		background: #f8f8f8;
		padding: 10upx 20upx;
		box-sizing: border-box;
		min-height: 100vh;
		.item {
			display: flex;
			padding: 20upx;
			box-sizing: border-box;
			width: 100%;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;
			button{
				width: 100%;
			}
			.title {
				width: 200upx;
			}

			.main {
				flex: 1;
				display: flex;
				flex-direction: row-reverse;
				box-sizing: border-box;
				font-size: $min_fontSize;
				color: $f_color_gray;
				input {
					width: 100%;
					border: 1px solid #ccc;
					border-radius: 10upx;
					padding-left: 15upx;
				}
				.user{
					color: #aaa;
				}
				.img-box{
					display: flex;
					align-items: center;
					image{
						width: 100upx;
						height: 100upx;
						margin-right: 20upx;
					}
				}
				textarea{
					width: 100%;
					min-height: 80upx;
					border: 1px solid #ccc;
					border-radius: 10upx;
					padding: 15upx;
				}
				
				radio-group,checkbox-group{
					display: flex;
					label{
						display: flex;
						margin-right: 20upx;
						font-size: $uni-font-size-sm;
						color: $f_color;
						align-items: center;
					}
				}
				
				.date-text{
					font-size: $min_fontSize;
					color: $f_color;
				}
			}
		}
		.no-border{
			border: none;
		}
	}
</style>
