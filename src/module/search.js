import api from '@/fetch/api.js'
const state = {
    goodsList : [],
    searchData : null
}
const actions = {
    getDoodsList ({ state, commit, rootState }, goodsName ) {
        api.indexSearch({goodsName:goodsName}).then((res)=>{
            commit("search/updateGoodsList",res.body,{root:true})
        });  
    },
    toDetail( { state, commit, rootState }, { _this, goods } ){ 
        //将goodsId存入sessionStorage,防止路由刷新参数丢失
        sessionStorage.setItem("goodsId",goods.goodsId);
        localStorage.setItem("goodsId",goods.goodsId);
        _this.$router.push({
            name : "goods-detail",
            query : {
                goodsId : goods.goodsId
            }
        });
    }
}
const getters = {
    /* sass(state,getters,rootState){
       api.indexSearch({goodsName:this.goodsName}).then((res)=>{
            state.goodsList = res.body;
        });  
    }*/
}
const mutations = {
    updateGoodsList(state,result){
        state.goodsList = result;
    }
}
export default {
    state,
    actions,
    getters,
    mutations,
    namespaced : true
}