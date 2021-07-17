import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import bet from './modules/bet/store'
import contract from './modules/contract/store'
import faucet from './modules/faucet/store'

const web3 = new Web3('http://localhost:7545')
const account = '0x924850779aF86Fd7A6FC8fc2F059Dd32BC0ECbD3'

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
