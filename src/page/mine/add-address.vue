<template>
    <transition name="move">
    	<div class="add-address-page page-animate">
            <v-header>
                <mt-header :title="title">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>   
            <div class="add-content wrapper">
            	<div class="add-content1">
	            	<div class="add-contact"><div class="border-left"><span>联系人</span></div></div>
		            <div class="add-name">
		            	姓名：<input type="text" v-model="goodsName" style="width:60%"   class="add-input goodsName" placeholder="请填写收货人姓名" @keyup="lts"/>
		            </div>
		            <div class="add-sex">
		            	<div class="weui-cells weui-cells_checkbox">
		            		<ul class="weui">
							   	<li class="bg">
							   		<p class="sex-p" style=""></p><span style="float:left;margin-left:10px;">先生</span>
							   	</li>
							   	<li>
							   		<p class="sex-p" style=""></p>
							   		<span style="float:left;margin-left:10px;">女士</span>
							   	</li>
							</ul>		
				        </div>		            	
		            </div>
		            <div class="add-name">
		            	手机号码：<input type="tel" v-model="goodsMobile"  @input="fstNumber($event)" style="width:70%"  class="add-input goodsMobile" placeholder="请填写收货人手机号码"/>
		            </div>
	            </div>
	            <div class="add-content2">
	            	<div class="add-contact"><div class="border-left"><span>收货地址</span></div></div>
	            	<div class="item-list" @click="chooseAddr">
						<div class=" li-item add-sex is-link no-bottom-border">
							<span class="place " ref="abc">{{palce}}</span>
						</div>
					</div>
	            	<div class="add-sex">
	            		<input type="text" v-model="goodsAddress" style="width:90%"  class="add-input goodsAddress" placeholder="请填写详细地址" @input="lts"/>
	            	</div>
	            </div>
	            <mt-button type="primary" size="large" class="font-size-14 save-btn-address" :disabled="cmtState" @click="addAddress">保存</mt-button>
			    <vue-pickers :show="addrFlag" :link="link" :defaultData="defaultData" :columns="columns" :selectData="pickData" @cancel="close" @confirm="confirmFn"></vue-pickers>
			    
	            <div class="mask" v-show="addrFlag"></div>
            </div>            
        </div>
    </transition>  
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api.js'
	import * as utils from '@/assets/js/tool.js'
	import VuePickers from 'vue-pickers'
  	import {provs_data, citys_data, dists_data} from 'vue-pickers/lib/areaData'
	export default {
		components: {VHeader,VuePickers},
		data() {
			return {
			   	cmtState :true,
			   	goodsName:"",
			   	title : "新增收货地址",
			   	goodsMobile:"",
			   	goodsAddress:"",
			   	goodsArea:"",
			   	palce : "请选择地区",
			   	addrFlag : false,
			   	link: true,
			   	columns : 3,
			   	pickData: {
		          	data1: provs_data,
		          	data2: citys_data,
		          	data3: dists_data
		        },
		        defaultData : [
		        	{ value:"",text:"" }
		        ]
			}
		},		
		mounted() {	
			let _self = this; 		
			this.initData();   
			if(location.href.indexOf("edit-address")!=-1){
				_self.title = "编辑收货地址";
			}
			$(".weui li").on("click",function(){
			   var _this=this;
			   $(this).addClass("bg");
			   $(this).siblings().removeClass("bg");
			   if($(_this).hasClass("bg")){			   	 
			   	 $(_this).find("span").html();			   	 
			   }
			   _self.lts();
			})
		},		
		methods: {
			initData(){	
				let id= this.$route.query.id;
				let _self = this;
				if(id != undefined){
					api.getDeliveryAddressInfo({id:id}).then(res=>{
	                    if(res.code=="200"){	                    	
			                if(res.body.deliveryAppell =="女士"){
				            	$(".weui li").each(function(){
									var _this=this;
									$(_this).addClass("bg");
									 $(this).siblings().removeClass("bg");
								})
				            }
				            _self.goodsName=res.body.deliveryName
				            _self.goodsMobile=res.body.deliveryMobile		           
				            _self.goodsAddress=res.body.deliveryAddress;
				            _self.goodsArea=res.body.deliveryArea;  
				            _self.palce=res.body.deliveryArea;  
	                    }else if(res.code=="111"){
	                        // 判断安卓和微信
							if(!sessionStorage.getItem("term")){
								window.location.href=location.origin+'/thz/index';
							}else{
								_self.$router.push("/login")
							}
	                    }else if(res.code=="106"){
	                    	console.log("收货地址为空");
	                    }else{
							layer.open({
		                        content: res.msg
		                        ,skin: 'msg'
		                        ,time: 2
		                    });
						}
		            }); 
	            }
			},
			toBack() {			
				this.$router.back();
			},
			lts(){
				this.cmtState = utils.listenField([
					{value:this.goodsName,type:"text"},
					{value:this.goodsMobile,type:"phone"},
					{value:this.goodsAddress,type:"text"},
					{value:this.goodsArea,type:"text"}
				])
			},
			addAddress(){
				let _self = this;	
				_self.cmtState = true;	
				var sex;
				$(".weui li").each(function(){
					var _this=this;
					if($(_this).hasClass("bg")){			   	 
				   	 sex=$(_this).find("span").html()
				    }
				})
				var id=this.$route.query.id;
				if(id != undefined){
					api.updateDeliveryAddress({
						id:id,
						goodsName:_self.goodsName,
						goodsMobile:_self.goodsMobile,
						goodsAddress:_self.goodsAddress,
						goodsArea:_self.$refs.abc.innerHTML,
						goodsAppell:sex
					}).then(res=>{
	                    if(res.code=="200"){
	                    	layer.open({
			                   	content: res.msg
			                   	,skin: 'msg'
			                   	,time: 2 ,
			                   	end : function(){  
			                   		_self.$parent.updateData();
		                        	_self.$router.back();
		                       	}
			                });	   
	                    }else if(res.code=="111"){
	                        // 判断安卓和微信
							if(!sessionStorage.getItem("term")){
								window.location.href=location.origin+'/thz/index';
							}else{
								_self.$router.push("/login")
							}
	                    }else{
	                    	_self.cmtState = false;
							layer.open({
		                        content: res.msg
		                        ,skin: 'msg'
		                        ,time: 2
		                    });
						}	                                     
	                }); 
				}else{
					api.addDeliveryAddress({
						goodsName:_self.goodsName,
						goodsMobile:_self.goodsMobile,
						goodsAddress:_self.goodsAddress,
						goodsArea:_self.$refs.abc.innerHTML,
						goodsAppell:sex
					}).then(res=>{						
	                    if(res.code=="200"){
	                    	layer.open({
			                   	content: res.msg
			                   	,skin: 'msg'
			                    ,time: 2 ,
			                   	end : function(){                            
		                        	_self.$parent.updateData();
		                        	_self.$router.back();
		                       	}
			                });	   
	                    }else if(res.code=="111"){
	                        // 判断安卓和微信
							if(!sessionStorage.getItem("term")){
								window.location.href=location.origin+'/thz/index';
							}else{
								_self.$router.push("/login")
							}
	                    }else{
	                    	_self.cmtState = false;
							layer.open({
		                        content: res.msg
		                        ,skin: 'msg'
		                        ,time: 2
		                    });
						}	
	                });
				}								
			},
			close(){
				this.addrFlag = false;
			},
			confirmFn(e){
				this.palce = e['select1'].text+"    "+e['select2'].text+"    "+e['select3'].text;
	      		this.addrFlag = false;
	      		this.goodsArea = this.palce;
	      		this.lts();
			},
			chooseAddr(){
				this.addrFlag = true;
			},
			fstNumber(e){
				if(e.target.value.length>11){
					this.goodsMobile = e.target.value.slice(0,11);
				}
				this.lts();
			}
		}
	}
</script>
<style lang="scss">
 .add-address-page{
 	.add-content{
 		overflow-y:auto; 
 		input{outline:none;padding: 4px 0;} 
 		.add-content1{
 			background: #fff;
 		}
 		.add-contact{	 		
	 		padding:15px 10px 15px 0;
	 		border-bottom: 1px solid #f1f1f1;
	 		.border-left{
	 			border-left: 3px solid #F45051;
	 			span{
	 				margin-left: 20px;
	 			}
	 		}
	 	}
	 	.weui{
	 		height: 20px;
	 	}
	 	.weui li{
	 		float: left;
	 		line-height: 20px;
	 		margin-left: 20px;
	 	}
	 	.weui li p{
			background:#fff;
			border:2px solid #d9d9d9;
		
			display:block;
			width:20px;
		
			height:20px;
			border-radius:20px;
		}
	 	.add-name{
	 		padding: 15px 0px 15px 20px;
	 		border-bottom: 1px solid #f1f1f1;
	 		.add-input{
		 		border: 0;
		 		margin-left: 10px;
		 	}
	 	}
	 	
	 	.add-sex{
	 		padding: 15px 0px 15px 20px;
	 		border-bottom: 1px solid #f1f1f1;
	 	}
	 	.no-bottom-border{
	 		border-bottom: none;
	 	}
	 	.add-content2{
 			background: #fff;
 			margin-top: 10px;
 			.add-input{
		 		border: 0;
		 	}
		 	.is-link {
				background: url("/thz/static/href.png") scroll 98% 50% no-repeat;
				background-size: 20px;
				margin-left: 0;
			}
 		}
 		.weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before{
 			color: #F45051;
 		}
 		.weui-cell{
 			width: 30%;
 			float: left;
 		}
 		.weui-cell:before{
 			border: none;
 		}
 		.weui-cells:before{
 			border: none;
 		}
 		.weui-cells:after{
 			border: none;
 		}
 	}

 	.save-btn-address{
 		width: 90%;
 		margin: 0 auto;
 		margin-top: 40px;
 	}

 	.weui li.bg p{
		border:0;
		background:url("/thz/static/icon_sex.png") no-repeat;
		background-size:100% 100%;
		
	}
 	
 }

</style>
