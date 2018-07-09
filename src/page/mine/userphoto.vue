<template>
    <transition name="move">
        <div class="page-animate page-userphoto">
            <v-header>
                <mt-header title="人脸识别">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
	            <div v-show="state1">
	                <img src="/thz/static/rnsb.png" width="100%">
	                <div class="button-wrap mgt-20 sure_button">
	                    <mt-button type="primary" size="large"  @click="commit">
                            开始识别
                        </mt-button>  
                      <!--   <mt-button type="primary" size="large">
                         开始识别1
                         <input id="file" type="file" accept="/*" capture="camera" @change="imagePreview($event)" class="upload-btn">
                                             </mt-button>  -->
	                </div>
	            </div>
	             <div v-show="state" class="flex mgt-50 vertical">
                   <div class="img-box-wrap">
                       <img :src="pic_path" width="100%">
                   </div>
                   <p class="ok mgt-20 gray-font">人脸识别已完成</p>
               </div> 
            </div>
        </div>
    </transition>
</template>

<script>
    import VHeader from '@/components/header'
    import Vue from 'vue'
    import api from '@/fetch/api.js'
    export default {
        components: {VHeader},
        data () {
            return {
            	pic_path : "",
                state : false,
                state1:true
            }
        },
        mounted(){
        	let _self = this;
            this.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
        	//判断是否已近做过活体认证
        	api.submitlivingstat({userId:this.userId}).then(res=>{
        		if(res.code=="200"){
                    _self.pic_path = res.body.pic_path;
        			_self.state = res.body.pic_path?true:false;
        			_self.state1 = res.body.pic_path?false:true;
                    if(_self.state1){
                        window.$http = Vue.prototype.$http = api.http;
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
        },
        methods : {
            toBack(){
                this.$router.back();
            },
            commit(){
            	let _self = this;
            	var thisUrl = location.href.split('#')[0];
            	api.getWxSign({url:thisUrl}).then(res=>{
            		if(res.code=="200"){
                        _self.getWx(res);
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
            imagePreview(e){
                let _self = this;
                $("body").Loading('show');
                var formData = new FormData();
                if(!$.trim($('input[type="file"]').val())) {
                    return true;
                }
                formData.append("files", e.target.files[0]);
                formData.append("userId", this.userId);
                this.$http.post("/thz/credit/submitlivingwx", formData, {
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
                    if(response.data.code=="200" || response.data.code=="201"){
                        layer.open({
                            content: "人脸识别成功"
                            ,skin: 'msg'
                            ,time: 2,
                            end:function(){
                                _self.$parent.loadData();
                                _self.toBack(); 
                            }
                        });
                    }else if(response.data.code=="111"){
                        window.location.href='${project.domain}/index';
                    }else{
                        $("body").Loading('hide');
                        layer.open({
                            content: response.data.msg
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
            },
            getWx(res){
            	let _self = this;
            	var appId = res.body.appid;
				var nonceStr = res.body.noncestr;
				var signature = res.body.signature;
				var timestamp = res.body.timestamp;
				wx.config({
					debug: false,
					appId: appId,
					timestamp: timestamp,
					nonceStr: nonceStr,
					signature: signature,
					jsApiList: ['chooseImage', "uploadImage"]
				});
                wx.ready(function() {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function(res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 
                            sessionStorage.setItem("localIds",localIds);
                            if (localIds != "") {
                                wx.uploadImage({
                                    localId: sessionStorage.getItem("localIds"), // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    success: function(res) {
                                        _self.submit(res.serverId);
                                    }
                                });
                            }
                        }
                    });
                })
            },
            submit(serverId){	
            	let _self = this;
             	api.submitlivingwxsdk({userId: _self.userId,living: serverId}).then(res=>{
	                layer.open({
	                    content: res.msg
	                    ,skin: 'msg'
	                    ,time: 2,
	                    end : function(){ 
	                    	if(res.code=="200"){
	                    		_self.$parent.loadData();
	                			_self.toBack();	
	                		}else if(res.code=="111"){
			                    window.location.href='${project.domain}/index';
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
    .page-userphoto{
    	.img-box-wrap{
    		width: 180px;
    		height: 180px;
    		border-radius: 50%;
    		overflow: hidden;
    		display: table-cell;
    	}
    	.mint-button--large{
            position: relative;

            .upload-btn{
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left: 0;
                opacity: 0;
                z-index: 99;
            }
    	}

    }
</style>
