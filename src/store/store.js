import Vue from 'vue'
import Vuex from 'vuex'
import bet from './modules/bet/store'
import contract from './modules/contract/store'
import faucet from './modules/faucet/store'
import {web3, account} from '@/contracts'

Vue.use(Vuex)

const state = {
  account,
  web3: {
    utils: web3.utils,
  }
}

export default new Vuex.Store({
  state,
  modules: {
    bet,
    contract,
    faucet,
  }
})
