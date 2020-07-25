<template>
	<view>
		<phone-search-list :phones="phones" @paramClick="paramClick"></phone-search-list>
	</view>		
</template>

<script>
	import { _data, _methods } from '@/common/public.js';
	import _config from '@/config.js';
	import Services from '@/services/phoneNumber.js'
	import phoneSearchList from '@/components/phone-directory/phone-search-list.vue'
	export default {
		name:"phone-search",
		components:{
			phoneSearchList
		},
		data() {
			return {
				phones:null,
			}
		},
		onLoad (option) {
			Services.addressBook().then((res)=>{
				console.log(res)
					if(res.Flag){
						this.phones = this.formatAddressBookData(res.Content)
						// console.log(this.phones)
					}else{
						uni.showToast({
							title:'请求失败'
						})
					}
				})
			// this.phones = JSON.parse(unescape(option.phones))
		},
		methods:{
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
			},
			paramClick (e) {
				uni.navigateTo({
					url:'/pages/phones/phone-details?uid='+e.id
				})
			}
		}	
	}
</script>

<style>
	
</style>