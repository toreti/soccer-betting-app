import {
  ADDING_BET_MUTATION,
  ADD_BET_ACTION,
} from '@/store/modules/bet/types'
import Web3 from 'web3'
import contractAbi from '@/contracts/contract'

const web3 = new Web3('http://localhost:7545')
const contractAddress = '0x8ED832d2C0895654Ba24c109ad7483ab5fcDf83C'
const contract = new web3.eth.Contract(contractAbi, contractAddress)

export default {
  namespaced: true,
  state: {
    adding: false,
  },
  mutations: {
    [ADDING_BET_MUTATION](state, value) {
      state.adding = value
    }
  },
  actions: {
    [ADD_BET_ACTION]({commit}, payload) {
      commit(ADDING_BET_MUTATION, true)
      contract.methods
        .addBet(payload.game, payload.result, payload.amount)
        .send({from: payload.account, gas: 1000000})
        .then(() => {
          commit(ADDING_BET_MUTATION, false)
        })
        .catch(error => {
          commit(ADDING_BET_MUTATION, false)
          alert('Error on add bet.')
          console.error(error)
        })
    }
  }
}
