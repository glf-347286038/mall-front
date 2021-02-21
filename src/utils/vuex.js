import Vue from 'vue'
import Vuex from 'vuex'
import {getItem, setItem} from '../utils/storage'

Vue.use(Vuex)
export default new Vuex.store({
    state: {
        tokenInfo: getItem('tokenInfo') || {}
    },
    mutations: {
        mSetTokenInfo(state, tokenObj) {
            state.tokenInfo = tokenObj
            // 因为刷新丢失所以进行持久化
            setItem('tokenInfo', tokenObj)
        }
    },
    // 只更新token,不更新响应拦截器里面的refreshToken
    mUpdateToken(state, newToken) {
        state.tokenInfo.token = newToken
        setItem('tokenInfo', state.tokenInfo)
    },
    action: {},
    modules: {}
})