<template>
	<view>
		<scroll-view
			class="scroll-list"
			:scroll-top="1"
			scroll-y="true"
			:scroll-with-animation="scrollAnimationOFF"
			:scroll-into-view="scrollViewId"
			:style="{ height: winHeight + 'px' }"
			@scroll="handleScroll"
		>
			<view class="phone-list">
				<view class="list-item" v-for="(item, key) of phones" :key="key" :id="key">
					<view class="list-item-title">{{ key }}</view>
					<view
						class="list-item-phone"
						:hover-start-time="20"
						:hover-stay-time="70"
						v-for="innerItem in item"
						:key="innerItem.id"
						:data-name="innerItem.name"
						:data-id="innerItem.id"
						:data-phoneNumber="innerItem.phoneNumber"
					>
						<navigator :url="'/pages/phones/phone-details?uid='+innerItem.id" class="start">
							<view class="portrait"><image :src="innerItem.header"></image></view>
							<view class="name">{{ innerItem.name }}</view>
						</navigator>
						<view class="tel list-item-icon" @click="call(innerItem.phone)">
							<text class="iconfont">&#xe65d;</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import phoneDetails from '@/pages/phones/phone-details.vue'
export default {
	components:{phoneDetails},
	name: 'phone-list',
	props: {
		phones: Object,
		letter: String,
		scrollAnimationOFF: Boolean		
	},
	data() {
		return {
			winHeight: 0,
			scrollTop: 0,
			letterDetails: [],
			timer: null
		};
	},
	computed: {
		scrollViewId() {
			return this.letter;
		}
	},
	mounted() {
		// // #ifndef APP-PLUS
		// this.winHeight = uni.getSystemInfoSync().windowHeight - 49.5;
		// //#endif

		// //#ifdef APP-PLUS
		// this.winHeight = uni.getSystemInfoSync().windowHeight - 100;
		// //#endif
		this.winHeight = uni.getSystemInfoSync().windowHeight - 70;
	},
	methods: {
		handleClick(e) {
			this.$emit('handleClick', e.target.dataset);
		},
		handleScroll(e) {
			if (this.letterDetails.length === 0) {
				const query = uni.createSelectorQuery().in(this);
				let view = query.selectAll('.list-item');
				view.boundingClientRect(data => {
					let top = data[0].top;
					data.forEach((item, index) => {
						item.top = item.top - top;
						item.bottom = item.bottom - top;
						this.letterDetails.push({
							id: item.id,
							top: item.top,
							bottom: item.bottom
						});
					});
				}).exec();
			}

			const scrollTop = e.detail.scrollTop;
			this.letterDetails.some((item, index) => {
				if (scrollTop >= item.top && scrollTop <= item.bottom - 5) {
					this.$emit('change', item.id);
					this.$emit('reset', true);
					return true;
				}
			});
		},
		call(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			});
		},
		portrait(phone){
			console.log(phone)
		}
	}
};
</script>

<style lang="scss">
$list-item-height:98upx;

.commonly-hover {
	background-color: #eee;
}

.scroll-list {
	flex: 1;
	height: 100vh;
	overflow-y: hidden;
}

.phone-list {
	display: flex;
	background-color: #fff;
	flex-direction: column;
	position: relative;
	width: 100%;
}

.list-item {
	width: 100%;
	display: flex;
	flex-flow: wrap;
	align-items: center;
	background-color: #fff;
}

.list-item > .list-item-phone {
	font-weight: normal;
}
.list-item-title,
.list-item-phone {
	width: 100%;
	height: $list-item-height;
	font-size: 32upx;
	font-weight: bold;
	border-bottom: 1px solid #e5e5e5;
}

.list-item-title {
	background-color: #eee;
	display: flex;
	align-items: center;
	padding: 0 20upx;
}

.list-item-phone {
	display: flex;
	align-items: center;
	.start{
		flex: 1;
		display: flex;
		height: 100%;
		padding-left: 20upx;
	}
	.portrait{
		display: flex;
		align-items: center;
		margin-right:20upx;
		image{
			width:72upx;
			height: 72upx;
			border-radius: 50%;
		}
	}
	.name{
		display: flex;
		align-items: center;
	}
	.tel{
		width: 80upx;
		height: 100%;
		line-height: $list-item-height;
		padding-right: 20upx;
		text-align: right;
		.iconfont{
			font-size:44upx;
		}
	}
	
}

</style>
