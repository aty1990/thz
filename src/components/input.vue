<template>
    <div class="page-input-wrap">
        <div class="bk-input-wrap flex" v-for="obj in tabObj">
            <span class="label" v-if="obj.label">{{obj.label}}</span>
            <template v-if="obj.isCode">
                <input :type="obj.type" :placeholder="obj.placeholder" :class="obj.icon" @input="oninput($event)" maxlength="6">
                <div class="get-code" @click="getCode">{{codeText}}</div>
            </template>
            <template v-else>
                <input  v-if="obj.label" :type="obj.type" :placeholder="obj.placeholder"  @input="oninput($event)">
                <input  v-else :type="obj.type" :placeholder="obj.placeholder" :class="obj.icon" @input="oninput($event)">
                <i class="icon-close" @click="clearText($event)"></i>
                <i v-if="obj.type=='password'" class="icon-view" @click="view($event)"></i>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'page-input-wrap',
        props:["tabObj"],
        data () {
            return {
                time : 60,
                timer : "",
                code : "100021",
                codeText : "获取验证码"
            }
        },
        mounted(){
            window.time = 60;
        },
        methods:{
            oninput(e){
                if(!$(e.target).hasClass('icon-code')){
                    e.target.nextElementSibling.style.display = e.target.value?'block':'none';
                    if(e.target.nextElementSibling.nextElementSibling){
                        e.target.nextElementSibling.nextElementSibling.style.display = e.target.value?'block':'none';
                    }
                }else{
                    if(e.target.value.length>6)e.target.value=e.target.value.slice(0,6);
                }
            },
            clearText(e){
                e.target.previousElementSibling.value="";
                e.target.style.display = "none";
                if(e.target.nextElementSibling){
                    e.target.nextElementSibling.style.display = 'none';
                }
            },
            view(e){
                var input = e.target.previousElementSibling.previousElementSibling;
                if(e.target.classList.contains('icon-view')){
                    e.target.className = "icon-preview";
                    input.type = "text";
                }else{
                    e.target.className = "icon-view";
                    input.type = "password";
                }
            },
            getCode(){
                var _self = this;
                if( !this.code || this.time < 60 )return;
                _self.timer = setInterval(function(){
                    _self.time--;
                    time--;
                    _self.codeText = "重新获取("+_self.time+")";
                    if(_self.time==0){
                        _self.codeText = "获取验证码";
                        clearInterval(_self.timer);
                        _self.time = 60;
                        time = 60;
                    }
                },1000)
            }
        }
    }
</script>
<style lang="scss">
   
</style>
