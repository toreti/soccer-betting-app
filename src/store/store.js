import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import contractAbi from '../contracts/contract'
import faucet from './modules/faucet'

const web3 = new Web3('http://localhost:7545')
const contractAddress = '0x8ED832d2C0895654Ba24c109ad7483ab5fcDf83C'
const contract = new web3.eth.Contract(contractAbi, contractAddress)
const account = '0x924850779aF86Fd7A6FC8fc2F059Dd32BC0ECbD3'

Vue.use(Vuex)

const state = {
  account,
  contract,
  web3: {
    utils: web3.utils,
  }
}

export default new Vuex.Store({
  state,
  modules: {
    faucet,
  }
})
