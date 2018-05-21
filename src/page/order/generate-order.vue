<template>
    <transition name="move">
    	<div class="page-animate page-generate">
            <v-header>
                <mt-header title="提交订单">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <section class="wrapper" v-if="display">
                <p class="flex add-address" v-if="!addrObj.deliveryName">
                    <span class="link-btn-red pd-all-8" v-tap="{methods:addAddr}">+添加收货地址</span>
                </p> 
                <div class="generate-address flex pd-all-10 is-more" v-tap="{methods:chooseAddr}" v-show="addrObj.deliveryName"> 
                   <i class="icon-address scale-7 mgr-6"></i>
                   <div class="grow w-70">
                       <p class="mgb-4">{{addrObj.deliveryName}}（{{addrObj.deliveryAppell}}）{{addrObj.deliveryMobile}}</p>
                       <p>{{addrObj.deliveryArea}} {{addrObj.deliveryAddress}}</p>
                   </div>
                </div>
                <div class="order-common-ui card">
                    <section class="flex pdl-10 pdr-10" v-show="goodsDetail.goodsPicurl">
                        <div class="img-wrap">
                            <img  :src="goodsDetail.goodsPicurl">
                        </div>
                        <div class="flex grow vertical pdl-10 text-left gray-bg" @click="this.toBack">
                            <p class="text-deal font-size-12  full-w">{{goodsDetail.goodsName}}</p>
                            <div class="mgt-16 flex full-w">
                                <h3 class="grow text-left res">￥{{goodsDetail.goodsAmount}}</h3>
                            </div>
                        </div>
                    </section>
                    <p class="pdl-12 pdt-8 pdb-10 ">总计：<span class="res">￥{{goodsDetail.goodsAmount}}</span> <span class="gray-font font-size-10">(含快递费￥{{goodsDetail.expressAmount}})</span></p>
                    <section>
                        <p class="artical flex pdl-4 pdr-10"><i class="icon-logo scale-5"></i><span class="grow">淘花宅分期</span></p>
                        <div class="fq-item flex text-left mgb-10 pdl-10 pdr-10" v-if="userStat==0 || userStat==8 || flag">
                            <div class="item-wrap" v-for="(period,index) in periods">
                                <div class="inner-box" :class="{'active':index==active}" v-tap="{methods:toggleItem,params:index}">
                                    <p class="font-size-14 center">{{repayPerPeriods[index]}}X{{period}}期</p>
                                    <p class="font-size-10 center mgt-4" :class="{'red-font':index==active}">含利息{{interest}}元/期 服务费{{service}}/期</p>
                                </div>
                            </div>
                        </div>
                        <p class="pdt-6  pdb-6 center" v-if="userStat==0 || userStat==8 || (userStat=='2' && flag)">应还总额:<span class="red-font">{{yhke}}</span>元</p>
                        <p  v-if="userStat!=8 && userStat!=0 && !flag" class="gray-font pd-all-6 pdl-30">{{loanMsg}}</p>
                        <div class="mgt-4">
                            <p class="flex pd-all-10 bottom-border-1 top-border-1" v-tap="{methods:playStyle,params:0}">
                                <i class="icon-wx scale-5"></i>
                                <span class="grow">微信支付</span>
                                <span><img :src="uncheckedIcon[1]" class="scale-7"></span>
                            </p>
                            <p class="flex pd-all-10 bottom-border-1" v-tap="{methods:playStyle,params:1}">
                                <i class="icon-alipay scale-5"></i>
                                <span class="grow">支付宝支付</span>
                                <span><img :src="uncheckedIcon[1]" class="scale-7"></span>
                            </p>
                        </div>
                    </section>
                </div>
            </section>
            <mt-button type="primary" v-if="userStat==0 || userStat==8 || (userStat==2 && flag)" size="large" class="fixed-btm-btn font-size-14" :disabled="disabled" @click="gotoplay">淘花宅分期支付{{totalMoney}}元</mt-button>
            <mt-button type="primary" v-if="userStat==1 || userStat==3" size="large" class="fixed-btm-btn font-size-14"  @click="gotoprogress">查看分期进度</mt-button>
             <mt-button type="primary" v-if="userStat==4 || (userStat==2 && !flag)" size="large" class="fixed-btm-btn font-size-14"  :disabled="palySta" >去支付</mt-button>
            <router-view />
        </div>
    </transition>
</template>
<script>

    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    import { getCookie,accMul,accAdd } from '@/assets/js/tool'
    export default {
        components: { VHeader},
        data() {
			return {
                active : 0,
                disabled : false,
                palySta   : true,
                display : false,
                addrObj : {
                    deliveryName : "",              // 收货人名称
                    deliveryMobile : "",            // 收货人手机号
                    deliveryAddress : "",           // 收货人地址
                    deliveryArea : "",              // 收货人地区
                    deliveryAppell : "",            // 性别
                    isDefault : "",                 // 是否默认地址
                    id : ""
                },
                service : "--",                 // 服务费
                interest : "",                  // 利息
                canLoan : "",  // 是否能分期 0-不能 1-能
                userStat :"",
                loanMsg:"",
                rejectTime:"",
                flag : "",
                currentTime:"",
                uncheckedIcon : ["/thz/static/icon_sex1@2x.png","/thz/static/icon_sex2@2x.png"],
                selectedIdx : 1,
                goodsDetail : {
                    goodsName : "",
                    goodsPicurl : "",
                    goodsAmount : "0",
                    expressAmount : "0"
                },
                periods : [],
                repayPerPeriods :[]
			}
		},
        computed: {
            // 计算应还金额
            yhke() {
                var sum = 0;
                if(this.periods[this.active] && this.repayPerPeriods[this.active]){
                    sum = accMul(this.repayPerPeriods[this.active],this.periods[this.active]);
                }
                return sum;
            },
            totalMoney(){
                return accAdd(this.goodsDetail.goodsAmount,this.goodsDetail.expressAmount);
            }
        },
        created(){
            api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                localStorage.setItem("userInfo",JSON.stringify(res.body));
                this.userStat = res.body.userStat;
                this.currentTime = res.body.currentTime;
                this.rejectTime = res.body.rejectTime;
                let currentDate = new Date();
                let year = currentDate.getFullYear();
                let month = (currentDate.getMonth()+1)<10?"0"+(currentDate.getMonth()+1):currentDate.getMonth()+1;
                let day = currentDate.getDate()<10?"0"+currentDate.getDate():currentDate.getDate();
                // 判断被拒是否大于90天
                this.flag = new Date(year +"/"+ month +"/"+ day).getTime()>new Date(this.rejectTime).getTime();

            });
            this.initData();
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            initData(){
                let _self = this;
                // 如果用户已经登录则获取默认地址
                api.getdefaultaddress({}).then(res=>{
                    if(res.code=="200"){
                        _self.display = true;
                        _self.addrObj.deliveryName = res.body.deliveryName;
                        _self.addrObj.deliveryMobile = res.body.deliveryMobile;
                        _self.addrObj.deliveryAddress = res.body.deliveryAddress;
                        _self.addrObj.deliveryArea = res.body.deliveryArea;
                        _self.addrObj.deliveryAppell = res.body.deliveryAppell;
                        _self.addrObj.isDefault = res.body.isDefault;
                        _self.addrObj.id = res.body.id;
                        _self._showOrder();
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
                });
            },
            gotoprogress(){
                this.$router.push({path:"/home/progress"});      
            },
            _showOrder(){
                let _self = this;
                // 商品提交订单前数据展示
                api.showOrder({goodId:sessionStorage.getItem("goodsId")}).then(res=>{
                    if(res.code=="200"){
                        _self.goodsDetail.goodsName = res.body.goodsName;
                        _self.goodsDetail.goodsPicurl = res.body.goodsPicurl;
                        _self.goodsDetail.goodsAmount = res.body.goodsAmount;
                        _self.goodsDetail.expressAmount = res.body.expressAmount;
                        _self.service = res.body.service;
                        _self.interest = res.body.interest;
                        _self.canLoan = res.body.canLoan;
                         _self.loanMsg = res.body.loanMsg;
                        sessionStorage.setItem('canLoan',res.body.canLoan);
                        if(res.body.canLoan == "0"){
                        	sessionStorage.setItem('loanMsg',res.body.loanMsg);
                        }
                        
                        _self.periods = res.body.periods;
                        _self.repayPerPeriods = res.body.repayPerPeriods;
                    }else if(res.code=="111"){
                        window.location.href='${project.domain}/index';
                    }else{
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                })
            },
            toggleItem(e){
                this.active = e.params;
            },
            chooseAddr(){
                if(this.userStat=="0" || this.userStat=="8" || (this.userStat=="2" && this.flag)){
                    sessionStorage.setItem("addrState","1");
                    this.$router.push({"name":"orderAddress"});
               }
            },
            gotoplay(){
                let _self = this;
                // 提交订单
                if(_self.userStat=="1"||_self.userStat=="3"){
                    _self.$router.push({name:"progress"})
                }
                if(_self.userStat=="4" || _self.userStat=="5" ){
                	_self.$router.push({name:"fqzd"})
                }
                if(this.userStat=="0" || this.userStat=="8" || (this.userStat=="2" && _self.flag)){
                    if(!_self.addrObj.id){
                        layer.open({
                            content: "请编辑地址信息"
                            ,skin: 'msg'
                            ,time: 2
                        });
                        return;
                    }
                    if(sessionStorage.getItem('canLoan') == "1"){
	                    api.submitapp({
	                        goodsId : sessionStorage.getItem("goodsId"),                // 商品Id
	                        addressId : _self.addrObj.id,                                // 收货地址Id
	                        payType :  "T",                                             // 支付方式
	                        periodNum : _self.periods[_self.active]                     // 分期时间
	                    }).then(res=>{
	                    	if(res.code == "200"){                    		
	                           if(_self.userStat=="0" || _self.userStat=="8" || (this.userStat=="2" && _self.flag)){
	                                _self.$router.push({name:"userinfolist"});
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
	                        
	                    })
                    }else{
                    	layer.open({
                            content: sessionStorage.getItem('loanMsg')
                            ,skin: 'msg'
                            ,time: 2	                            
                        });
                    }
                }
            },
            addAddr(){
                sessionStorage.setItem("addrState","1");
                this.$router.push({"name":"orderAddress"});
            },
            playStyle(e){
               // this.selectedIdx = e.params;
                let msg = e.params==0?"微信支付正在对接中！":"支付宝正在对接中！";
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 2
                });    
            },
            relaodAddr(addr){
                this.addrObj = addr;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-generate{
        .add-address{
            padding: 20px 0 10px;
        }
        .wrapper{
            padding-bottom: 44px;
        }
        .fq-item{
            flex-wrap: wrap;
            .item-wrap{
                width: 50%;
            }
        }
        .shenhe{
        	margin-left: 40px;
        	color: #9D9D9D;
        	line-height: 30px;
        }
        .center{
            text-align: center;
        }
        .no-raduis{
            border-radius: 0;
        }
        .inner-box{
            margin: 2px 2px;
            padding: 10px;
            color:#000;
            border:1px solid #d9d9d9;
            background: #FAFAFA;
        }
        .res{color:#F45051;}
        .active{
            color:#F45051;
            border:1px solid #F45051;
        }
        .red-font{
            color: #F45051;
        }
        .bottom-border-1{
            border-bottom: 1px solid #F2F2F2;
        }
        .top-border-1{
            border-top: 1px solid #F2F2F2;
        }

        .is-more {
            background: url("/thz/static/href.png") scroll 98% 50% no-repeat;
            background-size: 20px;
            margin-left: 10px;
        }
        .mint-button.is-disabled{
            opacity: 1;
            background: #F89697;
        }
        .w-70{
            width: 70%;
            padding-right: 10px;
        }
    }
</style>