<template>
	<transition name="move">
		<div class="page-animate page-work">
			<v-header>
				<mt-header title="工作信息">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper work-container">
				<div class="weui_cells_access">
					<div class="top" style="">为了保证借款申请顺利通过，请务必填写真实信息。</div>
					<a class="weui_cell weui_person pdl-4">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">公司全称</span> 
							<span class="fl mymessage1" style="width:60%;">
								<input type="text" placeholder="请填写公司名称" v-model="paramsObj.companyName" style="width:100%">
							</span>
						</div>
					</a>
					<a class="weui_cell weui_work">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">职位名称</span> 
							<span class="fl mymessage1"  style="width:60%;">
								<input type="text" placeholder="请选择职位名称"  v-model="paramsObj.job"  style="width:100%">
							</span>
						</div>
						
					</a>
					<a class="weui_cell weui_work" v-tap="{methods : companyAddr}">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">公司地址</span> 
							<span class="fl" id="addrText"   style="width:63%;">
								<input type="text" class="addr"  v-model="paramsObj.address" placeholder="请定位您所在的城市" refs="address" style="width:100%">
							</span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
					<a class="weui_cell weui_work">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl detail-input mymessage1 street" style="width:70%;">
								<input type="text" placeholder="请填写具体街道门牌号" v-model="paramsObj.street" style="width:100%">
							</span>
						</div>
					</a>
					<a class="weui_cell weui_work">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">公司电话</span></span>
							<span class="fl mgr-4 mymessage1">
								<span>{{telPrix}}</span>
								<input type="tel" class="comtel" maxlength="8" placeholder="请填写公司电话" width="80" v-model="paramsObj.tel">
							</span>
						</div>
						
					</a>
					<a class="weui_cell weui_work">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">月收入(元)</span> 
							<span class="fl month-sr mymessage1">
								<input type="tel" class="comtel" placeholder="请填写月收入" v-model="paramsObj.income">
							</span>
						</div>
					</a>
					<a class="weui_cell weui_work" @click="open('income')">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">入职时间</span> 
							<span class="fl mymessage1">
								<input type="text" class="date" readonly  placeholder="请输入日期" v-model="paramsObj.incomeTime" style="color:#000;" />
							</span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
					<a class="weui_cell weui_work" @click="playDay">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl">发薪日期</span> 
							<span class="fl">
								<input type="text" placeholder="请填写发薪日期" v-model="paramsObj.payDay" readonly style="color:#000;" /> 
							</span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
				</div>

				<!-- 发薪日期控件 begin -->
				<vue-pickers :show="playDateFlg" :columns="columns" :defaultData="defaultData" :selectData="payData" @cancel="close" @confirm="confirmDay"></vue-pickers> 
				<div class="mask" v-show="playDateFlg"></div>
			    <!-- 发薪日期控件 end -->

				<div class="button-wrap mgt-20 savework">
	                <mt-button type="primary" size="large" :disabled="saveBtn" @click.stop="save">保存</mt-button>
	            </div>

	            <awesome-picker ref="picker3" :textTitle="picker3.textTitle" :type="picker3.type" :anchor="picker3.anchor" @confirm="handlePicker3Confirm"></awesome-picker>

			</div>
			<router-view />
		</div>
	</transition>
</template>

<script>
	import VHeader from '@/components/header'
	import * as utils from '@/assets/js/tool'
	import VuePickers from 'vue-pickers'
	import api from '@/fetch/api'
	export default {
		components: {
			VHeader,VuePickers
		},
		data() {
			return {
				saveBtn : true,
				playDateFlg : false,
		      	defaultData : [
		      		{value:"",text:""}
		      	],
		      	columns: 1,
		      	telPrix : "",
		      	paramsObj : {
		      		companyName : "",
		      		job : "",
		      		address : "",
		      		street : "",
		      		city : "",
		      		tel : "",
		      		income : "",
		      		incomeTime : "",
		      		payDay : "",
		      		payDayParams : ""
		      	},
		      	payData: {
		          	data1: []
		        },
		        picker3: {
			        anchor: [],
			        textTitle: '入职时间',
			        type: 'date'
			   	}
			}
		},
		mounted() {
			this.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
			for(let i=1;i<=31;i++){
				this.payData.data1.push({text:i,value:i});
			}
			if(sessionStorage.getItem('work') == '2'){					
				$(".mymessage1").find("input").attr("disabled","disabled");				
				$('.mymessage1 input[disabled]').css("-webkit-text-fill-color","#000")
				$('.mymessage1 input[disabled]').css("opacity","1")
				$(".savework").hide();
			}
			this.initData();
		},
		watch : {
			paramsObj :{
		　　　　handler(newValue, oldValue) {
					this.lst();
		　　　　},
		　　　　deep: true
		　　}
		},
		methods: {
			toBack() {
				this.$router.back();
			},
	      	handlePicker3Confirm(e){
	      		let year = e[0].value.slice(0,e[0].value.length-1);
	      		let month = e[1].value.slice(0,e[1].value.length-1);
	      		let day = e[2].value.slice(0,e[2].value.length-1);
	      		this.paramsObj.incomeTime = year+"-"+(month.length>1?month:"0"+month)+"-"+(day.length>1?day:"0"+day);
	      		this.lst();
	      	},
			initData(){
				let _self = this;
				api.detailCareer({userId:this.userId}).then(res=>{
					if(res.code=="200"){
						var data = res.body;
						_self.paramsObj.companyName = data.companyName;
						_self.paramsObj.job = data.affiDepart;
						_self.paramsObj.address = data.addrUp;
						_self.paramsObj.street = data.addrDown;
						_self.paramsObj.city = data.city;
						_self.paramsObj.tel = data.companyTel.split("-")[1];
						_self.telPrix = data.companyTel?data.companyTel.split("-")[0]+"-":"";
						_self.paramsObj.income = data.userIncome;
						_self.paramsObj.incomeTime = data.careerTime;
						_self.paramsObj.payDayParams = data.payDay;
						_self.defaultData[0].value = data.payDay;
						_self.defaultData[0].text = "每月"+data.payDay+"日";
						if(sessionStorage.getItem('work') == '2'){					
							$("#addrText").html(data.addrUp);
							$(".street").html(data.addrDown);
						}
						if(Math.floor(sessionStorage.getItem("work"))==1){
							setTimeout(()=>{
								_self.saveBtn = true;
							},50)
						}
						if(data.addrUp == ""){
							if(sessionStorage.getItem('work') == '0'){
				               $(".addr").val("");
			                }
						}
						if(data.payDay){
							_self.paramsObj.payDay = '每月'+data.payDay+'号';
						}
					}else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							location.replace(location.origin+'/thz/index');
						}else{
							_self.$router.push("/login")
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
		    open(picker) {
		    	if(sessionStorage.getItem('work') != '2'){
		    		if(!sessionStorage.getItem("term")){
	      				$(this.$refs.address).focus().blur();
	      			}
	      			this.$refs.picker3.show()
	            }
	      	},
	      	playDay(){
	      		let _self = this;
	      		if(sessionStorage.getItem('work') != '2'){
	      			this.playDateFlg = true;
	      			if(!sessionStorage.getItem("term")){
	      				$(_self.$refs.address).focus().blur();
	      			}
	      		}
	      	},
	      	close(){
	      		this.playDateFlg = false;
	      	},
	      	confirmDay(e){
	      		this.defaultData[0].value = e.select1.value;
				this.defaultData[0].text = e.select1.text;
				this.paramsObj.payDayParams = this.defaultData[0].value;
				this.paramsObj.payDay = "每月"+this.defaultData[0].value+"日";
				this.playDateFlg = false;
				this.lst();
	      	},
	      	companyAddr(){
	      		if(sessionStorage.getItem('work') != '2'){
	      			sessionStorage.setItem("title","公司地址");
	      			$(this.$refs.address).focus().blur();
					this.$router.push("/amap");
				}
	      	},
	      	lst(){
				this.saveBtn = utils.listenField([
					{value:this.paramsObj.companyName,type:"text"},
					{value:this.paramsObj.job,type:"text"},
					{value:this.paramsObj.address,type:"text"},
					{value:this.paramsObj.street,type:"text"},
					{value:this.paramsObj.tel,type:"tel"},
					{value:this.paramsObj.income,type:"text"},
					{value:this.paramsObj.incomeTime,type:"text"},
					{value:this.paramsObj.payDay,type:"text"}
				])
			},
			save(){
				let _self = this;
				if(!localStorage.getItem("companyAddr")){
					layer.open({
                        content: "请定位您所在的城市"
                        ,skin: 'msg'
                        ,time: 2
                    });
                    return;
				}
				this.saveBtn = true;
				let params = {
					addrDown: this.paramsObj.street,
					addrUp: this.paramsObj.address,
					companyName: this.paramsObj.companyName,
					affiDepart: this.paramsObj.job,
					companyAddr: localStorage.getItem("companyAddr"),
					companyCity: localStorage.getItem("companyCity"),
					companyProvince: localStorage.getItem("companyProvince"),
					companyCountry: localStorage.getItem("companyCountry"),
					companyTel: this.telPrix + this.paramsObj.tel,
					userId: this.userId,
					careerTime: this.paramsObj.incomeTime,
					userIncome: this.paramsObj.income,
					payDay : this.paramsObj.payDayParams
				}
				api.submitcareer(params).then(res=>{
                    if(res.code=="200"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
	                        	_self.$parent.loadData();
	                        	_self.toBack();
	                        }
	                    });
                    }else if(res.code=="111"){
                    	// 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							location.replace(location.origin+'/thz/index');
						}else{
							_self.$router.push("/login")
						}
                    }else{
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2	                            
	                    });
                    }
				})
			}
		}
	}
</script>
<style lang="scss">
	.page-work {
		.work-container{
			overflow-y: auto;
		}
		input{
			background: rgba(0,0,0,0);
		}
		.white-bg{
			background: #fff;
		}
		.border-bottom-1{
			border-bottom: 1px solid #d9d9d9;
		}
		.input-box{
			padding: 16px 10px;
		}
		.weui_cell{
			padding: 18px 15px;
		}
		.fl{
			float: left;
			margin-right: 20px;
			input{
				width: 160px;
				outline: none;
				border:none;
			}
		}
		.detail-input{
			margin-left: 76px;
			input{
				background: rgba(0,0,0,0);
			}
		}
		.month-sr{
			margin-left: -10px;
		}
		.weui_cell{
			padding-left: 0;
		}
		.weui_cell:before{
			left: 0;
		}
		.area_btn{
		    font-size: 16px;
		}
	}
	input:disabled, input[disabled]{ 
        color: #000; 
        -webkit-text-fill-color:#000; 
        -webkit-opacity:1; 
        opacity: 1; 
    }
</style>