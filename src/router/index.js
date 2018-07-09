import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Sale = r => require.ensure([], () => r(require('@/page/order/sale')), 'sale');
const Complete = r => require.ensure([], () => r(require('@/page/order/complete')), 'complete');
const Kefu = r => require.ensure([], () => r(require('@/page/mine/kefu')), 'kefu');
const Shouhou = r => require.ensure([], () => r(require('@/page/mine/shouhou')), 'shouhou');
const Help = r => require.ensure([], () => r(require('@/page/mine/help')), 'help');
const Progress = r => require.ensure([], () => r(require('@/page/mine/progress')), 'progress');
const Repayment = r => require.ensure([], () => r(require('@/page/mine/repayment')), 'repayment');
const Jkfqxy = r => require.ensure([], () => r(require('@/page/mine/jkfqxy')), 'jkfqxy');
const Fail = r => require.ensure([], () => r(require('@/page/mine/fail')), 'Fail');
const StagingBill = r => require.ensure([], () => r(require('@/page/mine/staging-bill')), 'stagingBill');
const Bankcard = r => require.ensure([], () => r(require('@/page/mine/choose-card')), 'choose-card');
const Mbankcard = r => require.ensure([], () => r(require('@/page/mine/mbankcard')), 'mbankcard');
const EarlyRepay = r => require.ensure([], () => r(require('@/page/mine/early-repay')), 'earlyRepay');
const Staging = r => require.ensure([], () => r(require('@/page/mine/staging')), 'staging');
const Transaction = r => require.ensure([], () => r(require('@/page/mine/transaction')), 'transaction');
const Paydetails = r => require.ensure([], () => r(require('@/page/mine/paydetails')), 'paydetails');
const ShippingAddress = r => require.ensure([], () => r(require('@/page/mine/shipping-address')), 'shippingAddress');
const AddAddress = r => require.ensure([], () => r(require('@/page/mine/add-address')), 'addAddress');
const Aboutus = r => require.ensure([], () => r(require('@/page/mine/aboutus')), 'aboutus');
const Dropout = r => require.ensure([], () => r(require('@/page/login/dropout')), 'dropout');
const Makepwd = r => require.ensure([], () => r(require('@/page/login/makepwd')), 'makepwd');
const PawnOrder = r => require.ensure([], () => r(require('@/page/order/pawn-order')), 'pawnOrder');
const Order = r => require.ensure([], () => r(require('@/page/order/order')), 'order');
const OrderDetail = r => require.ensure([], () => r(require('@/page/order/order-detail')), 'orderDetail');
const Refund = r => require.ensure([], () => r(require('@/page/order/refund')), 'refund');
const Success = r => require.ensure([], () => r(require('@/page/order/success')), 'success');
const Logistics = r => require.ensure([], () => r(require('@/page/order/logistics')), 'logistics');
const Prosuccess = r => require.ensure([], () => r(require('@/page/order/prosuccess')), 'prosuccess');
const Msg = r => require.ensure([], () => r(require('@/page/mine/msg')), 'msg');
const Detail = r => require.ensure([], () => r(require('@/page/mine/detail')), 'detail');
const GoodsDetail = r => require.ensure([], () => r(require('@/page/goods/goods-detail')), 'goodsDetail');
const Userinfolist = r => require.ensure([], () => r(require('@/page/mine/userinfolist')), 'userinfolist');
const Person = r => require.ensure([], () => r(require('@/page/mine/person')), 'person');
const Idcard = r => require.ensure([], () => r(require('@/page/mine/idcard')), 'idcard');
const Amap = r => require.ensure([], () => r(require('@/page/mine/amap')), 'amap');
const Work = r => require.ensure([], () => r(require('@/page/mine/work')), 'work');
const Mbankcardlist = r => require.ensure([], () => r(require('@/page/mine/mbankcardlist')), 'mbankcardlist');
const Contacts = r => require.ensure([], () => r(require('@/page/mine/contacts')), 'contacts');
const Userphoto = r => require.ensure([], () => r(require('@/page/mine/userphoto')), 'userphoto');
const Usermobile = r => require.ensure([], () => r(require('@/page/mine/usermobile')), 'usermobile');
const Newpwd = r => require.ensure([], () => r(require('@/page/login/newpwd')), 'newpwd');
const Swiper = r => require.ensure([], () => r(require('@/page/mine/swiper')), 'swiper');
const Tip = r => require.ensure([], () => r(require('@/page/mine/tip')), 'tip');
const Cyk = r => require.ensure([], () => r(require('@/page/mine/cyk')), 'cyk');
const Jkfqxy1 = r => require.ensure([], () => r(require('@/page/mine/jkfqxy1')), 'jkfqxy1');
const Findpwd = r => require.ensure([], () => r(require('@/page/login/findpwd')), 'findpwd');
const Forgetpwd = r => require.ensure([], () => r(require('@/page/login/forgetpwd')), 'forgetpwd');
const Register = r => require.ensure([], () => r(require('@/page/login/register')), 'register');
const Fillcode = r => require.ensure([], () => r(require('@/page/login/fillcode')), 'fillcode');
const Setpwd = r => require.ensure([], () => r(require('@/page/login/setpwd')), 'setpwd');
const Xy = r => require.ensure([], () => r(require('@/page/login/xy')), 'xy');
const Channel = r => require.ensure([], () => r(require('@/page/channel/channel')), 'channel');
const Follow = r => require.ensure([], () => r(require('@/page/channel/follow')), 'follow');
const Login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const Home = r => require.ensure([], () => r(require('@/page/home/home')), 'home');
const Extension = r => require.ensure([], () => r(require('@/page/extension/extension')), 'extension');
const Jpfq = r => require.ensure([], () => r(require('@/page/more/jpfq')), 'jpfq');
const jpfqDetail = r => require.ensure([], () => r(require('@/page/more/jpfq-detail')), 'jpfqDetail');
const BankDetail = r => require.ensure([], () => r(require('@/page/mine/bank-detail')), 'bankDetail');
const GoodsDetails = r => require.ensure([], () => r(require('@/page/h5/goodsDetail')), 'goodsDetails');
const MyCard = r => require.ensure([], () => r(require('@/page/mine/mycard')), 'mycard');
const OnLineOrder = r => require.ensure([], () => r(require('@/page/order/online-order')), 'onlineorder');
const PayMent = r => require.ensure([], () => r(require('@/page/more/payment')), 'payment');
const Search = r => require.ensure([], () => r(require('@/page/more/search')), 'search');
const WxPay = r => require.ensure([], () => r(require('@/page/order/wxpay')), 'wxpay');
const PaySuccess = r => require.ensure([], () => r(require('@/page/order/paysuccess')), 'paysuccess');
const PayError = r => require.ensure([], () => r(require('@/page/order/payerror')), 'payerror');
const ShoppingMall = r => require.ensure([], () => r(require('@/page/mine/shoppingmall')), 'shoppingmall');
const Stages = r => require.ensure([], () => r(require('@/page/mine/stages')), 'stages');
const ComfirmGoods = r => require.ensure([], () => r(require('@/page/order/comfirm-goods')), 'comfirmGoods');
const Demo = r => require.ensure([], () => r(require('@/page/detail')), 'demo');

const H5help = r => require.ensure([], () => r(require('@/page/h5/help')), 'h5help');
const H5ShoppingMall = r => require.ensure([], () => r(require('@/page/h5/shoppingmall')), 'h5shoppingmall');
const H5Stages = r => require.ensure([], () => r(require('@/page/h5/stages')), 'h5stages');
const H5Jkfqxy1 = r => require.ensure([], () => r(require('@/page/h5/jkfqxy1')), 'h5Jkfqxy1');
const H5Jkfqxy = r => require.ensure([], () => r(require('@/page/h5/jkfqxy')), 'h5Jkfqxy');
const H5xy = r => require.ensure([], () => r(require('@/page/h5/xy')), 'h5xy');
const H5Messdetails = r => require.ensure([], () => r(require('@/page/h5/messdetails')), 'h5Messdetails');

export default new Router({
    routes: [
        { path: '*',redirect: '/home'}, 
        { path:"/demo",name:"demo",meta: { title: "demo" },component:Demo },
        { path:"/goodsDetails",name:"goodsDetails",meta: { title: "商品详情" },component:GoodsDetails },
        {
            path: '/home',
            name: 'home',
            meta: { title: "淘花宅" },
            component: Home,
            children: [
                { path: '/home/sale', name: 'sale', meta: { title: "换钱" }, component: Sale,
                    children : [
                        { path: '/home/hmyCard', name: 'hmyCard', meta: { title: "我的银行卡" }, component: MyCard,
                            children : [
                                { path: '/home/mycard/haddcard', name: 'haddcard', meta: { title: "添加银行卡" }, component: Mbankcard}
                            ]
                        }
                    ]
                },
                { path: '/home/onlineorder', name: 'onlineorder', meta: { title: "在线支付订单" }, component: OnLineOrder,
                    children : [
                        { path: '/onlineorder/order-detail', name: 'onlineorderDetail', meta: { title: "订单详情" }, component:OrderDetail,
                            children : [
                                 { path: '/onlineorder/refund', name: 'onlineorderrefund', meta: { title: "申请退款" }, component: Refund, 
                                    children : [
                                        { path: '/onlineorder/refund/success', name: 'onlineordersuccess', meta: { title: "申请退款" }, component: Success }
                                    ]
                                },
                                { path: '/home/onlineorder/logistics', name: 'onlinelogistics', meta: { title: "物流详情" }, component: Logistics,
                                    children : [
                                        { path: '/home/onlineorder/prosuccess', name: 'onlineprosuccess', meta: { title: "物流申请退款" }, component: Prosuccess }
                                    ]
                                },
                                { path: '/home/order/onlinesuccess', name: 'onlinesuccess', meta: { title: "订单支付成功" }, component: Success },
                                { path: '/order/detail/comfirmgoods', name: 'detailcomfirmgoods', meta: { title: "收货成功" }, component: ComfirmGoods }
                            ]
                        },
                        { path: '/order/comfirmgoods', name: 'comfirmgoods', meta: { title: "收货成功" }, component: ComfirmGoods }
                    ]
                },
                { path: '/home/mycard', name: 'myCard', meta: { title: "我的银行卡" }, component: MyCard,
                    children : [
                        { path: '/home/mycard/addcard', name: 'addcard', meta: { title: "添加银行卡" }, component: Mbankcard}
                    ]
                },
                { path: '/home/jpfq', name: 'jpfq', meta: { title: "精品分期" }, component: Jpfq,
                    children : [
                        { path: '/home/jpfq/detail', name: 'jpfqDetail', meta: { title: "分期介绍" }, component: jpfqDetail },
                        { path: '/home/jpfq/goods/detail', name: 'jpfq-goods-detail', meta: { title: "商品详情" }, component: GoodsDetail}
                    ]
                },
                { path: '/home/payment', name: 'pay-ment', meta: { title: "支付优选" }, component: PayMent},
                { path: '/home/search', name: 'search', meta: { title: "淘花宅" }, component: Search },
                { path: '/home/sale/complete', name: 'complete', meta: { title: "换钱" }, component: Complete },
                { path: '/home/kefu', name: 'kefu', meta: { title: "联系客服" }, component: Kefu},
                { path: '/addcard', name: 'addBankCard', meta: { title: "银行卡" }, component:Mbankcard },
                { path: '/home/shouhou', name: 'shouhou', meta: { title: "售后客服" }, component: Shouhou},
                { path: '/home/help', name: 'help', meta: { title: "帮助中心" }, component: Help,
                    children : [
                        { path: '/home/help/shoppingmall', name: 'shoppingmall', meta: { title: "商城问题" }, component: ShoppingMall,
                            children : [
                                { path: '/home/shoppingmall/kefu', name: 'shoppkefu', meta: { title: "联系客服" }, component: Kefu }
                            ]
                        },
                        { path: '/home/help/stages', name: 'stages', meta: { title: "分期购问题" }, component: Stages,
                            children : [
                                { path: '/home/stages/kefu', name: 'stageskefu', meta: { title: "联系客服" }, component: Kefu }
                            ]
                        },
                        { path: '/home/help/kefu', name: 'hkefu', meta: { title: "联系客服" }, component: Kefu }
                    ]
                },
                { path: '/home/progress', name: 'progress', meta: { title: "分期进度" }, component: Progress},
                { path: '/jkfqxy', name: 'jkfqxy', meta: { title: "借分期分期协议" }, component: Jkfqxy},
                { path: '/home/fail', name: 'fail', meta: { title: "我的资料" }, component: Fail},
                { path: '/home/staging', name: 'staging', meta: { title: "分期记录" }, component: Staging,
                    children : [
                        { path: '/home/fqzd', name: 'fqzd', meta: { title: "分期详情" }, component: StagingBill,
                            children : [
                                {
                                    path: '/repay',
                                    name: 'repay',
                                    meta: { title: "还款" },
                                    component: Repayment,
                                    children:[
                                        { path: '/repay/bankcard', name: 'bankcard', meta: { title: "还款" }, component: Bankcard}
                                    ]
                                },
                                {
                                    path: '/early-repay',
                                    name: 'earlyRepay',
                                    meta: { title: "提前还款" },
                                    component: EarlyRepay,
                                    children:[
                                        { path: '/early-repay/bankcard', name: 'ebankcard', meta: { title: "提前还款" }, component: Bankcard}
                                    ]
                                },
                                { path: '/home/staging/jkfqxy', name: 'sjkfqxy', meta: { title: "借分期分期协议" }, component: Jkfqxy}
                            ]
                        }
                    ]
                },
                { path: '/home/transaction', name: 'transaction', meta: { title: "交易记录" }, component: Transaction,
                    children : [
                        { path: '/paydetails', name: 'paydetails', meta: { title: "交易详情" }, component: Paydetails }
                    ]
                },
                { path: '/home/shipping-address', name: 'shippingAddress', meta: { title: "收货地址" }, component: ShippingAddress,
                    children : [
                        { path: '/add-address', name: 'addAddress', meta: { title: "新增收货地址" }, component: AddAddress },
                        { path: '/edit-address', name: 'editAddress', meta: { title: "编辑收货地址" }, component: AddAddress }
                    ]
                },
                { path: '/home/aboutus', name: 'aboutus', meta: { title: "关于我们" }, component: Aboutus },
                { path: '/home/dropout', name: 'dropout', meta: { title: "安全设置" }, component: Dropout,
                   children : [
                     { path: '/makepwd', name: 'makepwd', meta: { title: "修改密码" }, component: Makepwd }
                   ]
                },
                { path: '/home/order', name: 'order', meta: { title: "购买订单列表" }, component: Order,
                    children : [
                        { path: '/home/order/order-detail', name: 'orderDetail', meta: { title: "订单详情" }, component:OrderDetail, 
                            children:[
                                { path: '/refund', name: 'refund', meta: { title: "申请退款" }, component: Refund, 
                                    children : [
                                        { path: '/success', name: 'success', meta: { title: "申请退款" }, component: Success }
                                    ]
                                },
                                { path: '/home/logistics', name: 'logistics', meta: { title: "物流详情" }, component: Logistics,
                                    children : [
                                        { path: '/prosuccess', name: 'prosuccess', meta: { title: "物流申请退款" }, component: Prosuccess }
                                    ]
                                },
                                { path: '/home/order/order-detail/kefu', name: 'orderkefu', meta: { title: "联系客服" }, component: Kefu },
                                { path: '/order/success', name: 'ordersuccess', meta: { title: "申请退款" }, component: Success }
                            ]
                        },
                        { path: '/home/order/progress', name: 'oprogress', meta: { title: "分期进度" }, component: Progress}

                    ]
                },
                { path: '/home/msg', name: 'msg', meta: { title: "消息中心" }, component: Msg,
                    children:[
                        { path: '/home/msg/detail', name: 'msgDetail', meta: { title: "消息详情" }, component: Detail }
                    ]
                },
                { path: '/home/goods-detail', name: 'goods-detail', meta: { title: "商品详情" }, component: GoodsDetail,
                    children : [
                        { path: '/home/jpfq/goods/detail/kefu', name: 'jpfqkefu', meta: { title: "联系客服" }, component: Kefu },
                        { path: '/home/address', name: 'orderAddress', meta: { title: "收货地址" }, component: ShippingAddress },
                        { path: '/home/goods/detail/wxpay', name: 'fwxpay', meta: { title: "支付订单" }, component: WxPay,
                            children : [
                                { path: '/wxpay/success', name: 'paysuccess', meta: { title: "订单支付成功" }, component: PaySuccess },
                                { path: '/wxpay/error', name: 'payerror', meta: { title: "订单支付失败" }, component: PayError }
                            ]
                        }
                    ]
                },
                { path: '/home/userinfolist', name: 'userinfolist', meta: { title: "激活淘花宅分期" }, component: Userinfolist,
                    children : [
                        { path: '/person', name: 'person', meta: { title: "个人信息" }, component: Person,
                            children : [
                                { path: '/idCard', name: 'idCard', meta: { title: "身份信息" }, component: Idcard },
                                { path: '/person/amap', name: 'pamap', meta: { title: "居住地址" }, component: Amap }
                            ]   
                        },
                        { path: '/work', name: 'work', meta: { title: "工作信息" }, component: Work,
                            children : [
                                { path: '/amap', name: 'amap', meta: { title: "公司地址" }, component: Amap }
                            ] 
                        },
                        { path: '/mbankcard', name: 'mbankcard', meta: { title: "银行卡" }, component: Mbankcard},
                        { path: '/mbankcardlist', name: 'mbankCardList', meta: { title: "银行卡" }, component: Mbankcardlist},
                        { path: '/bankDetail', name: 'bankDetail', meta: { title: "收款银行卡" }, component: BankDetail},
                        { path: '/contacts', name: 'contacts', meta: { title: "联系人信息" }, component: Contacts },
                        { path: '/userphoto', name: 'userphoto', meta: { title: "人脸识别" }, component: Userphoto },
                        { path: '/usermobile', name: 'usermobile', meta: { title: "手机认证" }, component: Usermobile,
                          children : [
                                { path: '/newpwd', name: 'newpwd', meta: { title: "服务密码" }, component: Newpwd,
                                   children : [
                                        { path: '/swiper', name: 'swiper', meta: { title: "打电话服务密码" }, component: Swiper } 
                                    ] 
                                }
                           ]   
                        },
                        { path: '/tip', name: 'tip', meta: { title: "激活淘花宅分期" }, component: Tip},
                        { path: '/cyk', name: 'cyk', meta: { title: "常用卡认证" }, component: Cyk},
                        { path: '/jkfqxy1', name: 'jkfqxy1', meta: { title: "借分期分期协议" }, component: Jkfqxy1}
                    ]
                }
            ]
        },
        {path: '/login',name: 'login',meta: { title: "登录" },component: Login,
            children:[
                { path: '/login/findPwd', name: 'findPwd', meta: { title: "找回密码" }, component: Findpwd,
                    children : [
                        { path: '/login/findPwd/forgetpwd', name: 'forgetpwd', meta: { title: "忘记密码" }, component: Forgetpwd}
                    ]
                },
                { path: '/login/register', name: 'register', meta: { title: "手机注册" }, component: Register,
                    children:[
                        { path: '/login/fillcode', name: 'fillCode', meta: { title: "手机注册" }, component: Fillcode,
                            children : [
                                { path: '/login/fillcode/loginSetpwd', name: 'loginToSetpwd', meta: { title: "设置密码" }, component: Setpwd }
                            ]   
                        },
                        { path: '/login/register/xy', name: 'xy', meta: { title: "注册协议" }, component: Xy } 
                    ]
                }
            ]
        },
        {path: '/channel', name: 'channel', meta: { title: "淘花宅" }, component: Channel,
            children : [
                { path: '/channel/xy', name: 'channelXy', meta: { title: "注册协议" }, component: Xy }, 
                { path: '/channel/follow', name: 'channelFollow', meta: { title: "淘花宅" }, component: Follow } 
            ]   
        },
        { path: '/extension', name: 'extension', meta: { title: "淘花宅" }, component: Extension }, 
        { path: '/help', name: 'h5help', meta: { title: "帮助中心" }, component: H5help,
            children : [
                { path: '/help/shoppingmall', name: 'helpShoppingMall', meta: { title: "商城问题" }, component: H5ShoppingMall},
                { path: '/help/stages', name: 'helpStages', meta: { title: "分期购问题" }, component: H5Stages }
            ]
        }, 
        {
             path: '/toOrder',
             redirect: '/home/order'
        },
        { path: '/h5/jkfq/1', name: 'h5Jkfqxy1', meta: { title: "借分期分期协议" }, component: H5Jkfqxy1 },
        { path: '/h5/jkfq/2', name: 'h5Jkfqxy', meta: { title: "借分期分期协议" }, component: H5Jkfqxy },
        { path: '/h5/xy', name: 'h5xy', meta: { title: "注册协议" }, component: H5xy },
        { path: '/h5/messdetails', name: 'messdetails', meta: { title: "详情" }, component: H5Messdetails }
    ]
})