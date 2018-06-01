<template>
    <transition name="move">
        <div class="page-animate page-msg-detail">
            <v-header>
                <mt-header title="消息详情">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <vue-better-scroll style="height:100%"  class="wrapper" ref="scroll">
                <div class="msg-body-wrap">
                    <h4 class="title">{{detail.title}}</h4>
                    <p class="time" v-html="detail.time">{{detail.time}}</p>
                    <div class="content" v-html="detail.content">
                      {{detail.content}}
                    </div>
                </div>
            </vue-better-scroll>
        </div>
    </transition>
</template>

<script>
    import VueBetterScroll from 'vue2-better-scroll' 
    import VHeader from '@/components/header'
    import api from '@/fetch/api.js'
    export default {
        name: 'page-msg-detail',
        components: { VueBetterScroll,VHeader },
        data () {
            return {
            	detail:{
            		title:"",
            		time:"",
            		content:""
            	}
            }
        },
        mounted(){
        	this.initData();   		
        },
        methods : {
        	initData(){
        		var _this = this;
        		let msgId=this.$route.query.msgId;
        		let type=this.$route.query.type;
        		api.H5toRtf({msgId: msgId, type: type,term:"wx"}).then(res=>{
        			
                    if(res.code=="200"){
                    	var tem=res.body.createTime;
                    	var time=tem.substr(0, 4) + '-' + tem.substr(4, 2) + '-' + tem.substr(6, 2) + '&nbsp;' + tem.substr(8, 2) + ':' + tem.substr(10, 2) + ':' + tem.substr(12, 2)
                    	_this.detail.time=time;	
						_this.detail.title=res.body.msgTitle;	
						_this.detail.content=res.body.msgContent;
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
            toBack(){
                this.$router.back();
                this.$parent.updateData();
            }
        }
    }
</script>
<style lang="scss">
    .page-msg-detail{
        .msg-body-wrap{
            padding: 10px;
        }
        background: #fff;
        .title{
            padding: 10px 0;
        }
        .time{
            padding: 0px 0 10px;
            border-bottom: 1px solid #F2F2F2;
            color:#878787;
            font-size: 12px;
        }
        .content{
            padding: 10px 0;
            line-height: 22px;
            text-align: justify;
            img{
                width: 100%;
                margin-top: 10px;
            }
        }
    }
</style>
