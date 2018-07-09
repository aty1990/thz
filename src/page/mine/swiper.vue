<template>
    <transition name="move">
        <div class="page-animate page-findpwd">
            <v-header>
                <mt-header title="忘记密码">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="page-login-wrap">
                <mt-navbar class="page-part" v-model="selected">  
                  <mt-tab-item id="1">移动</mt-tab-item>  
                  <mt-tab-item id="2">联通</mt-tab-item>  
                  <mt-tab-item id="3">电信</mt-tab-item>  
                </mt-navbar>  
                <mt-tab-container v-model="selected">  
                  <mt-tab-container-item id="1">  
                   <div class="bg-swiper">
						<div class="swiper1">
							<div style="float: left;">方案一<span class="color" >(推荐)</span></div>
						    <div class="swiper-mob" >
						    	<a  href="javascript:phone('10086')" style="color:#fff;">拨打电话</a>
						    </div>
						</div>
						<p class="swiper-phone" >使用本机拨打
							<a href="javascript:phone('10086')">10086</a>客服热线，按照语音提示进行密码重置。
						</p>
					</div>
					<div style="background: #fff;">
						<div class="swiper2" >
							<div style="float: left;">方案二</div>
						    <div class="swiper-in" ><a href="http://www.10086.cn" style="color:#fff;">进入官网</a></div>
						</div>
						<p class="swiper-con con1">进入移动官网找回密码：<a href="http://www.10086.cn" class="color" >http://www.10086.cn</a></p>
						<p class="swiper-con con2">1.选择手机号归属省份；</p>
						<p class="swiper-con con2">2.点击【登录】</p>
						<p class="swiper-con con3">3.点击【忘记密码】进入相应页面找回密码。</p>
					</div>
                    
                  </mt-tab-container-item>  
                  <mt-tab-container-item id="2">  
                    <div class="bg-swiper">
						<div class="swiper1">
							<div style="float: left;">方案一<span class="color" >(推荐)</span></div>
						    <div class="swiper-mob" >
						    	<a  href="javascript:phone('10010')" style="color:#fff;">拨打电话</a>
						    </div>
						</div>
						<p class="swiper-phone" >使用本机拨打
							<a href="javascript:phone('10010')">10010</a>客服热线，按照语音提示进行密码重置。
						</p>
					</div>
					<div style="background: #fff;">
						<div class="swiper2" >
							<div style="float: left;">方案二</div>
						    <div class="swiper-in" ><a href="http://www.10010.com" style="color:#fff;">进入官网</a></div>
						</div>
						<p class="swiper-con con1">进入移动官网找回密码：<a href="http://www.10010.com" class="color" >http://www.10010.com</a></p>
						<p class="swiper-con con2">1.选择手机号归属省份；</p>
						<p class="swiper-con con2">2.点击【登录】</p>
						<p class="swiper-con con3">3.点击【忘记密码】进入相应页面找回密码。</p>
					</div>
                  </mt-tab-container-item> 
                  <mt-tab-container-item id="3">  
                    <div class="bg-swiper">
						<div class="swiper1">
							<div style="float: left;">方案一<span class="color" >(推荐)</span></div>
						    <div class="swiper-mob" >
						    	<a  href="javascript:phone('10000')" style="color:#fff;">拨打电话</a>
						    </div>
						</div>
						<p class="swiper-phone" >使用本机拨打
							<a href="javascript:phone('10000')">10000</a>客服热线，按照语音提示进行密码重置。
						</p>
					</div>
					<div style="background: #fff;">
						<div class="swiper2" >
							<div style="float: left;">方案二</div>
						    <div class="swiper-in" ><a href="http://www.189.cn" style="color:#fff;">进入官网</a></div>
						</div>
						<p class="swiper-con con1">进入移动官网找回密码：<a href="http://www.189.cn" class="color" >http://www.189.cn</a></p>
						<p class="swiper-con con2">1.选择手机号归属省份；</p>
						<p class="swiper-con con2">2.点击【登录】</p>
						<p class="swiper-con con3">3.点击【忘记密码】进入相应页面找回密码。</p>
					</div>
                  </mt-tab-container-item>
                </mt-tab-container>  
            </div>
        </div>
    </transition>
</template>

<script>
  
    import VHeader from '@/components/header'
    export default {
        name: 'page-findpwd',
        components: {VHeader},
        data () {
            return {
            	selected: '1',
            }
        },
        mounted(){
        },
        methods : {
            toBack(){
                this.$router.back();
            }
        }
    }
</script>
<style lang="scss">
    .page-findpwd{ 
       .mint-navbar{
    	 background:rgba(0,0,0,0);
       }  
       .mint-navbar .mint-tab-item.is-selected{
       	background:#F45051;
       	color: #fff;       
       }  
       .mint-navbar {
		   margin-top: 10px;
		    width: 90%;
		    margin-left: 5%;
		    border-radius: 10px;		    
		     overflow: hidden;
		     border: 1px solid #F45051;
		     .mint-tab-item{
		     	border-left: 1px solid #F45051;
		     	padding: 12px 0;
		     }
		} 
		
       .bg-swiper{
	        background: #fff;
	        margin-top: 10px;
	       .swiper-mob{
		       	float: right;
		       	width:80px;
		       	text-align:center;
		       	font-size:14px;
		       	margin-top:5px;
		       	line-height:30px;
		       	border-radius:15px;
		       	background:#F45051;
		       	color:#fff;
		       	margin-right: 10px;
	       }
	       .swiper-phone{
	       	    height: 60px;margin:10px;font-size: 12px;
	       }
	       .swiper1{
		       	margin-left:10px;
		       	height:40px;
		       	line-height:40px;
		       	border-bottom: 1px solid #f1f1f1;
	       }
	       
       }
       .swiper2{
	       	margin-left:10px;
	       	height:40px;
	       	line-height:40px;
	       	border-bottom: 1px solid #f1f1f1;
	    }
       .swiper-in{
	       	float: right;
	       	width:80px;
	       	text-align:center;
	       	font-size:14px;
	       	margin-top:5px;
	       	line-height:30px;
	       	border-radius:15px;
	       	background:#F45051;
	       	color:#fff;
	       	margin-right: 10px;
       }
       .swiper-con{
	       	margin:5px 10px;
	       	font-size: 14px;
       }       
       .con3{
         	height:50px;
       }
    }
</style>


