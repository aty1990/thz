<template>
	<div class="white-bg" v-html="goodsDetail"></div>
</template>
<script>
	import api from '@/fetch/api'
	export default {
		data() {
			return {
				goodsDetail : ""
			}
		},
		mounted(){
			api.goodsDetail({id:this.$route.query.goodsId}).then(res=>{ 
                if(res.code=="200"){
                	this.goodsDetail = res.body.goodsDetail;  
                }
            })
		},
		methods: {
			toBack() {
				this.$router.back();
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
	.white-bg{
        background:#fff;
        height: 100%;
        //overflow-y: auto;
        img{
	        width:100%;
	        font-size:0;
	    }
    }

</style>