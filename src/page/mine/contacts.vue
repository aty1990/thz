<template>
    <transition name="move">
        <div class="page-animate page-contacts">
            <v-header>
                <mt-header title="联系人信息">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper contacts-wrap">
                <p class="top"><span style="margin-left: 10px;">直系联系人</span></p>
                <div class="pdl-16 white-bg">
                   <div class="bk-input-wrap flex has-after" @click="contact(1)" >
                        <span class="label">关系</span>
                        <input type="text" placeholder="请选择与本人关系"  v-model="paramsObj.item1Text" disabled style="color:#000;">
                        <img src="/thz/static/href.png" width="20px" class="mgr-6">
                    </div>
                    <div class="bk-input-wrap flex has-after" >
                        <span class="label">姓名</span>
                        <input type="text" placeholder="请填写联系人姓名"  v-model="paramsObj.name1" maxlength="10">
                        <i class="icon-close"  @click="clearText('name1')" v-show="paramsObj.name1.length>0"></i>
                    </div>
                    <div class="bk-input-wrap flex" >
                        <span class="label">电话</span>
                        <input type="tel" placeholder="请填写联系人电话" v-model="paramsObj.tel1">
                        <i class="icon-close" @click="clearText('tel1')" v-show="paramsObj.tel1.length>0"></i>
                    </div>
                </div>
    			<p class="top"><span style="margin-left: 10px;">其他联系人</span></p>
                <div class="pdl-16 white-bg">
                    <div class="bk-input-wrap flex has-after"  @click="contact(2)" >
                        <span class="label">关系</span>
                        <input type="text" placeholder="请选择与本人关系"  v-model="paramsObj.item2Text" disabled>
                        <img src="/thz/static/href.png" width="20px" class="mgr-6">
                    </div>
                    <div class="bk-input-wrap flex has-after" >
                        <span class="label">姓名</span>
                        <input type="text" placeholder="请填写联系人姓名" v-model="paramsObj.name2"  maxlength="10">
                        <i class="icon-close"  @click="clearText('name2')" v-show="paramsObj.name2.length>0"></i>
                    </div>
                    <div class="bk-input-wrap flex" >
                        <span class="label">电话</span>
                        <input type="tel" placeholder="请填写联系人电话" v-model="paramsObj.tel2">
                        <i class="icon-close" @click="clearText('tel2')" v-show="paramsObj.tel2.length>0"></i>
                    </div>

                </div>
    			<p class="small_header">我们不会以借款名义拨打联系人电话，请放心填写。</p>
    			<div class="button-wrap mgt-20 savecontacts">
    				<mt-button type="primary" size="large" :disabled="saveBtn"  @click.stop="save">保存</mt-button>
    			</div>
                <!-- 发薪日期控件 begin -->
                <vue-pickers :show="items1Flg" :selectData="items1" v-on:cancel="close" v-on:confirm="confirmFn"></vue-pickers>
                <div class="mask" v-show="items1Flg"></div>
                <!-- 发薪日期控件 end -->
                 <!-- 发薪日期控件 begin -->
                <vue-pickers :show="items2Flg" :selectData="items2" v-on:cancel="close" v-on:confirm="confirmFn"></vue-pickers>
                <div class="mask" v-show="items2Flg"></div>
                <!-- 发薪日期控件 end -->
            </div>
        </div>
    </transition>
</template>

<script>
    import VHeader from '@/components/header'
    import VuePickers from 'vue-pickers'
    import {listenField} from '@/assets/js/tool'
    import api from '@/fetch/api'
    export default {
        components: {VHeader,VuePickers},
        data () {
            return {
            	saveBtn: true,
                items1Flg : false,
                items2Flg : false,
                currentIdx : 0,
                relationShip1Id : "",
                relationShip2Id : "",
                paramsObj : {
                    item1Text : "", 
                    item2Text : "",
                    name1 : "",
                    tel1 : "",
                    name2 : "",
                    tel2 : ""
                },
                items1: {
                    columns: 1,
                    pData1: []
                },
                items2: {
                    columns: 1,
                    pData1: []
                }
            }
        },
        mounted(){
            let _self = this;
            this.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
            if(sessionStorage.getItem('contact') == '2'){
				$(".savecontacts").hide();				
				$(".bk-input-wrap").find("input").attr("disabled","disabled");				
				$('.bk-input-wrap input[disabled]').css("-webkit-text-fill-color","#000")
				$('.bk-input-wrap input[disabled]').css("opacity","1");
                $(".contacts-wrap .icon-close").remove();
			}
            api.detailContact({userId:this.userId}).then(res=>{
            	if(res.code == 200){
	                _self.paramsObj.item1Text = res.body.relationShip1;
	                _self.paramsObj.item2Text = res.body.relationShip2;
	                _self.paramsObj.name1 = res.body.relationName1;
	                _self.paramsObj.name2 = res.body.relationName2;
	                _self.paramsObj.tel1 = res.body.relationMob1;
	                _self.paramsObj.tel2 = res.body.relationMob2;
	                _self.relationShip1Id = res.body.relationShip1Id;
	                _self.relationShip2Id = res.body.relationShip2Id;

                    if(Math.floor(sessionStorage.getItem("contact"))==1){
                        setTimeout(()=>{
                            _self.saveBtn = true;
                        },50)
                    }
                }else if(res.code=="111"){
                    // 判断安卓和微信
                    if(!sessionStorage.getItem("term")){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _self.$router.push("/login")
                        }
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

            api.selectinfo({type:"100004"}).then(res=>{
                _self.items1.pData1 = [];
                $.each(res.body,function(i,ele){
                    _self.items1.pData1.push({text: ele.value,value: ele.key});
                })
            })
            api.selectinfo({type:"100005"}).then(res=>{
                _self.items2.pData1 = [];
                $.each(res.body,function(i,ele){
                    _self.items2.pData1.push({text: ele.value,value: ele.key});
                })
            })
        },
        watch : {
            paramsObj : {
                handler(newValue, oldValue) {
                    if(newValue.tel1.length>11){
                        this.paramsObj.tel1 = this.paramsObj.tel1.slice(0, 11);
                    }
                    if(newValue.tel2.length>11){
                        this.paramsObj.tel2 = this.paramsObj.tel2.slice(0, 11);
                    }
        　　　　　　this.lst();
        　　　　},
        　　　　deep: true
            }
        },
        methods : {
            toBack(){
                this.$router.back();
            },
            contact(type){
            	let _this=this;
                $(".contacts-wrap input:eq(0)").blur();
            	if(sessionStorage.getItem('contact') != '2'){
	            	if(type == 1){
	            		_this.items1Flg = true;
                        setTimeout(()=>{
                            $(".contacts-wrap .area_province").attr("top",this.provinceOne).css({"-webkit-transform":"translate3d(0,"+this.provinceOne+",0)"});
                            $(".contacts-wrap .area_city").attr("top",this.cityOne).css({"-webkit-transform":"translate3d(0,"+this.cityOne+",0)"});
                            $(".contacts-wrap .area_county").attr("top",this.countyOne).css({"-webkit-transform":"translate3d(0,"+this.countyOne+",0)"});
                        },100)
	            	}else{
	            		_this.items2Flg = true;
                        setTimeout(()=>{
                            $(".contacts-wrap .area_province").attr("top",this.provinceTwo).css({"-webkit-transform":"translate3d(0,"+this.provinceTwo+",0)"});
                            $(".contacts-wrap .area_city").attr("top",this.cityTwo).css({"-webkit-transform":"translate3d(0,"+this.cityTwo+",0)"});
                            $(".contacts-wrap .area_county").attr("top",this.countyTwo).css({"-webkit-transform":"translate3d(0,"+this.countyTwo+",0)"});
                        },100)
	            	}
	                _this.currentIdx = type;
                }
            },
            clearText(text){
                this.paramsObj[text] = "";
            },
            close(){
        		this.items1Flg = false;
        		this.items2Flg = false;
            },
            confirmFn(e){
                if(this.currentIdx==1){
                    this.paramsObj.item1Text = e['select1'].text;
                    this.relationShip1Id = e['select1'].value;
                    this.provinceOne = $(".contacts-wrap .area_province").attr("top");
                    this.cityOne = $(".contacts-wrap .area_city").attr("top");
                    this.countyOne = $(".contacts-wrap .area_county").attr("top");
                }else{
                    this.paramsObj.item2Text = e['select1'].text;
                    this.relationShip2Id = e['select1'].value;
                    this.provinceTwo = $(".contacts-wrap .area_province").attr("top");
                    this.cityTwo = $(".contacts-wrap .area_city").attr("top");
                    this.countyTwo = $(".contacts-wrap .area_county").attr("top");
                }
                this.close();
            },
            lst(){
                this.saveBtn = listenField([
                    {value:this.paramsObj.item1Text,type:"text"},
                    {value:this.paramsObj.item2Text,type:"text"},
                    {value:this.paramsObj.name1,type:"text"},
                    {value:this.paramsObj.name2,type:"text"},
                    {value:this.paramsObj.tel1,type:"phone"},
                    {value:this.paramsObj.tel2,type:"phone"}
                ])
            },
            save(){
                let _self = this;
                let params = {
                    relationMob1: this.paramsObj.tel1,
                    relationMob2: this.paramsObj.tel2,
                    relationName1: this.paramsObj.name1,
                    relationName2: this.paramsObj.name2,
                    relationShip1: this.relationShip1Id,
                    relationShip2: this.relationShip2Id,
                    userId: this.userId
                };
                this.saveBtn = true;
                api.insertUserContactList(params).then(res=>{
                    layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2,
                        end : function(){
                            if(res.code=="200"){
                                _self.$parent.loadData();
                                _self.toBack();
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
    .page-contacts{
        .contacts-wrap{
            overflow-y:auto; 
        }
    	input{
    		background: rgba(0,0,0,0);
    	}
       .contact-left{
       	    float: left;
       	    margin: 15px 10px 15px 10px;
       }
       .li-item {
	       padding: 15px 0;
	    }
       .grow{
       	    color: #999;
       }
       .li-item:after{
       	    border: none;
       }
       .bk-input-wrap{
       	    border-bottom: none;
       	    padding: 5px 0;
            position: relative;
       }
       .has-after{
            &:after{
                content: "";
                position: absolute;
                width: 100%;
                height: 1px;
                bottom:0;
                left: 0;
                background: #d9d9d9;
                transform:scaleY(0.5);    
            }
       }
       .top{
       	    margin:10px 0;
       	    line-height:25px;
       	    font-size: 14px;
       	    color: #000000;
       	    border-left:3px solid  rgb(74, 144, 226);
       }
       .small_header {
			color: #888;
			margin-left: 10px;
			margin: 10px;
			font-size: 12px;
		}
        .white-bg{
            background: #fff;
        }
        .mint-cell-wrapper{
        	border-bottom: 1px solid #f1f1f1;
        }
        .mint-cell-wrapper:last-child{
        	border: none;
        }
        .mint-field .mint-cell-title{
        	width: 50px;
        }
        input:disabled, textarea:disabled {
            color: #000;
        }
        .area_btn{
            font-size: 16px;
        }
    }
    input:disabled, input[disabled]{ 
        color: #000; 
        -webkit-text-fill-color:#000; 
        -webkit-opacity:1; 
        opacity: 1; 
    }
</style>

