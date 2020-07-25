<template>
	<view>
		<phone-directory :phones="phones" @paramClick="paramClick" ></phone-directory>
	</view>
</template>

<script>
	import { _data, _methods } from '@/common/public.js';
	import _config from '@/config.js';
	import Services from '@/services/phoneNumber.js'
	import phoneDirectory from '@/components/phone-directory/phone-directory.vue'
	let timer;
	export default {
		components:{
			phoneDirectory
		},
		data() {
			return {
				phones:{
					
				}
			
			}
		},
		onLoad(){
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			timer = setTimeout(()=>{
				uni.hideLoading()
			})
			this.addressBook();
		},
		onUnload() {
			timer = null;
		},
		methods : {
			paramClick (e) {
				console.log(e)
			},
			addressBook(){
				Services.addressBook()
					.then((res)=>{
						if(res.Flag){
							this.phones = this.formatAddressBookData(res.Content)
							console.log(this.phones)
						}else{
							uni.showToast({
								title:'请求失败'
							})
						}
						uni.hideLoading()
					})
			},
			formatAddressBookData(data){				
				let _phones = {};
				data.forEach((item,index)=>{
					
					let first_letter = item.NameSpell.substr(0,1);
					let spell = item.NameSpell.toLowerCase();
					let header = item.Header.indexOf('/Backbone/')>-1 ? _config.api_path+item.Header:item.Header;
					
					let item_obj = {"id":item.Id,"spell":spell,"name": item.Name,"header":header,'phone':item.Phone};
					if(_phones[first_letter]){
						_phones[first_letter].push(item_obj)
					}else{
						_phones[first_letter] = [item_obj]
					}
				});
				return _phones;
			}
		}
	}
</script>

<style>
</style>