import Web3 from 'web3'
import tokenAbi from '@/contracts/token'
import {
  TOKEN_OWNER_MUTATION,
  TOKEN_NAME_MUTATION,
  TOKEN_SYMBOL_MUTATION,
  TOKEN_DECIMALS_MUTATION,
  TOKEN_TOTAL_SUPPLY,
  RECIPIENT_ADDRESS_MUTATION,
  RECIPIENT_BALANCE_MUTATION,
  TRANSFER_PROCESSING_MUTATION,
  TRANSFER_AMOUNT_MUTATION,
  DETAIL_TOKEN_ACTION,
  GET_RECIPIENT_BALANCE_ACTION,
  TRANSFER_ACTION,
} from '@/store/modules/faucet/types'

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
    recipient: {
      address: null,
      balance: null,
    },
    transfer: {
      processing: false,
      amount: 0,
    },
  },
  mutations: {
    [TOKEN_OWNER_MUTATION](state, value) {
      state.token.owner = value
    },
    [TOKEN_NAME_MUTATION](state, value) {
      state.token.name = value
    },
    [TOKEN_SYMBOL_MUTATION](state, value) {
      state.token.symbol = value
    },
    [TOKEN_DECIMALS_MUTATION](state, value) {
      state.token.decimals = value
    },
    [TOKEN_TOTAL_SUPPLY](state, value) {
      state.token.totalSupply = value
    },
    [RECIPIENT_ADDRESS_MUTATION](state, value) {
      state.recipient.address = value
    },
    [RECIPIENT_BALANCE_MUTATION](state, value) {
      state.recipient.balance = value
    },
    [TRANSFER_PROCESSING_MUTATION](state, value) {
      state.transfer.processing = value
    },
    [TRANSFER_AMOUNT_MUTATION](state, value) {
      state.transfer.amount = value
    },
  },
  actions: {
    [DETAIL_TOKEN_ACTION]({state, commit}) {
      state.token.contract.methods.getOwner().call().then(result => commit(TOKEN_OWNER_MUTATION, result))
      state.token.contract.methods.name().call().then(result => commit(TOKEN_NAME_MUTATION, result))
      state.token.contract.methods.symbol().call().then(result => commit(TOKEN_SYMBOL_MUTATION, result))
      state.token.contract.methods.decimals().call().then(result => commit(TOKEN_DECIMALS_MUTATION, result))
      state.token.contract.methods.totalSupply().call().then(result => commit(TOKEN_TOTAL_SUPPLY, result))
    },
    [GET_RECIPIENT_BALANCE_ACTION]({state, commit}) {
      if (web3.utils.isAddress(state.recipient.address)) {
        state.token.contract.methods
          .balanceOf(state.recipient.address)
          .call()
          .then(result => commit(RECIPIENT_BALANCE_MUTATION, result))
          .catch(error => {
            alert('Error on get recipient balance.')
            console.error(error)
          })
      }
    },
    [TRANSFER_ACTION]({state, commit, dispatch}) {
      commit(TRANSFER_PROCESSING_MUTATION, true)
      const amount = web3.utils.toWei(state.transfer.amount.toString())
      state.token.contract.methods
        .transfer(state.recipient.address, amount)
        .send({from: state.token.owner, gas: 1000000})
        .on('sending', payload => console.log('sending', payload))
        .on('sent', payload => console.log('sent', payload))
        .on('transactionHash', transactionHash => console.log('transactionHash', transactionHash))
        .on('receipt', receipt => console.log('receipt', receipt))
        .on('confirmation', (confirmationNumber, receipt, latestBlockHash) => {
          console.log('confirmation', confirmationNumber, receipt, latestBlockHash)
          commit(TRANSFER_PROCESSING_MUTATION, false)
          dispatch(GET_RECIPIENT_BALANCE_ACTION)
        })
        .on('error', (error, receipt) => {
          alert('Error on transfer tokens.')
          console.log('error', error, receipt)
          commit(TRANSFER_PROCESSING_MUTATION, false)
        })
    }
  }
}
