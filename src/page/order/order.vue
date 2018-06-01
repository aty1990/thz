<template>
    <transition name="move">
    	<div class="page-animate page-order">
            <v-header>
                <mt-header title="购买订单列表">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <vue-better-scroll v-if="display"  class="wrapper" ref="scroll" 
                :pullDownRefresh="pullDownRefreshObj" 
                :pullUpLoad="pullUpLoadObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp">
                <div class="card mgb-10" v-for="(item,index) in items">
                    <p class="card-title flex">
                        <span class="grow">下单时间：{{item.orderTime}}</span>
                        <span class="theme-font-color">{{item.orderStatus}}</span>
                    </p>
                    <div class="right-content all-top gray-bg floatorder" @click="lookdetail(item.orderId,item.goodsId)">
                    	<div class="float floatimg">
                    		<img v-bind:src="item.goodsUrl" height="60" width="60">
                    	</div>
                        
                        <div class="wrap float floatword">
                            <h5 class="text-deal">{{item.goodsName}}</h5>
                        </div>
                        <div class="backmoney" v-if="item.orderPage == 'C' || item.orderPage == 'D'"><span v-if="item.refundId !== ''">{{item.refundStatus}}</span></div>
                    </div>
                    <p class="card-footer">
                        <span v-if="item.orderPage != 'B'">分期支付:￥{{item.orderAmount}}</span>
                        <span v-if="item.orderPage == 'B'">{{item.rejectTime}}日后可重新下单</span>
                        <span class="fr link-btn-gray fenqi" v-if="item.orderPage == 'C'"  @click="fqzd(item.taskId)" >分期账单</span>
                        <span class="fr link-btn-gray changemoney1" v-if="item.orderPage == 'C'" @click="sale(item.orderId,index)">卖了换钱</span>
                        <span class="fr link-btn-gray lookdetail" v-if="item.orderPage == 'B' || item.orderPage == 'E'|| item.orderPage == 'G'|| item.orderPage == 'H'" @click="lookdetail(item.orderId,item.goodsId)">查看详情</span>
                        <span class="fr link-btn-gray lookexpresss1"  v-if="item.orderPage == 'A'"  @click="progress(item.orderId)">查看进度</span>                      
                        <span class="fr link-btn-gray suremoney1" @click="confirmationreceipt(item.orderId,item.taskId)" v-if="item.orderPage == 'D'">确认收货</span>
                        <span class="fr link-btn-gray expresss1" v-if="item.orderPage == 'D'" @click="logistics(item.expressId,item.expressCompany)">查看物流</span>
                        <span class="fr link-btn-gray expresss1" v-if="item.orderPage == '0'" @click="gotoInfo(item.goodsId)">去付款</span>
                    </p>
                </div>
            </vue-better-scroll>
            <div class="no-data-msg" v-show="maxLen">
                <div class="ds-table">
                    <div class="ds-tell">
                        <img src="/thz/static/pic_wujilu@2x.png" width="120">
                        <p class="mgt-20 gray-font">您还没有购买订单记录~</p>
                    </div>
                </div>
            </div>
            <div class="hide-order">
            	<div class="mode-bottom" v-for="item in items">
	            	<p>物流公司:<span class="expressCompany">{{expressCompany}}</span><img src="/thz/static/icon_delete@2x.png" class="close-mode" @click="closemode"/></p>
	            	<p>物流单号:<span class="expressId" id="contents">{{expressId}}</span>
                        <button class="orderList copy"  data-clipboard-target="#myOrderNum">复制</button>
                    </p>
                    <input type="text" id="myOrderNum" v-model="expressId" readonly>                
	            </div>
	            <div class="mode"></div>
            </div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import VueBetterScroll from 'vue2-better-scroll' 
    import Clipboard from 'clipboard'
    import api from '@/fetch/api'
    import { getCookie } from '@/assets/js/tool'
    export default {
    	name: 'page-order',
        components: { VHeader,VueBetterScroll},
        data() {
			return {
				items:[],
                maxLen : false,
                expressId : "",
                expressCompany : "",
                display : false,
                 // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
                pullDownRefreshObj: {   
                    threshold: 90,
                    stop: 40
                },
                // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
                pullUpLoadObj: {
                    threshold: 0,
                    txt: {
                        more: '加载更多',
                        noMore: ''
                    }
                },
                startY: 0,  // 纵轴方向初始化位置
                scrollToX: 0,
                scrollToY: 0,
                scrollToTime: 700,
                size : 10,
                page : 1,
                rejectTime:"",
                userId : ""
			}
		},
        mounted(){
            let _self = this;
            this.onPullingDown();
            api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                this.rejectTime= res.body.rejectTime.replace("/", "年").replace("/", "月");
                this.userId= res.body.userId;              
            })
            this.initData();
            // 卖了换钱 提交成功后刷新页面数据
            $.subscribe('app.list', function(e, results) {
                _self.page = 1;
                api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                  _self.rejectTime= res.body.rejectTime.replace("/", "年").replace("/", "月")              
                })
                _self["items"] = [];
                _self.initData();
            });
        },        
		methods : {			
            toBack(){
                this.$router.push("/home")
            },
            updateData(){
				this.items = [];
				this.onPullingDown(); 
			},
            initData(){
                let _this=this;
                api.list({page:_this.page,size:_this.size}).then(res=>{
                    if(res.code=="200"){
                        _this.display = true;
                        // 当初次进来或者下拉刷新时
                        if(_this.page==1){
                            _this["items"] = res.body.data;
                            if(_this.items.length==0){
                                _this.maxLen = true;
                            }
                        }else{
                            // 上拉加载更多时
                            $.each(res.body.data,function(index, el) {
                                _this.items.push(el);
                            });
                        }
                        _this.$nextTick(()=>{
                            //判断查询到的数据是否为10条，为10则可以继续加载
                            if(_this.$refs.scroll){
                                _this.$refs.scroll.forceUpdate(res.body.data.length==_this.size)
                            }
                        });
                        setTimeout(function(){
                            if(_this.page<=1){
                                $(".page-order .before-trigger").css("visibility","hidden"); 
                            }else{
                                $(".page-order .before-trigger").css("visibility","visible"); 
                            }
                        },1000);
                    }else if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _this.$router.push("/login")
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
            lookdetail(orderId,goodsId){
                sessionStorage.setItem("orderId",orderId);
            	sessionStorage.setItem("goodsId",goodsId);
            	this.$router.push("/home/order/order-detail");
            },			
            confirmationreceipt(orderId,taskId){
                let _self = this;
                layer.open({
                    content: '请确认已收到货，确认后将不能对订单进行退货操作！'
                    ,btn: ['确认', '取消']
                    ,yes: function(index){
                        api.confirmationreceipt({orderId:orderId}).then(res=>{
                            if(res.code == 500){
                                layer.close(index); 
                                layer.open({
                                    content: res.msg
                                    ,skin: 'msg'
                                    ,time: 2 
                                });
                            }
                            if(res.code == 200){
                                layer.close(index); 
                                layer.open({
                                    content: "确认收货成功"
                                    ,skin: 'msg'
                                    ,time: 2,
                                    end : function(){
                                        sessionStorage.setItem("taskId",taskId);
                                        $.publish('app.list');
                                        _self.$router.push({                 
                                            path:"/home/receipt"
                                        });      
                                    } 
                                });
                            }
                        })   
                    }
                });
            },
            logistics(eid,ename){ 
                this.expressCompany = ename;
                this.expressId = eid;
            	$(".page-order .hide-order").show();  
                var clipboard = new Clipboard('.orderList')  
                clipboard.on('success', e => {  
                    layer.open({
                        content: "复制物流单号成功"
                        ,skin: 'msg'
                        ,time: 2
                    });
                  // 释放内存  
                  clipboard.destroy()  
                })  
                clipboard.on('error', e => {  
                  // 不支持复制  
                  console.log('该浏览器不支持自动复制')  
                  // 释放内存  
                  clipboard.destroy()  
                })  
            },
			toRouter(e) {
				this.$router.push(e.params);
			},
            sale(orderId,i){
                api.canWithdraws({orderId:orderId,userId:this.userId}).then(res=>{
                    if(res.code=="200"){
                        if(res.body.orderStatus=="C" && res.body.payStatus=="1"){
                            sessionStorage.setItem("pawnOrderId",orderId);
                            this.$router.push("/home/sale");
                        }else{
                            layer.open({
                                content: "订单正在处理中..."
                                ,skin: 'msg'
                                ,time: 2 
                            });
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
            fqzd(taskId){
            	sessionStorage.setItem("taskId",taskId);
                if(sessionStorage.getItem("taskId")){                	
                	this.$router.push("/home/fqzd");
                }
            },
            // 下拉刷新
            onPullingDown(){
                this.page = 1;
                this.initData();
            },
            // 上拉加载
            onPullingUp(){
                var _self = this;
                _self.page++;
                this.initData();
            },
            gotoInfo(goodsId){
                sessionStorage.setItem("goodsId",goodsId);
                localStorage.setItem("goodsId",goodsId);
                this.$router.push({
                    name:"goods-detail",
                    query : {
                        goodsId : goodsId
                    }
                });
            },
            closemode(){            	 
                $(".page-order .hide-order").hide();                         
            },
            progress(){
                this.$router.replace({name:"progress"}); 
            }
        }
    }
</script>

<style lang="scss">
    .page-order{
    	.floatorder{
    		width: 100%;
    		display: inline-block;
    		position: relative;
    	}
    	.card .right-content img{
    		margin-left: 10px;
    	}
        .float{
        	float: left;
        }
        .floatimg{
        	width: 80px;
            text-align: center;
        }
        .floatword{
        	width: 70%;
        }
        .backmoney{
            position: absolute;
            right: 10px;
            bottom: 3px;	
            color: #FF9000;
        }
        
    }
    .hide-order{display: none;}
    .mode-bottom{
        background: #fff;
    	height: 100px;
    	width: 100%;
    	position: fixed;
    	bottom: 0;
    	z-index: 1;
    	p{
    		height: 50px;
    		line-height: 50px;
    		border-bottom: 1px solid #f1f1f1;
    		margin-left: 20px;
    	}
    	.copy{
    		border-radius:2px;
    		font-size:12px;
            padding: 2px 9px;
    		border: 1px solid #888;
    		color: #888;
            margin-left: 20px;
            background: #fff;
    	}
    	.close-mode{
    		float: right;
    		margin-right: 20px;
    		width: 20px;
    		margin-top: 15px;
    	}
    	
    }
    .mode{
    	width: 100%;
    	height: 100%;
    	background: rgba(0,0,0,0.5);
    	top: 0;
    	position: fixed;
    	z-index: 0;
    }
    .before-trigger{
        visibility: hidden;
    }
</style>