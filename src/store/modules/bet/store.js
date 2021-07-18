import {contract} from '@/contracts'
import {
  ADDING_BET_MUTATION,
  BETS_TOTAL_MUTATION,
  ADD_BET_ACTION,
  GET_BETS_TOTAL_ACTION,
} from '@/store/modules/bet/types'

export default {
  namespaced: true,
  state: {
    adding: false,
    betsTotal: [0, 0, 0],
  },
  mutations: {
    [ADDING_BET_MUTATION](state, value) {
      state.adding = value
    },
    [BETS_TOTAL_MUTATION](state, value) {
      state.betsTotal = value
    },
  },
  actions: {
    [ADD_BET_ACTION]({commit}, payload) {
      commit(ADDING_BET_MUTATION, true)
      contract.methods
        .addBet(payload.game, payload.result, payload.amount)
        .send({from: payload.account, gas: 1000000})
        .then(() => commit(ADDING_BET_MUTATION, false))
        .catch(error => {
          commit(ADDING_BET_MUTATION, false)
          alert('Error on add bet.')
          console.error(error)
        })
    },
    [GET_BETS_TOTAL_ACTION]({commit}, game) {
      contract.methods
        .getBetsTotal(game)
        .call()
        .then(betsTotal => commit(BETS_TOTAL_MUTATION, betsTotal))
        .catch(error => {
          alert('Error on get bets total.')
          console.error(error)
        })
    },
  }
}
