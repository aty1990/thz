<template>
    <transition name="move">
    	<div class="shiopping-add page-animate">
            <v-header>
                <mt-header title="收货地址">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div>
	            <vue-better-scroll class="wrapper" v-if="hasData"> 
		            <div class="sh-address">           	
		            	<ul>
		            		<li class="pdl-10 pdr-10 pdt-6" style="border-bottom: 1px solid #f1f1f1;" v-for="(item,index) in tab" >
		            			<p class="pdt-4 pdb-4" @click.stop="chooseAddr(item)">{{item.deliveryArea}}  {{item.deliveryAddress}}</p>
		            			<div class="pdt-4 pdb-4 text-deal" @click.stop="chooseAddr(item)">{{item.deliveryName}} {{item.deliveryMobile}}</div>
								<div class="flex">
									<div class="flex grow text-left">
										<span class="sex-p"  :class="{ bg:index==current}"  @click.stop="choose(index,item.id,item.isDefault)"></span>
										<span style="margin-left: 10px;">默认地址</span>
									</div>
									<div  class="flex pdt-4 pdb-4">
										<img src="/thz/static/icon_bianji@2x.png" class="scale-4" @click.stop="compile(item.id)"/>
		            					<span  @click.stop="compile(item.id)">编辑</span>
		            					<img src="/thz/static/icon_shanchu@2x.png" class="scale-4" @click.stop="deleteAddress(item.id)"/>
		            					<span  @click.stop="deleteAddress(item.id)" >删除</span>
									</div>
								</div>
		            		</li>
		            	</ul> 
		            </div>
	            </vue-better-scroll>
	            <div class="flex mgt-80 vertical" v-if="!hasData"> 
                    <img src="/thz/static/pic_wujilu@2x.png" width="150">
                    <p class="mgt-20 gray-font">您还没有添加收货地址！</p>
                </div>         
	            <div class="button-wrap mgt-20"  v-tap="{methods : toRouter,params:'/add-address'}">
	                <mt-button type="primary" size="large" :disabled="btnState" >新增收货地址</mt-button>
	            </div>
            </div>
            <router-view />
        </div>
    </transition>  
</template>
<script>
	import VueBetterScroll from 'vue2-better-scroll' 
	import VHeader from '@/components/header'
	import api from '@/fetch/api.js'
	import * as utils from '@/assets/js/tool.js'
	export default {
		components: {VueBetterScroll,VHeader},
		data() {
			return {
			  btnState : false, 
			  current:0,
              tab : [],
              hasData : true
			}
		},
		created() {          
            this.initData();
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			initData(){
				var _this = this;
				api.getDeliveryAddress({}).then(res=>{
                    if(res.code=="200"){
						_this.tab = res.body?res.body:[]; 
						if(_this.tab.length==0){
							_this.hasData = false;
						}else{
							for(var i=0;i<res.body.length;i++){
								if(res.body[i].isDefault == "1"){
									$(".li-address").eq(i).find(".sex-p").addClass("bg");
								}
							}						
						}
					}else if(res.code=="111"){
                        // 判断安卓和微信
						_this.$router.push("/login")
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
			},
			updateData(){
				this.hasData = true;
				this.initData();   
			},
			choose(index,id,isDefault){ 
               $(".li-address").eq(index).find(".sex-p").addClass("bg");
               this.current=index;
               $(this).eq(index).find(".sex-p").siblings().removeClass("bg");
			   api.setdefaultaddress({id:id}).then(res=>{
			   		if(res.code == 200){
			   			layer.open({
	                        content: "修改默认地址成功！"
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
                    }else if(res.code=="111"){
                        _self.$router.replace("/login")
                    }else{
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
					}
               });
			},
			toRouter(e) {
				this.$router.push(e.params);
			},
			deleteAddress(id) {	
				let _self = this;	
			  	layer.open({
				    content: '确定要删除该地址吗？'
				    ,style: 'width:80%;'
				    ,anim :'up'
				    ,btn: ['确定', '取消']
				    ,yes: function(index){
				    	layer.close(index);
				      	api.deleteDeliveryAddress({id:id}).then(res=>{ 
		                	if(res.code == 200){
			                    layer.open({
			                        content: res.msg
			                        ,skin: 'msg'
			                        ,time: 2 
			                    });
			                    _self.current = 0;
			                    _self.initData();
		                    }else if(res.code=="111"){
		                        _self.$router.replace("/login")
		                    }else{
								layer.open({
			                        content: res.msg
			                        ,skin: 'msg'
			                        ,time: 2
			                    });
							}
		                });
				    }
				});
			},
			compile(id){
				this.$router.push({					
					path:"/edit-address",
					query : {
						id : id
					}
				});
			},
			chooseAddr(item){
				// addrState 1为商品详情跳转过来选择地址
				if(sessionStorage.getItem("addrState")=="1"){
					this.$parent.relaodAddr(item);
					sessionStorage.removeItem("addrState");
					this.toBack();
				}
			}
		}
	}
</script>
<style lang="scss" scope>
	.shiopping-add{
		background: #fff;
		.li-address{
			background: #fff;
			height: 100px;
			margin-top:5px;
			p{
				margin-left: 20px;
				margin-right: 20px;
			}
		}
		.wrapper{
			padding-top: 0;
		}
		.sex-p{
			background:#fff;
			border:2px solid #d9d9d9;
		
			display:block;
			width:20px;
		    float: left;
			height:20px;
			border-radius:20px;
		}
		.sh-address li .sex-p.bg{
			border:0;
			background:url(/thz/static/icon_morenduihao@2x.png) no-repeat;
			background-size:100% 100%;
			
		}
		.li-address:first-child{
			margin-top:0px;
		}
		.phone{
			margin-left: 10px;
		}
		.address-left{
			float: left;
			margin-top: 10px;
			
		}
		.address-right{
			float: right;
			margin-right: 20px;
			margin-top: 10px;
		}
		.button-wrap {
		    width: 100%;
		    position: fixed;
		    bottom: 0;
		    margin: 0 auto;
        }
        .sh-address{
        	padding-bottom: 50px;
        }
        .button-wrap{
        	button{
        		border-radius: 0px;
        	}
        }
        .add_con{
        	img{
        		vertical-align: middle;
        		width: 20px;
        	}
        }
        .shanchu{
        	margin-left: 10px;
        } 
	}
</style>
