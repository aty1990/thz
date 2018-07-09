<template>
    <transition name="up">
        <div class="page-search-wrap page-animate">
            <div class="flex pd-all-10">
                <input type="searchInput" class="search-input grow mgr-6" autocomplete="off" placeholder="搜宝贝" v-model="goodsName" ref="search" @keyup="search($event)">
                <span class="font-size-14 cancel-btn" @click="back">取消</span>
            </div>
            <div class="wrapper">
                <div class="pd-all-10">
                    <p class="title" v-if="goodsList.length>0">搜索发现</p>
                  



                    <div class="home-component flex">
                        <div class="goods-item" v-for="goods in goodsList" @click.stop="detail(goods)" >
                            <div class="pdt-20 pdb-10 min-he-100">
                                <img v-lazy="goods.goodsPicurl" width="90%" style="margin-left: 5%;">
                            </div>
                            <h5 class="text-deal1">{{goods.goodsName}}</h5>
                            <div class="price">￥{{goods.goodsAmount}}</div>
                        </div>
                    </div>	



                    <div class="flex vertical mgt-40" v-show="goodsList.length==0">
                        <img src="/thz/static/pic_kong@2x.png" width="120" class="mgt-40">
                        <p class="mgt-20 gray-font">没有搜到相关宝贝~</p>
                        <div class="mgt-20 to-other">
                            <mt-button type="primary" size="large" @click="gyg">逛一逛</mt-button>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: 'page-search-wrap', 
        data () {
            return { goodsName : ""}
        },
        computed : {
            ...mapState({
                goodsList : (state) => state.search.goodsList
            })
        },
        mounted(){
            this.$refs.search.focus();
            this.getDoodsList("");
        },
        methods:{
            ...mapActions({
                getDoodsList : "search/getDoodsList",
                toDetail : "search/toDetail"
            }),
            back(){
                this.$router.back();
            },
            detail(goods){
                this.toDetail({_this:this,goods:goods});
            },
            search(e){
                if(e.keyCode=='13') {  
                    e.preventDefault();  
                    //请求搜索接口  
                    this.getDoodsList(this.goodsName);
                }  
            },
            gyg(){
                this.$router.replace("/home")
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/scss/mixin';
    @import '../../assets/scss/color'; 
   .page-search-wrap{
        background:#fff;
        .search-input{
            background: url("/thz/static/search-btn.png") #DBDBDE scroll px2rem(10) px2rem(8) no-repeat;
            background-size : px2rem(14);
            border-radius: 2px;
            border:none;
            padding: px2rem(8);
            border-radius: px2rem(4);
            padding-left: px2rem(30);
            outline: none;
        }
        .wrap{
            flex-wrap: wrap;
        }
        .wrapper{
            overflow-y: auto;
        }
        .search-item{
            padding: px2rem(6) px2rem(14);
            border:px2rem(0.5) solid #C8CBD1; 
            margin-top: px2rem(10); 
            margin-right: px2rem(6);
            font-size:px2rem(12);

        }
        .home-component {
			flex-wrap: wrap;
			justify-content: flex-start;
			background:#fff;
		}
        .cancel-btn{
            color:#333333;
            font-family: PingFangSC-Light;
        }
        .title{
            padding-left: px2rem(10);
            font-family: PingFangSC-Regular;
            font-size: px2rem(14);
            margin:px2rem(6) 0;
            color: #333333;
            position: relative;
            &:before{
                content:"";
                position: absolute;
                width: px2rem(4);
                height: px2rem(16);
                background-color: $theme-bg-color;
                left:0;
                top:px2rem(-2);
            }
        }
        .to-other{
            width: 60%;
        }
   }
</style>
