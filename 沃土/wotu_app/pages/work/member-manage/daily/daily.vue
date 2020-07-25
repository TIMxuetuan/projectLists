<template>
	<view class="container">
		<view class="w-wrap">
			<view class="w-title">
				<text>工作变化</text>
			</view>
			<view>
				<view class="task-list" v-if="worklist.length != 0">
					<view class="w-card margin-bottom" v-for="(item,index) in tempWorkList" :key="index">
						<view class="task-dec">
							<text class="label">任务描述</text>
							<text class="content" @tap="taskClick(item)">{{item.Content}}</text>
						</view>
						<view class="task-dec">
							<text class="label">任务进度</text>
							<view class="content2">
								<progressBar :progresstext='item.Progress' size='36px'></progressBar>
								<view class="increase" v-if="item.Increase"><text class="iconfont">&#xe6ab;</text>{{item.Increase}}%</view>
							</view>
							
						</view>
					</view>
					<view class="show-more" @tap='showMoreTask' v-if="worklist.length > 2">{{taskShow}}</view>
				</view>
				<view class="w-card form-input" style="padding: 20upx 20upx; box-sizing: border-box;color: #999;" v-else>
					暂无
				</view>
				
			</view>

		</view>
		<view class="w-wrap">
			<view class="w-title">
				<text>工作总结</text>
			</view>
			<view class="w-card padding">
				<textarea :auto-height="true" class="form-input" :value="Content" @input='textareafunction' placeholder="点击填写" />
			</view>
		</view>
		<view class="w-wrap">
			<view class="w-title">
				<text>今日进步</text>
			</view>
			<view class="w-card padding">
				<input class="form-input" @input='tadygoing' :value="AdvanceDefeat" placeholder="点击填写" />
			</view>
		</view>
		<view class="w-wrap">
			<view class="w-title">
				<text>今日反省</text>
			</view>
			<view class="w-card padding">
				<input class="form-input" @input='tadywrok' :value="SelfQuestioning" placeholder="点击填写" />
			</view>
		</view>
		<view class="w-wrap">
			<view class="w-title">
				<text>今日心情</text>
			</view>
			<view class="w-card padding"  @tap='openmood'>
				<view class="iconfont" style="margin-left: 20upx; color: #2E87C0; font-size: 50upx;" v-html="moodIcon"></view>
			</view>
		</view>
		<button style="background: #00D3B8; color: #fff;margin-bottom: 20upx;" @click="submitbutt">提交</button>
	
		<view>
			<uni-popup ref="popup" type="center">
				<uni-calendar :insert="true" @change='changedate' />
				<button class="buttsucc" @click="closePopup">确定</button>
			</uni-popup>
		</view>
		
		<view>
		    <uni-popup ref="popupmood" type="bottom">
		        <view class="moodwrap">
		        	<view class="moodwraptitle">
		        		<text>今天心情</text>
						<text @click="closemood">取消</text>
		        	</view>
					<view class="mood-content">
						<view class="mood-item" v-for="(item, index) in moodList" :key="index" @tap='moodClick(item)'>
							<view class="iconfont" v-html="item.icon"></view>
							<text>{{item.title}}</text>
						</view>
					</view>
		        </view>
		    </uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
	import progressBar from '@/components/progressBar/ProgressBar.vue';
	import {
		_data,
		_methods
	} from '@/common/public.js';
	import daily from '@/services/daily.js';
	import util from '@/common/util.js'
	let timer;
	export default {
		data() {
			return {
				..._data,
				worklist:[],
				type:0,
				status:0,
				taskShow: '查看全部',
				tempWorkList:[], //保存任务列表
				date:util.getDate(),
				start:'',
				end:'',
				AdvanceDefeat:'',
				SelfQuestioning:'',
				Mood:null,
				Content:'',
				moodIcon:'',
				moodList:[
					{title:'大笑', mood:10, icon:'&#xe79f;'},
					{title:'微笑', mood:9, icon:'&#xe7a5;'},
					{title:'郁闷', mood:8, icon:'&#xe7a1;'},
					{title:'擦汗', mood:7, icon:'&#xe7a2;'},
					{title:'奋斗', mood:6, icon:'&#xe7a6;'},
					{title:'无聊', mood:5, icon:'&#xe7a0;'},
					{title:'偷懒', mood:4, icon:'&#xe7aa;'},
					{title:'难过', mood:3, icon:'&#xe69d;'},
					{title:'愤怒', mood:2, icon:'&#xe7a7;'},
					{title:'悲伤', mood:1, icon:'&#xe69c;'},
				]
			}
		},
		components: {
			uniCalendar,
			uniPopup,
			progressBar
		},
		onShow() {
			uni.showLoading({
				title:'请求中',
				mask:true,
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},2000)
			this.moodIcon = this.moodList[0].icon;
			// 获取今天和明天
			this.start = util.getDate();
			let number = (new Date()).getTime() + 24*60*60*1000;
			this.end = util.formatTime(number, 'Y-M-D');
			uni.setNavigationBarTitle({
				title: '日报' + '('+this.start+')'
			});			
			this.userInfo = this.getUserInfo();
			this.getTask();
			this.getData();
		},
		onUnload() {
			timer = null;
		},
		methods: {
			..._methods,
			open() {
				this.$refs.calendar.open();
			},
			moodClick(e) {
				this.moodIcon = e.icon;
				this.Mood = e.mood;
				this.$refs.popupmood.close()
			},
			changedate(e) {
				let rilidate = e.year + "-" + (e.month < 10 ? "0" + e.month : e.month) + "-" + (e.date < 10 ? "0" + e.date : e.date);
				uni.setNavigationBarTitle({
					title: '日报' +  '('+rilidate+')'
				});
				this.date = rilidate;
				this.start = rilidate;
			},
			closePopup() {
				this.$refs.popup.close();
				uni.showLoading({
					title:'请求中',
					mask:true,
				})
				timer = setTimeout(()=>{
					uni.hideLoading()
				},2000)
				this.getTask();
				this.getData();
				
			},
			closemood() {
				this.$refs.popupmood.close()
			},
			 openmood(){
			       this.$refs.popupmood.open()
			 },
			 
			 onNavigationBarButtonTap() {
			 	this.$refs.popup.open()
			 },
			 
			 
			textareafunction(e) {
				this.Content = e.detail.value
			},
			tadygoing(e){
				this.AdvanceDefeat = e.detail.value
			},
			tadywrok(e){
				this.SelfQuestioning = e.detail.value
			},
			
			getData(){
				let self = this;
				// 改变日期格式
				let _date = this.date.replace(/-/g,'');
				daily.getdaily(_date).then(res =>{
					uni.hideLoading()
					// 初始化数据
					self.AdvanceDefeat = '';
					self.SelfQuestioning = '';
					self.Content = '';
					self.moodIcon = '&#xe79f;';
					
					
					if(res.Content){
						let _data = res.Content;
						this.status = res.Content.Status;
						this.type = res.Content.Type;
						if(_data.AdvanceDefeat){
							self.AdvanceDefeat = _data.AdvanceDefeat.replace('<p>','').replace('</p>','');
						}
						
						if(_data.SelfQuestioning){
							self.SelfQuestioning = _data.SelfQuestioning.replace('<p>','').replace('</p>','');
						}
						
						if(_data.Content){
							self.Content = _data.Content.replace('<p>','').replace('</p>','');
						}
			
						for(let i in self.moodList){
							// Mood 提交数据时用， mood 
							if(_data.Mood == self.moodList[i].mood){
								self.Mood = _data.Mood;
								self.moodIcon = self.moodList[i].icon;
							}
						}
							
						console.log(self.AdvanceDefeat,self.SelfQuestioning,self.Content,self.moodIcon)
			
					}
					
				})
			},
			// 获取任务变化
			getTask(){
				let _this = this;
				daily.getTaskData({
					start:this.start,
					end:this.end,
					p:1,
					s:100
				}).then(res =>{
					uni.hideLoading();
					if(res.Flag){
						_this.worklist = res.Content !== null ? res.Content : [];
						if(_this.worklist.length > 2){
							_this.tempWorkList = _this.worklist.slice(0,2);
						}else{
							_this.tempWorkList = _this.worklist;
						}
					}
				})
			},
			// 点击提交按钮
			submitbutt() {
				let self = this;
				console.log(self.AdvanceDefeat,self.SelfQuestioning,self.Mood,self.Content);
				let _date = this.date.replace(/-/g,'');
				let number = (new Date()).getTime();
				let nowFullTime = util.formatTime(number,'Y-M-D h:m:s');
				// 校验
				if(!self.Content || !self.AdvanceDefeat || !self.SelfQuestioning){
					uni.showToast({
						title:'提交内容不能有空',
						icon:'none'
					})
					return;
				}
				
				daily.submitbutt(_date,{
					DateTime:self.date+' 00:00:00',
					Id:self.userInfo.Id+_date,
					Member:self.userInfo.Id,
					MemberName:self.userInfo.Name,
					SnapShoot:'[]',
					status:0,
					Type:0,
					UpdateTime:nowFullTime,
					Value: {
						AdvanceDefeat:self.AdvanceDefeat,
						SelfQuestioning:self.SelfQuestioning,
						Content:self.Content,
						Mood:self.Mood
					},
				}).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:'提交成功！',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:'提交错误！！！',
							icon:'none'
						})
					}
				})
			},
			// 任务列表全部显示和收起
			showMoreTask(){
				if(this.taskShow == '查看全部'){
					this.tempWorkList = this.worklist;
					this.taskShow = '收起'
				}else{
					this.tempWorkList = this.worklist.slice(0,2);
					this.taskShow = '查看全部'
				}
			},
			// 跳到任务详情
			taskClick(e){
				let taskId = e.Id;
				uni.navigateTo({
					url:`../task/taskDetail/taskDetail?taskId=${taskId}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.container{
	background-color: $uni-bg-color-grey;
	padding: 10upx 20upx;
	box-sizing: border-box;
	min-height: 100vh;
}
.form-input{
	padding: 0 20upx;
	box-sizing: border-box;
	width: 100%;
}
// 任务样式
.task-dec{
	display: flex;
	padding: 20upx 0;
	align-items: center;
	&:nth-child(1){
		border-bottom:1px solid $uni-border-color-gray;
	}
	.label{
		padding: 10upx 20upx;
		box-sizing: border-box;
		width: 200upx;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}
	.content{
		padding: 10upx 20upx;
		box-sizing: border-box;
		flex: 1;
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}
	.content2{
		padding: 10upx 20upx;
		box-sizing: border-box;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
		.increase{
			.iconfont{
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				margin-right: 10upx;
			}
		}
	}
	
}
.margin-bottom{
	margin-bottom: 20upx;
}
.padding{
	padding: 20upx 0;
}

.show-more{
	display: flex;
	justify-content: center;
	padding: 10upx 0;
	background: #EFEFEF;
	font-size: $uni-font-size-sm;
	border-radius: 6upx;
	overflow: hidden;
	color: #CCCCCC;
}
// 表情选择弹出层样式
.moodwrap{
  box-sizing: border-box;
  // padding: 40upx 20upx;
  background: #fff;
  font-size: 36upx;
  color: #2C405A;
  .moodwraptitle{
   display: flex;
   justify-content: space-between;
   border-bottom: 1upx solid #eee;
   padding-bottom: 24upx;
  }
  .moodwraptitle text:nth-child(1){
   color: #2E87C0;
  }
  .mood-content{
   padding-top: 24upx;
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   margin: 0 auto;
   .mood-item{
   	width: 20%;
   	display: flex;
   	flex-direction: column;
   	align-items: center;
   	margin-bottom: 30upx;
   	.iconfont{
   		font-size: 50upx;
		color: #7a7a7a;
   	}
	text{
		font-size: 22upx;
		color: #7a7a7a;
	}
   }
  }
 }
	
</style>
