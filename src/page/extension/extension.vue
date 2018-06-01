<template>
    <transition name="move">
        <div class="page-extension page-animate">
            <div class="extension-box">
                <img :src="src" width="100%" height="100%">
                <span class="fixed-buttom flex">
                    <button v-if="!userAgent" class="android-btn" @click="downloadApk"></button>
                    <!-- <button v-if="userAgent" class="copy-btn" data-clipboard-text="淘花宅商城"></button> -->
                    <button v-if="userAgent" class="copy-btn" @click="downloadIos" ></button>
                </span>
            </div>
        </div>
    </transition>
</template>
<script>
    import Clipboard from 'clipboard'
    export default {
        data () {
            return {
                src : browser.versions.ios?"/thz/static/ios.png":"/thz/static/android.png",
                userAgent : browser.versions.ios
            }
        },
        mounted(){
            let _self = this;
        },
        methods : {
            downloadApk(){
                if(browser.versions.weixin){
                    layer.open({
                        content: "长按图片识别二维码"
                        ,skin: 'msg'
                        ,time: 4
                    });
                }else{
                    location.href = "http://thz-static.oss-cn-shanghai.aliyuncs.com/app/thz_web_v1.0_20180419.apk";
                }
            },
            downloadIos(){
                if(browser.versions.weixin){
                    layer.open({
                        content: "长按图片识别二维码"
                        ,skin: 'msg'
                        ,time: 4
                    });
                }else{
                    location.href = "https://www.pgyer.com/wcvk";
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
   .page-extension{
        .extension-box{
            position: absolute;
            top:0;
            width: 100%;
            bottom: 0;
            overflow: hidden;
        }
        .fixed-buttom{
            position: absolute;
            bottom: 14px;
            width: 100%;
        }
        .copy-btn{
            width: 65%;
            height: 48px;
            border:none;
            background: url("/thz/static/download2.png") no-repeat;
            background-size: 100% 100%;
            outline: none;
        }
        .android-btn{
            width: 65%;
            height: 48px;
            border:none;
            background: url("/thz/static/download1.png") no-repeat;
            background-size: 100% 100%;
            outline: none;
        }
   }
</style>
