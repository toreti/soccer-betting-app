import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import contractAbi from '../contracts/contract'
import tokenAbi from '../contracts/token'

const web3 = new Web3('http://localhost:7545')
const contractAddress = '0x00a0C4f3cC28F19b6d49dFB4CD3553d657aE7898'
const contract = new web3.eth.Contract(contractAbi, contractAddress)
const tokenAddress = '0xb40522068a89111ED350F8aCE4d64eA1ef5ba261'
const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)
const account = '0x924850779aF86Fd7A6FC8fc2F059Dd32BC0ECbD3'

Vue.use(Vuex)

const state = {
  account,
  contract,
  token: {
    contract: tokenContract,
    address: tokenAddress,
  },
  web3: {
    utils: web3.utils,
  }
}

const getters = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
