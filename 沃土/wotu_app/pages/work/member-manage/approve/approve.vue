<template>
	<view class="content">
		<view class="w-panel-header" style="background: #47A3D9">
			<navigator url="./myApprove" class="w-panel-header-cell">
				<view class="iconfont">&#xe715;</view>
				<text class="title">我审批的</text>
			</navigator>
			<navigator url="./myRequest" class="w-panel-header-cell">
				<view class="iconfont">&#xe651;</view>
				<text class="title">我发起的</text>
			</navigator>
		</view>
		
		<view class="w-panel" v-for="(item,index) in dataList" :key='index'>
			<view class="w-panel-title">{{item.typeName}}</view>
			<view class="w-panel-cell" @tap='jumpTo(it)' v-for="(it,i) in item.items" :key='i'>
				<view class="iconfont" v-html="it.icon"></view>
				<text class="title">{{it.name}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
import Services from '@/services/approve.js';
export default {
	data() {
		return {
			scrollHeight:'',
			// icons:['&#xe655;','&#xe650;','&#xe603;','&#xe601;','&#xe674;','&#xe709;','&#xe766;','&#xe622;','&#xe622;','&#xe622;','&#xe64d;','&#xe8f8;'],
			dataList:[]
		};
	},
	onLoad(){
		uni.hideLoading();
		this.getDataList();
		this.scrollHeight = uni.getSystemInfoSync().windowHeight + 'px';
	},
	methods:{
		getDataList(){
			Services.getAttList().then((res)=>{
				if(!res.Flag){
					return;
					uni.showToast({
						title:'数据请求失败',
						icon:'none'
					})
				}
				let arr = [];
				let array = res.Content;
				array.forEach(item =>{
					if(arr.indexOf(item.TypeName) == -1){
						arr.push(item.TypeName);
					}
				})
				// **************************************************
				// 创造对象数组,可以自动进行分类创建
				let arrObj = [];
				let _obj = {};
				let _arr = [];
				for(let i in arr){
					// 清空临时数组和对象
					_obj = {};
					_arr = [];
					for(let j in array){
						if(array[j].TypeName == arr[i]){
							// 根据字符串中是否包含相应文字来设置图标
							let icon = '&#xe715;'; //默认图标
							if(array[j].Name.search(/加班/) != -1){
								icon = '&#xe655;'
							}
							if(array[j].Name.search(/调休/) != -1){
								icon = '&#xe6b8;'
							}
							if(array[j].Name.search(/联络/) != -1){
								icon = '&#xe6b7;'
							}
							if(array[j].Name.search(/请假/) != -1){
								icon = '&#xe70e;'
							}
							if(array[j].Name.search(/申请单/) != -1){
								icon = '&#xe620;'
							}
							if(array[j].Name.search(/转正/) != -1){
								icon = '&#xe766;'
							}
							if(array[j].Name.search(/离职/) != -1){
								icon = '&#xe6e7;'
							}
							if(array[j].Name.search(/调整/) != -1){
								icon = '&#xe8f8;'
							}
							if(array[j].Name.search(/外勤/) != -1){
								icon = '&#xe674;'
							}
							if(array[j].Name.search(/未打卡/) != -1){
								icon = '&#xe709;'
							}
							if(array[j].Name.search(/报销/) != -1){
								icon = '&#xe64d;'
							}
							if(array[j].Name.search(/借款/) != -1){
								icon = '&#xe650;'
							}
							_arr.push({
								name:array[j].Name,
								id:array[j].Id,
								icon:icon, //添加到对象中
								isAttachment:array[j].IsAttachment
							});
						}
					}
					_obj.typeName = arr[i]; //对象的类型名
					_obj.items = _arr; 	   //对象包含的成员
					arrObj.push(_obj);
				}
				console.log(arrObj)
				this.dataList = arrObj;
				// **************************************************
				
			})
		},
		closeDrawer(){
			this.showDrawer = false;
		},
		openDrawer(){
			this.showDrawer = true;
		},
		jumpTo(e){
			let _url = `./approveDetail/approveDetail?workflowId=${e.id}&isAttachment=${e.isAttachment}&name=${e.name}`;
			uni.navigateTo({
				url:_url,
			})
		}

	}
};
</script>

<style lang="scss" scoped>
	.content{
		background: $uni-bg-color-grey;
		padding: 10upx 15upx;
	}
	
</style>
