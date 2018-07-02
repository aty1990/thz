<template>
	<transition name="move">
		<div class="page-animate page-person">
			<v-header>
				<mt-header title="个人信息">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper page-person-wrap">
				<div class="weui_cells_access">
					<div class="top">个人信息保存后无法修改，请务必正确。</div>
					<a class="weui_cell weui_person" v-tap="{methods:toRouter,params:'idCard'}">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl mgr-40">身份信息</span> 
							<span class="fl"><input type="text" placeholder="请完善身份信息" readonly v-model="paramsObj.userName"></span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
					<a class="weui_cell weui_work" v-tap="{methods:chooseEdu}" >
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl mgr-40">教育程度</span> 
							<span class="fl"><input type="text" placeholder="请选择学历" readonly v-model="paramsObj.eduText" id="edu"></span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
					<a class="weui_cell weui_work"  v-tap="{methods:chooseMar}">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl mgr-40">婚姻状况</span>
							</span><span class="fl"><input type="text" placeholder="请选择婚姻状况" readonly v-model="paramsObj.marryText"></span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
					<a class="weui_cell weui_work" v-tap="{methods : addr}">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl mgr-28">现居住地址</span> 
							<span class="addrss-person fl" style="width:65%;" id="addrText">
								<input type="text" placeholder="请定位居住地址" readonly v-model="paramsObj.address" style="width:100%">
							</span>
						</div>
						<div class="weui_cell_ft"></div>
					</a>
					<a class="weui_cell weui_work">
						<div class="weui_cell_bd weui_cell_primary">
							<span class="fl mgl-97 mymessage1 street" style="width:70%;">
								<input type="text" class="word-lst" placeholder="请填写具体街道门牌号" v-model="paramsObj.detailsAddress" @input="lst" style="width:100%">
							</span>
						</div>
					</a>
				</div>
				<div class="button-wrap mgt-20 saveinfo">
	                <mt-button type="primary" size="large" :disabled="saveBtn" @click.stop="saveInfo">保存</mt-button>
	            </div>
	            <!--  选择学历 begin-->
	            <vue-pickers :show="chooseEduFlag" :columns="columns" :defaultData="defaultData1" :selectData="eduArr" @cancel="close('chooseEduFlag')" @confirm="confirmEdu"></vue-pickers>


				<div class="mask" v-show="chooseEduFlag"></div>
	            <!--  选择学历 end-->

	            <!--  婚姻状况 begin-->
	            <vue-pickers :show="chooseMarFlag" :columns="columns" :defaultData="defaultData2" :selectData="marArr" @cancel="close('chooseMarFlag')" @confirm="confirmMar"></vue-pickers>
				<div class="mask" v-show="chooseMarFlag"></div>
	            <!--  婚姻状况 end-->
			</div>
			<router-view />
		</div>
	</transition>
</template>

<script>
	import VuePickers from 'vue-pickers'
	import VHeader from '@/components/header'
	import {listenField} from '@/assets/js/tool' 
	import api from '@/fetch/api'
	export default {
		name: 'page-person',
		components: {
			VHeader,VuePickers
		},
		data() {
			return {
				saveBtn : true,
				chooseEduFlag : false,
				chooseMarFlag : false,
				defaultData : [],
				columns : 1,
				telPrix : "",
				userId : "",
				defaultData1 : [
                    { text: "",value: "" }
                ],
                defaultData2 : [
                    { text: "",value: "" }
                ],
				paramsObj : {
					eduText : "",
					marryText : "",
					userName : "",
					detailsAddress : "", 
					eduLvId : "",
					isMarryId : "",
					province : "",
					address : ""
				},
                marArr: {
				  	// 第一列的数据结构
				  	data1: []
				},
                eduArr: {
				  	// 第一列的数据结构
				  	data1: []
				}
			}
		},
		mounted() {
			this.initData();
			if(sessionStorage.getItem('person') == '2'){
				$(".saveinfo").hide();
				$(".mymessage1").find("input").attr("disabled","disabled");
				$('.mymessage1 input[disabled]').css("-webkit-text-fill-color","#000");
				$('.mymessage1 input[disabled]').css("opacity","1");
			}
		},
		watch : {
			paramsObj : {
				handler(newValue, oldValue) {
					this.lst();
		　　　　},
		　　　　deep: true
			}
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			initData(){
				let _self = this;
				_self.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
				api.detailUserInfo({userId:_self.userId}).then(res=>{
					if(res.code == 200){
						_self.paramsObj.detailsAddress = res.body.liveAddrDown;
						_self.paramsObj.country = res.body.country;
						_self.paramsObj.address = res.body.liveAddrUp;
						_self.paramsObj.province = res.body.province;
						_self.paramsObj.userName = res.body.userName;
						_self.paramsObj.eduLvId = res.body.eduLvId;
						_self.defaultData1[0].value = res.body.eduLvId;
						_self.defaultData1[0].text = res.body.eduLv;
						_self.paramsObj.eduText = res.body.eduLv;
						_self.paramsObj.marryText = res.body.isMarry;
						_self.paramsObj.isMarryId = res.body.isMarryId;

						_self.defaultData2[0].value = res.body.isMarryId;
						_self.defaultData2[0].text = res.body.isMarry;

						if(Math.floor(sessionStorage.getItem("person"))==1){
							setTimeout(()=>{
								_self.saveBtn = true;
							},50)
						}

						if(sessionStorage.getItem('person') == '2'){					
							$("#addrText").html(res.body.liveAddrUp);
							$(".street").html(res.body.liveAddrDown);
						}
					}else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							location.replace(location.origin+'/thz/index');
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
				// 获取教育信息
				api.selectinfo({type:"100000"}).then(res=>{
					_self.eduArr.data1 = [];
					$.each(res.body,function(i,ele){
						_self.eduArr.data1.push({text: ele.value,value: ele.key});
					})
				});
				api.selectinfo({type:"100001"}).then(res=>{
					_self.marArr.data1 = [];
					$.each(res.body,function(i,ele){
						_self.marArr.data1.push({text: ele.value,value: ele.key});
					})
				})
			},
			toRouter(e){
				this.$router.push({
					name : e.params
				});
			},
			chooseEdu(){
				$("#edu").focus().blur();
				if(sessionStorage.getItem('person') == '2'){
					this.chooseEduFlag = false;
				}else{
					this.chooseEduFlag = true;
				}
			},
			chooseMar(e){
				$("#edu").focus().blur();
				if(sessionStorage.getItem('person') == '2'){
					this.chooseMarFlag = false;
				}else{
					this.chooseMarFlag = true;
				}
			},
			confirmEdu(e){
				this.chooseEduFlag = false;
				this.paramsObj.eduText = e['select1'].text;
				this.paramsObj.eduLvId = e['select1'].value;
				this.defaultData1[0].value = e['select1'].value;
				this.defaultData1[0].text = e['select1'].text;
				this.lst();
			},
			lst(){
				this.saveBtn = listenField([
					{value:this.paramsObj.eduText,type:"text"},
					{value:this.paramsObj.marryText,type:"text"},
					{value:this.paramsObj.detailsAddress,type:"text"},
					{value:this.paramsObj.address,type:"text"},
					{value:this.paramsObj.userName,type:"text"}
				])
			},
			confirmMar(e){
				this.chooseMarFlag = false;
				this.paramsObj.marryText = e['select1'].text;
				this.paramsObj.isMarryId = e['select1'].value;
				this.defaultData2[0].value = e['select1'].value;
				this.defaultData2[0].text = e['select1'].text;
				this.lst();
			},
			close(type){
				this[type] = false;
			},
			addr(){
				$("#edu").focus().blur();
				if(sessionStorage.getItem('person') != '2'){
					sessionStorage.setItem("title","居住地址");
					this.$router.push("/person/amap");
				}
			},
			saveInfo(){
				let _self = this;
				if(!localStorage.getItem("companyAddr")){
					layer.open({
                        content: "请定位您所在的城市"
                        ,skin: 'msg'
                        ,time: 2
                    });
                    return;
				}
				this.saveBtn = true;
				var params = {
					addr: localStorage.getItem("companyAddr"),
                    eduLv: _self.paramsObj.eduLvId,
                    city: localStorage.getItem("companyCity"),
                    addrUp: _self.paramsObj.address,
                    province: localStorage.getItem("companyProvince"),
                    isMarry: _self.paramsObj.isMarryId,
                    addrDown:  _self.paramsObj.detailsAddress,
                    country: localStorage.getItem("companyCountry"),
                    userId: _self.userId,
                    tdId: _fmOpt.getinfo()
				};
				//提交个人信息
				api.submitperson(params).then(res=>{
					if(res.code=="200"){
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
	                        	_self.$parent.loadData();
	                            _self.toBack();
	                        }
	                    });
					}else if(res.code=="111"){
                        // 判断安卓和微信
						if(!sessionStorage.getItem("term")){
							location.replace(location.origin+'/thz/index');
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
			loadData(){
				this.initData();
			}
		}
	}
</script>
<style lang="scss">
	.page-person {
		.page-person-wrap{
			overflow-y:auto; 
		}
		.white-bg{
			background: #fff;
		}
		.border-bottom-1{
			border-bottom: 1px solid #d9d9d9;
		}
		.input-box{
			padding: 16px 10px;
		}
		.weui_cell{
			padding: 18px 15px;

			input{
				border:none;
				outline: none;
			}
		}
		.fl{
			float: left;
		}
		.mgr-40{
			margin-right: 40px;
		}
		.mgl-97{
			margin-left: 97px;
			input{
				outline: none;
				border:none;
			}
		}
		.weui_cell{
			padding-left: 0;
		}
		.weui_cell:before{
			left: 0;
		}
        .word-lst{
        	background: rgba(0,0,0,0);
        }
        .area_btn{
		    font-size: 16px;
		}
	}
</style>