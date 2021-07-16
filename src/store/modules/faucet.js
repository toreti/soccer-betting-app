import Web3 from 'web3'
import tokenAbi from '@/contracts/token'
import {
  OWNER_MUTATION,
  NAME_MUTATION,
  SYMBOL_MUTATION,
  DECIMALS_MUTATION,
  TOTAL_SUPPLY,
} from '@/store/modules/faucet-types'

const web3 = new Web3('http://localhost:7545')
const tokenAddress = '0xb40522068a89111ED350F8aCE4d64eA1ef5ba261'
const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)

export default {
  namespaced: true,
  state: {
    token: {
      contract: tokenContract,
      address: tokenAddress,
      owner: null,
      name: null,
      symbols: null,
      decimals: null,
      totalSupply: null,
    },
    transfer: {
      transferring: false,
      recipient: null,
      amount: null,
    }
  },
  mutations: {
    [OWNER_MUTATION](state, owner) {
      state.token.owner = owner
    },
    [NAME_MUTATION](state, name) {
      state.token.name = name
    },
    [SYMBOL_MUTATION](state, symbol) {
      state.token.symbol = symbol
    },
    [DECIMALS_MUTATION](state, decimals) {
      state.token.decimals = decimals
    },
    [TOTAL_SUPPLY](state, totalSupply) {
      state.token.totalSupply = totalSupply
    },
  },
  actions: {
    detailToken({state, commit}) {
      state.token.contract.methods.getOwner().call().then(result => commit(OWNER_MUTATION, result))
      state.token.contract.methods.name().call().then(result => commit(NAME_MUTATION, result))
      state.token.contract.methods.symbol().call().then(result => commit(SYMBOL_MUTATION, result))
      state.token.contract.methods.decimals().call().then(result => commit(DECIMALS_MUTATION, result))
      state.token.contract.methods.totalSupply().call().then(result => commit(TOTAL_SUPPLY, result))
    }
  }
}
