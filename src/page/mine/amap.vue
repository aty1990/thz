<template>
    <transition name="move">
        <div class="page-animate page-amap">
            <v-header>
                <mt-header :title="title">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div id="container" tabindex="0"></div>
                <div class='search-box flex'>
                    <input id="tipinput" placeholder="请输入关键字" class="mgr-10 grow mgl-10" />
                    <a class="sure-btn" @click="ok">确定</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import VHeader from '@/components/header'
    import * as utils from '@/assets/js/tool'
    export default {
        components: {VHeader},
        data () {
            return {
                address : "",
                title : sessionStorage.getItem("title")
            }
        },
        mounted(){
            var _self = this;
            // 初始化化地图并获取地理位置
            utils.initMap({
                input : "tipinput",
                callback : function(result){}
            });
        },
        methods : {
            toBack(){
                this.$router.back();
            },
            ok(){
                if($("#tipinput").val() && localStorage.getItem("citycode")!="") {
                    this.$parent.paramsObj.address = $("#tipinput").val();
                    this.$parent.telPrix = localStorage.getItem("citycode");
                    this.toBack();
                }else{
                    layer.open({
                        content: "请选择居住地址"
                        ,skin: 'msg'
                        ,time: 2
                    });
                }
            }
        }
    }
</script>
<style lang="scss">
    .page-amap{
        #container{
            height: 100%;
            margin: 0px;
        }
        .search-box{
            position: fixed;
            width: 100%;
            background: #fff;
            height: 40px;
            line-height: 40px;
            text-align: center;
            top:40px;
            left: 0;
            z-index: 9999999;
            input{
                padding: 3px;
                outline: none;
                border:none;
            }
            .sure-btn{
                width: 80px;
                height: 100%;
                background: #F45051;
                color:#Fff;
            }
        }
    }
</style>

