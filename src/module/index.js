import * as types from './types'
import api from '../fetch/api'

const state = {
    account : "",
    pwd_reg : /^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z!@#$%^&*?]).*$/,  //密码强度正则，最少6位，最多20位，包括至少1个小写字母或者特殊字符，1个数字
    channel_pwd_reg : /^.*(?=.{6,12})(?=.*\d)(?=.*[a-zA-Z!@#$%^&*?]).*$/,  //密码强度正则，最少6位，最多12位，包括至少1个小写字母或者特殊字符，1个数字
    userInfo : null,
    regSecKey : "f2687563995db0b80ded97d7a2408d8f556a040accb10f0c9eba683031e9da266f0d603fbbc12cdb0c0fb62addf3f2da45f3a4405f271247022f0b5d7ff603c6a2d8c206f7d8a250e4235476889cdca27f6d65401c666268037341ca9cda3272487f751538762e68afac19fdd0df439ba858f560b9a97e337081669a262d8cff" 
}
const actions = {
    setAccount({ commit },account) { 
        commit(types.ACCOUNT,account);
    },
    setUserInfo({ commit },userInfo){
        commit(types.USERINFO,userInfo);
    }
}

const getters = {
    /*getWithdrawpre : state => state.withdrawpre,
    appUrlInviterList : state => state.urls.appUrl_inviter_list,
    appUrlWithdraw : state => state.urls.appUrl_withdraw*/
}

const mutations = {
    [types.ACCOUNT](state,account) {
        state.account = account;
    },
    [types.USERINFO](state,userInfo) {
        state.userInfo = userInfo;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}