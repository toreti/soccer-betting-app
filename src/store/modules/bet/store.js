import {contract} from '@/contracts'
import {
  ADDING_BET_MUTATION,
  ADD_BET_ACTION,
} from '@/store/modules/bet/types'

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
