<template>
	<div>
		<div class="mess">
			<div style="width: 100%;background: #fff;margin-top: 10px;">
				<div style="width: 90%;overflow:hidden;margin-left: 5%;">
					<p class="msgTitle">{{detail.msgTitle}}</p>
					<div class="createTime" v-html="detail.createTime"></div>
					<p class="msgContent" v-html="detail.msgContent"></p>
				</div>
			</div>
		</div>
		<div class="mess1"></div>
	</div>
</template>
<script>
	import api from '@/fetch/api'
	import { getUrlParams ,getCookie } from '@/assets/js/tool' 
	export default {
		data() {
			return {
				detail : {}
			}
		},
		mounted(){
            this.initData();
		},
		methods: {
			initData(){
				// url需传入msgLink,msgId,type,accessToken
				let _self = this;
				let params = getUrlParams();
            	if(params.msgLink){
            		$(".mess").hide();
					$(".mess1").append('<iframe src="' + params.msgLink + '" style="width:100%;height:1000px;border:none;"></iframe>')
            	}else{
            		$.ajax({
		                url: "/apis/thz/H5toRtf",
		                type: "post",
		                data: { msgId: params.msgId, type: params.type, term: "wx" },
		                headers: {    
		                    accessToken : getCookie("thz_H5"),
		                    loginTerm : "wx",
		                    rand : Math.round(Math.random()*89999) + 10000
		                },
		                beforeSend: function() {
		                    $("body").Loading("show");
		                },
		                complete: function() {
		                    $("body").Loading("hide");
		                },
		                success: function(data) {
		                    if(data.code==200){
		                    	_self.detail = data.body;
								let time = _self.detail.createTime.substr(0, 4) + '-' + _self.detail.createTime.substr(4, 2) + '-' + _self.detail.createTime.substr(6, 2) + '&nbsp;' + _self.detail.createTime.substr(8, 2) + ':' + _self.detail.createTime.substr(10, 2) + ':' + _self.detail.createTime.substr(12, 2);
								_self.detail.createTime = time;
							}else{
								layer.open({
			                        content: data.msg
			                        ,skin: 'msg'
			                        ,time: 2
			                    });
							}
		                }
		            })
            	}
			}
		}
	}
</script>
<style lang="scss">
	html,body{
		height: auto;
		overflow: normal;
	}
	#app{
		height: auto;
	}
	.createTime{line-height: 20px;padding-bottom:10px;color:#666;font-size:12px;border-bottom: 1px solid #f1f1f1;}
	.msgContent{font-size: 14px;padding: 10px 0;color: #333333;line-height: 22px;}
	.msgTitle{font-size: 16px;color: #333333;letter-spacing: -0.39px;line-height: 40px;}
	.mess1{background: #fff;margin-top: 10px;}
	.mess1 img{width: 100%;}
</style>