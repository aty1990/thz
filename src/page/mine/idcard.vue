<template>
    <transition name="move">
    <div class="page-animate page-idcard">
        <v-header>
            <mt-header title="身份信息">
                <div slot="left">
                    <mt-button  icon="back" @click.native="toBack"></mt-button>
                </div>
                
            </mt-header>
        </v-header>
        <div class="wapper">
            <div class="flex pd-all-10 ">
                <section class="grow flex card-box prev">
                    <div class="card-box-wrap">
                        <span class="prev-top">{{prevDesc}}</span> 
                        <i class="icon-camera scale-4 mgt-6"></i>
                        <input type="file" class="upload-file" id="front" accept="image/*" capture="camera"  @change="imagePreview($event)"/>
                        <img v-show="paramsObj.frontIcon" :src="paramsObj.frontIcon" class="front-icon" height="100px" width="100%">
                    </div>
                </section>
                <section class="grow flex card-box after">
                    <div class="card-box-wrap">
                        <span class="after-top">{{afterDesc}}</span> 
                        <i class="icon-camera  scale-4 mgt-6"></i>
                        <input type="file" class="upload-file" id="back" accept="image/*" capture="camera" @change="imagePreview($event)"/>
                        <img v-show="paramsObj.backIcon" :src="paramsObj.backIcon" class="front-icon" height="100px" width="100%">
                    </div>
                </section>
            </div>
            <div class="white-bg pdl-16">
            	<div class="input has-bottom-border" >
					<p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</p>
					<input type="text" class="user_name" v-model="paramsObj.id_name" :disabled="!editFlag"  style="width: 50%;color:#000;" @input="verfiy">
					<div class="edit" v-show="editFlag">
						<img src="/thz/static/icon_edit@2x.png" style="width: 12px;margin-left: 30px;" />
					</div>
				</div>
               <div class="input has-bottom-border">
                    <p>身份证号</p>
                    <p type="text" disabled="disabled" class="input_p user_number">{{paramsObj.id_number}}</p>
                </div>
                <div class="input">
                    <p>户籍地址</p>
                    <p disabled="disabled" class="input_p user_address" style="width: 70%;">{{paramsObj.cardAddr}}</p>
                </div>
            </div>
            <div class="pdl-10">
                <p class="gray-font font-size-10 mgt-10">友情提示：</p>
                <p class="gray-font font-size-10 mgt-4">1.请完善真实身份信息，确保资金能提现到本人的银行卡；</p>
                <p class="gray-font font-size-10 mgt-4">2.请认真核对自动识别结果，如相关信息有误请点击重拍。</p>
            </div>
            <div class="button-wrap mgt-20" v-if="paramsObj.rnAuth == '0'">
                <mt-button type="primary" size="large" :disabled="btnState" @click="saveUserInfo">保存</mt-button>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import Vue from 'vue'
    import api from '@/fetch/api'
    import {listenField} from '@/assets/js/tool'
    require("@/assets/js/lrz.all.bundle")
    export default {
        components: { VHeader },
        data() {
            return {
                userInfo : "",
                btnState : true,
                editFlag : false,
                prevDesc : "点击开始识别身份证人像面",
                afterDesc : "点击开始识别身份证国徽面",
                paramsObj:{
                    id_name : "",
                    id_number : "",
                    userBirth : "",
                    cardAddr : "",
                    nation : "",
                    userSex : "",
                    frontIcon : "",
                    backIcon : "",
                    rnAuth:""
                },
                package_session_id:"",
                validity_period : "",
                issuing_authority : ""
            }
        },
        mounted(){
            var index=1;
            if(sessionStorage.getItem("person") && (sessionStorage.getItem("person")=="1" || sessionStorage.getItem("person")=="2")){
                $(".edit").remove();
            }else{
                $(".edit").on("click", function() {
                    if(index++%2==1){
                      $(".user_name").removeAttr("disabled");
                      $(".user_name").focus();
                    }else{
                      $(".user_name").attr("disabled","disabled");
                      $(".user_name").blur();
                    }
                })
            }
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            window.$http = Vue.prototype.$http = api.http;
            this.initData();
        },
        methods : {
            toBack(){
                this.$router.back();
            },
            verfiy(){
                this.btnState = listenField([
                    {value:this.paramsObj.id_name,type:"text"},
                    {value:this.paramsObj.backIcon,type:"text"}
                ])
            },
            initData(){
                let _self = this;
                api.detailUserInfo({userId:this.userInfo.userId}).then(res=>{
                    if(res.code=="200"){
                        if(_self.paramsObj.id_name){
                            _self.editFlag = true;
                        }
                        _self.paramsObj.frontIcon = res.body.idCardFront?res.body.idCardFront+"?v="+Date.now():"";
                        _self.paramsObj.backIcon = res.body.idCardBack?res.body.idCardBack+"?v="+Date.now():"";
                        _self.paramsObj.id_name  = res.body.userName;
                        _self.paramsObj.id_number  = res.body.userCard;
                        _self.paramsObj.cardAddr  = res.body.cardAddr;
                        _self.paramsObj.rnAuth=res.body.rnAuth;
                        _self.prevDesc  = "身份证正面";
                        _self.afterDesc  = "身份证反面";
                        if(res.body.rnAuth != '0'){
                            $(".upload-file").attr("disabled","disabled")
                        }
                    }
                })
            },
            saveUserInfo(){
                let _self = this;
                this.btnState = true;
                api.submitidcard({
                    cardAddr : _self.paramsObj.cardAddr,
                    cardAuth : _self.issuing_authority?_self.issuing_authority:localStorage.getItem("cardAuth"),
                    cardPeriod : _self.validity_period?_self.validity_period:localStorage.getItem("cardPeriod"),
                    sessionId : _self.package_session_id?_self.package_session_id:localStorage.getItem("sessionId"),
                    userBirth : _self.paramsObj.userBirth?_self.paramsObj.userBirth:localStorage.getItem("userBirth"),
                    userCard  : _self.paramsObj.id_number,
                    userId    : _self.userInfo.userId,
                    userName  : _self.paramsObj.id_name,
                    userNation: _self.paramsObj.nation?_self.paramsObj.nation:localStorage.getItem("userNation"),
                    userSex : _self.paramsObj.userSex?_self.paramsObj.userSex:localStorage.getItem("userSex")
                }).then(res=>{
                    layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2
                        ,end:function(){
                            if(res.code=="200"){
                                _self.$parent.loadData();
                                _self.toBack();
                            }
                        }
                    }); 
                })
            },
            imagePreview(e){
                var _self = this;
                //var maxsize = 3 * 1024 * 1024;   //2M
                if(!$(e.target).val())return;
                $("body").Loading('show');
                lrz(e.target.files[0],{width:800})
                .then(function (rst) {
                    _self.toYs(e,rst.base64.slice(rst.base64.indexOf(",")+1));
                })
                .catch(function (err) {
                    // 处理失败会执行
                    layer.open({
                        content: "图片处理失败"
                        ,skin: 'msg'
                        ,time: 4 //4秒后自动关闭
                    });
                });
            },
            toYs(e,base64){
                var _self = this;
                var formData = new FormData() // FormData 对象
                formData.append('files', e.target.files[0]);
                formData.append('base64', base64);
                let _url = "/thz/credit/veridfront"
                    ,id = e.target.id;
                if(id=="back" && e.target.files.length>0){
                    if(!_self.paramsObj.id_name){
                        $("body").Loading('hide');
                        layer.open({
                            content: "请先上传身份证正面"
                            ,skin: "msg"
                            ,time: 2
                        });
                        return; 
                    }
                    _url = "/thz/credit/veridback";
                    formData.append("sessionId", _self.package_session_id);
                }
                formData.append("userId", _self.userInfo?_self.userInfo.userId:"");
                this.$http.post(_url, formData, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: [function (data) {
                        return data
                    }],
                    onUploadProgress: function(e) {
                        let percentage = Math.round((e.loaded * 100) / e.total) || 0
                    }
                }).then((response) => {
                    if(response.data.code=="200"){
                        _self.editFlag = true;
                        if(id=="back"){
                            _self.btnState=false;
                        }
                        let data = response.data.body;
                        if(id=="front"){
                            _self.paramsObj.id_name = data.id_name;
                            _self.paramsObj.id_number = data.id_number;
                            _self.paramsObj.userBirth = data.birthday;
                            _self.paramsObj.userSex = data.gender;
                            _self.paramsObj.nation = data.nation;
                            _self.paramsObj.cardAddr = data.address;
                            _self.paramsObj.frontIcon = response.data.url+"?v="+Date.now();
                            _self.package_session_id = data.package_session_id;

                            localStorage.setItem("userSex",data.gender);
                            localStorage.setItem("userNation",data.nation);
                            localStorage.setItem("sessionId",data.package_session_id);
                            localStorage.setItem("userBirth",data.birthday);
                        }else{
                            _self.validity_period = data.validity_period;
                            _self.issuing_authority = data.issuing_authority;
                            _self.paramsObj.backIcon = response.data.url+"?v="+Date.now();
                            localStorage.setItem("cardPeriod",data.validity_period);
                            localStorage.setItem("cardAuth",data.issuing_authority);
                        }
                        $("body").Loading('hide');
                        layer.open({
                            content: response.data.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }else if(response.data.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _self.$router.push("/login")
                        }
                    }else{
                        $("body").Loading('hide');
                        layer.open({
                            content: response.data.msg?response.data.msg:"识别失败，请调整拍摄角度"
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                }).catch(function (error) {
                    $("body").Loading('hide');
                    layer.open({
                        content: "识别失败，请调整拍摄角度"
                        ,skin: 'msg'
                        ,time: 2
                    });
                })    
            }
        }
    }
</script>
<style lang="scss">
    .page-idcard{
        .card-box{
            height: 130px;
            margin: 5px;
            border-radius: 4px;
            position: relative;
            text-align: center;
            font-size: 12px;
            color:#fff;
            overflow: hidden;
            padding-top: 24px;
            background: url("/thz/static/sprity/front.png") center no-repeat;
            background-size: 60%; 
            background-position: 50% 70%;
            &:after{
                content: "";
                position: absolute;
                top:30px;
                right: 0;
                width: 100%;
                height: 100%;
                background-position: 50% 60%;
                background-color: rgba(0,0,0,0.5);
                background-size: 60%; 
                z-index: 0;
            } 
        }
        .after{
            background: url("/thz/static/sprity/back.png") center no-repeat;
            background-size: 60%; 
            background-position: 50% 70%;
        }
        .card-box-wrap{
            width: 100%;
            height: 100%;
            position: absolute;
            left:0;
            top:0;
            overflow: hidden;
            z-index: 2;
            padding-top: 30px;
        }
        .prev-top{
            position: absolute;
            line-height: 30px;
            width: 100%;
            top:0;
            left: 0;
            background: #F87C7C; 
            border-top-right-radius: 4px;           
            border-top-left-radius: 4px;    
            z-index: 10;       
        }
        .input {
            font-size: 15px;
            padding: 5px 15px;
            min-height: 1.9em;
            display: flex;
            padding: 15px;
            color:#000;
        }
        .has-bottom-border{
            position: relative;
            &:after{
                position: absolute; 
                background: #D9D9D9;
                content: "";
                height: 1px;
                width: 100%;
                bottom: 0;
                right:0;
                z-index: 2;
                transform:scaleY(0.5); 
            }
        }
        .input p {
            width: 30%;
        }
        
        .input input {
            float: left;
            width: 70%;
            color: #000;
            background: rgba(0, 0, 0, 0);
            border: none;
            outline: none;
        }

        .after-top{
            position: absolute;
            line-height: 30px;
            width: 100%;
            top:0;
            left: 0;
            background: #F87C7C; 
            border-top-right-radius: 4px;           
            border-top-left-radius: 4px; 
            z-index: 10;                
        }
        .user-name{
            letter-spacing: 27px;
        }
        .upload-file{
            position: absolute;
            top:0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            z-index: 10;
        }
        .front-icon{
            position: absolute;
           
            left: 0;
            width: 100%;
           
            z-index: 9;
        }
        textarea:disabled{
            background: #fff;
        }

        input:disabled, 
        textarea:disabled {
            color: #000;
        }
    }
</style>