<template>
	<div class="page-animate page-order">
        <v-header>
            <mt-header title="购买订单列表">
                <div slot="left">
                    <mt-button  icon="back" @click.native="toBack"></mt-button>
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
                    <div class="backmoney" v-if="item.orderPage == 'C' || item.orderPage == 'D'">
                        <span v-if="item.refundId !== ''">{{item.refundStatus=="退款申请已取消"?"":item.refundStatus}}</span>
                    </div>
                </div>
                <p class="card-footer">
                    <span v-if="item.orderPage != 'B'">分期支付:￥{{item.orderAmount}}</span>
                    <span v-if="item.orderPage == 'B'">{{item.rejectTime}}日后可重新下单</span>
                    <span class="fr link-btn-gray mgt--5 fenqi" v-if="item.orderPage == 'H'"  @click="fqzd(item.taskId)" >分期账单</span>
                    <span class="fr link-btn-gray mgt--5 changemoney1" v-if="item.orderPage == 'C'" @click="sale(item.orderId,index)">卖了换钱</span>
                    <span class="fr link-btn-gray mgt--5 lookdetail" v-if="item.orderPage == 'B' || item.orderPage == 'G'" @click="lookdetail(item.orderId,item.goodsId)">查看详情</span>
                    <span class="fr link-btn-gray mgt--5 lookexpresss1"  v-if="item.orderPage == 'A'"  @click="progress(item.orderId)">查看进度</span>                      
                    <span class="fr link-btn-gray mgt--5 expresss1" v-if="item.orderPage == '0'" @click="gotoInfo(item.goodsId)">去付款</span>
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
        <router-view />
    </div>
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
                //isLoan 1:分期订单 0：在线支付订单
                api.list({page:_this.page,size:_this.size,isLoan:"1"}).then(res=>{
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
                sessionStorage.orderType = "stagingOrder";
                sessionStorage.isLoan = 1;
            	this.$router.push("/home/order/order-detail");
            },			
			toRouter(e) {
				this.$router.push(e.params);
			},
            sale(orderId,i){
                sessionStorage.orderId = orderId;
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
                this.$router.push("/home/userInfoList");
            },
            closemode(){            	 
                $(".page-order .hide-order").hide();                         
            },
            progress(){
                this.$router.push({name:"oprogress"}); 
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
    
    .before-trigger{
        visibility: hidden;
    }
    .mgt--5{
        margin-top: -8px;
    }
</style>