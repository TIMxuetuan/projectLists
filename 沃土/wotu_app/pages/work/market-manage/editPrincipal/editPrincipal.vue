<template>
	<view class="container">
		<!-- 负责人、跟进人页面 -->
		<view class="panel">
			<view class="title">负责人<text style="color: #999;font-size: 28upx;">(点击头像更改负责人)</text></view>
			<view class="content">
				<view class="item" @tap="$refs.selector.show()">
					<image :src="owner.avatar" mode="aspectFill"></image>
					<text>{{owner.label}}</text>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="title">合同参与人<text style="color: #999;font-size: 28upx;">(点击头像删除)</text></view>
			<view class="content">
				<view class="item" v-for="(item, index) in cMembers" :key="index" @tap="delMember(item, index)">
					<image :src="item.avatar" mode="aspectFill"></image>
					<text>{{item.label}}</text>
				</view>
				<vie class="add-btn" @tap="$refs.selector2.show()">
					<view class="iconfont iconadd1"></view>
				</vie>
			</view>
		</view>
		
		
		
		<!-- picker 人员列表 -->
		<w-picker
		    v-if="members.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 1)" 
		    ref="selector" 
		    themeColor="#f00"
		    :selectList="members">
		</w-picker>
		<w-picker
		    v-if="members.length!=0"
		    mode="selector" 
		    :defaultVal="[0]" 
		    @confirm="onConfirm($event, 2)" 
		    ref="selector2" 
		    themeColor="#f00"
		    :selectList="members">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue'
	import Service from "@/services/crm.js"
	import Service2 from "@/services/approve.js"
	import _config from "@/config.js"
	let timer;
	export default {
		data() {
			return {
				id:'',
				moduleName:'',
				members:[],
				owner:{},
				cMembers:[],
			}
		},
		components:{
			wPicker
		},
		onLoad(options) {
			uni.showLoading({
				title:'请求中',
				mask:true,
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			},3000)
			this.id = options.id;
			this.moduleName = options.moduleName;
			this.getData()
		},
		methods: {
			getMembers(){
				return new Promise((resolve,reject) =>{
					Service2.getMembers().then(res =>{
						if(res.Flag){
							const _data = res.Content.map(item =>{
								if(item.Header.indexOf('/Backbone/') > -1){
									item.Header = _config.api_path + item.Header;
								}
								// 这个链接很独特
								if(item.Header.indexOf('static.linkin') > -1){
									item.Header = '../../../../static/img/default-head.png';
								}
								
								return {
									label: item.Name,
									value: item.Id,
									avatar: item.Header,
								}
							})	
							resolve(_data);
						}
					})
				})
				
			},
			async getData(){
				// 这里需要先拿到全部人员信息，所以用到了async/await(不能放到下边函数中)
				this.members = await this.getMembers();
				Service.getOwner(this.moduleName,this.id).then(res =>{
					if(res.Flag){
						let ownerId = res.Content.Owner.Id;
						for(let i in this.members){
							let item = this.members[i];
							
							if(item.value == ownerId){
								this.owner = item;
								break; //跳出本次循环
							}
						}
						// 取到参与的人员 , res.Content.Involves数组每个元素是参与的人员Id
						const memberIdList = res.Content.Involves;
						// 因为从请求的数据中，只拿到了参与人的Id，所以需要遍历全部人员，拿到对应的名字、头像等信息
						memberIdList.forEach(id =>{
							console.log(id)
							for(let i in this.members){
								let item = this.members[i];

								if(item.value == id){
									this.cMembers.push(item)
									break; //跳出本次循环
								}
							}
						})
						
					}else{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					}
					uni.hideLoading()
				})
			},
			onConfirm(e, type){
				if(type === 1){
					this.changeOwner(e.checkArr);
				}
				if(type === 2){
					this.addMember(e.checkArr);
				}
			},
			// member是对象包含label value avatar
			addMember(member){

				Service.addInvolve(this.id,'='+member.value).then(res =>{
					if(res.Flag){
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
						this.cMembers.push(member);
					}else{
						uni.showToast({
							title:res.Content,
							icon:'none'
						})
					}
				})
			},
			delMember(member,index){
				let that = this;
				uni.showModal({
					title:'提示',
					content:'确认移除 '+member.label + '?',
					success(res) {
						if(res.confirm){
							Service.delInvolve(that.moduleName,that.id,member.value).then(res =>{
								if(res.Flag){
									uni.showToast({
										title:res.Content,
										icon:'none'
									})
									that.cMembers.splice(index,1);
								}else{
									uni.showToast({
										title:res.Content,
										icon:'none'
									})
								}
							})
						}
						if(res.cancel){
							
						}
					}
				})
				
			},
			// 更改负责人
			changeOwner(member){
				let that = this;
				uni.showModal({
					title:'提示',
					content:'确认更改负责人?',
					success(res) {
						if(res.confirm){
							Service.changeOwner(that.moduleName,that.id,member.value).then(res =>{
								if(res.Flag){
									uni.showToast({
										title:res.Content,
										icon:'none'
									})
									that.owner = member;
								}else{
									uni.showToast({
										title:res.Content,
										icon:'none'
									})
								}
							})
						}
						if(res.cancel){
							
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $uni-bg-color-grey;
}
.container{
	padding: 10upx 20upx;
	.panel{
		background: #FFFFFF;
		color: $uni-text-color;
		.title{
			height: 80upx;
			line-height: 80upx;
			font-size: $uni-font-size-lg;
			background: #ccc;
			padding: 0 20upx;
		}
		.content{
			padding: 20upx;
			display: flex;
			flex-wrap: wrap;
			.item{
				width: 25%;
				height: 160upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image{
					width: $uni-img-size-lg;
					height: $uni-img-size-lg;
					border-radius: 50%;
				}
				text{
					margin-top: 10upx;
					font-size: $uni-font-size-base;
				}
			}
			.add-btn{
				width: 25%;
				height: 160upx;
				display: flex;
				justify-content: center;
				align-items: center;
				.iconfont{
					width: 80upx;
					height: 80upx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #ddd;
					font-size: 50upx;
					color: #fff;
				}
			}
		}
	}
}
</style>
