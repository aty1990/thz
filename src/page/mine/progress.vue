<template>
	<transition name="move" v-on:leave="leave">
		<div class="page-progress page-animate">
			<v-header>
				<mt-header title="分期进度">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div>
				<img src="/thz/static/progress.png" width="100%">
				<div class="infomation-wrap">
					<table class="table">
						<tr>
							<td width="40">
								<img v-if="orgStat==1" src="/thz/static/step1.png" height="20" >
								<img v-else src="/thz/static/step1_select.png" height="20">
								<span class="has-bottom-border" :class="{'red':orgStat==2}"></span>
							</td>
							<td>
								<p class="font-size-14" :class="{'red-font':orgStat==2}">资料采集</p>
								<span  class="red-font" v-if="orgStat==2">请完成您的资料填写,加快放款速度</span>
								<span  v-if="orgStat==1">已完成</span>
								<span  v-if="orgStat==3">等待中</span>
							</td>
						</tr>
						<tr>
							<td width="40">
								<img v-if="regStat==2" src="/thz/static/step2_select.png" height="20"  class="loop">
								<img v-else src="/thz/static/step2.png" height="20">
								<span class="has-bottom-border"  :class="{'red':regStat==2}"></span>
							</td>
							<td>
								<p class="font-size-14" :class="{'red-font':regStat==2}">资料审核</p>
								<span class="red-font" v-if="regStat==2">{{regTime}}</span>
								<span v-if="regStat==1">已完成</span>
								<span v-if="regStat==3">等待中</span>
							</td>
						</tr>
						<tr>
							<td width="40">
								<img v-if="loanStat==2" src="/thz/static/step3_select.png" height="20">
								<img v-else src="/thz/static/step3.png" height="20">
								<span class="has-bottom-border" :class="{'red':loanStat==2}"></span>
							</td>
							<td>
								<p class="font-size-14" :class="{'red-font':loanStat==2}">分期结果</p>
								<span class ="red-font" v-if="loanStat==2">{{loanTime}}</span>
								<span v-if="loanStat==3">{{loanTime}}</span>
								<span v-if="loanStat==1">已完成</span>
							</td>
						</tr>
					</table>
					<div class="line"></div>
					<div class="mgt-10 font-size-10 red-font flex" v-if="loanStat!=1">
						<i class="icon-tips scale-5 warn"></i><span>分期结果我们会第一时间用短信通知您</span>
					</div>
				</div>
			</div> 
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api.js'
	import {getCookie} from '@/assets/js/tool'
	export default {
		components: {VHeader},
		data() {
			return {
				orgStat : "",
				regStat : "",
				loanStat : "",
				loanTime:"",
				regTime:"",
				orgTime:""
			}
		},
		mounted() {
          this.initData(); 
		},
		methods: {
			initData(){
				let _this=this;
				api.verUser({accessToken:getCookie("thz_H5")}).then(res=>{
					var userStat= res.body.userStat;
					if(userStat =="2") {
						_this.$router.replace({name:"fail"})  	
					}else if(userStat =="4") {
						sessionStorage.setItem("taskId",res.body.taskId);
						this.$router.replace("/home/fqzd");
					}else{
						api.auditstat({}).then(res=>{
							if(res.code=="200"){
			                  	_this.loanTime=res.body.loanTime;
							  	_this.regTime=res.body.regTime;
							  	_this.orgTime=res.body.orgTime; 
							  	_this.orgStat=res.body.orgStat; 
							  	_this.regStat=res.body.regStat; 
							  	_this.loanStat=res.body.loanStat; 
			                }else{
		                   	    layer.open({
			                        content: res.msg
			                        ,skin: 'msg'
			                        ,time: 2 
			                    });
		                   }
						})
					}					
				})
			},
			toBack() {
				this.leave();
			},
			leave(){
				this.$router.replace({
					name : "order"
				});
			}
		}
	}
</script>
<style lang="scss">
	.page-progress{
		.infomation-wrap{
			width: 90%;
			height: 276px;
			padding: 20px;
			margin: 20px auto;
			background: url("/thz/static/progress_bg.png") no-repeat;
			background-size:100% 100%; 
		}
		.table{
			width: 96%;
			margin:0 auto; 
			tr{
				height: 60px;
			}
		}
		.warn{
			margin-top: -4px;
		}
		tr,td{
			position: relative;
			vertical-align: top;
			line-height: 24px;
			color:#BBBBBB;
			span{
				font-size: 12px;
			}
		}
		.has-bottom-border{
			position: absolute;
			bottom: 8px;
			width: 1px;
			height: 26px;
			left: 8px;
			z-index: 99;
			background: #BBBBBB;
		}
		.line{
			margin-top: 20px;
			height: 1px;
			width: 100%;
			border:1px dashed #DFDFDF;
		}
		.red-font{
			color:#F56868;
		}
		.red{
			background: #F56868;
		}
		
	}
	
	
</style>
