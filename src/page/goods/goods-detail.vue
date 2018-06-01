<template>
    <transition>
    	<div class="page-animate page-goods-detail">
            <v-header>
                <mt-header :title="title">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper goods-wrap">
                <div class="white-bg pdb-6">
                    <div class="goods-content">
                        <mt-swipe :auto="0" :show-indicators="false"  @change="handleChange">
                            <mt-swipe-item v-for="icon in goodsData.goods_pic" :key="">
                                <img :src="icon.picUrl" width="100%">
                            </mt-swipe-item>
                        </mt-swipe>
                        <p class="flex swipe-index"><span>{{currentIdx}}/{{totalNumber}}</span></p>
                    </div>
                    <div class="price mgt-5 mgb-5 flex text-left">
                        <div class="pdl-6 font-size-24">￥{{goodsData.goodsAmount}}</div>
                    </div>
                    <div class="pdl-10 font-size-15">{{goodsData.goodsName}}</div> 
                    <div class="pdl-10 mgt-5 mgb-5 font-size-12 goods-title">{{goodsData.goodsTitle}}</div> 
                </div>
               <!--  <div class="flex pdb-6 addr-wrap text-left">
                   <span class="flex"><span style="width:50px;margin-left:10px;">配送至</span><img src="/thz/static/icon-addr.png" width="12"></span>
                   <span class="text-deal mgl-6" v-show="addrObj.deliveryArea" @click="addAddr">{{addrObj.deliveryArea}} {{addrObj.deliveryAddress}}</span>
                   <span class="text-deal mgl-6" v-show="!addrObj.deliveryArea" @click="addAddr">请添加收货地址</span>
               </div> -->
                <div class="flex pdb-6 addr-wrap text-left">
                   <span class="flex grow text-left pdl-10" @click="showMsg"><span class="mgr-6">分期支付</span><img src="/thz/static/sprity/msg.png" width="16"/></span>
                   <span class="flex week-number pdr-10">周供￥{{goodsData.goods_periodnum}}*{{goodsData.repayPerPeriods}}期</span>
                </div> 
                <div class="img-box mgt-10">
                    <p class="pdt-10 pdb-10 pdl-10 white-bg">商品详情</p>
                    <div v-html="goodsData.goodsDetail"></div>
                </div> 
                <footer class="fixed-btm-btn flex">
                    <table class="footer-table">
                        <tr>
                            <td class="footer-item has-border1" @click="tohome"><img src="/thz/static/icon-home.png" width="16" /></td>
                            <td class="footer-item has-border1" @click="share"><img src="/thz/static/icon-share.png" width="16" /></td>
                            <td class="footer-item" @click="kefu"><img src="/thz/static/icon-kefu.png" width="16" /></td>
                            <td>
                                <mt-button type="primary" v-if="!userStat || userStat==0 || userStat==8 || (userStat==2 && rejectFlag)" size="large" class="font-size-14" @click="shopping">分期购买</mt-button>
                                <mt-button type="primary" v-if="userStat==1 || userStat==3" size="large" class="font-size-14" @click="gotoprogress">查看分期进度</mt-button>
                                <mt-button type="primary" v-if="userStat==4 || (userStat==2 && !rejectFlag)" size="large" class="font-size-14" :disabled="disflag">去支付</mt-button>
                            </td>
                        </tr>
                    </table>
                </footer>

                <div class="to-top-scroll" @click="toTop" v-show="toTopFlag"></div>
            </div>
            <div class="mask" v-show="shareFlag" @click="hidePop"></div>
            <div class="share-pop"  v-show="shareFlag"><img src="/thz/static/share-icon.png" width="70%"></div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import {getCookie} from '@/assets/js/tool'
    import Vue from 'vue';
    import api from '@/fetch/api'
    export default {
    	name: 'page-goods-detail',
        components: { VHeader },
        data() {
			return {
				goodsData : "",
                userStat :"",
                disflag : true,
                title : "商品详情",
                currentIdx : 1,
                totalNumber : 0,
                addrObj : {},
                layerObj : "",
                rejectFlag : true,
                shareFlag : false,
                toTopFlag : false
			}
		},
        mounted(){
            let _self = this;
            if(getCookie("thz_H5")){
                api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                    if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href=process.env.NODE_ENV=="dev"?"https://thz-uat.vjiehu.com/thz/index":"https://thz.vjiehu.com/thz/index";
                        }else{
                            _self.$router.push("/login");
                        }
                    }else{
                        this.userStat = res.body.userStat;
                    }
                })
            }
            this.initData();
            // 关闭弹窗
            $("body").on("click",".ok-btn",()=>{
                layer.close(this.layerObj);
            });
            // 判断是否显示回到顶部的按钮
            $(".goods-wrap").scroll(function(){
                _self.toTopFlag = $(this).scrollTop()>400?true:false;
            })
        },
		methods : {
            toBack(){
                if(this.$route.query.type=="out"){
                    WeixinJSBridge.call('closeWindow');
                }else{
                   this.$router.back(); 
                }
            },
            initData(){
                let _self = this;
                api.goodsDetail({id:_self.$route.query.goodsId}).then(res=>{
                    if(res.code=="200"){
                        _self.goodsData = res.body;
                        _self.totalNumber = res.body.goods_pic.length;
                        _self.title = res.body.goodsName;
                        _self.$nextTick(()=>{
                            // 根据sessionStorage取值判断 ps这里不能取this.$route.query里的term 以防子页面跳转到当前页this.$route.query里不存在此参数
                            if(!sessionStorage.getItem("term")){
                                // 微信就获取地理位置坐标 安卓不获取
                                let thisUrl = location.href.split('#')[0];
                                // 获取微信签名
                                api.getWxSign({url:thisUrl}).then(res=>{
                                    if(res.code=="200"){
                                        _self.getWx(res);
                                    }
                                })
                            }else{
                                console.log("来着安卓 or ios的访问请求");
                            }
                        })

                    }else if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href=process.env.NODE_ENV=="dev"?"https://thz-uat.vjiehu.com/thz/index":"https://thz.vjiehu.com/thz/index";
                        }else{
                            _self.$router.push("/login");
                        }
                    }else{
                    	layer.open({
	                         content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2	                            
	                    });
                    }
                })
            },
            shopping(){ 
                this.verfiy(()=>{ this.gotoplay();});
            },
            // 判断用户是否登录且cookie是否有效
            verfiy(callback){
                if(getCookie("thz_H5")){
                    api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                        if(res.code=="200"){
                            callback && callback();
                        }else{
                            // 标识登录成功之后需要返回
                            sessionStorage.hasBack = true;
                            this.$router.push("/login");
                        }
                    })
                }else{
                    sessionStorage.hasBack = true;
                    this.$router.push("/login");
                }
            },
            addAddr(){
                this.verfiy(()=>{
                    sessionStorage.setItem("addrState","1");
                    this.$router.push({"name":"orderAddress"});
                });
            },
            relaodAddr(addr){
                this.addrObj = addr;
            },
            tohome(){
                this.$router.replace("/home");
            },
            kefu(){
                let _self = this;
                this.verfiy(()=>{
                    // 如果为苹果系统则直接打开链接，因为ios不支持iframe
                    if(browser.versions.ios){
                        if(sessionStorage.getItem("term")){
                            iosOrAndroid("Open Page",{url:"http://w1.ttkefu.com/k/linkurl/?t=3G6JEI6"},false);
                        }else{
                            location.href = "http://w1.ttkefu.com/k/linkurl/?t=3G6JEI6";
                        }
                    }else{
                        // 标识去联系客服的源
                        sessionStorage.setItem("from","goods-detail"); 
                        // 安卓直接跳路由
                        _self.$router.push("/home/jpfq/goods/detail/kefu");
                    }
                });
            },
            gotoprogress(){
                this.verfiy(()=>{ this.$router.push({path:"/home/progress"});});
            },
            getWx(res){
                let _self = this;
                let appId = res.body.appid;
                let nonceStr = res.body.noncestr;
                let signature = res.body.signature;
                let timestamp = res.body.timestamp;
                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
                });
                wx.ready(function() {
                    wx.onMenuShareAppMessage({
                        title: _self.goodsData.goodsName, // 分享标题
                        desc: _self.goodsData.goodsTitle, // 分享描述
                        link: location.href+"&type=out", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: _self.goodsData.goods_picurl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            _self.shareFlag = false;
                        }
                    });

                    wx.onMenuShareTimeline({
                        title: _self.goodsData.goodsName, // 分享标题
                        link: location.href+"&type=out", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: _self.goodsData.goods_picurl, // 分享图标
                        success: function () {
                            _self.shareFlag = false;
                        }
                    })
                })
            },
            share(){
                this.shareFlag = true;
            },
            hidePop(){
                this.shareFlag = false;
            },
            handleChange(index){
                this.currentIdx = ++index;
            },
            toTop(){
                $(".goods-wrap").animate({scrollTop:0}, 500);
            },
            showMsg(){
                this.layerObj = layer.open({
                    style:"width:80%",
                    content: '<div>\
                        <p class="opts-title">分期介绍</p>\
                        <div>\
                            <ul>\
                                <li class="opts">1、先买单，再还款，您支付成功后，会将该笔交易计入您的账单中，出账后您可操作还款</li>\
                                <li class="opts">2、分期购买，在您购买分期商品时，可以选择分期购买</li>\
                                <li class="opts">3、部分商品不支持分期</li>\
                                <li class="opts">4、分期商品购买后，可进行转卖换钱</li>\
                                <li class="opts">5、如有问题，可联系微客服，在线咨询</li>\
                            </ul>\
                        </div>\
                        <div class="flex"><a class="ok-btn">我知道了</a></div>\
                    </div>'
                });
            },
            // 购买
            gotoplay(){
                let _self = this;
                let userStat = localStorage.userStat;
                // 提交订单
                if(userStat=="1" || userStat=="3"){
                    _self.$router.push({name:"progress"})
                }
                if(userStat=="4" || userStat=="5" ){
                    _self.$router.push({name:"fqzd"})
                }   
                // 判断拒绝时间是否大于90天
                if(localStorage.rejectTime){
                    let currentDate = new Date();
                    let year = currentDate.getFullYear();
                    let month = (currentDate.getMonth()+1)<10?"0"+(currentDate.getMonth()+1):currentDate.getMonth()+1;
                    let day = currentDate.getDate()<10?"0"+currentDate.getDate():currentDate.getDate();
                    _self.rejectFlag = new Date(year +"/"+ month +"/"+ day).getTime()>new Date(localStorage.rejectTime).getTime();
                }
                if(userStat=="0" || userStat=="8" || (userStat=="2" && rejectFlag)){
                    if(_self.goodsData.isLoan == "1"){
                        api.submitOrder({
                            goodsId : sessionStorage.getItem("goodsId"),                // 商品Id
                            addressId : "0",                                            // 收货地址Id
                            payType :  "T",                                             // 支付方式
                            periodNum : _self.goodsData.goods_periodnum,                // 分期时间
                            isLoan : "1"
                        }).then(res=>{
                            if(res.code == "200"){ 
                                if(userStat=="0" || userStat=="8" || ( _self.userStat =="2" && _self.rejectFlag)){
                                    _self.$router.push({name:"userinfolist"});
                                }                                                             
                            }else if(res.code=="111"){
                                // 判断安卓和微信
                                if(!sessionStorage.getItem("term")){
                                    window.location.href= location.origin+'/thz/index';
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
                            content: "该商品不是分期商品" 
                            ,skin: 'msg'
                            ,time: 2                                
                        });
                    }
                }else{
                    layer.open({
                        content: "暂不满足分期条件"
                        ,skin: 'msg'
                        ,time: 2                                
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/mixin';
    $color : #F45051;
    .page-goods-detail{
        .mint-button{
            height: 45px;
        }
        .wrapper{
            overflow-y:auto; 
        }
        .goods-content{
            height: px2rem(370);
            position: relative;
        }
        .text-deal{
            padding: 10px 10px 0 0;
        }
        .min-tag{
            border:1px solid $color;
            color:$color;
            font-size: 10px;
            padding: 1px;
            padding-top: 3px;
            border-radius: 4px;
            margin-right: 5px;
        }
        .desc{
            font-size: 12px;
            color:#878787;
            padding-left: 10px;
            margin-bottom: 10px;

        }
        .img-box{
            padding-bottom: px2rem(42);
            img{
                width:100%;
                font-size:0;
            }
        } 
        .text-deal{
            padding: 0;
        }
        .white-bg{
            background:#fff;
        }
        .addr-wrap{
            padding: 10px 0;
            background:#fff;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .footer-table{
            border-collapse: collapse;
            text-align: center;
            width:100%;height: px2rem(45);
        }
        .footer-item{
            width:px2rem(50);
            height: 100%;
            td{
                position: relative;  
            }
        }
        .has-border1{
            border-right: 1px solid #D9D9D9;
        }
        .mint-button{
            border-radius: 0;
        }
        .share-pop{
            position: absolute;
            z-index: 9999999;
            top:10px;
            left:0;
            img{
                margin-left:25%;
            }
        }
        .week-number{
            color:#F45051;
        }
    }
    .opts{
        text-align: left;
        line-height: px2rem(21);
        font-family: PingFangSC-Light;
        font-size: px2rem(14);
        color: #333333;
    }
    .opts-title{
        font-family: PingFangSC-Regular;
        font-size: px2rem(18);
        color: #333333;
        padding-bottom: px2rem(10);
    }
    .ok-btn{
        width:80%;
        background-image: linear-gradient(90deg, #FE7874 0%, #F45051 100%);
        box-shadow: 0 5px 10px 0 rgba(244,80,81,0.30);
        border-radius: 2px;
        line-height: px2rem(42);
        margin: px2rem(10) 0;
        color:#fff;
    }
    .swipe-index{
        position: absolute;
        bottom: px2rem(10);
        left:0;
        z-index: 99;
        width:100%;
        span{
            display:block;
            padding: px2rem(2) px2rem(10);
            background-color: #fff;
            border-radius: px2rem(4);
        }
    }
    .goods-title{
        color:#9198A3;
    }
    .to-top-scroll{
        position: fixed;
        width:px2rem(48);
        height: px2rem(48);
        background: url("/thz/static/to-top.png") no-repeat;
        background-size:px2rem(48);
        bottom: px2rem(60);
        right:px2rem(20);
        z-index: 99;
    }
</style>