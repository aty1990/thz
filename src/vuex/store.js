import Vue from 'vue'
import Vuex from 'vuex'

import index from  '@/module/index'
import search from '@/module/search'
import wxpay from  '@/module/wxpay'
import online from '@/module/online'
import payerr from '@/module/payerr'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        index,
        search,
        wxpay,
        online,
        payerr
    }
})