<template>
	<transition name="move">
		<div class="staging page-animate">
			<v-header>
				<mt-header title="分期记录">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<vue-better-scroll class="wrapper" v-if="hasData">
				<div class="item-list">
					<ul style="background:#F2F2F2;">
						<li class="flex li-item mgt-4 pdt-16 pdb-16" v-for="item in items" @click="repayment(item.taskId)">
							<p class="grow li-item-p sumAmount">金额：<span>{{item.sumAmount}}</span></p>
							<p class="grow periodNum">期限：<span>{{item.periodNum}}</span>期</p>
							<p class="grow cashTime">{{item.cashTime}}</p>
							<p class="grow is-link taskStat red-font" v-if="item.taskStat == '5'">还款中</p>
							<p class="grow is-link taskStat" v-if="item.taskStat == '7A'">已结清</p>	
							<p class="grow is-link taskStat" v-if="item.taskStat == '7C' ">退款结清</p>
							<p class="grow is-link taskStat" v-if="item.taskStat == '7D' ">关闭结清</p>
						</li>
					</ul>
				</div>
			</vue-better-scroll>
			<div class="no-data-msg hide" ref="noData">
	            <div class="ds-table">
	                <div class="ds-tell">
	                    <img src="/thz/static/pic_wujilu@2x.png" width="120">
	                    <p class="mgt-20 gray-font">您还没有分期记录~</p>
	                    <mt-button type="primary" size="large" @click="activeFq" class="active-fq mgt-30 font-size-14">激活分期</mt-button>
	                </div>
	            </div>
	        </div> 
	        <div class="no-data-msg" v-show="items.length==0 && hasData">
				<div class="ds-table">
					<div class="ds-tell">
						<img src="/thz/static/load.png" class="loop" width="22" v-if="!errMsg">
						<div v-if="errMsg">
							<img src="/thz/static/pic_wujilu@2x.png" width="120">
		                    <p class="mgt-20 gray-font">您还没有分期记录~</p>
		                    <mt-button type="primary" size="large" @click="activeFq" class="active-fq mgt-30 font-size-14">激活分期</mt-button>
						</div>
					</div>
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
		name: 'staging',
		components: {
			VHeader,VueBetterScroll
		},
		data() {
			return {
				btn2State : false,
				hasData : true,
				errMsg : "",
                items:[],
                taskStat:""
			}
		},
		mounted() {
            this.initData();
            // 监听子页面发布广播事件 用于刷新当前页面数据
        	$.subscribe('app.staging',()=>{
        		this.initData();
        	});   
		},
		methods: {
			initData(){
				let _this = this;
				let userInfo=JSON.parse(localStorage.getItem("userInfo"));
				let userId=userInfo.userId;				
				api.loanrecord({userId: userId}).then(res=>{                    
                    if(res.code=="200"){
                    	if(res.body){
                    		_this["items"] = res.body; 
                    		_this.hasData = res.body.length>0?true:false;
                    		if(!_this.hasData){
                    			_this.$refs.noData.style.display = "block";
                    		}
                    	}
					}else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							window.location.href= location.origin+'/thz/index';
						}else{
							_this.$router.push("/login")
						}
                    }else{
                    	_this.errMsg = res.msg;
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
			},
			activeFq(){
				this.$router.replace("/home/jpfq")
			}
		}
	}
</script>
<style lang="scss" scoped>
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
		.red-font{
			color:red;
		}
		.active-fq{
			width: 80%;
			margin-left:10%;
		}
		.hide{
			display:none;
		}
	}
</style>