<template>
	<transition name="move">
		<div class="page-staging-bill page-animate">
			<v-header>
				<mt-header title="分期账单">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<vue-better-scroll  class="wrapper staging-bill">
				<section class="section" v-show="staging.periodNum">
					<div class="pd-all-10 radius-top">
						<p class="pdb-10">
							<span v-if="staging.taskStat == '7A' || staging.taskStat == '7C'">已还清</span>
							<span v-if="staging.taskStat == '5'">还款中</span>
							<span v-if="staging.taskStat == '7D'">关闭订单结清</span>
						</p>
						<div>
							<p class="center gray-font">全部待还(元)</p>
							<p class="center"><b class="font-size-36">{{staging.allRepayment}}</b></p>
							<p class="center gray-font mgt-4">分期总金额：{{staging.sumAmount}}元  分{{staging.periodNum}}期还清</p>
							<div class="mgt-20">
		                        <mt-button type="primary" class="button" v-if="staging.taskStat == '7A' || staging.taskStat == '7C' || staging.taskStat == '7D'"  size="large">提前还款</mt-button>
		                        <mt-button type="primary" v-else  size="large" v-tap="{methods : toplay1,params:'early-repay'}" >提前还款</mt-button>
							</div>
						</div>	
					</div>
				</section>
				<section class="white-bg item" v-for="(item,index) in items"  v-show="staging.periodNum">
					<i v-if="index%2==0" class="color-block blue"></i>
					<i v-else-if="index%3==0" class="color-block green"></i>
					<i v-else class="color-block"></i>
					<p class="border-bottom-1">第{{item.periodNum}}期<span class="fr">{{item.accountEnd}}</span></p>
					<div class="flex">
						<span class="grow">
							<p class="gray-font">期供金额</p>
							<p>{{item.periodAmount}}</p>
						</span>
						<span class="grow">
							<p class="gray-font center">剩余金额</p>
							<p class="center">{{item.remainAmount}}</p>
						</span>
						<span class="grow w-70">
							<p class="gray-font center">状态</p>
							<p class="center" v-if="item.status == '2A'">已还款</p>
							<p class="center" v-else-if="item.status == '2C'">已逾期</p>
							<p class="center" v-else>待还款</p>
						</span>
						<span class="grow center w-70">								
							<span  class="gray-font over" v-if="item.operate == '0' && item.status == '2A'">已还清</span>
							<span  class="gray-font min-btn" v-else-if="(item.status == '2C' || item.status == '0') && item.operate == '1'" @click="toplay(item.periodNum)">还款</span>
							<span  class="gray-font min-btn over1" v-else-if="item.operate == '0' && (item.status== '0' || item.status== '2C')">还款</span>
							<span class="gray-font min-btn" v-else-if="item.operate == '1' && item.status== '1'" @click="toplay(item.periodNum)">还款</span>
						</span>
					</div>
				</section>
				<div style="height:40px;" v-show="staging.periodNum">
					<p class="all-msg-readed gray-font-color" ><span class="text" style="color:#5DACF6;" @click="jkfqxy">借分期分期协议</span></p>
				</div>
			</vue-better-scroll>
			<div class="no-data-msg" v-show="!staging.periodNum">
				<div class="ds-table">
					<div class="ds-tell"><img src="/thz/static/load.png" class="loop" width="22"></div>
				</div>
			</div>
			<router-view />
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import VueBetterScroll from 'vue2-better-scroll' 
	import api from '@/fetch/api.js'
	export default {
		name: 'page-staging-bill',
		components: {
			VHeader,VueBetterScroll
		},
		data() {
			return {
			  items:[],
              staging:{}
			}
		},
		mounted() {
            this.initData();   
		},
		methods: {
			initData(){
				let _this = this;
				let taskId=sessionStorage.getItem("taskId");
				let userInfo=JSON.parse(localStorage.getItem("userInfo"));
				let userId=userInfo.userId;				
				api.loandetail({userId: userId,taskId:taskId}).then(res=>{
                    if(res.code=="200"){ 
                    	_this["items"] = res.body.list; 
                    	_this.staging.periodNum=res.body.periodNum;
                    	_this.staging.allRepayment=res.body.allRepayment;                   	
                    	_this.staging.sumAmount=res.body.sumAmount;                   	
                    	_this.staging.taskStat=res.body.taskStat;
                    	_this.staging.downloadUrl=res.body.downloadUrl;
					}else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							window.location.href='${project.domain}/index';
						}else{
							_this.$router.push("/login")
						}
                    }else{
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
					}
                });
			},
			toBack() {
				$.publish('app.staging');
				this.$router.back();
			},
			toplay(periodNum){
				sessionStorage.setItem("periodNum",periodNum);
				this.$router.push('/repay');
			},
			toplay1(){
				this.$router.push('/early-repay');
			},
			loadData(){
				this.initData();
			},
			jkfqxy(){
				this.$router.push("/home/staging/jkfqxy");
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/scss/mixin'; 
    @import '../../assets/scss/color';
	.page-staging-bill{
		.mint-header {
			background-color: $text-white-color;
			color: $text-block-color;
			border: none;
		}
	}
	.staging-bill{	
		.mint-button--large {
		    width: 70%;
		    margin-left: 15%;
		    border-radius: px2rem(20);
	    }	
		.section{
			background: $text-red-color;
			padding:px2rem(10) px2rem(10) 0;
		}
		.radius-top{
			border-top-left-radius:px2rem(10);
			border-top-right-radius:px2rem(10);
			background-color: $text-white-color;
		}
		.white-bg{
			background: $text-white-color;
		}
		.fr{
			float: right;
		}
		.center{
			text-align: center;
		}
		.item{
			padding:px2rem(10) px2rem(10) px2rem(10) px2rem(20);
			margin:px2rem(10);
			border-radius:px2rem(10);
			line-height:px2rem(30);
			position: relative;
			overflow: hidden;
		}
		.border-bottom-1{
			border-bottom:1px solid #f2f2f2;
		}
		.color-block{
			position: absolute;
			width: px2rem(6);
			height: 100%;
			background: #ED727B;
			left:0;
			top:0;
			z-index: 2;
			border-top-left-radius:px2rem(10);
			border-bottom-left-radius:px2rem(10);
		}
		.blue{
			background: #5DACF6;
		}
		.green{
			background: #47A846;
		}
		.min-btn{
			padding:px2rem(10) px2rem(18);
			border-radius:px2rem(4);
			background:$theme-bg-color;
			color:$text-white-color;
		}
		.over{
			background: rgba(0,0,0,0);
			color: #999;
		}
		.over1{
			background: #9D9D9D;
			color: $text-white-color;
		}
		.w-70{
			width: px2rem(70);
		}
		.button{
			background: #D9D9D9;
		}
	}
	
</style>