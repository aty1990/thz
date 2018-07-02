<template>
	<transition v-on:leave="leave">
		<div class="page-animate page-userinfolist">
			<v-header>
				<mt-header title="激活淘花宅分期">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<vue-better-scroll  ref="scroll"  class="wrapper"
                :pullDownRefresh="pullDownRefreshObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                 >
				<div v-if="f1">
					<div class="weui_cells_access">
						<div class="top" style="">请按顺序完成资料填写，即可获取授信额度</div>
						<a class="weui_cell weui_person "  router-name="person"   :state="person" desc="个人信息" id="1" @click="opt($event)" >
							<div class="weui_cell_hd">
								<img src="/thz/static/icon_gerenxinxi@2x.png" style="width: 25px;"/>
							</div>
							<div class="weui_cell_bd weui_cell_primary">
								<p>个人信息<span class="color">(必填)</span></p>
								<p class="word-color">请完善个人信息</p>
							</div>
							<div class="weui_cell_ft  person" :class="person=='0'?'blue-class':'red-class'">{{person=="0"?"未完善":"已完善"}}</div>
						</a>
						<a class="weui_cell weui_work "  router-name="work"  @click="opt($event)"   :state="work" desc="再填写工作信息。" id="2" prev="请先完成上一步个人信息填写" title="工作信息">
							<div class="weui_cell_hd">
								<img src="/thz/static/icon_work information@2x.png" style="width: 25px;"/>
							</div>
							<div class="weui_cell_bd weui_cell_primary"> 
								<p>工作信息<span class="color">(必填)</span></p>
								<p class="word-color">请完善个人工作信息</p>
							</div>
							<div class="weui_cell_ft  work" :class="work=='0'?'blue-class':'red-class'">{{work=="0"?"未完善":"已完善"}}</div>
						</a>
						<a class="weui_cell weui_contact " router-name="contacts" :state="contact" desc="再填写联系人信息。" id="3" prev="请先完成上一步工作信息填写" title="联系人信息" @click="opt($event)" > 
							<div class="weui_cell_hd">
								<img src="/thz/static/icon_lianxirenxinxi @2x.png" style="width: 25px;"/>
							</div>
							<div class="weui_cell_bd weui_cell_primary">
								<p>联系人信息<span class="color">(必填)</span></p>
								<p class="word-color">特殊情况，可以帮助我们联系您</p>
							</div>
							<div class="weui_cell_ft  contact" :class="contact=='0'?'blue-class':'red-class'">{{contact=="0"?"未完善":"已完善"}}</div>
						</a>
						<div class="top" >认证信息</div>
						<div>
							<a class="weui_cell weui_banklist"  router-name="mbankcard"  :state="bindCard"  desc="再完成银行卡信息。" id="4" prev="请先完成上一步联系人信息填写" title="银行卡信息" @click="opt($event)" >
								<div class="weui_cell_hd">
									<img src="/thz/static/icon_yinhangkaxinxi@2x.png" style="width: 25px;"/>
								</div>
								<div class="weui_cell_bd weui_cell_primary">
									<p>银行卡信息<span class="color">(必填)</span></p>
									<p class="word-color">此卡用于分期还款</p>
								</div>
								<div class="weui_cell_ft  bindCard red-class" v-if="bindCard==2 || bindCard==1">已完善</div>
								<div class="weui_cell_ft  bindCard blue-class" v-else>未完善</div>
							</a>
							<a class="weui_cell userphoto "  router-name="userphoto"  :state="face"  desc="再完成人脸识别。" id="5" prev="请先完成上一步银行卡信息" title="人脸识别"  @click="opt($event)" >
								<div class="weui_cell_hd">
									<img src="/thz/static/icon_renlianshibie@2x.png" style="width: 25px;"/>
								</div>
								<div class="weui_cell_bd weui_cell_primary">
									<p>人脸识别<span class="color">(必填)</span></p>
									<p class="word-color">请完善人脸信息</p>
								</div>
								<div class="weui_cell_ft  face red-class"  v-if="face==2 || face==1">已完善</div>
								<div class="weui_cell_ft  face blue-class" v-else>未完善</div>
							</a>
							<a class="weui_cell weui_mobile " router-name="usermobile" :state="mobile" desc="再完成手机认证。" id="6" prev="请先完成上一步人脸识别" title="手机认证"  @click="opt($event)" >
								<div class="weui_cell_hd">
			                       <img src="/thz/static/icon_shoujirenzheng@2x.png" style="width: 20px;"/>
								</div>
								<div class="weui_cell_bd weui_cell_primary">
									<p>手机认证<span class="color">(必填)</span></p>
									<p class="word-color">手机认证有助于加快审批</p>
								</div>
								<div class="weui_cell_ft  mobile red-class" v-if="mobile==2 || mobile==1">已完善</div>
								<div class="weui_cell_ft  mobile blue-class" v-else>未完善</div>
							</a>
							<a  class="weui_cell weui_bank" :state="wage" desc="再完成常用卡认证。" id="7" prev="请先完成上一步手机认证"  title="常用卡认证" @click="opt($event)" >
								<div class="weui_cell_hd">
			                       <img src="/thz/static/gongzika@2x.png" style="width: 25px;"/>
								</div>
								<div class="weui_cell_bd weui_cell_primary">
									<p>常用卡认证<span class="color">(必填)</span></p>
									<p class="word-color">包含近期收入支出流水</p>
								</div>
								<div class="weui_cell_ft  wage red-class" v-if="wage==2 || wage==1">已完善</div>
								<div class="weui_cell_ft  wage" v-else-if="wage==5">认证中</div>
								<div class="weui_cell_ft  wage blue-class" v-else>未完善</div>
							</a>
						</div>
					</div>
					<div class="button-wrap mgt-20">
		                <mt-button type="primary" size="large" :disabled="btn1State" @click="stages">分期申请</mt-button>
		                <p class="font-size-12 mgt-16 flex">点击分期申请代表确认并阅读<span class="blue-class" @click="jkfqxy">《借分期分期协议》</span></p>
		            </div>
				</div>
	            <br>
	            <br>
			</vue-better-scroll>
            <router-view />
		</div>
	</transition>
</template>

<script>
	import VHeader from '@/components/header'
	import VueBetterScroll from 'vue2-better-scroll'
	import {getCookie} from '@/assets/js/tool' 
	import api from '@/fetch/api'
	export default {
		components: {
			VHeader,
			VueBetterScroll
		},
		data() {
			return {
                // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
                pullDownRefreshObj: {
                  threshold: 90,
                  stop: 40
                },
                startY: 0,  // 纵轴方向初始化位置
                scrollToX: 0,
                scrollToY: 0,
                scrollToTime: 700,
				btn1State :true,
				btn2State : true,
				layerObj : "",
				person:"",
				work:"",
				contact:"",
				bindCard:"",
				wage : "",
				current: 0,
				face:"",
				mobile:"",
				f1 : true,
				af2:""
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			leave(){
				if(this.layerObj){
					layer.close(this.layerObj);
				}
			},
			init(){
				let _self = this;
				// 1设置当前资料填写到哪一步
				_self.current = 0;
				// 获取用户状态
				api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
					// 将用户状态存入localStorage
	                localStorage.setItem("userInfo",JSON.stringify(res.body));
	                // 获取用户id
					this.userId =  res.body.userId;
					// 获取用户状态
					this.userStat = res.body.userStat;
					// 用户被系统拒绝
					if(this.userStat =="2"){
						_self.$router.replace({name:"fail"});
					}else{
						this.initData();
					}
	            });
			},
			opt(e){
				let _self = this;
				// 1 获取当前点击的元素
				let target = $(e.currentTarget);
				// 获取元素id
				let id = Math.floor(target.attr("id"));
				// 2 判断用户操作的是银行卡信息吗？ 如果是已完善就跳转到银行卡列表
				if(sessionStorage.getItem('bindCard') !=0 && id == 4){
                 	_self.$router.push({
						name : 'bankDetail'
					});
					return;
                }
                // 3 判断点击的项目是否大于
                if (id - 1 > _self.current) {
                	// 获取当前需要完善的选项的描述
                    var desc = $(".page-userinfolist .weui_cell").eq(_self.current).attr("desc");
                    // 存入sessionStorage
                    sessionStorage.setItem("msg",desc);
                    // 获取当前点击对象的desc
                    sessionStorage.setItem("currentMsg",target.attr("desc"));
                    // 获取上个选项的文案信息
                    sessionStorage.setItem("prevMsg",target.attr("prev"));
                    // 获取文字title
                    sessionStorage.setItem("title",target.attr("title"));
                    // 跳转到提示页面
                    _self.$router.push({name:"tip"});
                } else {
                    // 如果未认证则跳转页面
                    if (id == 7) {
                    	let state = target.attr("state");
                        if ( state != "2" && state != "5" && state != "1") {
                            _self.toCard();
                        }else{
                        	sessionStorage.setItem("wage",state);
                        	_self.$router.push({name : "cyk"});
                        } 
                    } else {
                    	// 1为资料采集绑卡 需要扣验卡费
                    	sessionStorage.bindCardType = "1";
                        _self.$router.push({
							name : target.attr("router-name")
						});
                    }
                }
			},
			initData(){
				let _self = this;	
				if(this.userStat=="1" || this.userStat=="3"){
					_self.layerObj = layer.open({
					    content: '您的分期申请已提交成功，预计1个工作日内出结果，请留意短信。'
					    ,style: 'width:80%;'
					    ,anim :'up'
					    ,btn: '确认',
					    shadeClose : false,
					    yes : function(){
					    	layer.close(_self.layerObj);
					    	_self.$router.replace({name:"progress"});
					    }
				  	});
				}
				api.userInfoList({source:2}).then(res=>{
					if(res.code == 200){
						_self.person = Math.floor(res.body.person);						
						_self.work = Math.floor(res.body.work);
						_self.contact = Math.floor(res.body.contact);
						_self.bindCard = Math.floor(res.body.bindCard);
						_self.face = Math.floor(res.body.face);
						_self.mobile = Math.floor(res.body.mobile);
						_self.wage = Math.floor(res.body.wage);
						sessionStorage.setItem('person',res.body.person);
						sessionStorage.setItem('work',res.body.work);
						sessionStorage.setItem('contact',res.body.contact);						
						sessionStorage.setItem('mobile',res.body.mobile);
						sessionStorage.setItem('bindCard',res.body.bindCard);
						_self.af2 = res.body.af2;
	                    if(_self.person == 1 && _self.work==1 && _self.contact==1){
	                    	_self.btn2State=false;
	                    }
	                    if(res.body.af2 ==1){
	                    	_self.btn1State=false;
	                    }
	                    if(res.body.af2 ==2){
	                    	_self.btn1State=true;
	                    }
						// 判断当前用户资料填写到哪一步了
	                    if (_self.person > 0) {
	                        ++_self.current;
	                    }
	                    if (_self.work > 0) {
	                        ++_self.current;
	                    }
	                    if (_self.contact > 0) {
	                        ++_self.current;
	                    }
	                    if (_self.bindCard > 0 && _self.bindCard != 4) {
	                        ++_self.current;
	                    }
	                    if (_self.face > 0 && _self.face != 4) {
	                        ++_self.current;
	                    }
	                    if (_self.mobile > 0 && _self.mobile != 4) {
	                        ++_self.current;
	                    }
	                    if (_self.wage > 0 && _self.wage != 4) {
	                        ++_self.current;
	                    }
                    }else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							window.location.href='${project.domain}/index';
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
                    let userinfolist = $(".page-userinfolist");
                    setTimeout(()=>{
                    	if(userinfolist.find(".scroll-content").height()>userinfolist.find(".wrapper").height()){
                    		$(".page-userinfolist .before-trigger").css("visibility","visible"); 
                    	}
                    },1000);
                    _self.$refs.scroll.forceUpdate(true)
				})
			},
			loadData(){
				this.init();
			},
			onPullingDown () {
				this.init();
            },
			toCard(){
				location.href = "https://api.51datakey.com/h5/importV3/index.html#/banklist/DEBITCARD?userId=" + JSON.parse(localStorage.getItem("userInfo")).taskId + "&apiKey=${project.apikey}&themeColor=F38185&backUrl=${project.domain}/index.html#/home/userinfolist";
			},
			jkfqxy(){
				this.$router.push({
					name : "jkfqxy1"
				})
			},
			stages(){
				let _self = this;
				this.btn1State = true;
				api.antiFraud2({ tongdId: _fmOpt.getinfo(), userId: this.userId }).then(res=>{
					layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2
                        ,end : function(){
                        	if(res.code=="200"){
                        		layer.open({
								    content: '您的分期申请已提交成功，预计1个工作日内出结果，请留意短信。'
								    ,style: 'width:80%;'
								    ,anim :'up'
								    ,btn: '确认',
								    yes : function(i){
								    	layer.close(i);
								    	_self.$router.replace({ name : "progress" });
								    }
							  	});
                        	}else if(res.code=="111"){
		                         // 判断安卓和微信
									if(!sessionStorage.getItem("term")){
										window.location.href='${project.domain}/index';
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
                        }
                    });
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/mixin';
	.page-userinfolist {
		.weui_cell {
			background: #fff;
		}
		.weui_person:before {
			border-top: 0;
		}
		.weui_banklist:before {
			border-top: 0;
		}
		.color {
			font-size: px2rem(12);
            color: #F45051;
		}
		.red-class{
			color: #2c3e50;
			font-size: px2rem(14);
		}
		.word-color {
			font-size: px2rem(12);
			color: rgb(196, 196, 196);
			margin-top: px2rem(5);
		}
		.top {
			font-size: px2rem(12);
			line-height: px2rem(30);
			margin-left: px2rem(10);
			color: rgb(196, 196, 196);
		}
		.weui_cell_hd{
			width: px2rem(25);
			text-align: center;
		}
		.weui_cell_bd{
			margin-left: px2rem(20);
		}
		.blue-class{
			color: rgb(74, 144, 226);
			font-size: px2rem(14);
		}
		.before-trigger{
	        visibility: hidden;
	    }
	}
</style>