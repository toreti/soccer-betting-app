import Web3 from 'web3'
import contractAbi from '@/contracts/contract'
import {
  LOADING_GAMES_MUTATION,
  ADDING_GAME_MUTATION,
  FINISHING_GAME_MUTATION,
  CLOSING_GAME_MUTATION,
  ADD_GAME_MUTATION,
  LIST_GAMES_MUTATION,
  ADD_GAME_ACTION,
  CLOSE_GAME_ACTION,
  FINISH_GAME_ACTION,
  LIST_GAMES_ACTION,
} from './types'

const web3 = new Web3('http://localhost:7545')
const contractAddress = '0x8ED832d2C0895654Ba24c109ad7483ab5fcDf83C'
const contract = new web3.eth.Contract(contractAbi, contractAddress)

export default {
  namespaced: true,
  state: {
    contract,
    addingGame: false,
    closingGame: false,
    finishingGame: false,
    loadingGames: false,
    games: [],
  },
  mutations: {
    [ADDING_GAME_MUTATION](state, value) {
      state.addingGame = value
    },
    [CLOSING_GAME_MUTATION](state, value) {
      state.closingGame = value
    },
    [FINISHING_GAME_MUTATION](state, value) {
      state.finishingGame = value
    },
    [LOADING_GAMES_MUTATION](state, value) {
      state.loadingGames = value
    },
    [ADD_GAME_MUTATION](state, value) {
      state.games.push(value)
    },
    [LIST_GAMES_MUTATION](state, value) {
      state.games = value
    },
  },
  actions: {
    [ADD_GAME_ACTION]({state, rootState, commit, dispatch}, game) {
      commit(ADDING_GAME_MUTATION, true)
      state.contract.methods
        .addGame(game.teamA, game.teamB, game.date, game.token)
        .send({from: rootState.account, gas: 1000000})
        .then(() => {
          commit(ADDING_GAME_MUTATION, false)
          dispatch(LIST_GAMES_ACTION)
        })
        .catch(error => {
          commit(ADDING_GAME_MUTATION, false)
          alert('Error on add game.')
          console.error(error)
        })
    },
    [CLOSE_GAME_ACTION]({state, rootState, commit, dispatch}, game) {
      console.log('closeGame', game)
      state.contract.methods
        .closeBets(game)
        .send({from: rootState.account, gas: 1000000})
        .then(() => {
          commit(CLOSING_GAME_MUTATION, false)
          dispatch(LIST_GAMES_ACTION)
        })
        .catch(error => {
          commit(CLOSING_GAME_MUTATION, false)
          alert('Error on close game.')
          console.error(error)
        })
    },
    [FINISH_GAME_ACTION]({state, rootState, commit, dispatch}, payload) {
      commit(FINISHING_GAME_MUTATION, true)
      state.contract.methods
        .setResult(payload.game, payload.result)
        .send({from: rootState.account, gas: 1000000})
        .then(() => {
          commit(FINISHING_GAME_MUTATION, false)
          dispatch(LIST_GAMES_ACTION)
        })
        .catch(error => {
          commit(FINISHING_GAME_MUTATION, false)
          alert('Error on finish game.')
          console.error(error)
        })
    },
    [LIST_GAMES_ACTION]({state, commit}) {
      commit(LOADING_GAMES_MUTATION, true)
      commit(LIST_GAMES_MUTATION, [])
      state.contract.methods
        .getGamesAddress()
        .call()
        .then(hashs => {
          commit(LOADING_GAMES_MUTATION, false)
          hashs.forEach(hash => {
            state.contract.methods.getGame(hash).call()
              .then(game => commit(ADD_GAME_MUTATION, game))
              .catch(error => {
                alert(`Error on get game "${hash}".`)
                console.error(error)
              })
          })
        })
        .catch(error => {
          commit(LOADING_GAMES_MUTATION, false)
          alert('Error on get games.')
          console.error(error)
        })
    },
  }
}
