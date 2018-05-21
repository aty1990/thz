<template>
	<transition name="move">
		<div class="staging page-animate">
			<v-header>
				<mt-header title="分期记录">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<vue-better-scroll class="wrapper" >
				<div class="item-list">
					<ul style="background:#F2F2F2;">
						<li class="flex li-item mgt-4 pdt-16 pdb-16" v-for="item in items" @click="repayment(item.taskId)">
							<p class="grow li-item-p sumAmount">金额：<span>{{item.sumAmount}}</span></p>
							<p class="grow periodNum">期限：<span>{{item.periodNum}}</span>期</p>
							<p class="grow cashTime">{{item.cashTime}}</p>
							<p class="grow is-link taskStat red-font" v-if="item.taskStat == '5'">还款中</p>
							<p class="grow is-link taskStat" v-if="item.taskStat == '7A' ">已结清</p>	
							<p class="grow is-link taskStat" v-if="item.taskStat == '7C' ">退款结清</p>
						</li>
					</ul>
				</div>
			</vue-better-scroll>
			<div class="no-data-msg" v-if="items.length==0">
                <div class="ds-table">
                    <div class="ds-tell">
                        <img src="/thz/static/pic_wujilu@2x.png" width="120">
                        <p class="mgt-20 gray-font">您还没有分期记录~</p>
                    </div>
                </div>
            </div>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import VueBetterScroll from 'vue2-better-scroll' 
	import api from '@/fetch/api.js'
	export default {
		name: 'staging',
		components: {
			VHeader,VueBetterScroll
		},
		data() {
			return {
				btn2State : false,
                items:[],
                taskStat:""
			}
		},
		mounted() {
            this.initData();   
		},
		methods: {
			initData(){
				let _this = this;
				let userInfo=JSON.parse(localStorage.getItem("userInfo"));
				let userId=userInfo.userId;				
				api.loanrecord({userId: userId}).then(res=>{                    
                    if(res.code=="200"){
                    	if(res.body == ""){
                    		$(".no-staging").show();
                    	}else{
                    		_this["items"] = res.body; 
                    	}
					}else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							window.location.href='${project.domain}/index';
						}else{
							_this.$router.push("/login")
						}
                    } 
                    if(res.code=="500"){
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
					}
                    
                });
			},
			toBack() {
				this.$router.back();
			},
			repayment(taskId){
				sessionStorage.setItem("taskId",taskId)
				this.$router.push("/home/fqzd");
			},
			stagingsu(){
				this.$router.push("/home")
			}
		}
	}
</script>
<style lang="scss">
	.staging {		
		.is-link {
			background: url("/thz/static/href.png") scroll 98% 50% no-repeat;
			background-size: 20px;
			margin-left: 0px;
		}
		.li-item {
			background: #fff;
			padding: 10px 0;
			position: relative;
			margin-top: 5px;
			
		}
		.sumAmount{
			width: 28%;
			white-space:nowrap;
			margin-left: 10px;
		}
		.no-staging{
			width: 90%;
			margin-left: 5%;
			text-align: center;
			
		}
		.no-staging p{
			line-height: 70px;
		}
		.no-staging img{
			width: 50%;
		
		}
		.red-font{
			color:red;
		}
	}
</style>